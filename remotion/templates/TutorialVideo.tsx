"use client"

import type React from "react"
import { AbsoluteFill } from "remotion"
import { AnimatedText } from "../components/AnimatedText"
import { Terminal } from "../components/Terminal"
import { CodeBlock } from "../components/CodeBlock"
import { BRAND_COLORS } from "../config"

interface TutorialStep {
  title: string
  code?: string
  commands?: Array<{ input: string; output?: string; delay?: number }>
}

interface TutorialVideoProps {
  title: string
  steps: TutorialStep[]
  primaryColor?: string
}

export const TutorialVideo: React.FC<TutorialVideoProps> = ({ title, steps, primaryColor = BRAND_COLORS.neonCyan }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_COLORS.black,
        padding: 60,
      }}
    >
      {/* Title */}
      <div style={{ marginBottom: 60 }}>
        <AnimatedText text={title} startFrame={0} duration={40} style="slide" color={primaryColor} fontSize={64} glow />
      </div>

      {/* Steps */}
      {steps.map((step, index) => {
        const startFrame = 60 + index * 120

        return (
          <div key={index} style={{ marginBottom: 40 }}>
            {/* Step Title */}
            <div style={{ marginBottom: 20 }}>
              <AnimatedText
                text={`${index + 1}. ${step.title}`}
                startFrame={startFrame}
                duration={30}
                style="fade"
                color={primaryColor}
                fontSize={36}
                glow={false}
              />
            </div>

            {/* Code or Terminal */}
            {step.code && (
              <CodeBlock
                code={step.code}
                startFrame={startFrame + 30}
                duration={60}
                animationType="lineByLine"
                fontSize={20}
              />
            )}

            {step.commands && (
              <Terminal commands={step.commands} startFrame={startFrame + 30} fontSize={18} width={1200} height={300} />
            )}
          </div>
        )
      })}
    </AbsoluteFill>
  )
}
