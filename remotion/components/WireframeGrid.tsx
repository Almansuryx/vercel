"use client"

import type React from "react"
import { useCurrentFrame } from "remotion"
import { interpolate, easing } from "../utils/animation-helpers"
import { AnimatedShape } from "./AnimatedShape"

interface WireframeGridProps {
  width: number
  height: number
  gridSize?: number
  color?: string
  startFrame?: number
  duration?: number
  perspective?: boolean
}

export const WireframeGrid: React.FC<WireframeGridProps> = ({
  width,
  height,
  gridSize = 50,
  color = "#00FFFF",
  startFrame = 0,
  duration = 60,
  perspective = true,
}) => {
  const frame = useCurrentFrame()
  const localFrame = Math.max(0, frame - startFrame)

  const opacity = interpolate(localFrame, [0, duration * 0.3], [0, 0.3], {
    easing: easing.easeOutExpo,
    extrapolateRight: "clamp",
  })

  const perspectiveY = perspective
    ? interpolate(localFrame, [0, duration], [0, 200], {
        easing: easing.easeInOutCubic,
        extrapolateRight: "clamp",
      })
    : 0

  const lines: React.ReactNode[] = []

  // Horizontal lines
  for (let y = 0; y <= height; y += gridSize) {
    const adjustedY = perspective ? y + (y / height) * perspectiveY : y
    lines.push(
      <AnimatedShape
        key={`h-${y}`}
        type="line"
        x1={0}
        y1={adjustedY}
        x2={width}
        y2={adjustedY}
        color={color}
        strokeWidth={1}
        startFrame={startFrame + y / 10}
        duration={20}
        animationType="draw"
        glow={false}
      />,
    )
  }

  // Vertical lines
  for (let x = 0; x <= width; x += gridSize) {
    lines.push(
      <AnimatedShape
        key={`v-${x}`}
        type="line"
        x1={x}
        y1={0}
        x2={x}
        y2={height}
        color={color}
        strokeWidth={1}
        startFrame={startFrame + x / 10}
        duration={20}
        animationType="draw"
        glow={false}
      />,
    )
  }

  return (
    <svg
      width={width}
      height={height}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        opacity,
      }}
    >
      {lines}
    </svg>
  )
}
