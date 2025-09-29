"use client"

import type React from "react"
import { AbsoluteFill } from "remotion"
import { LogoMorph } from "../components/LogoMorph"
import { KineticTypography } from "../components/KineticTypography"
import { TextReveal } from "../components/TextReveal"
import { StrokeText } from "../components/StrokeText"
import { BRAND_COLORS } from "../config"
import { WireframeGrid } from "../components/WireframeGrid"

export const LogoShowcase: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_COLORS.black,
      }}
    >
      {/* Background */}
      <WireframeGrid width={1920} height={1080} gridSize={80} color={BRAND_COLORS.neonCyan} startFrame={0} />

      {/* Logo Animation - Center */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <LogoMorph
          startFrame={0}
          duration={90}
          size={300}
          primaryColor={BRAND_COLORS.neonCyan}
          secondaryColor={BRAND_COLORS.neonMagenta}
        />
      </div>

      {/* Kinetic Typography - Top */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <KineticTypography
          text="ELSADEEQ"
          startFrame={90}
          duration={60}
          fontSize={96}
          color={BRAND_COLORS.neonCyan}
          animationStyle="wave"
          staggerDelay={3}
        />
      </div>

      {/* Text Reveal - Middle */}
      <div
        style={{
          position: "absolute",
          top: "60%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <TextReveal
          text="CREATIVE STUDIO"
          startFrame={150}
          duration={40}
          fontSize={48}
          color={BRAND_COLORS.neonMagenta}
          revealDirection="center"
        />
      </div>

      {/* Stroke Text - Bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
        }}
      >
        <StrokeText
          text="code + art"
          startFrame={190}
          duration={60}
          fontSize={72}
          strokeColor={BRAND_COLORS.neonOrange}
          fillColor={BRAND_COLORS.neonLime}
          strokeWidth={3}
        />
      </div>
    </AbsoluteFill>
  )
}
