import type React from "react"
import { IntroSequence } from "./compositions/IntroSequence"
import { CodeRevealDemo } from "./compositions/CodeRevealDemo"
import { LogoShowcase } from "./compositions/LogoShowcase"
import { GeometricShowcase } from "./compositions/GeometricShowcase"
import { ProductDemoExample, SocialPromoExample } from "./compositions/TemplateShowcase"

interface CompositionSelectorProps {
  compositionId: string
}

export const CompositionSelector: React.FC<CompositionSelectorProps> = ({ compositionId }) => {
  switch (compositionId) {
    case "IntroSequence":
      return <IntroSequence />
    case "CodeRevealDemo":
      return <CodeRevealDemo />
    case "LogoShowcase":
      return <LogoShowcase />
    case "GeometricShowcase":
      return <GeometricShowcase />
    case "ProductDemoExample":
      return <ProductDemoExample />
    case "SocialPromoExample":
      return <SocialPromoExample />
    default:
      return <IntroSequence />
  }
}
