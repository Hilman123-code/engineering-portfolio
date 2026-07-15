/**
 * Ensures external links always have a protocol, so hrefs like
 * "www.linkedin.com/..." don't get treated as an internal route
 * by the browser (which causes a 404 within the SPA instead of
 * navigating to the external site).
 */
export function normalizeUrl(url) {
  if (!url) return '#'
  return /^https?:\/\//i.test(url) ? url : `https://${url}`
}

/**
 * Ensures local static asset paths (e.g. a resume PDF served from
 * /public) always start with a leading slash. Without it, a value
 * like "resume.pdf" resolves relative to the current route (e.g.
 * "/projects/resume.pdf") and 404s inside the SPA instead of
 * pointing at the actual file.
 */
export function normalizeAssetPath(path, fallback) {
  if (!path) return fallback
  if (/^https?:\/\//i.test(path)) return path
  return path.startsWith('/') ? path : `/${path}`
}
