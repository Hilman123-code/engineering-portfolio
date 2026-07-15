import { describe, it, expect } from 'vitest'
import { normalizeUrl, normalizeAssetPath } from './helpers'

describe('normalizeUrl', () => {
  it('adds https:// when the URL has no protocol', () => {
    expect(normalizeUrl('www.linkedin.com/in/muhdhilman24')).toBe(
      'https://www.linkedin.com/in/muhdhilman24'
    )
  })

  it('leaves the URL unchanged when it already has https://', () => {
    expect(normalizeUrl('https://github.com/hilman')).toBe(
      'https://github.com/hilman'
    )
  })

  it('leaves the URL unchanged when it already has http://', () => {
    expect(normalizeUrl('http://example.com')).toBe('http://example.com')
  })

  it('returns "#" when the URL is empty, null, or undefined', () => {
    expect(normalizeUrl('')).toBe('#')
    expect(normalizeUrl(null)).toBe('#')
    expect(normalizeUrl(undefined)).toBe('#')
  })
})

describe('normalizeAssetPath', () => {
  it('adds a leading slash when missing', () => {
    expect(normalizeAssetPath('ResumeHF.pdf', '/resume/resume.pdf')).toBe(
      '/ResumeHF.pdf'
    )
  })

  it('leaves the path unchanged when it already starts with /', () => {
    expect(normalizeAssetPath('/resume/ResumeHF.pdf', '/resume/resume.pdf')).toBe(
      '/resume/ResumeHF.pdf'
    )
  })

  it('leaves full external URLs unchanged', () => {
    expect(
      normalizeAssetPath('https://cdn.example.com/resume.pdf', '/resume/resume.pdf')
    ).toBe('https://cdn.example.com/resume.pdf')
  })

  it('returns the fallback when path is empty, null, or undefined', () => {
    expect(normalizeAssetPath('', '/resume/resume.pdf')).toBe('/resume/resume.pdf')
    expect(normalizeAssetPath(null, '/resume/resume.pdf')).toBe('/resume/resume.pdf')
    expect(normalizeAssetPath(undefined, '/resume/resume.pdf')).toBe(
      '/resume/resume.pdf'
    )
  })
})
