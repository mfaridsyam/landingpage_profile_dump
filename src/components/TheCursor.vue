<template>
  <Teleport to="body">
    <div class="cur-dot"  :style="dotStyle"  :class="{ 'cur-hidden': !visible }" aria-hidden="true" />
    <div class="cur-ring" :style="ringStyle" :class="{ 'cur-hidden': !visible }" aria-hidden="true" />
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

function lerp(a, b, t) { return a + (b - a) * t }

function onMove(e) { mx = e.clientX; my = e.clientY; show() }
function hide() { visible.value = false }
function show() { visible.value = true }
function onVisibility() { if (document.hidden) hide(); else show() }

function tick() {
  rx = lerp(rx, mx, 0.14)
  ry = lerp(ry, my, 0.14)
  dotStyle.transform  = `translate(${mx}px, ${my}px)`
  ringStyle.transform = `translate(${rx}px, ${ry}px)`
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
.cur-dot,
.cur-ring {
  position: fixed;
  top: 0; left: 0;
  pointer-events: none;
  z-index: 2147483647;
  will-change: transform;
  border-radius: 50%;
  transition: opacity 0.2s ease;
}

.cur-hidden { opacity: 0; }

.cur-dot {
  width: 6px; height: 6px;
  background: #0057b8;
  margin-left: -3px; margin-top: -3px;
}

.cur-ring {
  width: 32px; height: 32px;
  border: 1.5px solid rgba(0,63,136,0.35);
  background: rgba(0,87,184,0.08);
  margin-left: -16px; margin-top: -16px;
  backdrop-filter: blur(2px);
  transition: width 0.22s cubic-bezier(0.22,1,0.36,1),
              height 0.22s cubic-bezier(0.22,1,0.36,1),
              border-color 0.22s,
              background 0.22s,
              opacity 0.2s ease;
}
</style>
