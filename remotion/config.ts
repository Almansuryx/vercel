// Remotion configuration for Elsadeeq Creative Studio
export const VIDEO_CONFIG = {
  width: 1920,
  height: 1080,
  fps: 60,
  durationInFrames: 300, // 5 seconds at 60fps
} as const

export const BRAND_COLORS = {
  neonCyan: "#00FFFF",
  neonMagenta: "#FF00FF",
  neonOrange: "#FF6B35",
  neonLime: "#CCFF00",
  neonPink: "#FF1493",
  neonBlue: "#4169FF",
  neonPurple: "#9D4EDD",
  black: "#000000",
  darkGray: "#0A0A0A",
} as const

export const EASING = {
  // Custom easing curves for professional motion
  easeOutExpo: [0.19, 1, 0.22, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  spring: { damping: 20, stiffness: 100 },
} as const
