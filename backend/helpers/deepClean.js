import xss from "xss"

export function deepClean(obj) {
  if (obj == null) return obj
  if (typeof obj === "string") return xss(obj) // sanitize strings
  if (Array.isArray(obj)) return obj.map(deepClean)
  if (typeof obj === "object") {
    const out = {}
    for (const [k, v] of Object.entries(obj)) out[k] = deepClean(v)
    return out
  }
  return obj
}
