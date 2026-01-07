import { useState, useEffect, useCallback } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            const saved = localStorage.getItem(key)
            return saved ? JSON.parse(saved) : initialValue
        } catch {
            return initialValue
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error(`Failed to save to localStorage: ${key}`, error)
        }
    }, [key, value])

    const clear = useCallback(() => {
        setValue(initialValue)
    }, [initialValue])

    return [value, setValue, clear] as const
}
