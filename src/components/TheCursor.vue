<template>
  <Teleport to="body">
    <div ref="dotEl" class="cur-dot" :class="{ 'cur-hidden': !visible }" aria-hidden="true" />
    <div ref="ringEl" class="cur-ring" :class="{ 'cur-hidden': !visible, 'cur-hover': hovered }" aria-hidden="true" />
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const dotEl  = ref(null)
const ringEl = ref(null)
const visible = ref(false)
const hovered = ref(false)

let mx = -200, my = -200
let rx = -200, ry = -200
let raf = null

function lerp(a, b, t) { return a + (b - a) * t }

function onMove(e) {
  mx = e.clientX; my = e.clientY
  if (!visible.value) {
    rx = mx; ry = my  // teleport ring on first appearance — no slide-in artifact
    visible.value = true
  }
  const el = document.elementFromPoint(mx, my)
  hovered.value = !!(el && el.closest('a,button,[role="button"],input,textarea,select,label'))
}

function tick() {
  rx = lerp(rx, mx, 0.18)
  ry = lerp(ry, my, 0.18)
  if (dotEl.value)  dotEl.value.style.transform  = `translate3d(${mx}px,${my}px,0)`
  if (ringEl.value) ringEl.value.style.transform = `translate3d(${rx}px,${ry}px,0)`
  raf = requestAnimationFrame(tick)
}

function hide() { visible.value = false }
function show() { visible.value = true }
function onViz() { if (document.hidden) hide(); else show() }

onMounted(() => {
  window.addEventListener('mousemove', onMove, { passive: true })
  document.addEventListener('mouseleave', hide)
  document.addEventListener('mouseenter', show)
  document.addEventListener('visibilitychange', onViz)
  raf = requestAnimationFrame(tick)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
  document.removeEventListener('mouseleave', hide)
  document.removeEventListener('mouseenter', show)
  document.removeEventListener('visibilitychange', onViz)
  cancelAnimationFrame(raf)
})
</script>

<style>
*, *::before, *::after { cursor: none !important; }

.cur-dot, .cur-ring {
  position: fixed;
  top: 0; left: 0;
  pointer-events: none;
  z-index: 2147483647;
  will-change: transform;
}

.cur-hidden { opacity: 0; }

/* Dot — mix-blend-mode: difference makes it visible on any background */
.cur-dot {
  width: 5px; height: 5px;
  background: #fff;
  border-radius: 50%;
  margin-left: -2.5px; margin-top: -2.5px;
  mix-blend-mode: difference;
  transition: opacity 0.18s ease;
}

/* Ring via outline-offset — mix-blend-mode: difference for all-background visibility */
.cur-ring {
  width: 0; height: 0;
  border-radius: 50%;
  outline: 1.5px solid #fff;
  outline-offset: 13px;
  mix-blend-mode: difference;
  transition:
    outline-offset 0.32s cubic-bezier(0.22, 1, 0.36, 1),
    outline-width  0.22s ease,
    opacity        0.18s ease;
}

/* Hover state: ring expands, gets bolder */
.cur-ring.cur-hover {
  outline-offset: 19px;
  outline-width: 2px;
}
</style>
