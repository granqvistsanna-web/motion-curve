import { useState, useEffect } from "react"
import type { Theme } from "../types"

function applyTheme(mode: Theme) {
    document.documentElement.setAttribute("data-theme", mode)
}

/**
 * Get current theme from prefers-color-scheme media query
 * Framer syncs this with its theme setting for plugin iframes
 */
function getSystemTheme(): Theme {
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

/**
 * Hook for syncing theme with Framer's theme setting
 * Uses prefers-color-scheme media query which Framer syncs with its UI theme
 */
export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        const initial = getSystemTheme()
        applyTheme(initial)
        return initial
    })

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

        const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
            const newTheme = e.matches ? "dark" : "light"
            setTheme(newTheme)
            applyTheme(newTheme)
        }

        // Apply initial theme
        handleChange(mediaQuery)

        // Listen for changes
        mediaQuery.addEventListener("change", handleChange)

        return () => {
            mediaQuery.removeEventListener("change", handleChange)
        }
    }, [])

    return { theme }
}
