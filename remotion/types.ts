import type React from "react"
// Type definitions for Elsadeeq Creative Studio

export interface VideoComposition {
  id: string
  component: React.ComponentType<any>
  durationInFrames: number
  fps: number
  width: number
  height: number
  defaultProps?: Record<string, any>
}

export interface AnimationProps {
  frame: number
  fps: number
  durationInFrames: number
}

export interface BrandConfig {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  logo?: string
  fontFamily?: string
}

export interface CodeBlockProps {
  code: string
  language: string
  highlightLines?: number[]
  showLineNumbers?: boolean
  theme?: "dark" | "light"
}

export interface TerminalProps {
  commands: Array<{
    input: string
    output?: string
    delay?: number
  }>
  prompt?: string
}

export interface GeometricShape {
  type: "line" | "circle" | "polygon" | "curve"
  points?: Array<{ x: number; y: number }>
  color: string
  strokeWidth?: number
  animated?: boolean
}

export interface ParticleConfig {
  count: number
  color: string
  size: number
  speed: number
  direction?: "up" | "down" | "left" | "right" | "random"
}
