"use client"

import type React from "react"
import { useCurrentFrame } from "remotion"
import { interpolate, easing } from "../utils/animation-helpers"

interface TextRevealProps {
  text: string
  startFrame?: number
  duration?: number
  fontSize?: number
  color?: string
  revealDirection?: "left" | "right" | "top" | "bottom" | "center"
  fontWeight?: string | number
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  startFrame = 0,
  duration = 40,
  fontSize = 64,
  color = "#FFFFFF",
  revealDirection = "left",
  fontWeight = "bold",
}) => {
  const frame = useCurrentFrame()
  const localFrame = Math.max(0, frame - startFrame)

  const progress = interpolate(localFrame, [0, duration], [0, 100], {
    easing: easing.easeOutExpo,
    extrapolateRight: "clamp",
  })

  const getClipPath = () => {
    switch (revealDirection) {
      case "left":
        return `inset(0 ${100 - progress}% 0 0)`
      case "right":
        return `inset(0 0 0 ${100 - progress}%)`
      case "top":
        return `inset(0 0 ${100 - progress}% 0)`
      case "bottom":
        return `inset(${100 - progress}% 0 0 0)`
      case "center":
        return `inset(0 ${(100 - progress) / 2}%)`
      default:
        return `inset(0 ${100 - progress}% 0 0)`
    }
  }

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Background text (outline) */}
      <div
        style={{
          fontSize,
          fontWeight,
          fontFamily: "monospace",
          color: "transparent",
          WebkitTextStroke: `2px ${color}`,
          opacity: 0.3,
        }}
      >
        {text}
      </div>

      {/* Revealed text */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          fontSize,
          fontWeight,
          fontFamily: "monospace",
          color,
          clipPath: getClipPath(),
          textShadow: `0 0 20px ${color}, 0 0 40px ${color}`,
        }}
      >
        {text}
      </div>
    </div>
  )
}
