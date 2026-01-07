import type { ReactNode } from "react"
import type { EasingCurve, VisualizationMode } from "../types"
import { CurveCard } from "./CurveCard"

interface CurveGridProps {
    curves: EasingCurve[]
    mode: VisualizationMode
    duration: number
    favorites: string[]
    onCopy: (curve: EasingCurve) => void
    onToggleFavorite: (id: string) => void
    emptyIcon?: ReactNode
    emptyMessage?: string
    emptySubtext?: string
}

export function CurveGrid({
    curves,
    mode,
    duration,
    favorites,
    onCopy,
    onToggleFavorite,
    emptyIcon,
    emptyMessage = "No curves found",
    emptySubtext,
}: CurveGridProps) {
    if (curves.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-theme-text-tertiary">
                {emptyIcon}
                <span className="text-[11px]">{emptyMessage}</span>
                {emptySubtext && (
                    <span className="text-[9px] mt-0.5 opacity-50">{emptySubtext}</span>
                )}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 gap-1.5">
            {curves.map((curve) => (
                <CurveCard
                    key={`${curve.id}-${mode}`}
                    curve={curve}
                    mode={mode}
                    duration={duration}
                    isFavorite={favorites.includes(curve.id)}
                    onCopy={onCopy}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    )
}
