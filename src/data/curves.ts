import type { EasingCurve } from "../types"

// Curves sourced from https://easings.net
// Excludes: Linear, Ease In, Ease Out, Ease In Out, Back In, Back Out, Back In Out (already in Framer)
export const curves: EasingCurve[] = [
    // Standard CSS
    { id: "ease", name: "Ease", category: "standard", value: [0.25, 0.1, 0.25, 1] },

    // Sine - gentle, smooth curves
    { id: "ease-in-sine", name: "Ease In Sine", category: "smooth", value: [0.12, 0, 0.39, 0] },
    { id: "ease-out-sine", name: "Ease Out Sine", category: "smooth", value: [0.61, 1, 0.88, 1] },
    { id: "ease-in-out-sine", name: "Ease In Out Sine", category: "smooth", value: [0.37, 0, 0.63, 1] },

    // Quad - smooth acceleration
    { id: "ease-in-quad", name: "Ease In Quad", category: "smooth", value: [0.11, 0, 0.5, 0] },
    { id: "ease-out-quad", name: "Ease Out Quad", category: "smooth", value: [0.5, 1, 0.89, 1] },
    { id: "ease-in-out-quad", name: "Ease In Out Quad", category: "smooth", value: [0.45, 0, 0.55, 1] },

    // Cubic - balanced curves
    { id: "ease-in-cubic", name: "Ease In Cubic", category: "smooth", value: [0.32, 0, 0.67, 0] },
    { id: "ease-out-cubic", name: "Ease Out Cubic", category: "smooth", value: [0.33, 1, 0.68, 1] },
    { id: "ease-in-out-cubic", name: "Ease In Out Cubic", category: "smooth", value: [0.65, 0, 0.35, 1] },

    // Quart - snappy, responsive
    { id: "ease-in-quart", name: "Ease In Quart", category: "snappy", value: [0.5, 0, 0.75, 0] },
    { id: "ease-out-quart", name: "Ease Out Quart", category: "snappy", value: [0.25, 1, 0.5, 1] },
    { id: "ease-in-out-quart", name: "Ease In Out Quart", category: "snappy", value: [0.76, 0, 0.24, 1] },

    // Quint - very snappy
    { id: "ease-in-quint", name: "Ease In Quint", category: "snappy", value: [0.64, 0, 0.78, 0] },
    { id: "ease-out-quint", name: "Ease Out Quint", category: "snappy", value: [0.22, 1, 0.36, 1] },
    { id: "ease-in-out-quint", name: "Ease In Out Quint", category: "snappy", value: [0.83, 0, 0.17, 1] },

    // Expo - dramatic, punchy
    { id: "ease-in-expo", name: "Ease In Expo", category: "snappy", value: [0.7, 0, 0.84, 0] },
    { id: "ease-out-expo", name: "Ease Out Expo", category: "snappy", value: [0.16, 1, 0.3, 1] },
    { id: "ease-in-out-expo", name: "Ease In Out Expo", category: "snappy", value: [0.87, 0, 0.13, 1] },

    // Circ - circular motion feel
    { id: "ease-in-circ", name: "Ease In Circ", category: "expressive", value: [0.55, 0, 1, 0.45] },
    { id: "ease-out-circ", name: "Ease Out Circ", category: "expressive", value: [0, 0.55, 0.45, 1] },
    { id: "ease-in-out-circ", name: "Ease In Out Circ", category: "expressive", value: [0.85, 0, 0.15, 1] },

    // Spring-like (custom curves that feel bouncy)
    { id: "spring-soft", name: "Spring Soft", category: "spring", value: [0.5, 1.25, 0.5, 1] },
    { id: "spring-medium", name: "Spring Medium", category: "spring", value: [0.38, 1.4, 0.5, 1] },
    { id: "spring-snappy", name: "Spring Snappy", category: "spring", value: [0.25, 1.6, 0.5, 1] },
    { id: "spring-bouncy", name: "Spring Bouncy", category: "spring", value: [0.2, 1.85, 0.4, 1] },

    // Material Design
    { id: "material-standard", name: "Material Standard", category: "smooth", value: [0.2, 0, 0, 1] },
    { id: "material-decelerate", name: "Material Decel", category: "smooth", value: [0, 0, 0.2, 1] },
    { id: "material-accelerate", name: "Material Accel", category: "snappy", value: [0.4, 0, 1, 1] },

    // Apple/iOS
    { id: "ios-spring", name: "iOS Spring", category: "spring", value: [0.5, 1.8, 0.5, 0.8] },
    { id: "ios-ease", name: "iOS Ease", category: "smooth", value: [0.25, 0.46, 0.45, 0.94] },

    // Popular UI
    { id: "smooth-out", name: "Smooth Out", category: "smooth", value: [0.4, 0, 0.2, 1] },
    { id: "snap", name: "Snap", category: "snappy", value: [0.7, 0, 0.3, 1] },
    { id: "soft", name: "Soft", category: "smooth", value: [0.4, 0.4, 0.2, 1] },
    { id: "sharp", name: "Sharp", category: "snappy", value: [0.4, 0, 0.6, 1] },

    // Elastic/Playful
    { id: "elastic-out", name: "Elastic Out", category: "spring", value: [0.5, 1.5, 0.5, 1] },
    { id: "overshoot", name: "Overshoot", category: "expressive", value: [0.34, 1.4, 0.64, 1] },
    { id: "punch", name: "Punch", category: "snappy", value: [0.19, 1, 0.22, 1] },

    // Anticipation
    { id: "anticipate", name: "Anticipate", category: "expressive", value: [0.6, -0.28, 0.74, 0.05] },
    { id: "wind-up", name: "Wind Up", category: "expressive", value: [0.68, -0.55, 0.27, 1.55] },
]
