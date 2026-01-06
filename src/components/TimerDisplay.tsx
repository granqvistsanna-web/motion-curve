import { memo, useMemo } from "react"
import type { TimerMode, TimerStatus, PomodoroSettings } from "../types"
import { formatTime } from "../utils/format"
import { getModeColor, getModeGlow, getModeLabel } from "../utils/mode"
import { getDurationForMode } from "../constants"

interface TimerDisplayProps {
    mode: TimerMode
    status: TimerStatus
    timeRemaining: number
    settings: PomodoroSettings
}

interface TickProps {
    index: number
    isActive: boolean
    isRunning: boolean
    size: number
    modeColor: string
    count: number
}

/**
 * Memoized tick component to prevent unnecessary re-renders
 * Only re-renders when active state changes
 */
const Tick = memo(function Tick({ index, isActive, isRunning, size, modeColor, count }: TickProps) {
    const angle = (index * 360) / count - 90
    const center = size / 2

    // Cardinal (4) + ordinal (4) + minor ticks
    const isCardinal = index % 8 === 0
    const isOrdinal = index % 8 === 4
    const length = isCardinal ? 14 : isOrdinal ? 9 : 5
    const innerRadius = size * 0.28
    const outerRadius = innerRadius + length

    const x1 = center + innerRadius * Math.cos((angle * Math.PI) / 180)
    const y1 = center + innerRadius * Math.sin((angle * Math.PI) / 180)
    const x2 = center + outerRadius * Math.cos((angle * Math.PI) / 180)
    const y2 = center + outerRadius * Math.sin((angle * Math.PI) / 180)

    return (
        <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={isActive ? modeColor : "var(--color-border-strong)"}
            strokeWidth={isCardinal ? 2.5 : isOrdinal ? 2 : 1.5}
            strokeLinecap="round"
            style={{
                transition: "stroke 0.3s ease-out",
                filter: isActive && isRunning ? `drop-shadow(0 0 3px ${modeColor})` : undefined
            }}
        />
    )
})

/**
 * Timer display component with optimized rendering
 * - Memoized ticks to prevent full re-render on time change
 * - Uses CSS transforms for animations (GPU-accelerated)
 * - Avoids layout-triggering properties in animations
 */
export function TimerDisplay({ mode, status, timeRemaining, settings }: TimerDisplayProps) {
    const isRunning = status === "running"
    const isPaused = status === "paused"
    const totalDuration = getDurationForMode(mode, settings)
    const progress = totalDuration > 0 ? Math.max(0, Math.min(1, 1 - timeRemaining / totalDuration)) : 0

    const size = 100
    const tickCount = 32
    const modeColor = getModeColor(mode)
    const modeGlow = getModeGlow(mode)
    const activeCount = Math.floor(tickCount * progress)

    // Memoize ticks array to prevent recreation on every render
    const ticks = useMemo(() => {
        return Array.from({ length: tickCount }, (_, i) => (
            <Tick
                key={i}
                index={i}
                isActive={i < activeCount}
                isRunning={isRunning}
                size={size}
                modeColor={modeColor}
                count={tickCount}
            />
        ))
    }, [activeCount, isRunning, modeColor])

    return (
        <div className="relative flex flex-col items-center" role="timer" aria-label={`${getModeLabel(mode)} timer`}>
            {/* Timer graphic - decorative */}
            <div className="relative" style={{ willChange: isRunning ? "transform" : "auto" }} aria-hidden="true">
                {/* Ambient glow when running - uses transform/opacity only (GPU) */}
                <div
                    className={`absolute -inset-6 rounded-full pointer-events-none ${
                        isRunning ? "opacity-100 animate-glow-pulse" : "opacity-0"
                    }`}
                    style={{
                        background: `radial-gradient(circle, ${modeGlow} 0%, transparent 65%)`,
                        transition: "opacity 0.8s ease-out",
                        willChange: isRunning ? "transform" : "auto"
                    }}
                />

                <svg width={size} height={size} className="relative">
                    {/* Center dot */}
                    <circle
                        cx={size/2}
                        cy={size/2}
                        r={isRunning ? 3 : 2}
                        fill={
                            isRunning || isPaused
                                ? modeColor
                                : "var(--color-border-strong)"
                        }
                        opacity={isPaused && !isRunning ? 0.5 : 1}
                        style={{
                            transition: "fill 0.5s ease-out, r 0.3s ease-out, opacity 0.3s ease-out",
                            filter: isRunning ? `drop-shadow(0 0 6px ${modeColor})` : undefined
                        }}
                    />

                    {/* Tick marks */}
                    <g>{ticks}</g>
                </svg>
            </div>

            {/* Time display */}
            <div className="mt-1.5 flex flex-col items-center">
                {/* Mode label - tiny uppercase */}
                <span
                    className={`text-[8px] uppercase tracking-[0.08em] font-medium ${
                        isRunning ? "text-theme-text-secondary" : "text-theme-text-muted"
                    }`}
                    style={{ transition: "color 0.3s ease-out" }}
                >
                    {getModeLabel(mode)}
                </span>

                {/* Main time - uses tabular figures to prevent layout shift */}
                <span
                    aria-live="off"
                    aria-atomic="true"
                    className={`text-[20px] font-light tracking-[-0.02em] leading-none ${
                        isRunning ? "text-theme-text" : "text-theme-text-secondary"
                    }`}
                    style={{
                        fontFeatureSettings: '"tnum"',
                        transition: "color 0.3s ease-out"
                    }}
                >
                    {formatTime(timeRemaining)}
                </span>
            </div>
        </div>
    )
}
