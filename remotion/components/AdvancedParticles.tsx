"use client"

import React from "react"
import { useCurrentFrame } from "remotion"
import { interpolate, easing } from "../utils/animation-helpers"

interface AdvancedParticlesProps {
  width: number
  height: number
  particleCount?: number
  colors?: string[]
  startFrame?: number
  behavior?: "float" | "explode" | "orbit" | "wave" | "connect"
  centerX?: number
  centerY?: number
}

export const AdvancedParticles: React.FC<AdvancedParticlesProps> = ({
  width,
  height,
  particleCount = 100,
  colors = ["#00FFFF", "#FF00FF", "#FF6B35", "#CCFF00"],
  startFrame = 0,
  behavior = "float",
  centerX = width / 2,
  centerY = height / 2,
}) => {
  const frame = useCurrentFrame()
  const localFrame = Math.max(0, frame - startFrame)

  const particles = React.useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      angle: (i / particleCount) * Math.PI * 2,
      distance: Math.random() * 200 + 50,
      speed: Math.random() * 2 + 0.5,
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      phase: Math.random() * Math.PI * 2,
    }))
  }, [particleCount, colors])

  const getParticlePosition = (particle: (typeof particles)[0]) => {
    let x = 0
    let y = 0

    switch (behavior) {
      case "float":
        x = centerX + Math.sin(localFrame * 0.02 * particle.speed + particle.phase) * particle.distance
        y = centerY + Math.cos(localFrame * 0.02 * particle.speed + particle.phase) * particle.distance
        break

      case "explode":
        const explodeProgress = Math.min(1, localFrame / 60)
        x = centerX + Math.cos(particle.angle) * particle.distance * explodeProgress
        y = centerY + Math.sin(particle.angle) * particle.distance * explodeProgress
        break

      case "orbit":
        const orbitAngle = particle.angle + localFrame * 0.02 * particle.speed
        x = centerX + Math.cos(orbitAngle) * particle.distance
        y = centerY + Math.sin(orbitAngle) * particle.distance
        break

      case "wave":
        x = (particle.id / particleCount) * width
        y = centerY + Math.sin(localFrame * 0.05 + particle.id * 0.2) * 100
        break

      case "connect":
        x = centerX + Math.cos(particle.angle) * particle.distance
        y = centerY + Math.sin(particle.angle) * particle.distance
        break
    }

    return { x, y }
  }

  const opacity = interpolate(localFrame, [0, 30], [0, 1], {
    easing: easing.easeOutExpo,
    extrapolateRight: "clamp",
  })

  return (
    <svg
      width={width}
      height={height}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <filter id="particleGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connection lines for "connect" behavior */}
      {behavior === "connect" &&
        particles.map((particle, i) => {
          const pos1 = getParticlePosition(particle)
          const nextParticle = particles[(i + 1) % particles.length]
          const pos2 = getParticlePosition(nextParticle)

          return (
            <line
              key={`line-${i}`}
              x1={pos1.x}
              y1={pos1.y}
              x2={pos2.x}
              y2={pos2.y}
              stroke={particle.color}
              strokeWidth={0.5}
              opacity={0.3}
            />
          )
        })}

      {/* Particles */}
      {particles.map((particle) => {
        const { x, y } = getParticlePosition(particle)

        return (
          <circle key={particle.id} cx={x} cy={y} r={particle.size} fill={particle.color} filter="url(#particleGlow)" />
        )
      })}
    </svg>
  )
}
