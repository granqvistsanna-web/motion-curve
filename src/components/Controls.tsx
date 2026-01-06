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
        <div className="w-full flex gap-2" role="group" aria-label="Timer controls">
            {/* Primary action button */}
            {isRunning ? (
                <button
                    onClick={onPause}
                    aria-label="Pause timer"
                    className="btn-secondary hover-accent flex-1 h-8 flex items-center justify-center gap-1.5 rounded-full border border-theme-border-strong text-theme-text-secondary transition-all active:scale-[0.98]"
                >
                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <rect x="3" y="2" width="3" height="10" rx="1" fill="currentColor"/>
                        <rect x="8" y="2" width="3" height="10" rx="1" fill="currentColor"/>
                    </svg>
                    <span className="text-[10px] font-medium">Pause</span>
                </button>
            ) : isPaused ? (
                <button
                    onClick={onStart}
                    aria-label="Resume timer"
                    className="btn-secondary hover-accent flex-1 h-8 flex items-center justify-center gap-1.5 rounded-full border border-theme-border-strong text-theme-text-secondary transition-all active:scale-[0.98]"
                >
                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M3.5 2v10l8-5-8-5z" fill="currentColor"/>
                    </svg>
                    <span className="text-[10px] font-medium">Resume</span>
                </button>
            ) : (
                <button
                    onClick={onStart}
                    aria-label="Start timer"
                    className="btn-primary flex-1 h-8 text-[11px] font-semibold rounded-full shadow-theme-sm transition-all active:scale-[0.98]"
                >
                    Start
                </button>
            )}

            {/* Done button - primary when paused to emphasize completion */}
            {(isRunning || isPaused) && (
                <button
                    onClick={onComplete}
                    aria-label="Complete current session"
                    className="btn-primary flex-1 h-8 text-[10px] font-medium rounded-full shadow-theme-sm transition-all active:scale-[0.98]"
                >
                    Done
                </button>
            )}
        </div>
    )
}
