import type { TimerStatus } from "../types"

interface ControlsProps {
    status: TimerStatus
    onStart: () => void
    onPause: () => void
    onComplete: () => void
}

export function Controls({ status, onStart, onPause, onComplete }: ControlsProps) {
    const isRunning = status === "running"
    const isPaused = status === "paused"

    return (
        <div className="w-full flex gap-2">
            {/* Primary action button */}
            {isRunning ? (
                <button
                    onClick={onPause}
                    className="btn-secondary hover-accent flex-1 h-8 flex items-center justify-center gap-1.5 rounded-full border border-theme-border-strong text-theme-text-secondary transition-all active:scale-[0.98]"
                >
                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                        <rect x="3" y="2" width="3" height="10" rx="1" fill="currentColor"/>
                        <rect x="8" y="2" width="3" height="10" rx="1" fill="currentColor"/>
                    </svg>
                    <span className="text-[10px] font-medium">Pause</span>
                </button>
            ) : isPaused ? (
                <button
                    onClick={onStart}
                    className="btn-primary flex-1 h-8 flex items-center justify-center gap-1.5 rounded-full shadow-theme-sm transition-all active:scale-[0.98]"
                >
                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                        <path d="M3.5 2v10l8-5-8-5z" fill="currentColor"/>
                    </svg>
                    <span className="text-[10px] font-semibold">Resume</span>
                </button>
            ) : (
                <button
                    onClick={onStart}
                    className="btn-primary flex-1 h-8 text-[11px] font-semibold rounded-full shadow-theme-sm transition-all active:scale-[0.98]"
                >
                    Start
                </button>
            )}

            {/* Done button - secondary when paused to not compete with Resume */}
            {(isRunning || isPaused) && (
                <button
                    onClick={onComplete}
                    className={`flex-1 h-8 text-[10px] font-medium rounded-full transition-all active:scale-[0.98] ${
                        isPaused
                            ? "btn-secondary hover-accent border border-theme-border-strong text-theme-text-secondary"
                            : "btn-primary shadow-theme-sm"
                    }`}
                >
                    Done
                </button>
            )}
        </div>
    )
}
