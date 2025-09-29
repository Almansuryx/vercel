"use client"

import type React from "react"
import { useCurrentFrame } from "remotion"
import { interpolate, easing, stagger } from "../utils/animation-helpers"
import { neonTextGlow } from "../utils/color-helpers"

interface KineticTypographyProps {
  text: string
  startFrame?: number
  duration?: number
  fontSize?: number
  color?: string
  animationStyle?: "wave" | "explode" | "rotate" | "bounce" | "glitch"
  staggerDelay?: number
}

export const KineticTypography: React.FC<KineticTypographyProps> = ({
  text,
  startFrame = 0,
  duration = 60,
  fontSize = 72,
  color = "#00FFFF",
  animationStyle = "wave",
  staggerDelay = 2,
}) => {
  const frame = useCurrentFrame()
  const localFrame = Math.max(0, frame - startFrame)

  const letters = text.split("")

  const getLetterStyle = (index: number): React.CSSProperties => {
    const letterStartFrame = stagger(index, staggerDelay)
    const letterLocalFrame = Math.max(0, localFrame - letterStartFrame)

    let translateX = 0
    let translateY = 0
    let rotate = 0
    let scale = 1
    let opacity = 1

    if (letterLocalFrame < duration) {
      const progress = letterLocalFrame / duration

      switch (animationStyle) {
        case "wave":
          translateY = Math.sin(progress * Math.PI * 2 + index * 0.5) * 20 * (1 - progress)
          opacity = interpolate(letterLocalFrame, [0, duration * 0.3], [0, 1], {
            easing: easing.easeOutExpo,
            extrapolateRight: "clamp",
          })
          break

        case "explode":
          const angle = (index / letters.length) * Math.PI * 2
          const distance = interpolate(letterLocalFrame, [0, duration * 0.5], [0, 100], {
            easing: easing.easeOutExpo,
            extrapolateRight: "clamp",
          })
          translateX = Math.cos(angle) * distance * (1 - progress)
          translateY = Math.sin(angle) * distance * (1 - progress)
          opacity = interpolate(letterLocalFrame, [0, duration * 0.2], [0, 1], {
            extrapolateRight: "clamp",
          })
          break

        case "rotate":
          rotate = interpolate(letterLocalFrame, [0, duration], [0, 360], {
            easing: easing.easeOutExpo,
            extrapolateRight: "clamp",
          })
          scale = interpolate(letterLocalFrame, [0, duration * 0.3], [0, 1], {
            easing: easing.easeOutBack,
            extrapolateRight: "clamp",
          })
          break

        case "bounce":
          const bounceProgress = Math.min(1, progress * 2)
          translateY = Math.abs(Math.sin(bounceProgress * Math.PI * 3)) * 50 * (1 - bounceProgress)
          scale = interpolate(letterLocalFrame, [0, duration * 0.2], [0, 1], {
            easing: easing.easeOutBack,
            extrapolateRight: "clamp",
          })
          break

        case "glitch":
          translateX = (Math.random() - 0.5) * 10 * (1 - progress)
          translateY = (Math.random() - 0.5) * 10 * (1 - progress)
          opacity = Math.random() > 0.3 ? 1 : 0.5
          break
      }
    }

    return {
      display: "inline-block",
      transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scale})`,
      opacity,
      transition: animationStyle === "glitch" ? "none" : "transform 0.1s ease-out",
    }
  }

  return (
    <div
      style={{
        fontSize,
        fontWeight: "bold",
        fontFamily: "monospace",
        color,
        ...neonTextGlow(color),
        whiteSpace: "pre",
      }}
    >
      {letters.map((letter, index) => (
        <span key={index} style={getLetterStyle(index)}>
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </div>
  )
}
