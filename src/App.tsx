import { useState } from "react"
import { framer } from "framer-plugin"
import { curves } from "./data/curves"
import type { EasingCurve, Category, VisualizationMode, View, CopyFormat } from "./types"
import { PLUGIN_CONFIG, STORAGE_KEYS, DEFAULTS } from "./constants"
import { useLocalStorage } from "./hooks/useLocalStorage"
import { useToast } from "./hooks/useToast"
import { formatCurveValue, copyToClipboard } from "./utils"
import { Sidebar } from "./components/Sidebar"
import { ModeSelector } from "./components/ModeSelector"
import { DurationInput } from "./components/DurationInput"
import { CategoryFilter } from "./components/CategoryFilter"
import { CurveGrid } from "./components/CurveGrid"
import { SettingsPanel } from "./components/SettingsPanel"
import { AddCurveForm } from "./components/AddCurveForm"
import { Toast } from "./components/Toast"

framer.showUI({
    position: PLUGIN_CONFIG.position,
    width: PLUGIN_CONFIG.width,
    height: PLUGIN_CONFIG.height,
})

export function App() {
    const toast = useToast()
    const [view, setView] = useState<View>("curves")
    const [mode, setMode] = useState<VisualizationMode>("line")
    const [category, setCategory] = useState<Category | "all">("all")
    const [duration, setDuration] = useState(DEFAULTS.duration)

    const [favorites, setFavorites, clearFavorites] = useLocalStorage<string[]>(
        STORAGE_KEYS.favorites,
        []
    )
    const [customCurves, setCustomCurves, clearCustomCurves] = useLocalStorage<EasingCurve[]>(
        STORAGE_KEYS.customCurves,
        []
    )
    const [copyFormat, setCopyFormat] = useLocalStorage<CopyFormat>(
        STORAGE_KEYS.copyFormat,
        DEFAULTS.copyFormat
    )

    const toggleFavorite = (id: string) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        )
    }

    const handleAddCurve = (curve: EasingCurve) => {
        setCustomCurves(prev => [...prev, curve])
    }

    const allCurves = [...curves, ...customCurves]

    const filteredCurves = view === "favorites"
        ? allCurves.filter(curve => favorites.includes(curve.id))
        : allCurves.filter(curve => category === "all" || curve.category === category)

    const handleCopy = async (curve: EasingCurve) => {
        const value = formatCurveValue(curve.value, copyFormat, duration)
        const success = await copyToClipboard(value)
        if (success) {
            toast.show()
        }
    }

    return (
        <main className="flex h-full bg-theme-bg overflow-hidden">
            <Sidebar
                view={view}
                onViewChange={setView}
                favoritesCount={favorites.length}
            />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Curves View */}
                {view === "curves" && (
                    <>
                        <header className="flex-shrink-0 px-3 pt-3 pb-2 space-y-2">
                            <div className="flex items-center justify-between">
                                <ModeSelector mode={mode} onModeChange={setMode} />
                                <DurationInput value={duration} onChange={setDuration} />
                            </div>
                            <CategoryFilter selected={category} onSelect={setCategory} />
                        </header>
                        <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 pb-3">
                            <CurveGrid
                                curves={filteredCurves}
                                mode={mode}
                                duration={duration}
                                favorites={favorites}
                                onCopy={handleCopy}
                                onToggleFavorite={toggleFavorite}
                            />
                        </div>
                    </>
                )}

                {/* Favorites View */}
                {view === "favorites" && (
                    <>
                        <header className="flex-shrink-0 px-3 pt-3 pb-2 space-y-2">
                            <div className="flex items-center justify-between">
                                <ModeSelector mode={mode} onModeChange={setMode} />
                                <DurationInput value={duration} onChange={setDuration} />
                            </div>
                        </header>
                        <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 pb-3">
                            <CurveGrid
                                curves={filteredCurves}
                                mode={mode}
                                duration={duration}
                                favorites={favorites}
                                onCopy={handleCopy}
                                onToggleFavorite={toggleFavorite}
                                emptyIcon={
                                    <svg width="28" height="28" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1" className="mb-2 opacity-30">
                                        <path d="M6 10.5C6 10.5 1.5 7.5 1.5 4.5C1.5 2.5 3 1.5 4.5 1.5C5.5 1.5 6 2 6 2C6 2 6.5 1.5 7.5 1.5C9 1.5 10.5 2.5 10.5 4.5C10.5 7.5 6 10.5 6 10.5Z" />
                                    </svg>
                                }
                                emptyMessage="No favorites yet"
                                emptySubtext="Click the heart to save curves"
                            />
                        </div>
                    </>
                )}

                {/* Add Curve View */}
                {view === "add" && (
                    <AddCurveForm onSave={handleAddCurve} />
                )}

                {/* Settings View */}
                {view === "settings" && (
                    <SettingsPanel
                        copyFormat={copyFormat}
                        onCopyFormatChange={setCopyFormat}
                        favoritesCount={favorites.length}
                        customCurvesCount={customCurves.length}
                        onClearFavorites={clearFavorites}
                        onClearCustomCurves={clearCustomCurves}
                    />
                )}
            </div>

            <Toast isVisible={toast.isVisible} />
        </main>
    )
}
