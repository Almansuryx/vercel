"use clien```tsx file=\"remotion/components/Wireframe3D.tsx"
"use client"

import type React from "react"
import { useCurrentFrame } from "remotion"
import { interpolate, easing } from "../utils/animation-helpers"

interface Wireframe3DProps {
  shape?: "cube" | "pyramid" | "sphere" | "torus"
  size?: number
  color?: string
  startFrame?: number
  duration?: number
  rotationSpeed?: number
}

export const Wireframe3D: React.FC<Wireframe3DProps> = ({
  shape = "cube",
  size = 200,
  color = "#00FFFF",
  startFrame = 0,
  duration = 120,
  rotationSpeed = 1,
}) => {
  const frame = useCurrentFrame()
  const localFrame = Math.max(0, frame - startFrame)

  const rotationX = (localFrame * rotationSpeed) % 360
  const rotationY = (localFrame * rotationSpeed * 0.7) % 360

  const opacity = interpolate(localFrame, [0, 30], [0, 1], {
    easing: easing.easeOutExpo,
    extrapolateRight: "clamp",
  })

  const scale = interpolate(localFrame, [0, 30], [0, 1], {
    easing: easing.easeOutBack,
    extrapolateRight: "clamp",
  })

  const renderCube = () => {
    const s = size / 2
    // Define cube vertices
    const vertices = [
      [-s, -s, -s],
      [s, -s, -s],
      [s, s, -s],
      [-s, s, -s],
      [-s, -s, s],
      [s, -s, s],
      [s, s, s],
      [-s, s, s],
    ]

    // Define edges
    const edges = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0], // Back face
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4], // Front face
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7], // Connecting edges
    ]

    // Project 3D to 2D
    const project = (vertex: number[]) => {
      let [x, y, z] = vertex

      // Rotate around Y axis
      const cosY = Math.cos((rotationY * Math.PI) / 180)
      const sinY = Math.sin((rotationY * Math.PI) / 180)
      const tempX = x * cosY - z * sinY
      const tempZ = x * sinY + z * cosY
      x = tempX
      z = tempZ

      // Rotate around X axis
      const cosX = Math.cos((rotationX * Math.PI) / 180)
      const sinX = Math.sin((rotationX * Math.PI) / 180)
      const tempY = y * cosX - z * sinX
      z = y * sinX + z * cosX
      y = tempY

      // Perspective projection
      const perspective = 600
      const scale = perspective / (perspective + z)

      return {
        x: x * scale + size,
        y: y * scale + size,
      }
    }

    const projectedVertices = vertices.map(project)

    return edges.map(([start, end], i) => {
      const p1 = projectedVertices[start]
      const p2 = projectedVertices[end]

      const drawProgress = interpolate(localFrame, [i * 2, i * 2 + 15], [0, 1], {
        easing: easing.easeOutExpo,
        extrapolateRight: "clamp",
      })

      return (
        <line
          key={i}
          x1={p1.x}
          y1={p1.y}
          x2={p1.x + (p2.x - p1.x) * drawProgress}
          y2={p1.y + (p2.y - p1.y) * drawProgress}
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
        />
      )
    })
  }

  return (
    <svg
      width={size * 2}
      height={size * 2}
      style={{
        opacity,
        transform: `scale(${scale})`,
        filter: `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color})`,
      }}
    >
      {shape === "cube" && renderCube()}
    </svg>
  )
}
