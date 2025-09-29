"use client"

import type React from "react"
import { AbsoluteFill } from "remotion"
import { Wireframe3D } from "../components/Wireframe3D"
import { GeometricPattern } from "../components/GeometricPattern"
import { AdvancedParticles } from "../components/AdvancedParticles"
import { PathAnimation } from "../components/PathAnimation"
import { AnimatedText } from "../components/AnimatedText"
import { BRAND_COLORS } from "../config"

export const GeometricShowcase: React.FC = () => {
  // Complex path for animation
  const complexPath = "M 100 500 Q 300 100 600 500 T 1100 500 Q 1400 800 1700 500"

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_COLORS.black,
      }}
    >
      {/* Background Pattern */}
      <GeometricPattern
        width={1920}
        height={1080}
        pattern="hexagons"
        color={BRAND_COLORS.neonCyan}
        startFrame={0}
        animated
      />

      {/* Title */}
      <div style={{ position: "absolute", top: 80, left: "50%", transform: "translateX(-50%)" }}>
        <AnimatedText
          text="GEOMETRIC MOTION"
          startFrame={0}
          duration={40}
          style="slide"
          color={BRAND_COLORS.neonCyan}
          fontSize={64}
          glow
        />
      </div>

      {/* 3D Wireframe Cube - Left */}
      <div style={{ position: "absolute", top: 300, left: 200 }}>
        <Wireframe3D shape="cube" size={200} color={BRAND_COLORS.neonMagenta} startFrame={40} rotationSpeed={1.5} />
      </div>

      {/* Particle System - Center */}
      <AdvancedParticles
        width={1920}
        height={1080}
        particleCount={80}
        colors={[BRAND_COLORS.neonCyan, BRAND_COLORS.neonMagenta, BRAND_COLORS.neonOrange, BRAND_COLORS.neonLime]}
        startFrame={60}
        behavior="orbit"
        centerX={960}
        centerY={540}
      />

      {/* Path Animation - Bottom */}
      <div style={{ position: "absolute", bottom: 100, width: "100%" }}>
        <PathAnimation
          path={complexPath}
          color={BRAND_COLORS.neonOrange}
          strokeWidth={4}
          startFrame={80}
          duration={120}
          showParticle
          particleColor={BRAND_COLORS.neonLime}
        />
      </div>

      {/* Additional Particle System - Explode effect */}
      <div style={{ position: "absolute", top: 0, left: 0 }}>
        <AdvancedParticles
          width={1920}
          height={1080}
          particleCount={50}
          colors={[BRAND_COLORS.neonPink, BRAND_COLORS.neonBlue]}
          startFrame={120}
          behavior="explode"
          centerX={1400}
          centerY={400}
        />
      </div>
    </AbsoluteFill>
  )
}
