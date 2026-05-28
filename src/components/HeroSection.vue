<template>
  <section class="hero" ref="heroRef">
    <canvas ref="canvasRef" class="hero-canvas" aria-hidden="true"></canvas>
    <div class="hero-glow" aria-hidden="true"></div>

    <!-- ── CENTERED HERO BODY ── -->
    <div class="hero-body">
      <!-- Frame A: outer group, column, center -->
      <div class="hero-content-group">
        <!-- Frame B: headline group, column, left-align -->
        <div class="hero-headline-group">
          <p class="hero-kicker">#MelayaniSepenuhHati</p>
          <h1 class="hero-h1">BANK RAKYAT INDONESIA</h1>
        </div>
        <!-- Description fills Frame A width, centered -->
        <p class="hero-desc">
          Melayani dengan sepenuh hati, mendorong pertumbuhan ekonomi masyarakat Polewali Mandar menuju<br>
          kesejahteraan yang berkelanjutan.
        </p>
      </div>
    </div>

    <!-- CTA Buttons: absolute, sejajar status pill, tengah bawah -->
    <div class="hero-ctas">
      <a href="#layanan" class="hero-btn-primary">
        Produk &amp; Layanan
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
      <a href="#kontak" class="hero-btn-ghost">Hubungi Kami</a>
    </div>

    <!-- ── BOTTOM STATS BAR ── -->
    <div class="hero-stats-bar">
      <div class="hero-stat">
        <span class="hero-stat-n">128<sup>+</sup></span>
        <span class="hero-stat-l">Tahun Melayani</span>
      </div>
      <div class="hero-stat-vline"></div>
      <div class="hero-stat">
        <span class="hero-stat-n">13</span>
        <span class="hero-stat-l">Unit Kerja</span>
      </div>
      <div class="hero-stat-vline"></div>
      <div class="hero-stat">
        <span class="hero-stat-n">24/7</span>
        <span class="hero-stat-l">ATM &amp; CDM</span>
      </div>
      <div class="hero-stat-vline"></div>
      <div class="hero-stat hero-stat-loc">
        <span class="hero-stat-n">Polewali</span>
        <span class="hero-stat-l">Sulawesi Barat</span>
      </div>
    </div>

    <!-- ── FLOATING STATUS PILL ── -->
    <div class="hero-status-float" ref="statusFloatRef" :class="isOpen ? 'is-open' : 'is-closed'">
      <Transition name="hours-drop">
        <div v-if="showHours" class="hero-hours-card">
          <div class="hero-hours-head">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
            Jam Operasional
          </div>
          <div class="hero-hours-list">
            <div v-for="row in hoursData" :key="row.id" class="hero-hours-row" :class="{ 'is-today': row.isToday }">
              <span class="hours-day">{{ row.day }}</span>
              <span class="hours-time" :class="{ closed: row.closed }">{{ row.closed ? 'Tutup' : '08.00 – 15.00' }}</span>
            </div>
          </div>
        </div>
      </Transition>
      <button class="hero-status-pill" @click="showHours = !showHours" :aria-expanded="showHours">
        <div class="status-pulse-dot"></div>
        <span>{{ isOpen ? 'Buka Sekarang' : 'Sedang Tutup' }}</span>
        <svg class="status-chevron" :class="{ rotated: showHours }" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
    </div>

  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useBranchStatus } from '@/composables/useBranchStatus.js'

const heroRef        = ref(null)
const canvasRef      = ref(null)
const showHours      = ref(false)
const statusFloatRef = ref(null)

