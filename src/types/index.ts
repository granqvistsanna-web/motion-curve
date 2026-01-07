export type Category = "standard" | "smooth" | "snappy" | "expressive" | "spring"

export interface EasingCurve {
    id: string
    name: string
    category: Category
    value: [number, number, number, number]
}

export const CATEGORIES: { id: Category | "all"; label: string }[] = [
    { id: "all", label: "All" },
    { id: "standard", label: "Standard" },
    { id: "smooth", label: "Smooth" },
    { id: "snappy", label: "Snappy" },
    { id: "expressive", label: "Expressive" },
    { id: "spring", label: "Spring" },
]
