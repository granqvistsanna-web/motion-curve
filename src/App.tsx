import { framer } from "framer-plugin"

// Initialize plugin UI
framer.showUI({
    position: "top right",
    width: 300,
    height: 400,
})

export function App() {
    return (
        <main className="flex flex-col gap-6 p-4">
            <div>
                <h1 className="text-lg font-semibold text-theme-text mb-1">
                    Design System Demo
                </h1>
                <p className="text-sm text-theme-text-secondary">
                    Your plugin starter kit with Framer's design system
                </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2">
                <h2 className="text-sm font-medium text-theme-text-secondary mb-1">
                    Buttons
                </h2>
                <div className="flex gap-2">
                    <button className="btn-primary">Primary</button>
                    <button className="btn-secondary">Secondary</button>
                    <button className="icon-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Input */}
            <div className="flex flex-col gap-2">
                <h2 className="text-sm font-medium text-theme-text-secondary mb-1">
                    Input
                </h2>
                <input
                    type="text"
                    placeholder="Type something..."
                    className="input"
                />
            </div>

            {/* Card */}
            <div className="flex flex-col gap-2">
                <h2 className="text-sm font-medium text-theme-text-secondary mb-1">
                    Card
                </h2>
                <div className="card">
                    <p className="text-sm text-theme-text">
                        This is a card component with automatic theme support.
                    </p>
                </div>
            </div>

            {/* Colors */}
            <div className="flex flex-col gap-2">
                <h2 className="text-sm font-medium text-theme-text-secondary mb-1">
                    Theme Colors
                </h2>
                <div className="flex flex-col gap-1 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-theme-tint"></div>
                        <span className="text-theme-text-secondary">Tint (Primary)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-theme-bg-secondary border border-theme-divider"></div>
                        <span className="text-theme-text-secondary">Background Secondary</span>
                    </div>
                </div>
            </div>
        </main>
    )
}
