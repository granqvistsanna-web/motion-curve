interface ToastProps {
    isVisible: boolean
}

export function Toast({ isVisible }: ToastProps) {
    return (
        <div
            className={`
                fixed bottom-3 left-1/2 -translate-x-1/2 z-50
                px-3 py-1.5 rounded-lg
                bg-theme-text text-theme-bg
                text-[10px] font-medium tracking-wide
                shadow-lg
                transition-all duration-150 ease-out
                ${isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-1 scale-95 pointer-events-none"
                }
            `}
        >
            Copied to clipboard
        </div>
    )
}
