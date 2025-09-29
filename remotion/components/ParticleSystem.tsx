"use client"

import React from "react"

import { useCurrentFrame } from "remotion"
import { interpolate } from "../utils/animation-helpers"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
}

interface ParticleSystemProps {
  width: number
  height: number
  particleCount?: number
  colors?: string[]
  startFrame?: number
  speed?: number
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  width,
  height,
  particleCount = 50,
  colors = ["#00FFFF", "#FF00FF", "#FF6B35", "#CCFF00"],
  startFrame = 0,
  speed = 1,
}) => {
  const frame = useCurrentFrame()
  const localFrame = Math.max(0, frame - startFrame)

  // Generate particles
  const particles: Particle[] = React.useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
  }, [particleCount, width, height, speed, colors])

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
      {particles.map((particle) => {
        const x = (particle.x + particle.vx * localFrame) % width
        const y = (particle.y + particle.vy * localFrame) % height

        const opacity = interpolate(localFrame, [0, 30], [0, 0.6], {
          extrapolateRight: "clamp",
        })

        return (
          <circle
            key={particle.id}
            cx={x}
            cy={y}
            r={particle.size}
            fill={particle.color}
            opacity={opacity}
            style={{
              filter: `drop-shadow(0 0 ${particle.size * 2}px ${particle.color})`,
            }}
          />
        )
      })}
    </svg>
  )
}
