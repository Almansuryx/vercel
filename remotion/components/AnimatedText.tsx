"use client"

import type React from "react"
import { useCurrentFrame } from "remotion"
import { interpolate, easing } from "../utils/animation-helpers"
import { neonTextGlow } from "../utils/color-helpers"

interface AnimatedTextProps {
  text: string
  startFrame?: number
  duration?: number
  style?: "fade" | "slide" | "scale" | "typewriter" | "glitch"
  color?: string
  fontSize?: number
  glow?: boolean
  className?: string
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  startFrame = 0,
  duration = 30,
  style = "fade",
  color = "#00FFFF",
  fontSize = 48,
  glow = true,
  className = "",
}) => {
  const frame = useCurrentFrame()
  const localFrame = Math.max(0, frame - startFrame)

  // Calculate animation values based on style
  let opacity = 1
  let translateY = 0
  let translateX = 0
  let scale = 1
  let visibleChars = text.length

  if (localFrame < duration) {
    const progress = localFrame / duration

    switch (style) {
      case "fade":
        opacity = interpolate(localFrame, [0, duration], [0, 1], { easing: easing.easeOutExpo })
        break

      case "slide":
        opacity = interpolate(localFrame, [0, duration * 0.5], [0, 1], { easing: easing.easeOutExpo })
        translateY = interpolate(localFrame, [0, duration], [50, 0], { easing: easing.easeOutExpo })
        break

      case "scale":
        opacity = interpolate(localFrame, [0, duration * 0.5], [0, 1], { easing: easing.easeOutExpo })
        scale = interpolate(localFrame, [0, duration], [0.5, 1], { easing: easing.easeOutBack })
        break

      case "typewriter":
        visibleChars = Math.floor(interpolate(localFrame, [0, duration], [0, text.length]))
        break

      case "glitch":
        opacity = interpolate(localFrame, [0, duration * 0.3], [0, 1])
        translateX = Math.sin(localFrame * 0.5) * (1 - progress) * 5
        break
    }
  }

  const displayText = style === "typewriter" ? text.slice(0, visibleChars) : text

  return (
    <div
      className={className}
      style={{
        opacity,
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        color,
        fontSize: `${fontSize}px`,
        fontFamily: "monospace",
        fontWeight: "bold",
        ...(glow ? neonTextGlow(color) : {}),
      }}
    >
      {displayText}
      {style === "typewriter" && visibleChars < text.length && (
        <span
          style={{
            animation: "blink 1s infinite",
            marginLeft: "2px",
          }}
        >
          |
        </span>
      )}
    </div>
  )
}
