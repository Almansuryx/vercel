"use client"

import type React from "react"
import { AbsoluteFill } from "remotion"
import { AnimatedText } from "../components/AnimatedText"
import { CodeBlock } from "../components/CodeBlock"
import { WireframeGrid } from "../components/WireframeGrid"
import { AdvancedParticles } from "../components/AdvancedParticles"
import { BRAND_COLORS } from "../config"

interface ProductDemoProps {
  productName: string
  tagline: string
  features: string[]
  codeExample?: string
  primaryColor?: string
  secondaryColor?: string
}

export const ProductDemo: React.FC<ProductDemoProps> = ({
  productName,
  tagline,
  features,
  codeExample,
  primaryColor = BRAND_COLORS.neonCyan,
  secondaryColor = BRAND_COLORS.neonMagenta,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_COLORS.black,
        padding: 60,
      }}
    >
      {/* Background */}
      <WireframeGrid width={1920} height={1080} gridSize={80} color={primaryColor} startFrame={0} />
      <AdvancedParticles
        width={1920}
        height={1080}
        particleCount={50}
        colors={[primaryColor, secondaryColor]}
        startFrame={20}
        behavior="float"
      />

      {/* Product Name */}
      <div style={{ marginBottom: 40 }}>
        <AnimatedText
          text={productName}
          startFrame={0}
          duration={40}
          style="scale"
          color={primaryColor}
          fontSize={96}
          glow
        />
      </div>

      {/* Tagline */}
      <div style={{ marginBottom: 60 }}>
        <AnimatedText
          text={tagline}
          startFrame={40}
          duration={30}
          style="slide"
          color={secondaryColor}
          fontSize={36}
          glow={false}
        />
      </div>

      {/* Features */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 60 }}>
        {features.map((feature, index) => (
          <div key={index}>
            <AnimatedText
              text={`• ${feature}`}
              startFrame={70 + index * 15}
              duration={25}
              style="fade"
              color="#FFFFFF"
              fontSize={28}
              glow={false}
            />
          </div>
        ))}
      </div>

      {/* Code Example */}
      {codeExample && (
        <div style={{ position: "absolute", bottom: 60, left: 60, right: 60 }}>
          <CodeBlock code={codeExample} startFrame={130} duration={90} animationType="typewriter" fontSize={18} />
        </div>
      )}
    </AbsoluteFill>
  )
}
