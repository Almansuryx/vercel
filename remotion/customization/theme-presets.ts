//```typescript file="remotion/customization/theme-presets.ts"
// Pre-defined theme presets for quick customization

export interface ThemePreset {
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  fonts: {
    heading: string
    body: string
  }
}

export const THEME_PRESETS: Record<string, ThemePreset> = {
  elsadeeq: {
    name: "Elsadeeq Default",
    colors: {
      primary: "#00FFFF", // Cyan
      secondary: "#FF00FF", // Magenta
      accent: "#FF6B35", // Orange
      background: "#000000",
      text: "#FFFFFF",
    },
    fonts: {
      heading: "monospace",
      body: "monospace",
    },
  },
  cyberpunk: {
    name: "Cyberpunk",
    colors: {
      primary: "#FF1493", // Deep Pink
      secondary: "#00FFFF", // Cyan
      accent: "#CCFF00", // Lime
      background: "#0A0A0A",
      text: "#FFFFFF",
    },
    fonts: {
      heading: "monospace",
      body: "monospace",
    },
  },
  sunset: {
    name: "Sunset Vibes",
    colors: {
      primary: "#FF6B35", // Orange
      secondary: "#FF1493", // Pink
      accent: "#FFD700", // Gold
      background: "#1A0A2E",
      text: "#FFFFFF",
    },
    fonts: {
      heading: "monospace",
      body: "sans-serif",
    },
  },
  ocean: {
    name: "Ocean Depths",
    colors: {
      primary: "#00FFFF", // Cyan
      secondary: "#4169FF", // Blue
      accent: "#9D4EDD", // Purple
      background: "#001F3F",
      text: "#FFFFFF",
    },
    fonts: {
      heading: "monospace",
      body: "sans-serif",
    },
  },
  forest: {
    name: "Forest Tech",
    colors: {
      primary: "#CCFF00", // Lime
      secondary: "#00FF7F", // Spring Green
      accent: "#FFD700", // Gold
      background: "#0D1B0D",
      text: "#FFFFFF",
    },
    fonts: {
      heading: "monospace",
      body: "monospace",
    },
  },
}
