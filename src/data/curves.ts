import type { EasingCurve } from "../types"

// Curated collection of distinct easing curves
// Duplicates removed, keeping most recognizable names
export const curves: EasingCurve[] = [
    // === SMOOTH === Gentle, natural motion

    // Sine - very gentle
    { id: "ease-in-sine", name: "Sine In", category: "smooth", value: [0.12, 0, 0.39, 0] },
    { id: "ease-out-sine", name: "Sine Out", category: "smooth", value: [0.61, 1, 0.88, 1] },
    { id: "ease-in-out-sine", name: "Sine In Out", category: "smooth", value: [0.37, 0, 0.63, 1] },

    // Quad - smooth acceleration
    { id: "ease-in-quad", name: "Quad In", category: "smooth", value: [0.11, 0, 0.5, 0] },
    { id: "ease-out-quad", name: "Quad Out", category: "smooth", value: [0.5, 1, 0.89, 1] },
    { id: "ease-in-out-quad", name: "Quad In Out", category: "smooth", value: [0.45, 0, 0.55, 1] },

    // Cubic - balanced
    { id: "ease-in-cubic", name: "Cubic In", category: "smooth", value: [0.32, 0, 0.67, 0] },
    { id: "ease-out-cubic", name: "Cubic Out", category: "smooth", value: [0.33, 1, 0.68, 1] },
    { id: "ease-in-out-cubic", name: "Cubic In Out", category: "smooth", value: [0.65, 0, 0.35, 1] },

    // Common defaults (distinct values only)
    { id: "ease", name: "Ease", category: "smooth", value: [0.25, 0.1, 0.25, 1] },
    { id: "ease-out", name: "Ease Out", category: "smooth", value: [0.4, 0, 0.2, 1] },
    { id: "ease-in", name: "Ease In", category: "smooth", value: [0.4, 0, 1, 1] },
    { id: "decelerate", name: "Decelerate", category: "smooth", value: [0, 0, 0.2, 1] },

    // Brand curves with distinct values
    { id: "ios-ease", name: "iOS", category: "smooth", value: [0.25, 0.46, 0.45, 0.94] },
    { id: "stripe", name: "Stripe", category: "smooth", value: [0.645, 0.045, 0.355, 1] },
    { id: "linear-app", name: "Linear", category: "smooth", value: [0.35, 0, 0.25, 1] },
    { id: "figma-gentle", name: "Figma Gentle", category: "smooth", value: [0.41, 0.1, 0.42, 0.95] },
    { id: "spotify", name: "Spotify", category: "smooth", value: [0.3, 0, 0, 1] },

    // === SNAPPY === Quick, responsive motion

    // Quart
    { id: "ease-in-quart", name: "Quart In", category: "snappy", value: [0.5, 0, 0.75, 0] },
    { id: "ease-out-quart", name: "Quart Out", category: "snappy", value: [0.25, 1, 0.5, 1] },
    { id: "ease-in-out-quart", name: "Quart In Out", category: "snappy", value: [0.76, 0, 0.24, 1] },

    // Quint
    { id: "ease-in-quint", name: "Quint In", category: "snappy", value: [0.64, 0, 0.78, 0] },
    { id: "ease-out-quint", name: "Quint Out", category: "snappy", value: [0.22, 1, 0.36, 1] },
    { id: "ease-in-out-quint", name: "Quint In Out", category: "snappy", value: [0.83, 0, 0.17, 1] },

    // Expo - dramatic
    { id: "ease-in-expo", name: "Expo In", category: "snappy", value: [0.7, 0, 0.84, 0] },
    { id: "ease-out-expo", name: "Expo Out", category: "snappy", value: [0.16, 1, 0.3, 1] },
    { id: "ease-in-out-expo", name: "Expo In Out", category: "snappy", value: [0.87, 0, 0.13, 1] },

    // UI snappy
    { id: "snap", name: "Snap", category: "snappy", value: [0.7, 0, 0.3, 1] },
    { id: "sharp", name: "Sharp", category: "snappy", value: [0.4, 0, 0.6, 1] },
    { id: "punch", name: "Punch", category: "snappy", value: [0.19, 1, 0.22, 1] },
    { id: "figma-quick", name: "Figma Quick", category: "snappy", value: [0.68, 0, 0.27, 1] },
    { id: "slack", name: "Slack", category: "snappy", value: [0.36, 0.07, 0.19, 0.97] },

    // === SPRING === Overshoot and bounce

    { id: "spring-soft", name: "Spring Soft", category: "spring", value: [0.5, 1.25, 0.5, 1] },
    { id: "spring-medium", name: "Spring Medium", category: "spring", value: [0.38, 1.4, 0.5, 1] },
    { id: "spring-snappy", name: "Spring Snappy", category: "spring", value: [0.25, 1.6, 0.5, 1] },
    { id: "spring-bouncy", name: "Spring Bouncy", category: "spring", value: [0.2, 1.85, 0.4, 1] },
    { id: "ios-spring", name: "iOS Spring", category: "spring", value: [0.5, 1.8, 0.5, 0.8] },
    { id: "pop", name: "Pop", category: "spring", value: [0.26, 1.7, 0.35, 0.9] },
    { id: "jelly", name: "Jelly", category: "spring", value: [0.3, 1.5, 0.5, 1.15] },
    { id: "discord-pop", name: "Discord Pop", category: "spring", value: [0.34, 1.56, 0.64, 1] },

    // === EXPRESSIVE === Playful, dramatic motion

    // Circ - circular feel
    { id: "ease-in-circ", name: "Circ In", category: "expressive", value: [0.55, 0, 1, 0.45] },
    { id: "ease-out-circ", name: "Circ Out", category: "expressive", value: [0, 0.55, 0.45, 1] },
    { id: "ease-in-out-circ", name: "Circ In Out", category: "expressive", value: [0.85, 0, 0.15, 1] },

    // Character
    { id: "overshoot", name: "Overshoot", category: "expressive", value: [0.34, 1.4, 0.64, 1] },
    { id: "anticipate", name: "Anticipate", category: "expressive", value: [0.6, -0.28, 0.74, 0.05] },
    { id: "wind-up", name: "Wind Up", category: "expressive", value: [0.68, -0.55, 0.27, 1.55] },
    { id: "rubber", name: "Rubber", category: "expressive", value: [0.175, 0.885, 0.32, 1.1] },
    { id: "swoosh", name: "Swoosh", category: "expressive", value: [0.55, 0.085, 0.68, 0.53] },
]
