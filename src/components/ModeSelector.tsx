import type { VisualizationMode } from "../types"

interface ModeSelectorProps {
    mode: VisualizationMode
    onModeChange: (mode: VisualizationMode) => void
}

const modes: { id: VisualizationMode; label: string }[] = [
    { id: "line", label: "Curve" },
    { id: "square", label: "Fade" },
    { id: "arrow", label: "Hover" },
    { id: "blur", label: "Enter" },
]

export function ModeSelector({ mode, onModeChange }: ModeSelectorProps) {
    return (
        <div className="flex items-center gap-1.5">
            {modes.map((m, index) => (
                <span key={m.id} className="flex items-center gap-1.5">
                    <span
                        onClick={() => onModeChange(m.id)}
                        className={`text-[13px] font-semibold cursor-pointer transition-colors ${
                            mode === m.id
                                ? "text-theme-text"
                                : "text-theme-text-tertiary hover:text-theme-text"
                        }`}
                    >
                        {m.label}
                    </span>
                    {index < modes.length - 1 && (
                        <span className="text-[13px] text-theme-text-tertiary/40">/</span>
                    )}
                </span>
            ))}
        </div>
    )
}
