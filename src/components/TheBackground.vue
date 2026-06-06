<template>
  <canvas ref="canvasRef" class="global-canvas" aria-hidden="true"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)

let animId = null
let ctx    = null
let nodes  = []
let mouseX = -9999
let mouseY = -9999

const LINE_DIST      = 200
const REPEL_RADIUS   = 160
const REPEL_STRENGTH = 3.5
const ANGLE_DRIFT    = 0.018

function initCanvas() {
  const canvas  = canvasRef.value
  if (!canvas) return
  canvas.width  = window.innerWidth
  canvas.height = window.innerHeight
  ctx = canvas.getContext('2d')

  const count = canvas.width < 700 ? 55 : 110
  nodes = Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2
    const speed = 0.12 + Math.random() * 0.18
    return {
      x:      Math.random() * canvas.width,
      y:      Math.random() * canvas.height,
      angle,
      speed,
      vx:     Math.cos(angle) * speed,
      vy:     Math.sin(angle) * speed,
      r:      Math.random() * 1.1 + 0.65,
      repelX: 0,
      repelY: 0,
    }
  })
}

function tick() {
  const canvas = canvasRef.value
  if (!canvas || !ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (const n of nodes) {
    n.angle += (Math.random() - 0.5) * ANGLE_DRIFT
    n.vx = Math.cos(n.angle) * n.speed
    n.vy = Math.sin(n.angle) * n.speed

    const dx   = n.x - mouseX
    const dy   = n.y - mouseY
    const dist = Math.hypot(dx, dy)
    if (dist < REPEL_RADIUS && dist > 1) {
      const f = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH / dist
      n.repelX += dx * f
      n.repelY += dy * f
    }
    n.repelX *= 0.82
    n.repelY *= 0.82

    n.x += n.vx + n.repelX
    n.y += n.vy + n.repelY

    if (n.x < 0)             { n.x = 0;             n.angle = Math.PI - n.angle }
    if (n.x > canvas.width)  { n.x = canvas.width;  n.angle = Math.PI - n.angle }
    if (n.y < 0)             { n.y = 0;             n.angle = -n.angle }
    if (n.y > canvas.height) { n.y = canvas.height; n.angle = -n.angle }
  }

  ctx.lineWidth = 1.2
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      const d  = dx * dx + dy * dy
      if (d < LINE_DIST * LINE_DIST) {
        const alpha = (1 - Math.sqrt(d) / LINE_DIST) * 0.20
        ctx.strokeStyle = `rgba(0,63,136,${(alpha * 0.75).toFixed(3)})`
        ctx.beginPath()
        ctx.moveTo(nodes[i].x, nodes[i].y)
        ctx.lineTo(nodes[j].x, nodes[j].y)
        ctx.stroke()
      }
    }
  }

  for (const n of nodes) {
    ctx.beginPath()
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(0,63,136,0.16)'
    ctx.fill()
  }

  animId = requestAnimationFrame(tick)
}

function onMouseMove(e) { mouseX = e.clientX; mouseY = e.clientY }
function onMouseLeave() { mouseX = -9999; mouseY = -9999 }
function onResize() { initCanvas() }

onMounted(() => {
  initCanvas()
  tick()
  window.addEventListener('mousemove',  onMouseMove,  { passive: true })
  window.addEventListener('mouseleave', onMouseLeave, { passive: true })
  window.addEventListener('resize',     onResize,     { passive: true })
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('mousemove',  onMouseMove)
  window.removeEventListener('mouseleave', onMouseLeave)
  window.removeEventListener('resize',     onResize)
})
</script>

<style scoped>
.global-canvas {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
}
</style>
