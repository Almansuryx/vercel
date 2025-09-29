import { useCurrentFrame, useVideoConfig } from "remotion"

/**
 * Custom hook for accessing animation frame data
 */
export function useAnimationFrame() {
  const frame = useCurrentFrame()
  const { fps, durationInFrames, width, height } = useVideoConfig()

  const progress = frame / durationInFrames
  const time = frame / fps

  return {
    frame,
    fps,
    durationInFrames,
    width,
    height,
    progress,
    time,
  }
}
