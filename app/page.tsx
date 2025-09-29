"use client"

import { Player } from "@remotion/player"
import { CompositionSelector } from "@/remotion/CompositionSelector"
import { VIDEO_CONFIG } from "@/remotion/config"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const [selectedComposition, setSelectedComposition] = useState("IntroSequence")

  const compositions = [
    { id: "IntroSequence", name: "Intro Sequence", duration: VIDEO_CONFIG.durationInFrames },
    { id: "CodeRevealDemo", name: "Code Reveal", duration: VIDEO_CONFIG.durationInFrames * 2 },
    { id: "LogoShowcase", name: "Logo Showcase", duration: VIDEO_CONFIG.durationInFrames * 1.5 },
    { id: "GeometricShowcase", name: "Geometric Motion", duration: VIDEO_CONFIG.durationInFrames * 2 },
    { id: "ProductDemoExample", name: "Product Demo", duration: VIDEO_CONFIG.durationInFrames },
    { id: "SocialPromoExample", name: "Social Promo", duration: VIDEO_CONFIG.durationInFrames * 0.8 },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-background opacity-20" />
        <div className="relative max-w-7xl mx-auto px-8 py-16">
          <div className="text-center space-y-6">
            <h1 className="text-7xl font-bold">
              <span className="stroke-text glow-cyan">Elsadeeq</span>
              <br />
              <span className="text-foreground">Creative Studio</span>
            </h1>
            <p className="text-2xl text-muted-foreground max-w-2xl mx-auto">
              Dynamic video creation system powered by Remotion. Build stunning tech-inspired animations with full brand
              customization.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Video Player Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Video Preview</CardTitle>
            <CardDescription>Select a composition to preview</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Composition Selector */}
            <div className="flex flex-wrap gap-2 mb-6">
              {compositions.map((comp) => (
                <Button
                  key={comp.id}
                  variant={selectedComposition === comp.id ? "default" : "outline"}
                  onClick={() => setSelectedComposition(comp.id)}
                >
                  {comp.name}
                </Button>
              ))}
            </div>

            {/* Player */}
            <div className="rounded-lg overflow-hidden border border-border shadow-2xl">
              <Player
                key={selectedComposition}
                component={CompositionSelector}
                inputProps={{ compositionId: selectedComposition }}
                durationInFrames={
                  compositions.find((c) => c.id === selectedComposition)?.duration || VIDEO_CONFIG.durationInFrames
                }
                compositionWidth={VIDEO_CONFIG.width}
                compositionHeight={VIDEO_CONFIG.height}
                fps={VIDEO_CONFIG.fps}
                style={{
                  width: "100%",
                  aspectRatio: "16/9",
                }}
                controls
                loop
                acknowledgeRemotionLicense
              />
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <Tabs defaultValue="features" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="customization">Customization</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[hsl(var(--color-primary))]">Code Animations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Syntax-highlighted code reveals with typewriter effects, line-by-line highlighting, and terminal
                    simulations
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-[hsl(var(--color-secondary))]">Logo & Typography</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Morphing logos, kinetic typography with wave/explode/rotate effects, and text reveal animations
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-[hsl(var(--color-accent))]">Geometric Motion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    3D wireframe shapes, geometric patterns, particle systems with physics-driven motion
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-[hsl(var(--color-primary))]">60fps Rendering</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Smooth professional animations optimized for high-quality output at 60 frames per second
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-[hsl(var(--color-secondary))]">TypeScript</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Fully typed with strict TypeScript for better developer experience and fewer runtime errors
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-[hsl(var(--color-accent))]">Modular System</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Reusable components and templates that can be mixed and matched for infinite possibilities
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Demo</CardTitle>
                  <CardDescription>Showcase features with code examples</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Feature highlights with animations</li>
                    <li>Live code demonstrations</li>
                    <li>Customizable branding</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tutorial Video</CardTitle>
                  <CardDescription>Step-by-step coding tutorials</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Terminal command simulations</li>
                    <li>Code block animations</li>
                    <li>Multi-step workflows</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Social Media Promo</CardTitle>
                  <CardDescription>Eye-catching promotional content</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Kinetic typography effects</li>
                    <li>Logo animations</li>
                    <li>Call-to-action buttons</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Event Highlight</CardTitle>
                  <CardDescription>Conference and event recaps</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Geometric backgrounds</li>
                    <li>Text reveal effects</li>
                    <li>Highlight reels</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customization" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Full Brand Control</CardTitle>
                <CardDescription>Customize every aspect of your videos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Theme Presets</h4>
                  <p className="text-muted-foreground">
                    Choose from pre-built themes: Elsadeeq Default, Cyberpunk, Sunset Vibes, Ocean Depths, Forest Tech
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Color Customization</h4>
                  <p className="text-muted-foreground">
                    Define primary, secondary, accent, background, and text colors to match your brand
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Typography Control</h4>
                  <p className="text-muted-foreground">
                    Select custom fonts for headings and body text with full web font support
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Animation Speed</h4>
                  <p className="text-muted-foreground">
                    Adjust animation timing: slow, normal, or fast to match your content style
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Multi-Platform Export</CardTitle>
                <CardDescription>Optimized output for every platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Quality Options</h4>
                  <p className="text-muted-foreground">Export in 1080p, 4K, or custom resolutions</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Platform Optimization</h4>
                  <p className="text-muted-foreground">
                    Pre-configured settings for Instagram, YouTube, Twitter, LinkedIn with correct aspect ratios
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Batch Rendering</h4>
                  <p className="text-muted-foreground">
                    Render multiple videos with different configurations simultaneously
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Cloud Integration</h4>
                  <p className="text-muted-foreground">
                    Deploy to Vercel for serverless rendering with queue management and webhooks
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Tech Stack */}
        <Card>
          <CardHeader>
            <CardTitle>Built With Modern Technology</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-lg bg-muted">
                <div className="font-bold text-lg mb-1">Remotion</div>
                <div className="text-sm text-muted-foreground">Video Engine</div>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <div className="font-bold text-lg mb-1">TypeScript</div>
                <div className="text-sm text-muted-foreground">Type Safety</div>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <div className="font-bold text-lg mb-1">Next.js</div>
                <div className="text-sm text-muted-foreground">Framework</div>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <div className="font-bold text-lg mb-1">Tailwind CSS</div>
                <div className="text-sm text-muted-foreground">Styling</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
