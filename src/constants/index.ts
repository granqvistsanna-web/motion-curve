import type { CategoryFilter, VisualizationMode } from "../types"

// Plugin configuration
export const PLUGIN_CONFIG = {
    width: 380,
    height: 540,
    position: "top right" as const,
}

// Categories for filtering curves
export const CATEGORIES: CategoryFilter[] = [
    { id: "all", label: "All" },
    { id: "smooth", label: "Smooth" },
    { id: "snappy", label: "Snappy" },
    { id: "spring", label: "Spring" },
    { id: "expressive", label: "Expressive" },
]

// Visualization modes
export const VISUALIZATION_MODES: { id: VisualizationMode; label: string }[] = [
    { id: "line", label: "Curve" },
    { id: "square", label: "Fade" },
    { id: "arrow", label: "Hover" },
    { id: "blur", label: "Enter" },
]

// Local storage keys
export const STORAGE_KEYS = {
    favorites: "curve-favorites",
    customCurves: "custom-curves",
    copyFormat: "copy-format",
} as const

// Default values
export const DEFAULTS = {
    duration: 400,
    copyFormat: "cubic-bezier" as const,
}
