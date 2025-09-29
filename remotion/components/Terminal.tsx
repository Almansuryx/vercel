"use client"

import type React from "react"
import { useCurrentFrame } from "remotion"
import { interpolate, easing } from "../utils/animation-helpers"

interface TerminalCommand {
  input: string
  output?: string
  delay?: number
}

interface TerminalProps {
  commands: TerminalCommand[]
  startFrame?: number
  prompt?: string
  fontSize?: number
  width?: number
  height?: number
}

export const Terminal: React.FC<TerminalProps> = ({
  commands,
  startFrame = 0,
  prompt = "$ ",
  fontSize = 20,
  width = 800,
  height = 600,
}) => {
  const frame = useCurrentFrame()
  const localFrame = Math.max(0, frame - startFrame)

  // Calculate which commands and characters to show
  let currentCommandIndex = 0
  let currentCharIndex = 0
  let showOutput = false
  let frameCounter = 0

  for (let i = 0; i < commands.length; i++) {
    const command = commands[i]
    const commandDelay = command.delay || 0
    const inputLength = command.input.length
    const typingDuration = inputLength * 2 // 2 frames per character
    const outputDelay = 10 // Frames before showing output

    if (localFrame < frameCounter + commandDelay) {
      break
    }

    frameCounter += commandDelay

    if (localFrame < frameCounter + typingDuration) {
      currentCommandIndex = i
      currentCharIndex = Math.floor((localFrame - frameCounter) / 2)
      break
    }

    frameCounter += typingDuration

    if (command.output) {
      if (localFrame < frameCounter + outputDelay) {
        currentCommandIndex = i
        currentCharIndex = inputLength
        showOutput = false
        break
      }

      frameCounter += outputDelay
      currentCommandIndex = i
      currentCharIndex = inputLength
      showOutput = true
    }
  }

  const opacity = interpolate(localFrame, [0, 15], [0, 1], {
    easing: easing.easeOutExpo,
    extrapolateRight: "clamp",
  })

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#0A0A0A",
        border: "2px solid #00FFFF",
        borderRadius: 8,
        padding: 24,
        fontFamily: "monospace",
        fontSize,
        color: "#FFFFFF",
        opacity,
        boxShadow: "0 0 40px rgba(0, 255, 255, 0.3)",
        overflow: "hidden",
      }}
    >
      {/* Terminal Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 20,
          paddingBottom: 12,
          borderBottom: "1px solid #333",
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FF5F56" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#27C93F" }} />
        </div>
        <div style={{ marginLeft: 20, color: "#666", fontSize: fontSize * 0.8 }}>terminal</div>
      </div>

      {/* Terminal Content */}
      <div style={{ lineHeight: 1.8 }}>
        {commands.map((command, index) => {
          if (index > currentCommandIndex) return null

          const isCurrentCommand = index === currentCommandIndex
          const visibleInput = isCurrentCommand ? command.input.slice(0, currentCharIndex) : command.input

          const showCursor = isCurrentCommand && currentCharIndex < command.input.length

          return (
            <div key={index} style={{ marginBottom: 12 }}>
              {/* Command Input */}
              <div style={{ display: "flex" }}>
                <span style={{ color: "#00FFFF", marginRight: 8 }}>{prompt}</span>
                <span style={{ color: "#CCFF00" }}>{visibleInput}</span>
                {showCursor && (
                  <span
                    style={{
                      animation: "blink 1s infinite",
                      marginLeft: 2,
                      color: "#00FFFF",
                    }}
                  >
                    |
                  </span>
                )}
              </div>

              {/* Command Output */}
              {command.output && (index < currentCommandIndex || (isCurrentCommand && showOutput)) && (
                <div style={{ color: "#FFFFFF", marginTop: 8, marginLeft: 20 }}>{command.output}</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