// ── CANVAS PARTICLE NETWORK ──
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
  const section = heroRef.value
  canvas.width  = section.offsetWidth
  canvas.height = section.offsetHeight
  ctx = canvas.getContext('2d')

  const count = canvas.width < 700 ? 55 : 100
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
        const alpha = (1 - Math.sqrt(d) / LINE_DIST) * 0.22
        ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`
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
    ctx.fillStyle = 'rgba(255,255,255,0.30)'
    ctx.fill()
  }

  animId = requestAnimationFrame(tick)
}

function onCanvasMouseMove(e) {
  if (!heroRef.value) return
  const rect = heroRef.value.getBoundingClientRect()
  mouseX = e.clientX - rect.left
  mouseY = e.clientY - rect.top
}
function onCanvasMouseLeave() { mouseX = -9999; mouseY = -9999 }
function onResize() { if (canvasRef.value && heroRef.value) initCanvas() }
function onKeydown(e) { if (e.key === 'Escape') showHours.value = false }
function onClickOutside(e) {
  if (statusFloatRef.value && !statusFloatRef.value.contains(e.target))
    showHours.value = false
}

onMounted(() => {
  initCanvas()
  tick()
  heroRef.value?.addEventListener('mousemove',  onCanvasMouseMove)
  heroRef.value?.addEventListener('mouseleave', onCanvasMouseLeave)
  window.addEventListener('resize',    onResize)
  window.addEventListener('keydown',   onKeydown)
  document.addEventListener('mousedown', onClickOutside)
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  heroRef.value?.removeEventListener('mousemove',  onCanvasMouseMove)
  heroRef.value?.removeEventListener('mouseleave', onCanvasMouseLeave)
  window.removeEventListener('resize',   onResize)
  window.removeEventListener('keydown',  onKeydown)
  document.removeEventListener('mousedown', onClickOutside)
})

const { isOpen } = useBranchStatus()

const todayIdx = computed(() => {
  const wib = new Date(new Date().getTime() + 8 * 3600000)
  return wib.getUTCDay()
})

const hoursData = computed(() => {
  const days = [
    { id: 'mon', day: 'Senin',  closed: false, wday: 1 },
    { id: 'tue', day: 'Selasa', closed: false, wday: 2 },
    { id: 'wed', day: 'Rabu',   closed: false, wday: 3 },
    { id: 'thu', day: 'Kamis',  closed: false, wday: 4 },
    { id: 'fri', day: 'Jumat',  closed: false, wday: 5 },
    { id: 'sat', day: 'Sabtu',  closed: true,  wday: 6 },
    { id: 'sun', day: 'Minggu', closed: true,  wday: 0 },
  ]
  return days.map(d => ({ ...d, isToday: d.wday === todayIdx.value }))
})
</script>

<style scoped>
/* ── CANVAS ── */
.hero-canvas {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  pointer-events: none; z-index: 0;
}

/* ── CENTRAL AMBIENT GLOW ── */
.hero-glow {
  position: absolute;
  top: 35%; left: 50%;
  transform: translate(-50%, -50%);
  width: 800px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(0,87,184,0.13) 0%, transparent 65%);
  pointer-events: none; z-index: 0;
}

/* ── HERO BODY (centered) ── */
.hero-body {
  position: relative; z-index: 1;
  width: 100%;
  max-width: var(--max-w, 1280px);
  margin: 0 auto;
  padding: 0 var(--px, 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 68px - 78px);
  justify-content: center;
  padding-bottom: 100px;
}

/* ── CONTENT GROUP (Frame A: column, center) ── */
.hero-content-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

/* ── HEADLINE GROUP (Frame B: column, left-align) ── */
.hero-headline-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

/* ── KICKER ── */
.hero-kicker {
  font-size: 13px; font-weight: 600;
  color: rgba(255,255,255,0.40);
  letter-spacing: 0.05em;
  margin: 0;
}

/* ── MAIN HEADLINE ── */
.hero-h1 {
  font-size: clamp(44px, 6.5vw, 86px);
  font-weight: 800;
  line-height: 1.0;
  letter-spacing: -0.035em;
  color: #fff;
  margin: 0;
  white-space: nowrap;
}

/* ── DESCRIPTION ── */
.hero-desc {
  font-size: clamp(14px, 1.4vw, 17px);
  color: rgba(255,255,255,0.65);
  line-height: 1.78;
  width: 100%;
  text-align: center;
  margin: 0;
}

/* ── CTA BUTTONS ── */
.hero-ctas {
  position: absolute;
  bottom: 96px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 12px;
  white-space: nowrap;
}

.hero-btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 15px 34px;
  background: var(--bri-blue, #0057B8);
  color: #fff;
  border-radius: 100px;
  font-size: 14px; font-weight: 800;
  text-decoration: none;
  box-shadow: 0 4px 32px rgba(0,87,184,0.45);
  transition: transform 0.22s, box-shadow 0.22s, background 0.22s;
}

.hero-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 44px rgba(0,87,184,0.62);
  background: #0068d6;
}

.hero-btn-ghost {
  display: inline-flex; align-items: center;
  padding: 15px 34px;
  background: rgba(255,255,255,0.06);
  border: 1.5px solid rgba(255,255,255,0.16);
  color: rgba(255,255,255,0.80);
  border-radius: 100px;
  font-size: 14px; font-weight: 700;
  text-decoration: none;
  backdrop-filter: blur(8px);
  transition: background 0.22s, border-color 0.22s, transform 0.22s;
}

.hero-btn-ghost:hover {
  background: rgba(255,255,255,0.10);
  border-color: rgba(255,255,255,0.26);
  transform: translateY(-2px);
}

/* ── BOTTOM STATS BAR ── */
.hero-stats-bar {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 0 var(--px, 40px);
  height: 78px;
  border-top: 1px solid rgba(255,255,255,0.07);
  background: rgba(4,10,24,0.30);
  backdrop-filter: blur(6px);
}

.hero-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 0 36px;
}

.hero-stat-loc .hero-stat-n {
  font-size: 15px; letter-spacing: -0.01em;
}

.hero-stat-n {
  font-size: 21px; font-weight: 800;
  color: rgba(255,255,255,0.90);
  letter-spacing: -0.04em; line-height: 1;
}

.hero-stat-n sup {
  font-size: 11px; font-weight: 700;
  color: var(--bri-gold, #F5A623);
  vertical-align: top; margin-top: 2px;
}

.hero-stat-l {
  font-size: 9px; font-weight: 700;
  color: rgba(255,255,255,0.22);
  text-transform: uppercase; letter-spacing: 0.09em;
  white-space: nowrap;
}

.hero-stat-vline {
  width: 1px; height: 28px;
  background: rgba(255,255,255,0.08);
  flex-shrink: 0;
}

/* ── FLOATING STATUS PILL ── */
.hero-status-float {
  position: absolute; bottom: 96px; right: var(--px, 40px);
  z-index: 10;
  display: flex; flex-direction: column; align-items: flex-end; gap: 8px;
}

.hero-status-pill {
  display: inline-flex; align-items: center; gap: 9px;
  padding: 10px 16px; border-radius: 100px;
  border: 1.5px solid rgba(255,255,255,0.12);
  background: rgba(6,12,28,0.72);
  backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
  cursor: pointer; font-size: 12.5px; font-weight: 700;
  font-family: inherit; color: rgba(255,255,255,0.80);
  white-space: nowrap;
  transition: border-color 0.25s, background 0.25s, box-shadow 0.25s, transform 0.22s;
}

.is-open .hero-status-pill {
  border-color: rgba(74,222,128,0.40);
  background: rgba(16,185,129,0.14);
  box-shadow: 0 4px 20px rgba(22,163,74,0.18);
}

.is-closed .hero-status-pill {
  border-color: rgba(248,113,113,0.38);
  background: rgba(220,38,38,0.12);
  box-shadow: 0 4px 20px rgba(220,38,38,0.14);
}

.hero-status-pill:hover { transform: translateY(-1px); }

.status-pulse-dot {
  width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
  animation: pulse-status 2.5s ease-in-out infinite;
}

.is-open  .status-pulse-dot { background: #4ade80; box-shadow: 0 0 8px rgba(74,222,128,0.65); }
.is-closed .status-pulse-dot { background: #f87171; box-shadow: 0 0 8px rgba(248,113,113,0.65); }

@keyframes pulse-status {
  0%, 100% { opacity: 1; } 50% { opacity: 0.40; }
}

.status-chevron {
  color: rgba(255,255,255,0.38); flex-shrink: 0;
  transition: transform 0.28s cubic-bezier(0.22,1,0.36,1);
}
.status-chevron.rotated { transform: rotate(180deg); }

/* ── HOURS DROPDOWN ── */
.hero-hours-card {
  background: rgba(6,12,28,0.92);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border: 1.5px solid rgba(255,255,255,0.10);
  border-radius: 14px; width: 234px;
  box-shadow: 0 20px 56px rgba(0,0,0,0.55), inset 0 0 0 0.5px rgba(255,255,255,0.04);
  overflow: hidden;
}

.hero-hours-head {
  display: flex; align-items: center; gap: 8px;
  padding: 11px 14px;
  font-size: 10px; font-weight: 800;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: rgba(255,255,255,0.32);
  border-bottom: 1px solid rgba(255,255,255,0.07);
}

.hero-hours-list { padding: 4px 0; }

.hero-hours-row {
  display: flex; align-items: center;
  justify-content: space-between; padding: 7px 14px;
  transition: background 0.14s;
}

.hero-hours-row:hover { background: rgba(255,255,255,0.025); }
.hero-hours-row.is-today { background: rgba(255,255,255,0.04); }
.hours-day { font-size: 12.5px; color: rgba(255,255,255,0.52); }
.hero-hours-row.is-today .hours-day { font-weight: 700; color: rgba(255,255,255,0.94); }
.hours-time { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.72); }
.hours-time.closed { color: rgba(255,255,255,0.20); font-weight: 400; }
.hero-hours-row.is-today .hours-time:not(.closed) { color: #86efac; }

.hours-drop-enter-active { transition: opacity 0.22s ease, transform 0.26s cubic-bezier(0.22,1,0.36,1); }
.hours-drop-leave-active { transition: opacity 0.16s ease, transform 0.18s ease; }
.hours-drop-enter-from { opacity: 0; transform: translateY(10px) scale(0.96); }
.hours-drop-leave-to   { opacity: 0; transform: translateY(8px)  scale(0.97); }

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .hero-body { padding-bottom: 80px; }
  .hero-h1 { white-space: normal; }
  .hero-ctas { bottom: 88px; gap: 10px; }
  .hero-status-float { bottom: 148px; right: var(--px, 40px); }
  .hero-stat { padding: 0 20px; }
  .hero-stat-loc { display: none; }
  .hero-desc br.hero-br { display: none; }
  .hero-stats-bar { overflow-x: auto; justify-content: flex-start; padding: 0 var(--px); }
}

@media (max-width: 480px) {
  .hero-h1 { font-size: clamp(32px, 8vw, 52px); }
  .hero-ctas { flex-direction: column; align-items: center; bottom: 100px; }
  .hero-status-float { bottom: 188px; right: 16px; }
  .hero-stat { padding: 0 16px; }
}
</style>
