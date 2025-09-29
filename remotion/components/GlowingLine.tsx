"use client"

import type React from "react"
import { useCurrentFrame } from "remotion"
import { interpolate, easing } from "../utils/animation-helpers"

interface GlowingLineProps {
  x1: number
  y1: number
  x2: number
  y2: number
  color?: string
  strokeWidth?: number
  startFrame?: number
  duration?: number
  glowIntensity?: number
}

export const GlowingLine: React.FC<GlowingLineProps> = ({
  x1,
  y1,
  x2,
  y2,
  color = "#00FFFF",
  strokeWidth = 2,
  startFrame = 0,
  duration = 30,
  glowIntensity = 1,
}) => {
  const frame = useCurrentFrame()
  const localFrame = Math.max(0, frame - startFrame)

  const drawProgress = interpolate(localFrame, [0, duration], [0, 1], {
    easing: easing.easeOutExpo,
    extrapolateRight: "clamp",
  })

  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  const currentX2 = x1 + (x2 - x1) * drawProgress
  const currentY2 = y1 + (y2 - y1) * drawProgress

  return (
    <line
      x1={x1}
      y1={y1}
      x2={currentX2}
      y2={currentY2}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      style={{
        filter: `
          drop-shadow(0 0 ${10 * glowIntensity}px ${color})
          drop-shadow(0 0 ${20 * glowIntensity}px ${color})
          drop-shadow(0 0 ${30 * glowIntensity}px ${color})
        `,
      }}
    />
  )
}
