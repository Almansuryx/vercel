"use client"

import type React from "react"
import { ProductDemo } from "../templates/ProductDemo"
import { SocialMediaPromo } from "../templates/SocialMediaPromo"
import { BRAND_COLORS } from "../config"

// Example usage of templates
export const ProductDemoExample: React.FC = () => {
  return (
    <ProductDemo
      productName="ELSADEEQ SDK"
      tagline="Build stunning videos programmatically"
      features={[
        "60fps smooth animations",
        "Modular component system",
        "Full TypeScript support",
        "Export to any platform",
      ]}
      codeExample={`import { Video } from '@elsadeeq/sdk'

const MyVideo = () => {
  return (
    <Video>
      <Scene duration={300}>
        <AnimatedText text="Hello World" />
      </Scene>
    </Video>
  )
}`}
      primaryColor={BRAND_COLORS.neonCyan}
      secondaryColor={BRAND_COLORS.neonMagenta}
    />
  )
}

export const SocialPromoExample: React.FC = () => {
  return (
    <SocialMediaPromo
      headline="LAUNCH DAY"
      subheadline="Experience the future of video creation"
      callToAction="GET STARTED"
      showLogo
      primaryColor={BRAND_COLORS.neonOrange}
      secondaryColor={BRAND_COLORS.neonLime}
    />
  )
}
