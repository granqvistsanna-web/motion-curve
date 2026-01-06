import { useEffect, useState, useRef } from "react"
import type { TimerMode } from "../types"
import { TOAST_DURATION, TOAST_DURATION_MINI } from "../constants"

interface ToastProps {
    mode: TimerMode
    visible: boolean
    onDismiss: () => void
    compact?: boolean
}

function getToastContent(mode: TimerMode, compact: boolean): string {
    if (mode === "focus") return compact ? "Done" : "Session complete"
    return "Break over"
}

const CheckIcon = () => (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export function Toast({ mode, visible, onDismiss, compact = false }: ToastProps) {
    const [show, setShow] = useState(false)
    const onDismissRef = useRef(onDismiss)
    const timerRef = useRef<number>()
    const content = getToastContent(mode, compact)
    const duration = compact ? TOAST_DURATION_MINI : TOAST_DURATION

    // Keep callback ref updated
    useEffect(() => {
        onDismissRef.current = onDismiss
    }, [onDismiss])

    useEffect(() => {
        if (visible) {
            setShow(true)
            timerRef.current = window.setTimeout(() => {
                setShow(false)
                setTimeout(() => onDismissRef.current(), 200)
            }, duration)
            return () => {
                if (timerRef.current) clearTimeout(timerRef.current)
            }
        }
    }, [visible, duration])

    const handleDismiss = () => {
        if (timerRef.current) clearTimeout(timerRef.current)
        setShow(false)
        setTimeout(() => onDismiss(), 200)
    }

    if (!visible && !show) return null

    // Compact toast for mini mode - overlays the center
    if (compact) {
        return (
            <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    show ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={handleDismiss}
            >
                <div className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-surface-elevated backdrop-blur-md shadow-theme-lg border border-theme-border">
                    <CheckIcon />
                    <span className="text-[11px] font-medium text-theme-text">{content}</span>
                </div>
            </div>
        )
    }

    return (
        <div
            className={`absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-surface-overlay backdrop-blur-md transition-all duration-300 cursor-pointer shadow-theme-lg border border-theme-border ${
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
            }`}
            onClick={handleDismiss}
        >
            <CheckIcon />
            <span className="text-[11px] font-medium text-theme-text">{content}</span>
        </div>
    )
}
