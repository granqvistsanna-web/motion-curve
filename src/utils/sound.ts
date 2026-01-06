let audioContext: AudioContext | null = null
let isInitialized = false

/**
 * Get or create the audio context
 * Note: Must be called after user interaction for first-time initialization
 */
function getAudioContext(): AudioContext {
    if (!audioContext) {
        audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    }
    return audioContext
}

/**
 * Initialize audio context on user gesture
 * Call this on first user interaction (e.g., button click) to enable sound
 * This is required by browsers' autoplay policy
 */
export function initAudio(): void {
    if (isInitialized) return

    try {
        const ctx = getAudioContext()
        // Resume if suspended (browsers suspend until user interaction)
        if (ctx.state === "suspended") {
            ctx.resume()
        }
        isInitialized = true
    } catch {
        // Audio not available
    }
}

/**
 * Play a pleasant completion chime
 * Two-tone sine wave (C5 + E5) for a positive, non-intrusive notification
 */
export function playCompletionSound(): void {
    try {
        const ctx = getAudioContext()

        // Resume context if needed (handles edge cases)
        if (ctx.state === "suspended") {
            ctx.resume()
        }

        const now = ctx.currentTime

        // Create a pleasant two-tone chime (C5 and E5 - major third interval)
        const frequencies = [523.25, 659.25]

        frequencies.forEach((freq, index) => {
            const oscillator = ctx.createOscillator()
            const gainNode = ctx.createGain()

            oscillator.connect(gainNode)
            gainNode.connect(ctx.destination)

            oscillator.type = "sine"
            oscillator.frequency.value = freq

            // Gentle envelope: quick attack, slow decay
            const startTime = now + index * 0.15
            gainNode.gain.setValueAtTime(0, startTime)
            gainNode.gain.linearRampToValueAtTime(0.25, startTime + 0.05)
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.8)

            oscillator.start(startTime)
            oscillator.stop(startTime + 0.8)
        })
    } catch {
        // Audio not available, fail silently
    }
}
