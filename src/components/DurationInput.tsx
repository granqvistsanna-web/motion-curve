interface DurationInputProps {
    value: number
    onChange: (value: number) => void
    min?: number
    max?: number
    step?: number
}

export function DurationInput({
    value,
    onChange,
    min = 100,
    max = 2000,
    step = 50,
}: DurationInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Math.max(min, Math.min(max, Number(e.target.value)))
        onChange(newValue)
    }

    return (
        <div className="flex items-center gap-1">
            <input
                type="number"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                className="w-11 px-1.5 py-0.5 text-[10px] font-mono text-right bg-theme-bg-secondary/60 rounded text-theme-text border-none focus:outline-none focus:ring-1 focus:ring-[var(--framer-color-tint)]"
            />
            <span className="text-[9px] text-theme-text-tertiary">ms</span>
        </div>
    )
}
