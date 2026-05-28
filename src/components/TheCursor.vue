<template>
  <div aria-hidden="true">
    <div class="cur-dot"   :style="dotStyle"  />
    <div class="cur-ring"  :style="ringStyle" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const mx = ref(-200)
const my = ref(-200)
const rx = ref(-200)
const ry = ref(-200)
let raf = null

function onMove(e) { mx.value = e.clientX; my.value = e.clientY }

function lerp(a, b, t) { return a + (b - a) * t }

function loop() {
  rx.value = lerp(rx.value, mx.value, 0.14)
  ry.value = lerp(ry.value, my.value, 0.14)
  raf = requestAnimationFrame(loop)
}

const dotStyle  = reactive({})
const ringStyle = reactive({})

function tick() {
  rx.value = lerp(rx.value, mx.value, 0.14)
  ry.value = lerp(ry.value, my.value, 0.14)
  dotStyle.transform  = `translate(${mx.value}px, ${my.value}px)`
  ringStyle.transform = `translate(${rx.value}px, ${ry.value}px)`
  raf = requestAnimationFrame(tick)
}

const isHovering = ref(false)

function onEnter() { isHovering.value = true }
function onLeave() { isHovering.value = false }

onMounted(() => {
  window.addEventListener('mousemove', onMove, { passive: true })
  document.querySelectorAll('a, button, [role="button"], label, input, select, textarea').forEach(el => {
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
  })
  raf = requestAnimationFrame(tick)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
  cancelAnimationFrame(raf)
})
</script>

<style scoped>
.cur-dot,
.cur-ring {
  position: fixed;
  top: 0; left: 0;
  pointer-events: none;
  z-index: 99999;
  will-change: transform;
  border-radius: 50%;
}

.cur-dot {
  width: 6px; height: 6px;
  background: #fff;
  margin-left: -3px; margin-top: -3px;
  transition: opacity 0.2s, width 0.2s, height 0.2s;
}

.cur-ring {
  width: 32px; height: 32px;
  border: 1.5px solid rgba(255,255,255,0.40);
  background: rgba(0,87,184,0.08);
  margin-left: -16px; margin-top: -16px;
  backdrop-filter: blur(2px);
  transition: width 0.22s cubic-bezier(0.22,1,0.36,1),
              height 0.22s cubic-bezier(0.22,1,0.36,1),
              border-color 0.22s,
              background 0.22s;
}
</style>
