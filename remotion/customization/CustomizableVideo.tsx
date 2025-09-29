"use client"

import type React from "react"
import { AbsoluteFill } from "remotion"
import { AnimatedText } from "../components/AnimatedText"
import { CodeBlock } from "../components/CodeBlock"
import { WireframeGrid } from "../components/WireframeGrid"
import { AdvancedParticles } from "../components/AdvancedParticles"
import type { BrandConfiguration } from "./brand-config"
import { getAnimationSpeedMultiplier } from "./brand-config"
import type { VideoContent } from "./content-injector"
import { sanitizeContent } from "./content-injector"

interface CustomizableVideoProps {
  brandConfig: BrandConfiguration
  content: VideoContent
}

export const CustomizableVideo: React.FC<CustomizableVideoProps> = ({ brandConfig, content }) => {
  const sanitized = sanitizeContent(content)
  const speedMultiplier = getAnimationSpeedMultiplier(brandConfig.animationSpeed)

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brandConfig.colors.background,
        padding: 60,
      }}
    >
      {/* Background Elements */}
      <WireframeGrid
        width={1920}
        height={1080}
        gridSize={80}
        color={brandConfig.colors.primary}
        startFrame={0}
        duration={Math.floor(60 * speedMultiplier)}
      />

      <AdvancedParticles
        width={1920}
        height={1080}
        particleCount={60}
        colors={[brandConfig.colors.primary, brandConfig.colors.secondary, brandConfig.colors.accent]}
        startFrame={20}
        behavior="float"
      />

      {/* Title */}
      {sanitized.title && (
        <div style={{ marginBottom: 40 }}>
          <AnimatedText
            text={sanitized.title}
            startFrame={0}
            duration={Math.floor(40 * speedMultiplier)}
            style="scale"
            color={brandConfig.colors.primary}
            fontSize={96}
            glow
          />
        </div>
      )}

      {/* Subtitle */}
      {sanitized.subtitle && (
        <div style={{ marginBottom: 60 }}>
          <AnimatedText
            text={sanitized.subtitle}
            startFrame={Math.floor(40 * speedMultiplier)}
            duration={Math.floor(30 * speedMultiplier)}
            style="slide"
            color={brandConfig.colors.secondary}
            fontSize={42}
            glow={false}
          />
        </div>
      )}

      {/* Bullet Points */}
      {sanitized.bulletPoints && sanitized.bulletPoints.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 60 }}>
          {sanitized.bulletPoints.map((point, index) => (
            <div key={index}>
              <AnimatedText
                text={`• ${point}`}
                startFrame={Math.floor((70 + index * 15) * speedMultiplier)}
                duration={Math.floor(25 * speedMultiplier)}
                style="fade"
                color={brandConfig.colors.text}
                fontSize={32}
                glow={false}
              />
            </div>
          ))}
        </div>
      )}

      {/* Code Snippets */}
      {sanitized.codeSnippets && sanitized.codeSnippets.length > 0 && (
        <div style={{ position: "absolute", bottom: 60, left: 60, right: 60 }}>
          <CodeBlock
            code={sanitized.codeSnippets[0].code}
            startFrame={Math.floor(130 * speedMultiplier)}
            duration={Math.floor(90 * speedMultiplier)}
            animationType="typewriter"
            fontSize={20}
          />
        </div>
      )}

      {/* Call to Action */}
      {sanitized.callToAction && (
        <div
          style={{
            position: "absolute",
            bottom: 100,
            right: 100,
            backgroundColor: brandConfig.colors.accent,
            padding: "15px 40px",
            borderRadius: 30,
            boxShadow: `0 0 30px ${brandConfig.colors.accent}`,
          }}
        >
          <AnimatedText
            text={sanitized.callToAction}
            startFrame={Math.floor(200 * speedMultiplier)}
            duration={Math.floor(30 * speedMultiplier)}
            style="scale"
            color={brandConfig.colors.background}
            fontSize={32}
            glow={false}
          />
        </div>
      )}
    </AbsoluteFill>
  )
}
