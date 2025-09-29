"use client"

import type React from "react"
import { AbsoluteFill } from "remotion"
import { AnimatedText } from "../components/AnimatedText"
import { KineticTypography } from "../components/KineticTypography"
import { LogoMorph } from "../components/LogoMorph"
import { AdvancedParticles } from "../components/AdvancedParticles"
import { BRAND_COLORS } from "../config"

interface SocialMediaPromoProps {
  headline: string
  subheadline: string
  callToAction: string
  showLogo?: boolean
  primaryColor?: string
  secondaryColor?: string
}

export const SocialMediaPromo: React.FC<SocialMediaPromoProps> = ({
  headline,
  subheadline,
  callToAction,
  showLogo = true,
  primaryColor = BRAND_COLORS.neonCyan,
  secondaryColor = BRAND_COLORS.neonMagenta,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_COLORS.black,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Particles Background */}
      <AdvancedParticles
        width={1920}
        height={1080}
        particleCount={100}
        colors={[primaryColor, secondaryColor, BRAND_COLORS.neonOrange]}
        startFrame={0}
        behavior="orbit"
      />

      {/* Logo */}
      {showLogo && (
        <div style={{ marginBottom: 60 }}>
          <LogoMorph
            startFrame={0}
            duration={60}
            size={200}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        </div>
      )}

      {/* Headline */}
      <div style={{ marginBottom: 40 }}>
        <KineticTypography
          text={headline}
          startFrame={60}
          duration={50}
          fontSize={96}
          color={primaryColor}
          animationStyle="wave"
          staggerDelay={2}
        />
      </div>

      {/* Subheadline */}
      <div style={{ marginBottom: 60 }}>
        <AnimatedText
          text={subheadline}
          startFrame={110}
          duration={40}
          style="slide"
          color={secondaryColor}
          fontSize={42}
          glow
        />
      </div>

      {/* Call to Action */}
      <div
        style={{
          backgroundColor: primaryColor,
          padding: "20px 60px",
          borderRadius: 50,
          boxShadow: `0 0 40px ${primaryColor}`,
        }}
      >
        <AnimatedText
          text={callToAction}
          startFrame={150}
          duration={30}
          style="scale"
          color={BRAND_COLORS.black}
          fontSize={48}
          glow={false}
        />
      </div>
    </AbsoluteFill>
  )
}
