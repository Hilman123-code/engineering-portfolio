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
