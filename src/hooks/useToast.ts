import { useState, useCallback, useRef } from "react"

export function useToast(duration = 2000) {
    const [isVisible, setIsVisible] = useState(false)
    const timeoutRef = useRef<number | null>(null)

    const show = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        setIsVisible(true)
        timeoutRef.current = window.setTimeout(() => {
            setIsVisible(false)
        }, duration)
    }, [duration])

    const hide = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        setIsVisible(false)
    }, [])

    return { isVisible, show, hide }
}
