import { useCurrentFrame } from "remotion"
import { delay } from "../utils/animation-helpers"

/**
 * Hook for delayed animations
 */
export function useDelayedAnimation(delayFrames: number) {
  const frame = useCurrentFrame()
  const delayedFrame = delay(frame, delayFrames)

  return {
    frame: delayedFrame,
    isActive: frame >= delayFrames,
    progress: delayedFrame / (frame || 1),
  }
}
