// Dynamic content injection system

export interface VideoContent {
  title?: string
  subtitle?: string
  description?: string
  bulletPoints?: string[]
  codeSnippets?: Array<{
    language: string
    code: string
  }>
  images?: string[]
  callToAction?: string
}

/**
 * Validate and sanitize content
 */
export function sanitizeContent(content: VideoContent): VideoContent {
  return {
    title: content.title?.trim() || "",
    subtitle: content.subtitle?.trim() || "",
    description: content.description?.trim() || "",
    bulletPoints: content.bulletPoints?.map((point) => point.trim()).filter(Boolean) || [],
    codeSnippets: content.codeSnippets || [],
    images: content.images || [],
    callToAction: content.callToAction?.trim() || "",
  }
}

/**
 * Calculate optimal duration based on content length
 */
export function calculateOptimalDuration(content: VideoContent, fps = 60): number {
  let baseDuration = 180 // 3 seconds minimum

  // Add time for title
  if (content.title) {
    baseDuration += 60 // 1 second
  }

  // Add time for bullet points
  if (content.bulletPoints) {
    baseDuration += content.bulletPoints.length * 45 // 0.75 seconds per point
  }

  // Add time for code snippets
  if (content.codeSnippets) {
    baseDuration += content.codeSnippets.length * 120 // 2 seconds per snippet
  }

  return baseDuration
}
