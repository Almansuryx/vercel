"use client"

import { useCurrentFrame } from "remotion"
import { interpolate, easing } from "../utils/animation-helpers"
import React from "react"

interface PathAnimationProps {
  path: string
  color?: string
  strokeWidth?: number
  startFrame?: number
  duration?: number
  showParticle?: boolean
  particleColor?: string
}

export const PathAnimation: React.FC<PathAnimationProps> = ({
  path,
  color = "#00FFFF",
  strokeWidth = 3,
  startFrame = 0,
  duration = 60,
  showParticle = true,
  particleColor = "#FF00FF",
}) => {
  const frame = useCurrentFrame()
  const localFrame = Math.max(0, frame - startFrame)

  const drawProgress = interpolate(localFrame, [0, duration], [0, 1], {
    easing: easing.easeInOutCubic,
    extrapolateRight: "clamp",
  })

  const pathRef = React.useRef<SVGPathElement>(null)
  const [pathLength, setPathLength] = React.useState(0)
  const [particlePos, setParticlePos] = React.useState({ x: 0, y: 0 })

  React.useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength()
      setPathLength(length)
    }
  }, [path])

  React.useEffect(() => {
    if (pathRef.current && pathLength > 0) {
      const point = pathRef.current.getPointAtLength(pathLength * drawProgress)
      setParticlePos({ x: point.x, y: point.y })
    }
  }, [drawProgress, pathLength])

  return (
    <svg width="100%" height="100%" style={{ overflow: "visible" }}>
      <defs>
        <filter id="pathGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Path */}
      <path
        ref={pathRef}
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={pathLength}
        strokeDashoffset={pathLength * (1 - drawProgress)}
        filter="url(#pathGlow)"
      />

      {/* Particle following the path */}
      {showParticle && drawProgress > 0 && (
        <circle cx={particlePos.x} cy={particlePos.y} r={8} fill={particleColor} filter="url(#pathGlow)" />
      )}
    </svg>
  )
}
