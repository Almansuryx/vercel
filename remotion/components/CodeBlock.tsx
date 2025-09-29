"use client"

import type React from "react"
import { useCurrentFrame } from "remotion"
import { interpolate, easing } from "../utils/animation-helpers"
import { highlightCode } from "../utils/syntax-highlighter"

interface CodeBlockProps {
  code: string
  startFrame?: number
  duration?: number
  showLineNumbers?: boolean
  highlightLines?: number[]
  fontSize?: number
  animationType?: "typewriter" | "fade" | "lineByLine"
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  startFrame = 0,
  duration = 60,
  showLineNumbers = true,
  highlightLines = [],
  fontSize = 24,
  animationType = "typewriter",
}) => {
  const frame = useCurrentFrame()
  const localFrame = Math.max(0, frame - startFrame)

  const tokens = highlightCode(code)
  const lines = code.split("\n")

  // Calculate visible content based on animation type
  let visibleTokenCount = tokens.length
  let visibleLineCount = lines.length
  let opacity = 1

  if (localFrame < duration) {
    const progress = localFrame / duration

    switch (animationType) {
      case "typewriter":
        visibleTokenCount = Math.floor(tokens.length * progress)
        break

      case "fade":
        opacity = interpolate(localFrame, [0, duration], [0, 1], { easing: easing.easeOutExpo })
        break

      case "lineByLine":
        visibleLineCount = Math.floor(lines.length * progress)
        break
    }
  }

  const renderTokens = () => {
    const visibleTokens = animationType === "typewriter" ? tokens.slice(0, visibleTokenCount) : tokens

    return visibleTokens.map((token, index) => (
      <span
        key={index}
        style={{
          color: token.color,
          textShadow: token.type !== "comment" && token.type !== "default" ? `0 0 10px ${token.color}` : "none",
        }}
      >
        {token.value}
      </span>
    ))
  }

  const renderLineByLine = () => {
    return lines.slice(0, visibleLineCount).map((line, index) => {
      const lineOpacity = interpolate(localFrame, [index * 3, index * 3 + 10], [0, 1], {
        easing: easing.easeOutExpo,
        extrapolateRight: "clamp",
      })

      const isHighlighted = highlightLines.includes(index + 1)

      return (
        <div
          key={index}
          style={{
            display: "flex",
            opacity: lineOpacity,
            backgroundColor: isHighlighted ? "rgba(0, 255, 255, 0.1)" : "transparent",
            padding: "4px 8px",
            borderLeft: isHighlighted ? "3px solid #00FFFF" : "3px solid transparent",
          }}
        >
          {showLineNumbers && (
            <span
              style={{
                color: "#666",
                marginRight: 20,
                minWidth: 40,
                textAlign: "right",
                userSelect: "none",
              }}
            >
              {index + 1}
            </span>
          )}
          <span>{line}</span>
        </div>
      )
    })
  }

  return (
    <div
      style={{
        backgroundColor: "#0A0A0A",
        border: "1px solid #333",
        borderRadius: 8,
        padding: 24,
        fontFamily: "monospace",
        fontSize,
        lineHeight: 1.6,
        opacity,
        boxShadow: "0 0 40px rgba(0, 255, 255, 0.2)",
      }}
    >
      {animationType === "lineByLine" ? (
        <div>{renderLineByLine()}</div>
      ) : (
        <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
          {showLineNumbers && animationType !== "lineByLine" && (
            <div style={{ float: "left", marginRight: 20, color: "#666", textAlign: "right", minWidth: 40 }}>
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          )}
          <code>{renderTokens()}</code>
          {animationType === "typewriter" && visibleTokenCount < tokens.length && (
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
        </pre>
      )}
    </div>
  )
}
