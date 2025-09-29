// Brand configuration system for full customization

export interface BrandConfiguration {
  // Visual Identity
  logo?: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }

  // Typography
  fonts: {
    heading: string
    body: string
  }

  // Animation Preferences
  animationSpeed?: "slow" | "normal" | "fast"
  transitionStyle?: "smooth" | "snappy" | "bouncy"

  // Content
  companyName?: string
  tagline?: string
  socialHandles?: {
    twitter?: string
    instagram?: string
    linkedin?: string
    website?: string
  }
}

export const DEFAULT_BRAND_CONFIG: BrandConfiguration = {
  colors: {
    primary: "#00FFFF",
    secondary: "#FF00FF",
    accent: "#FF6B35",
    background: "#000000",
    text: "#FFFFFF",
  },
  fonts: {
    heading: "monospace",
    body: "monospace",
  },
  animationSpeed: "normal",
  transitionStyle: "smooth",
  companyName: "Elsadeeq Creative Studio",
  tagline: "code + art",
}

/**
 * Get animation duration multiplier based on speed preference
 */
export function getAnimationSpeedMultiplier(speed: BrandConfiguration["animationSpeed"]): number {
  switch (speed) {
    case "slow":
      return 1.5
    case "fast":
      return 0.7
    case "normal":
    default:
      return 1
  }
}

/**
 * Get easing function based on transition style
 */
export function getTransitionEasing(style: BrandConfiguration["transitionStyle"]) {
  switch (style) {
    case "snappy":
      return { damping: 30, stiffness: 150 }
    case "bouncy":
      return { damping: 15, stiffness: 100 }
    case "smooth":
    default:
      return { damping: 20, stiffness: 100 }
  }
}
