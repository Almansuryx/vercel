"use client"

import type React from "react"
import { AbsoluteFill } from "remotion"
import { CodeBlock } from "../components/CodeBlock"
import { Terminal } from "../components/Terminal"
import { APIDocumentation } from "../components/APIDocumentation"
import { BRAND_COLORS } from "../config"
import { AnimatedText } from "../components/AnimatedText"

const sampleCode = `import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}`

const terminalCommands = [
  {
    input: "npm install remotion",
    output: "✓ Successfully installed remotion",
    delay: 20,
  },
  {
    input: "npm run dev",
    output: "Server running on http://localhost:3000",
    delay: 30,
  },
]

const apiEndpoint = {
  method: "POST" as const,
  path: "/api/videos/render",
  description: "Render a video composition with custom parameters",
  response: `{
  "id": "video_123",
  "status": "rendering",
  "progress": 0
}`,
}

export const CodeRevealDemo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_COLORS.black,
        padding: 60,
      }}
    >
      {/* Title */}
      <div style={{ marginBottom: 40 }}>
        <AnimatedText
          text="Code Animation Showcase"
          startFrame={0}
          duration={30}
          style="slide"
          color={BRAND_COLORS.neonCyan}
          fontSize={48}
          glow
        />
      </div>

      {/* Code Block Example */}
      <div style={{ marginBottom: 40 }}>
        <CodeBlock code={sampleCode} startFrame={30} duration={90} animationType="typewriter" showLineNumbers />
      </div>

      {/* Terminal Example - positioned in bottom left */}
      <div style={{ position: "absolute", bottom: 60, left: 60 }}>
        <Terminal commands={terminalCommands} startFrame={120} fontSize={16} width={600} height={200} />
      </div>

      {/* API Documentation - positioned in bottom right */}
      <div style={{ position: "absolute", bottom: 60, right: 60 }}>
        <APIDocumentation endpoint={apiEndpoint} startFrame={180} width={600} />
      </div>
    </AbsoluteFill>
  )
}
