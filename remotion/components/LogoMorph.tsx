"use client"

import type React from "react"
import { useCurrentFrame } from "remotion"
import { interpolate, easing } from "../utils/animation-helpers"
import { BRAND_COLORS } from "../config"

interface LogoMorphProps {
  startFrame?: number
  duration?: number
  size?: number
  primaryColor?: string
  secondaryColor?: string
}

export const LogoMorph: React.FC<LogoMorphProps> = ({
  startFrame = 0,
  duration = 90,
  size = 200,
  primaryColor = BRAND_COLORS.neonCyan,
  secondaryColor = BRAND_COLORS.neonMagenta,
}) => {
  const frame = useCurrentFrame()
  const localFrame = Math.max(0, frame - startFrame)

  // Animation phases
  const phase1 = interpolate(localFrame, [0, 30], [0, 1], {
    easing: easing.easeOutExpo,
    extrapolateRight: "clamp",
  })

  const phase2 = interpolate(localFrame, [30, 60], [0, 1], {
    easing: easing.easeInOutCubic,
    extrapolateRight: "clamp",
  })

  const phase3 = interpolate(localFrame, [60, 90], [0, 1], {
    easing: easing.easeOutBack,
    extrapolateRight: "clamp",
  })

  // Rotation and scale
  const rotation = interpolate(localFrame, [0, duration], [0, 360], {
    extrapolateRight: "clamp",
  })

  const scale = interpolate(localFrame, [0, 30], [0, 1], {
    easing: easing.easeOutBack,
    extrapolateRight: "clamp",
  })

  // Morph between shapes
  const morphProgress = interpolate(localFrame, [30, 60], [0, 1], {
    easing: easing.easeInOutCubic,
    extrapolateRight: "clamp",
  })

  // Glow intensity
  const glowIntensity = interpolate(localFrame, [60, 90], [1, 3], {
    extrapolateRight: "clamp",
  })

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={{
        transform: `scale(${scale}) rotate(${rotation * 0.2}deg)`,
      }}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={secondaryColor} />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation={4 * glowIntensity} result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer ring */}
      <circle
        cx="100"
        cy="100"
        r={80 * phase1}
        fill="none"
        stroke="url(#logoGradient)"
        strokeWidth={3}
        filter="url(#glow)"
        strokeDasharray={`${500 * phase1} 500`}
      />

      {/* Inner geometric shape - morphs from triangle to hexagon */}
      <polygon
        points={
          morphProgress < 0.5
            ? // Triangle
              `100,${40 + 20 * phase2} ${140 - 40 * phase2},${140 - 20 * phase2} ${60 + 40 * phase2},${140 - 20 * phase2}`
            : // Hexagon
              `100,40 140,70 140,130 100,160 60,130 60,70`
        }
        fill="none"
        stroke={primaryColor}
        strokeWidth={2}
        filter="url(#glow)"
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: "100px 100px",
        }}
      />

      {/* Center dot */}
      <circle cx="100" cy="100" r={8 * phase3} fill={secondaryColor} filter="url(#glow)" />

      {/* Orbiting particles */}
      {[0, 120, 240].map((angle, i) => {
        const orbitAngle = angle + rotation * 2
        const orbitRadius = 60
        const x = 100 + orbitRadius * Math.cos((orbitAngle * Math.PI) / 180)
        const y = 100 + orbitRadius * Math.sin((orbitAngle * Math.PI) / 180)

        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={4 * phase3}
            fill={i % 2 === 0 ? primaryColor : secondaryColor}
            filter="url(#glow)"
          />
        )
      })}
    </svg>
  )
}
