import { useState } from "react"
import type { CopyFormat } from "../types"

interface SettingsPanelProps {
    copyFormat: CopyFormat
    onCopyFormatChange: (format: CopyFormat) => void
    favoritesCount: number
    customCurvesCount: number
    onClearFavorites: () => void
    onClearCustomCurves: () => void
}

const copyFormats: { id: CopyFormat; label: string; example: string }[] = [
    { id: "cubic-bezier", label: "Values", example: "0.4, 0, 0.2, 1" },
    { id: "css-transition", label: "CSS", example: "transition: all 400ms cubic-bezier(...)" },
    { id: "js-object", label: "Array", example: "[0.4, 0, 0.2, 1]" },
]

export function SettingsPanel({
    copyFormat,
    onCopyFormatChange,
    favoritesCount,
    customCurvesCount,
    onClearFavorites,
    onClearCustomCurves,
}: SettingsPanelProps) {
    const selectedFormat = copyFormats.find(f => f.id === copyFormat)
    const [confirmingFavorites, setConfirmingFavorites] = useState(false)
    const [confirmingCustom, setConfirmingCustom] = useState(false)

    const handleClearFavorites = () => {
        if (confirmingFavorites) {
            onClearFavorites()
            setConfirmingFavorites(false)
        } else {
            setConfirmingFavorites(true)
            setTimeout(() => setConfirmingFavorites(false), 3000)
        }
    }

    const handleClearCustom = () => {
        if (confirmingCustom) {
            onClearCustomCurves()
            setConfirmingCustom(false)
        } else {
            setConfirmingCustom(true)
            setTimeout(() => setConfirmingCustom(false), 3000)
        }
    }

    return (
        <div className="flex flex-col h-full">
            <header className="flex-shrink-0 px-3 pt-3 pb-2">
                <h1 className="text-[13px] font-semibold text-theme-text">Settings</h1>
            </header>

            <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-4">
                {/* Copy Format */}
                <div className="space-y-2">
                    <label className="text-[10px] font-medium text-theme-text-tertiary uppercase tracking-wider">
                        Copy Format
                    </label>
                    <div className="bg-theme-bg-secondary rounded-lg p-1 flex items-center">
                        {copyFormats.map((format, index) => (
                            <div key={format.id} className="flex items-center flex-1">
                                <span
                                    onClick={() => onCopyFormatChange(format.id)}
                                    className={`flex-1 py-1.5 text-[10px] font-medium rounded text-center cursor-pointer select-none transition-all ${
                                        copyFormat === format.id
                                            ? "bg-theme-bg text-theme-text shadow-sm"
                                            : "text-theme-text-tertiary hover:text-theme-text"
                                    }`}
                                >
                                    {format.label}
                                </span>
                                {index < copyFormats.length - 1 && copyFormat !== format.id && copyFormat !== copyFormats[index + 1]?.id && (
                                    <div className="w-px h-3.5 bg-theme-text-tertiary/10" />
                                )}
                            </div>
                        ))}
                    </div>
                    {selectedFormat && (
                        <div className="px-2 py-1.5 rounded-md bg-theme-bg-secondary/30">
                            <code className="text-[9px] font-mono text-theme-text-tertiary break-all">
                                {selectedFormat.example}
                            </code>
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="border-t border-theme-text-tertiary/10" />

                {/* Data Management */}
                <div className="space-y-2">
                    <label className="text-[10px] font-medium text-theme-text-tertiary uppercase tracking-wider">
                        Data
                    </label>
                    <div className="space-y-1.5">
                        <button
                            onClick={handleClearFavorites}
                            disabled={favoritesCount === 0}
                            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg transition-all ${
                                favoritesCount === 0
                                    ? "bg-theme-bg-secondary/20 text-theme-text-tertiary/40 cursor-not-allowed"
                                    : confirmingFavorites
                                        ? "bg-red-500/20 text-red-500"
                                        : "bg-theme-bg-secondary/30 text-theme-text hover:bg-theme-bg-secondary/50"
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-70">
                                    <path d="M6 10.5C6 10.5 1.5 7.5 1.5 4.5C1.5 2.5 3 1.5 4.5 1.5C5.5 1.5 6 2 6 2C6 2 6.5 1.5 7.5 1.5C9 1.5 10.5 2.5 10.5 4.5C10.5 7.5 6 10.5 6 10.5Z" />
                                </svg>
                                <span className="text-[11px] font-medium">
                                    {confirmingFavorites ? "Click to confirm" : "Clear Favorites"}
                                </span>
                            </div>
                            <span className={`text-[9px] ${favoritesCount === 0 ? "text-theme-text-tertiary/40" : "text-theme-text-tertiary"}`}>
                                {favoritesCount}
                            </span>
                        </button>
                        <button
                            onClick={handleClearCustom}
                            disabled={customCurvesCount === 0}
                            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg transition-all ${
                                customCurvesCount === 0
                                    ? "bg-theme-bg-secondary/20 text-theme-text-tertiary/40 cursor-not-allowed"
                                    : confirmingCustom
                                        ? "bg-red-500/20 text-red-500"
                                        : "bg-theme-bg-secondary/30 text-theme-text hover:bg-theme-bg-secondary/50"
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-70">
                                    <path d="M2 10 Q6 2 10 10" strokeLinecap="round" />
                                </svg>
                                <span className="text-[11px] font-medium">
                                    {confirmingCustom ? "Click to confirm" : "Clear Custom Curves"}
                                </span>
                            </div>
                            <span className={`text-[9px] ${customCurvesCount === 0 ? "text-theme-text-tertiary/40" : "text-theme-text-tertiary"}`}>
                                {customCurvesCount}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-theme-text-tertiary/10" />

                {/* Support */}
                <div className="space-y-2">
                    <label className="text-[10px] font-medium text-theme-text-tertiary uppercase tracking-wider">
                        Support
                    </label>
                    <button
                        onClick={() => window.open("mailto:granqvistsanna@gmail.com", "_blank")}
                        className="w-full flex items-center justify-start gap-2 px-2.5 py-2 rounded-lg bg-theme-bg-secondary/30 text-theme-text hover:bg-theme-bg-secondary transition-all cursor-pointer text-left"
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        <span className="text-[11px] font-medium">Questions or bugs?</span>
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 px-3 py-3 border-t border-theme-text-tertiary/10">
                <p className="text-[9px] text-theme-text-tertiary/50 text-center">
                    Easings Supply by Sanna Granqvist
                </p>
            </div>
        </div>
    )
}
