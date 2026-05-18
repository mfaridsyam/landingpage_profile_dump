<template>
  <canvas ref="canvasRef" class="particles-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let animId = null

onMounted(() => {
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')

  function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  // BRI-themed: rupiah coins / small rectangles (like banknotes) floating
  const COUNT = 18
  const symbols = ['₨', '✦', '◈', '⬡', '▣', '◆']

  const particles = Array.from({ length: COUNT }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: 10 + Math.random() * 18,
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
    speedX: (Math.random() - 0.5) * 0.28,
    speedY: -0.15 - Math.random() * 0.25,
    opacity: 0.03 + Math.random() * 0.07,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.005,
  }))

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (const p of particles) {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      ctx.globalAlpha = p.opacity
      ctx.fillStyle = '#60a5fa'
      ctx.font = `${p.size}px Inter, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.filter = 'blur(1.2px)'
      ctx.fillText(p.symbol, 0, 0)
      ctx.restore()

      p.x += p.speedX
      p.y += p.speedY
      p.rotation += p.rotSpeed

      // wrap around
      if (p.y < -40) p.y = canvas.height + 40
      if (p.x < -40) p.x = canvas.width + 40
      if (p.x > canvas.width + 40) p.x = -40
    }
    animId = requestAnimationFrame(draw)
  }

  draw()

  onUnmounted(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', resize)
  })
})
</script>

<style scoped>
.particles-canvas {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  /* sits BELOW the dot grid (body::before z-index 0 stacking context) */
}
</style>