// Curve types
export type Category = "smooth" | "snappy" | "spring" | "expressive"

export interface EasingCurve {
    id: string
    name: string
    category: Category
    value: [number, number, number, number]
}

// UI types
export type VisualizationMode = "line" | "square" | "arrow" | "blur"
export type View = "curves" | "favorites" | "add" | "settings"
export type CopyFormat = "cubic-bezier" | "css-transition" | "js-object"

// Category filter type
export interface CategoryFilter {
    id: Category | "all"
    label: string
}
