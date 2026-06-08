<template>
  <Teleport to="body">
    <div class="cur-dot"  :style="dotStyle"  :class="{ 'cur-hidden': !visible }" aria-hidden="true" />
    <div class="cur-ring" :style="ringStyle" :class="{ 'cur-hidden': !visible, 'cur-hover': hovered }" aria-hidden="true" />
  </Teleport>
</template>

<script setup>
import { reactive, ref, onMounted, onUnmounted } from 'vue'

let mx = -200, my = -200
let rx = -200, ry = -200
let raf = null

const dotStyle  = reactive({})
const ringStyle = reactive({})
const visible   = ref(true)
const hovered   = ref(false)

function lerp(a, b, t) { return a + (b - a) * t }

function onMove(e) {
  mx = e.clientX
  my = e.clientY
  if (!visible.value) visible.value = true
  const el = document.elementFromPoint(mx, my)
  hovered.value = !!(el && el.closest('a, button, [role="button"], input, textarea, select, label'))
}

function hide() { visible.value = false }
function show() { visible.value = true }
function onVisibility() { if (document.hidden) hide(); else show() }

function tick() {
  rx = lerp(rx, mx, 0.18)
  ry = lerp(ry, my, 0.18)
  dotStyle.transform  = `translate3d(${mx}px, ${my}px, 0)`
  ringStyle.transform = `translate3d(${rx}px, ${ry}px, 0)`
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  window.addEventListener('mousemove', onMove, { passive: true })
  document.addEventListener('mouseleave', hide)
  document.addEventListener('mouseenter', show)
  document.addEventListener('visibilitychange', onVisibility)
  raf = requestAnimationFrame(tick)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
  document.removeEventListener('mouseleave', hide)
  document.removeEventListener('mouseenter', show)
  document.removeEventListener('visibilitychange', onVisibility)
  cancelAnimationFrame(raf)
})
</script>

<style>
*, *::before, *::after { cursor: none !important; }

.cur-dot,
.cur-ring {
  position: fixed;
  top: 0; left: 0;
  pointer-events: none;
  z-index: 2147483647;
  will-change: transform;
  border-radius: 50%;
}

.cur-hidden { opacity: 0 !important; }

.cur-dot {
  width: 5px; height: 5px;
  background: #0057b8;
  margin-left: -2.5px; margin-top: -2.5px;
  transition: opacity 0.15s ease, transform 0.1s ease;
}

.cur-ring {
  width: 26px; height: 26px;
  border: 1.5px solid rgba(0, 87, 184, 0.40);
  margin-left: -13px; margin-top: -13px;
  transition:
    width 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    height 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    margin 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.20s ease,
    opacity 0.15s ease;
}

.cur-ring.cur-hover {
  width: 38px; height: 38px;
  margin-left: -19px; margin-top: -19px;
  border-color: rgba(0, 87, 184, 0.65);
}
</style>
