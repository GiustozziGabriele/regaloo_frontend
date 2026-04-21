// lib/utils.js
export const getHostname = (url) => {
  try {
    return new URL(url).hostname
  } catch {
    return null
  }
}