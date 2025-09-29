"use client"

import type React from "react"
import { useCurrentFrame } from "remotion"
import { interpolate, easing } from "../utils/animation-helpers"

interface GeometricPatternProps {
  width: number
  height: number
  pattern?: "hexagons" | "triangles" | "circles" | "lines"
  color?: string
  startFrame?: number
  duration?: number
  animated?: boolean
}

export const GeometricPattern: React.FC<GeometricPatternProps> = ({
  width,
  height,
  pattern = "hexagons",
  color = "#00FFFF",
  startFrame = 0,
  duration = 90,
  animated = true,
}) => {
  const frame = useCurrentFrame()
  const localFrame = Math.max(0, frame - startFrame)

  const renderHexagons = () => {
    const hexSize = 40
    const hexHeight = hexSize * Math.sqrt(3)
    const hexWidth = hexSize * 2
    const shapes: React.ReactNode[] = []

    for (let row = 0; row < height / hexHeight + 2; row++) {
      for (let col = 0; col < width / hexWidth + 2; col++) {
        const x = col * hexWidth * 0.75
        const y = row * hexHeight + (col % 2 === 0 ? 0 : hexHeight / 2)

        const delay = (row + col) * 2
        const opacity = animated
          ? interpolate(localFrame, [delay, delay + 20], [0, 0.3], {
              easing: easing.easeOutExpo,
              extrapolateRight: "clamp",
            })
          : 0.3

        const scale = animated
          ? interpolate(localFrame, [delay, delay + 20], [0, 1], {
              easing: easing.easeOutBack,
              extrapolateRight: "clamp",
            })
          : 1

        // Hexagon points
        const points = Array.from({ length: 6 }, (_, i) => {
          const angle = (Math.PI / 3) * i
          const px = x + hexSize * Math.cos(angle)
          const py = y + hexSize * Math.sin(angle)
          return `${px},${py}`
        }).join(" ")

        shapes.push(
          <polygon
            key={`${row}-${col}`}
            points={points}
            fill="none"
            stroke={color}
            strokeWidth={1}
            opacity={opacity}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: `${x}px ${y}px`,
            }}
          />,
        )
      }
    }

    return shapes
  }

  const renderTriangles = () => {
    const triSize = 60
    const shapes: React.ReactNode[] = []

    for (let row = 0; row < height / triSize + 2; row++) {
      for (let col = 0; col < width / triSize + 2; col++) {
        const x = col * triSize
        const y = row * triSize

        const delay = (row + col) * 2
        const opacity = animated
          ? interpolate(localFrame, [delay, delay + 20], [0, 0.4], {
              easing: easing.easeOutExpo,
              extrapolateRight: "clamp",
            })
          : 0.4

        const isUpward = (row + col) % 2 === 0

        const points = isUpward
          ? `${x},${y + triSize} ${x + triSize / 2},${y} ${x + triSize},${y + triSize}`
          : `${x},${y} ${x + triSize},${y} ${x + triSize / 2},${y + triSize}`

        shapes.push(
          <polygon
            key={`${row}-${col}`}
            points={points}
            fill="none"
            stroke={color}
            strokeWidth={1}
            opacity={opacity}
          />,
        )
      }
    }

    return shapes
  }

  const renderCircles = () => {
    const circleSize = 50
    const shapes: React.ReactNode[] = []

    for (let row = 0; row < height / circleSize + 2; row++) {
      for (let col = 0; col < width / circleSize + 2; col++) {
        const x = col * circleSize + circleSize / 2
        const y = row * circleSize + circleSize / 2

        const delay = (row + col) * 2
        const radius = animated
          ? interpolate(localFrame, [delay, delay + 20], [0, circleSize / 3], {
              easing: easing.easeOutExpo,
              extrapolateRight: "clamp",
            })
          : circleSize / 3

        const opacity = animated
          ? interpolate(localFrame, [delay, delay + 20], [0, 0.3], {
              easing: easing.easeOutExpo,
              extrapolateRight: "clamp",
            })
          : 0.3

        shapes.push(
          <circle
            key={`${row}-${col}`}
            cx={x}
            cy={y}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={1}
            opacity={opacity}
          />,
        )
      }
    }

    return shapes
  }

  return (
    <svg
      width={width}
      height={height}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
      }}
    >
      {pattern === "hexagons" && renderHexagons()}
      {pattern === "triangles" && renderTriangles()}
      {pattern === "circles" && renderCircles()}
    </svg>
  )
}
