import type React from "react"
// Color manipulation utilities for neon effects

import { BRAND_COLORS } from "../config"

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : null
}

/**
 * Add glow effect to color
 */
export function addGlow(color: string, intensity = 1): string {
  const rgb = hexToRgb(color)
  if (!rgb) return color

  return `
    drop-shadow(0 0 ${10 * intensity}px ${color})
    drop-shadow(0 0 ${20 * intensity}px ${color})
    drop-shadow(0 0 ${30 * intensity}px ${color})
  `
}

/**
 * Create gradient string
 */
export function createGradient(
  colors: string[],
  direction: "horizontal" | "vertical" | "diagonal" = "horizontal",
): string {
  const angle = direction === "horizontal" ? "90deg" : direction === "vertical" ? "180deg" : "135deg"
  return `linear-gradient(${angle}, ${colors.join(", ")})`
}

/**
 * Animate color between two values
 */
export function interpolateColor(progress: number, colorA: string, colorB: string): string {
  const rgbA = hexToRgb(colorA)
  const rgbB = hexToRgb(colorB)

  if (!rgbA || !rgbB) return colorA

  const r = Math.round(rgbA.r + (rgbB.r - rgbA.r) * progress)
  const g = Math.round(rgbA.g + (rgbB.g - rgbA.g) * progress)
  const b = Math.round(rgbA.b + (rgbB.b - rgbA.b) * progress)

  return `rgb(${r}, ${g}, ${b})`
}

/**
 * Get random neon color from brand palette
 */
export function getRandomNeonColor(): string {
  const colors = Object.values(BRAND_COLORS).filter((c) => c !== BRAND_COLORS.black && c !== BRAND_COLORS.darkGray)
  return colors[Math.floor(Math.random() * colors.length)]
}

/**
 * Create text stroke effect
 */
export function textStroke(color: string, width = 1): React.CSSProperties {
  return {
    WebkitTextStroke: `${width}px ${color}`,
    WebkitTextFillColor: "transparent",
    paintOrder: "stroke fill",
  }
}

/**
 * Create neon text glow effect
 */
export function neonTextGlow(color: string): React.CSSProperties {
  return {
    textShadow: `
      0 0 10px ${color},
      0 0 20px ${color},
      0 0 30px ${color},
      0 0 40px ${color}
    `,
  }
}
