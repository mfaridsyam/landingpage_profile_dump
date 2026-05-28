import { onMounted, nextTick } from 'vue'

export function useScrollReveal() {
  onMounted(async () => {
    await nextTick()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
    )

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
  })
}
