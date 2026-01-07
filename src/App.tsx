import { useState, useEffect } from "react"
import { framer } from "framer-plugin"
import { curves } from "./data/curves"
import type { EasingCurve, Category } from "./types"
import { CurveCard } from "./components/CurveCard"
import { Toast } from "./components/Toast"
import { useToast } from "./hooks/useToast"

export type VisualizationMode = "line" | "square" | "arrow"

const categories: { id: Category | "all"; label: string }[] = [
    { id: "all", label: "All" },
    { id: "standard", label: "Standard" },
    { id: "smooth", label: "Smooth" },
    { id: "snappy", label: "Snappy" },
    { id: "spring", label: "Spring" },
    { id: "expressive", label: "Expressive" },
]

framer.showUI({
    position: "top right",
    width: 380,
    height: 540,
})

type View = "curves" | "favorites" | "add" | "settings"

export function App() {
    const toast = useToast()
    const [view, setView] = useState<View>("curves")
    const [mode, setMode] = useState<VisualizationMode>("line")
    const [category, setCategory] = useState<Category | "all">("all")
    const [duration, setDuration] = useState(400)
    const [favorites, setFavorites] = useState<string[]>(() => {
        const saved = localStorage.getItem("curve-favorites")
        return saved ? JSON.parse(saved) : []
    })
    const [customCurves, setCustomCurves] = useState<EasingCurve[]>(() => {
        const saved = localStorage.getItem("custom-curves")
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem("curve-favorites", JSON.stringify(favorites))
    }, [favorites])

    const toggleFavorite = (id: string) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        )
    }

    const filteredCurves = view === "favorites"
        ? curves.filter(curve => favorites.includes(curve.id))
        : curves.filter(curve => category === "all" || curve.category === category)

    const handleCopy = async (curve: EasingCurve) => {
        const value = `cubic-bezier(${curve.value.join(", ")})`
        try {
            await navigator.clipboard.writeText(value)
            toast.show()
        } catch (err) {
            console.error("Failed to copy:", err)
        }
    }

    return (
        <main className="flex flex-col h-full bg-theme-bg overflow-hidden">
            {/* Header */}
            <header className="flex-shrink-0 px-3 pt-3 pb-2 space-y-2">
                <div className="flex items-center justify-between">
                    {/* View Tabs */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setView("curves")}
                            className={`text-[11px] font-semibold transition-colors ${
                                view === "curves" ? "text-theme-text" : "text-theme-text-tertiary hover:text-theme-text"
                            }`}
                        >
                            Curves
                        </button>
                        <span className="text-theme-text-tertiary text-[11px]">/</span>
                        <button
                            onClick={() => setView("favorites")}
                            className={`text-[11px] font-semibold transition-colors flex items-center gap-1 ${
                                view === "favorites" ? "text-theme-text" : "text-theme-text-tertiary hover:text-theme-text"
                            }`}
                        >
                            Favorites
                            {favorites.length > 0 && (
                                <span className="text-[9px] bg-theme-bg-secondary px-1 rounded">
                                    {favorites.length}
                                </span>
                            )}
                        </button>
                    </div>
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className={`w-fit p-1 rounded-md transition-all flex-shrink-0 ${
                            showSettings
                                ? "bg-theme-bg-secondary text-theme-text"
                                : "text-theme-text-tertiary hover:text-theme-text"
                        }`}
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                        </svg>
                    </button>
                </div>

                {/* Settings Panel */}
                {showSettings && (
                    <div className="w-fit bg-theme-bg-secondary/40 rounded-xl p-2.5 space-y-2.5">
                        {/* Visualization Mode */}
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-medium text-theme-text-tertiary uppercase tracking-wider">
                                Preview Style
                            </label>
                            <div className="flex gap-1">
                                {(["line", "square", "arrow"] as const).map((m) => (
                                    <button
                                        key={m}
                                        onClick={() => setMode(m)}
                                        className={`flex-1 px-2 py-1.5 text-[10px] font-medium rounded-lg transition-all ${
                                            mode === m
                                                ? "bg-theme-bg text-theme-text shadow-sm"
                                                : "text-theme-text-tertiary hover:text-theme-text hover:bg-theme-bg/50"
                                        }`}
                                    >
                                        {m === "line" ? "Curve" : m === "square" ? "Fade" : "Move"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Duration Slider */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label className="text-[9px] font-medium text-theme-text-tertiary uppercase tracking-wider">
                                    Duration
                                </label>
                                <span className="text-[10px] font-mono text-theme-text tabular-nums">{duration}ms</span>
                            </div>
                            <input
                                type="range"
                                min="200"
                                max="1000"
                                step="50"
                                value={duration}
                                onChange={(e) => setDuration(Number(e.target.value))}
                                className="w-full h-1 rounded-full appearance-none cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right, var(--framer-color-tint) 0%, var(--framer-color-tint) ${((duration - 200) / 800) * 100}%, var(--framer-color-divider) ${((duration - 200) / 800) * 100}%, var(--framer-color-divider) 100%)`
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* Category Filter */}
                <div className="flex gap-1 overflow-x-auto scrollbar-hide -mx-3 px-3 py-0.5">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setCategory(cat.id)}
                            className={`flex-shrink-0 w-fit px-2 py-1 text-[10px] font-medium rounded-md transition-all ${
                                category === cat.id
                                    ? "bg-[var(--framer-color-tint)] text-white"
                                    : "text-theme-text-tertiary hover:text-theme-text"
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </header>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 pb-3">
                <div className="grid grid-cols-2 gap-1.5">
                    {filteredCurves.map((curve) => (
                        <CurveCard
                            key={curve.id}
                            curve={curve}
                            mode={mode}
                            duration={duration}
                            isFavorite={favorites.includes(curve.id)}
                            onCopy={handleCopy}
                            onToggleFavorite={toggleFavorite}
                        />
                    ))}
                </div>
                {filteredCurves.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-theme-text-tertiary">
                        <span className="text-[11px]">No curves in this category</span>
                    </div>
                )}
            </div>

            <Toast isVisible={toast.isVisible} />
        </main>
    )
}
