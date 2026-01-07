import type { CopyFormat } from "../types"

export function formatCurveValue(
    value: [number, number, number, number],
    format: CopyFormat,
    duration: number
): string {
    const [x1, y1, x2, y2] = value

    switch (format) {
        case "css-transition":
            return `transition: all ${duration}ms cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`
        case "js-object":
            return `[${x1}, ${y1}, ${x2}, ${y2}]`
        default:
            return `${x1}, ${y1}, ${x2}, ${y2}`
    }
}

export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text)
        return true
    } catch (error) {
        console.error("Failed to copy:", error)
        return false
    }
}
