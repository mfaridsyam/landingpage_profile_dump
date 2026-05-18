import { ref, onMounted } from 'vue'

export function useBranchStatus() {
  const isOpen = ref(false)

  function check() {
    const now = new Date()
    const wib = new Date(now.getTime() + 8 * 3600000)
    const day = wib.getUTCDay()
    const h = wib.getUTCHours()
    const m = wib.getUTCMinutes()
    const t = h * 60 + m
    isOpen.value = day >= 1 && day <= 5 && t >= 480 && t < 900
  }

  onMounted(() => check())

  return { isOpen }
}
