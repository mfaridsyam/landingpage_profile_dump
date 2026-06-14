<template>
  <Teleport to="body">
    <div ref="dotEl"  class="cur-dot"  :class="{ 'cur-hidden': !visible }" aria-hidden="true" />
    <div ref="ringEl" class="cur-ring" :class="{ 'cur-hidden': !visible }" aria-hidden="true" />
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const dotEl   = ref(null)
const ringEl  = ref(null)
const visible = ref(false)
const hovered = ref(false)

let mx = -200, my = -200
let dotRot   = 45
let ringRot  = 0
let ringScale = 1
let raf = null

function lerp(a, b, t) { return a + (b - a) * t }

function onMove(e) {
  mx = e.clientX; my = e.clientY
  if (!visible.value) visible.value = true
  const el = document.elementFromPoint(mx, my)
  hovered.value = !!(el && el.closest('a,button,[role="button"],input,textarea,select,label'))
}

function tick() {
  dotRot    = lerp(dotRot,    hovered.value ? 0  : 45,  0.22)
  ringRot   = lerp(ringRot,   hovered.value ? 45 : 0,   0.22)
  ringScale = lerp(ringScale, hovered.value ? 1.6 : 1,  0.18)

  if (dotEl.value)
    dotEl.value.style.transform = `translate3d(${mx}px,${my}px,0) rotate(${dotRot}deg)`

  if (ringEl.value)
    ringEl.value.style.transform = `translate3d(${mx}px,${my}px,0) scale(${ringScale}) rotate(${ringRot}deg)`

  raf = requestAnimationFrame(tick)
}

function hide() { visible.value = false }
function show() { visible.value = true }
function onViz() { if (document.hidden) hide(); else show() }

// Only run the custom cursor on devices that have a real mouse (fine pointer).
// Phones/tablets keep their native touch behavior and skip the rAF loop entirely.
const hasMouse = typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

onMounted(() => {
  if (!hasMouse) return
  window.addEventListener('mousemove', onMove, { passive: true })
  document.addEventListener('mouseleave', hide)
  document.addEventListener('mouseenter', show)
  document.addEventListener('visibilitychange', onViz)
  raf = requestAnimationFrame(tick)
})

onUnmounted(() => {
  if (!hasMouse) return
  window.removeEventListener('mousemove', onMove)
  document.removeEventListener('mouseleave', hide)
  document.removeEventListener('mouseenter', show)
  document.removeEventListener('visibilitychange', onViz)
  cancelAnimationFrame(raf)
})
</script>

<style>
@media (hover: hover) and (pointer: fine) {
  *, *::before, *::after { cursor: none !important; }
}

.cur-dot, .cur-ring {
  position: fixed;
  top: 0; left: 0;
  pointer-events: none;
  z-index: 2147483647;
  will-change: transform;
}

.cur-hidden { opacity: 0 !important; }

/* Never show the custom cursor on touch / no-mouse devices */
@media (hover: none), (pointer: coarse) {
  .cur-dot, .cur-ring { display: none !important; }
}

/* Dot: sharp square — starts rotated 45° (diamond), lerps to 0° (square) on hover */
.cur-dot {
  width: 6px; height: 6px;
  background: #fff;
  border-radius: 0;
  margin-left: -3px; margin-top: -3px;
  mix-blend-mode: difference;
  transition: opacity 0.18s ease;
}

/* Ring: sharp square outline — starts square, lerps to 45° (diamond) and scales on hover */
.cur-ring {
  width: 22px; height: 22px;
  margin-left: -11px; margin-top: -11px;
  border: 1.5px solid #fff;
  border-radius: 0;
  mix-blend-mode: difference;
  transition: opacity 0.18s ease;
}
</style>
