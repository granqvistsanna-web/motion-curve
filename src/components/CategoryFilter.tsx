import type { Category } from "../types"
import { CATEGORIES } from "../constants"

interface CategoryFilterProps {
    selected: Category | "all" | "recent"
    onSelect: (category: Category | "all" | "recent") => void
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
    return (
        <div className="flex gap-1">
            {CATEGORIES.map(cat => (
                <span
                    key={cat.id}
                    onClick={() => onSelect(cat.id)}
                    className={`cursor-pointer px-1.5 py-0.5 text-[10px] font-medium rounded transition-colors ${
                        selected === cat.id
                            ? "bg-blue-500 text-white"
                            : "text-theme-text-tertiary hover:text-theme-text"
                    }`}
                >
                    {cat.label}
                </span>
            ))}
        </div>
    )
}
