// Animation utility functions for smooth, professional motion

/**
 * Interpolates a value based on frame progress
 */
export function interpolate(
  frame: number,
  inputRange: [number, number],
  outputRange: [number, number],
  options?: {
    extrapolateLeft?: "clamp" | "extend"
    extrapolateRight?: "clamp" | "extend"
    easing?: (t: number) => number
  },
): number {
  const { extrapolateLeft = "clamp", extrapolateRight = "clamp", easing } = options || {}

  const [inputMin, inputMax] = inputRange
  const [outputMin, outputMax] = outputRange

  let progress = (frame - inputMin) / (inputMax - inputMin)

  // Handle extrapolation
  if (progress < 0 && extrapolateLeft === "clamp") progress = 0
  if (progress > 1 && extrapolateRight === "clamp") progress = 1

  // Apply easing if provided
  if (easing) progress = easing(progress)

  return outputMin + progress * (outputMax - outputMin)
}

/**
 * Easing functions for professional motion
 */
export const easing = {
  easeOutExpo: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeInOutCubic: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  easeOutBack: (t: number) => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
  },
  easeInOutQuart: (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2),
}

/**
 * Spring animation calculator
 */
export function spring({
  frame,
  fps,
  from = 0,
  to = 1,
  config = { damping: 20, stiffness: 100, mass: 1 },
}: {
  frame: number
  fps: number
  from?: number
  to?: number
  config?: { damping: number; stiffness: number; mass?: number }
}): number {
  const { damping, stiffness, mass = 1 } = config
  const t = frame / fps

  const angularFreq = Math.sqrt(stiffness / mass)
  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass))

  if (dampingRatio < 1) {
    // Underdamped
    const dampedFreq = angularFreq * Math.sqrt(1 - dampingRatio * dampingRatio)
    const amplitude = 1
    const phase = Math.atan2(dampingRatio * angularFreq, dampedFreq)

    return to - (to - from) * amplitude * Math.exp(-dampingRatio * angularFreq * t) * Math.cos(dampedFreq * t - phase)
  } else {
    // Critically damped or overdamped
    return to - (to - from) * Math.exp(-angularFreq * t) * (1 + angularFreq * t)
  }
}

/**
 * Stagger animation delays for multiple elements
 */
export function stagger(index: number, staggerDelay = 3): number {
  return index * staggerDelay
}

/**
 * Loop animation within a frame range
 */
export function loop(frame: number, duration: number): number {
  return frame % duration
}

/**
 * Delay animation start
 */
export function delay(frame: number, delayFrames: number): number {
  return Math.max(0, frame - delayFrames)
}

/**
 * Calculate opacity for fade in/out effects
 */
export function fade(frame: number, type: "in" | "out" | "inOut", duration = 15): number {
  if (type === "in") {
    return interpolate(frame, [0, duration], [0, 1], { easing: easing.easeOutExpo })
  } else if (type === "out") {
    return interpolate(frame, [0, duration], [1, 0], { easing: easing.easeInOutCubic })
  } else {
    // inOut
    const halfDuration = duration / 2
    if (frame < halfDuration) {
      return interpolate(frame, [0, halfDuration], [0, 1], { easing: easing.easeOutExpo })
    } else {
      return interpolate(frame, [halfDuration, duration], [1, 0], { easing: easing.easeInOutCubic })
    }
  }
}

/**
 * Scale animation helper
 */
export function scale(frame: number, from = 0, to = 1, duration = 30): number {
  return interpolate(frame, [0, duration], [from, to], { easing: easing.easeOutBack })
}

/**
 * Rotate animation helper (returns degrees)
 */
export function rotate(frame: number, speed = 1): number {
  return (frame * speed) % 360
}
