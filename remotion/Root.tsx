import type React from "react"

import { Composition } from "remotion"
import { VIDEO_CONFIG } from "./config"
import { IntroSequence } from "./compositions/IntroSequence"
import { CodeRevealDemo } from "./compositions/CodeRevealDemo"
import { LogoShowcase } from "./compositions/LogoShowcase"
import { GeometricShowcase } from "./compositions/GeometricShowcase"
import { ProductDemoExample, SocialPromoExample } from "./compositions/TemplateShowcase"

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="IntroSequence"
        component={IntroSequence}
        durationInFrames={VIDEO_CONFIG.durationInFrames}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />

      <Composition
        id="CodeRevealDemo"
        component={CodeRevealDemo}
        durationInFrames={VIDEO_CONFIG.durationInFrames * 2}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />

      <Composition
        id="LogoShowcase"
        component={LogoShowcase}
        durationInFrames={VIDEO_CONFIG.durationInFrames * 1.5}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />

      <Composition
        id="GeometricShowcase"
        component={GeometricShowcase}
        durationInFrames={VIDEO_CONFIG.durationInFrames * 2}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />

      <Composition
        id="ProductDemoExample"
        component={ProductDemoExample}
        durationInFrames={VIDEO_CONFIG.durationInFrames}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />

      <Composition
        id="SocialPromoExample"
        component={SocialPromoExample}
        durationInFrames={VIDEO_CONFIG.durationInFrames * 0.8}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />
    </>
  )
}
