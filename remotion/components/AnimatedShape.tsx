"use client"

import type React from "react"
import { useCurrentFrame } from "remotion"
import { interpolate, easing } from "../utils/animation-helpers"

interface AnimatedShapeProps {
  type: "line" | "circle" | "rect" | "polygon"
  color?: string
  strokeWidth?: number
  startFrame?: number
  duration?: number
  animationType?: "draw" | "fade" | "scale" | "rotate"
  glow?: boolean
  // Shape-specific props
  x1?: number
  y1?: number
  x2?: number
  y2?: number
  cx?: number
  cy?: number
  r?: number
  width?: number
  height?: number
  points?: string
}

export const AnimatedShape: React.FC<AnimatedShapeProps> = ({
  type,
  color = "#00FFFF",
  strokeWidth = 2,
  startFrame = 0,
  duration = 30,
  animationType = "draw",
  glow = true,
  ...shapeProps
}) => {
  const frame = useCurrentFrame()
  const localFrame = Math.max(0, frame - startFrame)

  let opacity = 1
  let strokeDashoffset = 0
  let scale = 1
  let rotation = 0

  if (localFrame < duration) {
    const progress = localFrame / duration

    switch (animationType) {
      case "draw":
        strokeDashoffset = interpolate(localFrame, [0, duration], [1000, 0], { easing: easing.easeOutExpo })
        break

      case "fade":
        opacity = interpolate(localFrame, [0, duration], [0, 1], { easing: easing.easeOutExpo })
        break

      case "scale":
        scale = interpolate(localFrame, [0, duration], [0, 1], { easing: easing.easeOutBack })
        break

      case "rotate":
        rotation = interpolate(localFrame, [0, duration], [0, 360], { easing: easing.easeInOutCubic })
        break
    }
  }

  const glowFilter = glow
    ? `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color}) drop-shadow(0 0 30px ${color})`
    : "none"

  const commonProps = {
    stroke: color,
    strokeWidth,
    fill: "none",
    opacity,
    style: {
      filter: glowFilter,
      transform: `scale(${scale}) rotate(${rotation}deg)`,
      transformOrigin: "center",
    },
    ...(animationType === "draw" && {
      strokeDasharray: 1000,
      strokeDashoffset,
    }),
  }

  switch (type) {
    case "line":
      return <line {...commonProps} {...shapeProps} />

    case "circle":
      return <circle {...commonProps} {...shapeProps} />

    case "rect":
      return <rect {...commonProps} {...shapeProps} />

    case "polygon":
      return <polygon {...commonProps} {...shapeProps} />

    default:
      return null
  }
}
