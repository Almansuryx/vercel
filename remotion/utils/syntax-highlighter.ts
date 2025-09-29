// Syntax highlighting utility for code blocks

export interface SyntaxToken {
  type: "keyword" | "string" | "comment" | "function" | "variable" | "operator" | "number" | "default"
  value: string
  color: string
}

const SYNTAX_COLORS = {
  keyword: "#FF00FF", // Magenta
  string: "#CCFF00", // Lime
  comment: "#666666", // Gray
  function: "#00FFFF", // Cyan
  variable: "#FF6B35", // Orange
  operator: "#FFFFFF", // White
  number: "#FF1493", // Pink
  default: "#FFFFFF", // White
}

/**
 * Simple syntax highlighter for JavaScript/TypeScript
 */
export function highlightCode(code: string): SyntaxToken[] {
  const tokens: SyntaxToken[] = []

  const keywords = [
    "const",
    "let",
    "var",
    "function",
    "return",
    "if",
    "else",
    "for",
    "while",
    "import",
    "export",
    "from",
    "class",
    "interface",
    "type",
    "async",
    "await",
    "new",
    "this",
  ]

  // Split code into lines and process each
  const lines = code.split("\n")

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const currentPos = 0

    // Check for comments
    if (line.trim().startsWith("//")) {
      tokens.push({
        type: "comment",
        value: line,
        color: SYNTAX_COLORS.comment,
      })
      if (i < lines.length - 1) {
        tokens.push({ type: "default", value: "\n", color: SYNTAX_COLORS.default })
      }
      continue
    }

    // Simple tokenization
    const words = line.split(/(\s+|[(){}[\];,.])/g)

    for (const word of words) {
      if (!word) continue

      // Check for strings
      if (word.startsWith('"') || word.startsWith("'") || word.startsWith("`")) {
        tokens.push({
          type: "string",
          value: word,
          color: SYNTAX_COLORS.string,
        })
      }
      // Check for numbers
      else if (/^\d+$/.test(word)) {
        tokens.push({
          type: "number",
          value: word,
          color: SYNTAX_COLORS.number,
        })
      }
      // Check for keywords
      else if (keywords.includes(word)) {
        tokens.push({
          type: "keyword",
          value: word,
          color: SYNTAX_COLORS.keyword,
        })
      }
      // Check for functions (word followed by parenthesis)
      else if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(word)) {
        tokens.push({
          type: "function",
          value: word,
          color: SYNTAX_COLORS.function,
        })
      }
      // Default
      else {
        tokens.push({
          type: "default",
          value: word,
          color: SYNTAX_COLORS.default,
        })
      }
    }

    // Add newline if not last line
    if (i < lines.length - 1) {
      tokens.push({ type: "default", value: "\n", color: SYNTAX_COLORS.default })
    }
  }

  return tokens
}

/**
 * Get line count from code
 */
export function getLineCount(code: string): number {
  return code.split("\n").length
}

/**
 * Get specific lines from code
 */
export function getLines(code: string, start: number, end: number): string {
  const lines = code.split("\n")
  return lines.slice(start - 1, end).join("\n")
}
