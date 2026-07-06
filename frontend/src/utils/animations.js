import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const revealOnScroll = (selector) => {
  gsap.from(selector, {
    opacity: 0,
    y: 60,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.15,
    scrollTrigger: {
      trigger: selector,
      start: 'top 85%'
    }
  })
}