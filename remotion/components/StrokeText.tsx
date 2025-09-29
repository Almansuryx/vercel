"use client"

import type React from "react"
import { useCurrentFrame } from "remotion"
import { interpolate, easing } from "../utils/animation-helpers"

interface StrokeTextProps {
  text: string
  startFrame?: number
  duration?: number
  fontSize?: number
  strokeColor?: string
  fillColor?: string
  strokeWidth?: number
  animateStroke?: boolean
  animateFill?: boolean
}

export const StrokeText: React.FC<StrokeTextProps> = ({
  text,
  startFrame = 0,
  duration = 60,
  fontSize = 96,
  strokeColor = "#00FFFF",
  fillColor = "#FF00FF",
  strokeWidth = 2,
  animateStroke = true,
  animateFill = true,
}) => {
  const frame = useCurrentFrame()
  const localFrame = Math.max(0, frame - startFrame)

  const strokeProgress = animateStroke
    ? interpolate(localFrame, [0, duration * 0.6], [0, 1], {
        easing: easing.easeOutExpo,
        extrapolateRight: "clamp",
      })
    : 1

  const fillProgress = animateFill
    ? interpolate(localFrame, [duration * 0.4, duration], [0, 1], {
        easing: easing.easeOutExpo,
        extrapolateRight: "clamp",
      })
    : 1

  return (
    <svg
      width="100%"
      height={fontSize * 1.5}
      style={{
        overflow: "visible",
      }}
    >
      <defs>
        <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={strokeColor} />
          <stop offset="100%" stopColor={fillColor} />
        </linearGradient>

        <filter id="textGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={fontSize}
        fontFamily="monospace"
        fontWeight="bold"
        fill={fillProgress > 0 ? fillColor : "none"}
        fillOpacity={fillProgress}
        stroke="url(#strokeGradient)"
        strokeWidth={strokeWidth}
        strokeDasharray={1000}
        strokeDashoffset={1000 * (1 - strokeProgress)}
        filter="url(#textGlow)"
      >
        {text}
      </text>
    </svg>
  )
}
