import { onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal() {
  onMounted(async () => {
    await nextTick()

    document.querySelectorAll('.reveal').forEach(el => {
      const delay =
        el.classList.contains('reveal-delay-4') ? 0.40 :
        el.classList.contains('reveal-delay-3') ? 0.30 :
        el.classList.contains('reveal-delay-2') ? 0.20 :
        el.classList.contains('reveal-delay-1') ? 0.10 : 0

      gsap.fromTo(el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  })
}
