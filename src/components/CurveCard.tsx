import { useState } from "react"
import type { EasingCurve, VisualizationMode } from "../types"
import { CurvePreview } from "./CurvePreview"

interface CurveCardProps {
    curve: EasingCurve
    mode: VisualizationMode
    duration: number
    isFavorite: boolean
    onCopy: (curve: EasingCurve) => void
    onToggleFavorite: (id: string) => void
}

export function CurveCard({ curve, mode, duration, isFavorite, onCopy, onToggleFavorite }: CurveCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button
                onClick={() => onCopy(curve)}
                className={`
                    w-full flex flex-col p-2.5 rounded-xl h-[92px]
                    bg-theme-bg-secondary/40
                    border border-transparent
                    transition-all duration-150 ease-out
                    hover:bg-theme-bg-secondary hover:border-theme-bg-secondary
                    active:scale-[0.98]
                `}
                style={{
                    boxShadow: isHovered ? 'inset 0 0 0 1px var(--framer-color-divider)' : 'none'
                }}
            >
                <div className="flex-1 flex items-center justify-center w-full">
                    <CurvePreview value={curve.value} mode={mode} duration={duration} isHovered={isHovered} />
                </div>

                <div className="w-full mt-auto text-center">
                    <div className={`text-[10px] font-medium leading-none truncate transition-colors ${
                        isHovered ? "text-theme-text" : "text-theme-text-secondary"
                    }`}>
                        {curve.name}
                    </div>
                </div>
            </button>

            {/* Favorite Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    onToggleFavorite(curve.id)
                }}
                className={`
                    absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded-md
                    transition-all duration-150
                    ${isFavorite
                        ? "opacity-100 text-theme-text"
                        : "opacity-0 group-hover:opacity-50 text-theme-text-tertiary hover:!opacity-100"
                    }
                `}
            >
                <svg width="10" height="10" viewBox="0 0 12 12" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 10.5C6 10.5 1.5 7.5 1.5 4.5C1.5 2.5 3 1.5 4.5 1.5C5.5 1.5 6 2 6 2C6 2 6.5 1.5 7.5 1.5C9 1.5 10.5 2.5 10.5 4.5C10.5 7.5 6 10.5 6 10.5Z" />
                </svg>
            </button>
        </div>
    )
}
