import { useState, useEffect, useCallback } from "react"
import type { PomodoroSettings } from "../types"
import { STORAGE_KEYS, validateSettings } from "../constants"

type Validator<T> = (value: unknown) => T

/**
 * Hook for persisting state to localStorage with optional validation
 */
export function useLocalStorage<T>(
    key: string,
    initialValue: T,
    validator?: Validator<T>
): [T, (value: T | ((prev: T) => T)) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key)
            if (item) {
                const parsed = JSON.parse(item)
                // Apply validator if provided
                return validator ? validator(parsed) : parsed
            }
            return initialValue
        } catch {
            return initialValue
        }
    })

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue))
        } catch {
            // Ignore write errors (quota exceeded, private browsing, etc.)
        }
    }, [key, storedValue])

    const setValue = useCallback((value: T | ((prev: T) => T)) => {
        setStoredValue(prev => {
            const newValue = typeof value === "function" ? (value as (prev: T) => T)(prev) : value
            return newValue
        })
    }, [])

    return [storedValue, setValue]
}

/**
 * Specialized hook for pomodoro settings with built-in validation
 */
export function usePomodoroSettings(): [PomodoroSettings, (value: PomodoroSettings | ((prev: PomodoroSettings) => PomodoroSettings)) => void] {
    return useLocalStorage<PomodoroSettings>(
        STORAGE_KEYS.settings,
        validateSettings({}),
        validateSettings
    )
}
