import { useState, useEffect } from "react"
import { framer } from "framer-plugin"
import type { Theme } from "../types"

function applyTheme(mode: Theme) {
    document.documentElement.setAttribute("data-theme", mode)
}

/**
 * Hook for syncing theme with Framer's theme setting
 */
export function useTheme() {
    const [theme, setTheme] = useState<Theme>("light")

    // Subscribe to Framer's theme changes
    useEffect(() => {
        // Apply initial theme from Framer
        const initialMode = framer.mode === "dark" ? "dark" : "light"
        setTheme(initialMode)
        applyTheme(initialMode)

        // Subscribe to theme changes
        const unsubscribe = framer.subscribeToTheme((framerTheme) => {
            const newTheme = framerTheme.mode === "dark" ? "dark" : "light"
            setTheme(newTheme)
            applyTheme(newTheme)
        })

        return unsubscribe
    }, [])

    return { theme }
}
