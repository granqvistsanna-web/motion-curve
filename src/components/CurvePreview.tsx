import { useState, useEffect, useRef } from "react"
import type { VisualizationMode } from "../App"

interface CurvePreviewProps {
    value: [number, number, number, number]
    mode: VisualizationMode
    duration?: number
    isHovered?: boolean
}

export function CurvePreview({ value, mode, duration = 400, isHovered = false }: CurvePreviewProps) {
    const [animationProgress, setAnimationProgress] = useState(0)
    const animationRef = useRef<number | null>(null)
    const [x1, y1, x2, y2] = value

    const size = 44
    const padding = 6
    const inner = size - padding * 2

    const startX = padding
    const startY = size - padding
    const endX = size - padding
    const endY = padding

    const cp1x = padding + x1 * inner
    const cp1y = size - padding - y1 * inner
    const cp2x = padding + x2 * inner
    const cp2y = size - padding - y2 * inner

    const pathD = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`

    const cubicBezier = (t: number): { x: number; y: number } => {
        const mt = 1 - t
        const mt2 = mt * mt
        const mt3 = mt2 * mt
        const t2 = t * t
        const t3 = t2 * t
        return {
            x: mt3 * startX + 3 * mt2 * t * cp1x + 3 * mt * t2 * cp2x + t3 * endX,
            y: mt3 * startY + 3 * mt2 * t * cp1y + 3 * mt * t2 * cp2y + t3 * endY,
        }
    }

    useEffect(() => {
        if (isHovered) {
            const startTime = performance.now()
            const animDuration = duration
            const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime
                const progress = Math.min(elapsed / animDuration, 1)
                const easedProgress = cubicBezierEase(progress, x1, y1, x2, y2)
                setAnimationProgress(easedProgress)
                if (progress < 1) {
                    animationRef.current = requestAnimationFrame(animate)
                }
            }
            animationRef.current = requestAnimationFrame(animate)
        } else {
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
            setAnimationProgress(0)
        }
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
        }
    }, [isHovered, x1, y1, x2, y2, duration])

    const dotPos = cubicBezier(animationProgress)

    const cubicBezierCSS = `cubic-bezier(${value.join(", ")})`

    if (mode === "square") {
        return (
            <div
                className="w-7 h-7 rounded"
                style={{
                    backgroundColor: "var(--framer-color-tint)",
                    opacity: isHovered ? 1 : 0.4,
                    transform: isHovered ? "translateY(0) scale(1)" : "translateY(6px) scale(0.9)",
                    transition: `opacity ${duration}ms ${cubicBezierCSS}, transform ${duration}ms ${cubicBezierCSS}`,
                }}
            />
        )
    }

    if (mode === "arrow") {
        return (
            <div className="flex items-center gap-1">
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    style={{
                        transform: isHovered ? "translateX(6px)" : "translateX(0)",
                        opacity: isHovered ? 1 : 0.3,
                        transition: `transform ${duration}ms ${cubicBezierCSS}, opacity ${duration}ms ${cubicBezierCSS}`,
                    }}
                >
                    <path
                        d="M4 10H16M16 10L11 5M16 10L11 15"
                        stroke={isHovered ? "var(--framer-color-tint)" : "var(--framer-color-text)"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ transition: "stroke 0.2s" }}
                    />
                </svg>
            </div>
        )
    }

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <path
                d={pathD}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity={isHovered ? 0.5 : 0.2}
                style={{ transition: "opacity 0.15s ease-out" }}
            />
            <circle
                cx={dotPos.x}
                cy={dotPos.y}
                r={isHovered ? 3.5 : 0}
                fill="var(--framer-color-tint)"
                style={{ transition: `r 0.15s ease-out` }}
            />
        </svg>
    )
}

function cubicBezierEase(t: number, x1: number, y1: number, x2: number, y2: number): number {
    let guessT = t
    for (let i = 0; i < 8; i++) {
        const currentX = cubicBezierCalc(guessT, x1, x2)
        const derivative = cubicBezierDerivative(guessT, x1, x2)
        if (Math.abs(derivative) < 1e-6) break
        guessT -= (currentX - t) / derivative
    }
    return cubicBezierCalc(guessT, y1, y2)
}

function cubicBezierCalc(t: number, p1: number, p2: number): number {
    const mt = 1 - t
    return 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t
}

function cubicBezierDerivative(t: number, p1: number, p2: number): number {
    const mt = 1 - t
    return 3 * mt * mt * p1 + 6 * mt * t * (p2 - p1) + 3 * t * t * (1 - p2)
}
