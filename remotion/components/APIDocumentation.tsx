"use client"

import type React from "react"
import { useCurrentFrame } from "remotion"
import { interpolate, easing } from "../utils/animation-helpers"
import { BRAND_COLORS } from "../config"

interface APIEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  path: string
  description: string
  response?: string
}

interface APIDocumentationProps {
  endpoint: APIEndpoint
  startFrame?: number
  duration?: number
  width?: number
}

export const APIDocumentation: React.FC<APIDocumentationProps> = ({
  endpoint,
  startFrame = 0,
  duration = 60,
  width = 800,
}) => {
  const frame = useCurrentFrame()
  const localFrame = Math.max(0, frame - startFrame)

  const containerOpacity = interpolate(localFrame, [0, 15], [0, 1], {
    easing: easing.easeOutExpo,
    extrapolateRight: "clamp",
  })

  const methodOpacity = interpolate(localFrame, [10, 25], [0, 1], {
    easing: easing.easeOutExpo,
    extrapolateRight: "clamp",
  })

  const pathOpacity = interpolate(localFrame, [20, 35], [0, 1], {
    easing: easing.easeOutExpo,
    extrapolateRight: "clamp",
  })

  const descOpacity = interpolate(localFrame, [30, 45], [0, 1], {
    easing: easing.easeOutExpo,
    extrapolateRight: "clamp",
  })

  const responseOpacity = interpolate(localFrame, [40, 60], [0, 1], {
    easing: easing.easeOutExpo,
    extrapolateRight: "clamp",
  })

  const methodColors: Record<string, string> = {
    GET: BRAND_COLORS.neonCyan,
    POST: BRAND_COLORS.neonLime,
    PUT: BRAND_COLORS.neonOrange,
    DELETE: BRAND_COLORS.neonMagenta,
    PATCH: BRAND_COLORS.neonPink,
  }

  return (
    <div
      style={{
        width,
        backgroundColor: "#0A0A0A",
        border: "1px solid #333",
        borderRadius: 8,
        padding: 24,
        fontFamily: "monospace",
        opacity: containerOpacity,
        boxShadow: "0 0 40px rgba(0, 255, 255, 0.2)",
      }}
    >
      {/* Method Badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16, opacity: methodOpacity }}>
        <div
          style={{
            backgroundColor: methodColors[endpoint.method],
            color: "#000",
            padding: "6px 12px",
            borderRadius: 4,
            fontWeight: "bold",
            fontSize: 16,
            boxShadow: `0 0 20px ${methodColors[endpoint.method]}`,
          }}
        >
          {endpoint.method}
        </div>
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 20,
            opacity: pathOpacity,
          }}
        >
          {endpoint.path}
        </div>
      </div>

      {/* Description */}
      <div
        style={{
          color: "#999",
          fontSize: 16,
          marginBottom: 20,
          opacity: descOpacity,
        }}
      >
        {endpoint.description}
      </div>

      {/* Response Example */}
      {endpoint.response && (
        <div style={{ opacity: responseOpacity }}>
          <div
            style={{
              color: BRAND_COLORS.neonCyan,
              fontSize: 14,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Response
          </div>
          <div
            style={{
              backgroundColor: "#000",
              border: "1px solid #333",
              borderRadius: 4,
              padding: 16,
              fontSize: 14,
              color: "#CCFF00",
              whiteSpace: "pre-wrap",
            }}
          >
            {endpoint.response}
          </div>
        </div>
      )}
    </div>
  )
}
