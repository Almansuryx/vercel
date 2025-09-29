"use client"

import type React from "react"
import { AbsoluteFill } from "remotion"
import { AnimatedText } from "../components/AnimatedText"
import { TextReveal } from "../components/TextReveal"
import { GeometricPattern } from "../components/GeometricPattern"
import { StrokeText } from "../components/StrokeText"
import { BRAND_COLORS } from "../config"

interface EventHighlightProps {
  eventName: string
  date: string
  location: string
  highlights: string[]
  primaryColor?: string
  secondaryColor?: string
}

export const EventHighlight: React.FC<EventHighlightProps> = ({
  eventName,
  date,
  location,
  highlights,
  primaryColor = BRAND_COLORS.neonCyan,
  secondaryColor = BRAND_COLORS.neonMagenta,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_COLORS.black,
        padding: 80,
      }}
    >
      {/* Background Pattern */}
      <GeometricPattern width={1920} height={1080} pattern="triangles" color={primaryColor} startFrame={0} animated />

      {/* Event Name */}
      <div style={{ marginBottom: 40 }}>
        <StrokeText
          text={eventName}
          startFrame={0}
          duration={60}
          fontSize={120}
          strokeColor={primaryColor}
          fillColor={secondaryColor}
          strokeWidth={3}
        />
      </div>

      {/* Date and Location */}
      <div style={{ display: "flex", gap: 60, marginBottom: 80 }}>
        <div>
          <AnimatedText
            text={date}
            startFrame={60}
            duration={30}
            style="fade"
            color={primaryColor}
            fontSize={36}
            glow
          />
        </div>
        <div>
          <AnimatedText
            text={location}
            startFrame={70}
            duration={30}
            style="fade"
            color={secondaryColor}
            fontSize={36}
            glow
          />
        </div>
      </div>

      {/* Highlights */}
      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
        {highlights.map((highlight, index) => (
          <div key={index}>
            <TextReveal
              text={highlight}
              startFrame={100 + index * 25}
              duration={35}
              fontSize={42}
              color="#FFFFFF"
              revealDirection="left"
            />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  )
}
