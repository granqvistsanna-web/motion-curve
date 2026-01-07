import { useState } from "react"
import type { EasingCurve, Category } from "../types"
import { CATEGORIES } from "../constants"
import { CurvePreview } from "./CurvePreview"

interface AddCurveFormProps {
    onSave: (curve: EasingCurve) => void
}

// Filter out "all" and "recent" for the form (only actual categories)
const categories = CATEGORIES.filter(c => c.id !== "all" && c.id !== "recent") as { id: Category; label: string }[]

export function AddCurveForm({ onSave }: AddCurveFormProps) {
    const [name, setName] = useState("")
    const [category, setCategory] = useState<Category>("smooth")
    const [x1, setX1] = useState(0.4)
    const [y1, setY1] = useState(0)
    const [x2, setX2] = useState(0.2)
    const [y2, setY2] = useState(1)
    const [isHovered, setIsHovered] = useState(false)
    const [saved, setSaved] = useState(false)

    const curveValue: [number, number, number, number] = [x1, y1, x2, y2]

    const handleSave = () => {
        const curveName = name.trim() || `Custom ${category.charAt(0).toUpperCase() + category.slice(1)}`

        const curve: EasingCurve = {
            id: `custom-${Date.now()}`,
            name: curveName,
            category,
            value: curveValue,
        }
        onSave(curve)

        setName("")
        setX1(0.4)
        setY1(0)
        setX2(0.2)
        setY2(1)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    const handleNumberInput = (setter: (v: number) => void, value: string, min: number, max: number) => {
        const num = parseFloat(value)
        if (!isNaN(num)) {
            setter(Math.min(max, Math.max(min, num)))
        }
    }

    return (
        <div className="flex flex-col h-full">
            <header className="flex-shrink-0 px-3 pt-3 pb-2">
                <h1 className="text-sm font-semibold text-theme-text">Create Curve</h1>
            </header>

            <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-4">
                {/* Live Preview */}
                <div
                    className="bg-theme-bg-secondary/40 rounded-xl p-5 flex items-center justify-center cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="scale-[1.8]">
                        <CurvePreview
                            value={curveValue}
                            mode="line"
                            duration={400}
                            isHovered={isHovered}
                        />
                    </div>
                </div>

                {/* Name Input */}
                <div className="space-y-1.5">
                    <label className="text-[9px] font-medium text-theme-text-tertiary uppercase tracking-wider">
                        Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="My Custom Curve"
                        className="w-full px-2.5 py-2 text-[11px] rounded-lg bg-theme-bg-secondary/60 text-theme-text placeholder:text-theme-text-tertiary/50 border border-transparent focus:border-[var(--framer-color-tint)] focus:outline-none transition-colors"
                    />
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                    <label className="text-[9px] font-medium text-theme-text-tertiary uppercase tracking-wider">
                        Category
                    </label>
                    <div className="flex flex-wrap gap-1">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setCategory(cat.id)}
                                className={`px-2 py-1 text-[10px] font-medium rounded-md transition-all ${
                                    category === cat.id
                                        ? "bg-[var(--framer-color-tint,#0099FF)] text-white"
                                        : "bg-theme-bg-secondary/60 text-theme-text-tertiary hover:text-theme-text"
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Control Points */}
                <div className="space-y-1.5">
                    <label className="text-[9px] font-medium text-theme-text-tertiary uppercase tracking-wider">
                        Control Points
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { label: "X1", value: x1, setter: setX1, min: 0, max: 1 },
                            { label: "Y1", value: y1, setter: setY1, min: -2, max: 2 },
                            { label: "X2", value: x2, setter: setX2, min: 0, max: 1 },
                            { label: "Y2", value: y2, setter: setY2, min: -2, max: 2 },
                        ].map((point) => (
                            <div key={point.label} className="flex items-center gap-1.5">
                                <span className="text-[9px] font-mono text-theme-text-tertiary w-4">{point.label}</span>
                                <input
                                    type="number"
                                    value={point.value}
                                    onChange={(e) => handleNumberInput(point.setter, e.target.value, point.min, point.max)}
                                    step="0.05"
                                    min={point.min}
                                    max={point.max}
                                    className="flex-1 px-2 py-1.5 text-[10px] font-mono rounded-md bg-theme-bg-secondary/60 text-theme-text border border-transparent focus:border-[var(--framer-color-tint)] focus:outline-none transition-colors"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* CSS Value Preview */}
                <div className="px-2.5 py-2 rounded-lg bg-theme-bg-secondary/40">
                    <code className="text-[9px] font-mono text-theme-text-secondary">
                        cubic-bezier({curveValue.join(", ")})
                    </code>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex-shrink-0 px-3 pb-3">
                <button
                    onClick={handleSave}
                    className={`w-full py-2 text-[11px] font-semibold rounded-lg transition-all ${
                        saved
                            ? "bg-green-500 text-white"
                            : "bg-[var(--framer-color-tint,#0099FF)] text-white hover:opacity-90 active:scale-[0.98]"
                    }`}
                >
                    {saved ? "Saved!" : "Save Curve"}
                </button>
            </div>
        </div>
    )
}
