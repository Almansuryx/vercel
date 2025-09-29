"use client"

import type React from "react"
import { AbsoluteFill } from "remotion"
import { AnimatedText } from "../components/AnimatedText"
import { WireframeGrid } from "../components/WireframeGrid"
import { ParticleSystem } from "../components/ParticleSystem"
import { GlowingLine } from "../components/GlowingLine"
import { BRAND_COLORS } from "../config"

export const IntroSequence: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_COLORS.black,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background Grid */}
      <WireframeGrid width={1920} height={1080} gridSize={60} color={BRAND_COLORS.neonCyan} startFrame={0} />

      {/* Particle System */}
      <ParticleSystem
        width={1920}
        height={1080}
        particleCount={100}
        colors={[BRAND_COLORS.neonCyan, BRAND_COLORS.neonMagenta, BRAND_COLORS.neonOrange]}
        startFrame={30}
      />

      {/* Decorative Lines */}
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <GlowingLine x1={100} y1={100} x2={500} y2={100} color={BRAND_COLORS.neonMagenta} startFrame={20} />
        <GlowingLine x1={1420} y1={980} x2={1820} y2={980} color={BRAND_COLORS.neonOrange} startFrame={25} />
        <GlowingLine x1={960} y1={50} x2={960} y2={300} color={BRAND_COLORS.neonLime} startFrame={30} />
      </svg>

      {/* Main Text */}
      <div style={{ textAlign: "center", zIndex: 10 }}>
        <AnimatedText
          text="ELSADEEQ"
          startFrame={40}
          duration={40}
          style="scale"
          color={BRAND_COLORS.neonCyan}
          fontSize={120}
          glow
        />
        <div style={{ marginTop: 20 }}>
          <AnimatedText
            text="CREATIVE STUDIO"
            startFrame={60}
            duration={40}
            style="slide"
            color={BRAND_COLORS.neonMagenta}
            fontSize={48}
            glow
          />
        </div>
        <div style={{ marginTop: 40 }}>
          <AnimatedText
            text="code + art"
            startFrame={80}
            duration={30}
            style="typewriter"
            color={BRAND_COLORS.neonOrange}
            fontSize={32}
            glow={false}
          />
        </div>
      </div>
    </AbsoluteFill>
  )
}
