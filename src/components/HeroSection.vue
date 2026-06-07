<template>
  <section class="hero">
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

const showHours      = ref(false)
const statusFloatRef = ref(null)

function onKeydown(e) { if (e.key === 'Escape') showHours.value = false }
function onClickOutside(e) {
  if (statusFloatRef.value && !statusFloatRef.value.contains(e.target))
    showHours.value = false
}

onMounted(() => {
  window.addEventListener('keydown',    onKeydown)
  document.addEventListener('mousedown', onClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('keydown',    onKeydown)
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
/* ── CENTRAL AMBIENT GLOW ── */
.hero-glow {
  position: absolute;
  top: 35%; left: 50%;
  transform: translate(-50%, -50%);
  width: 800px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(0,87,184,0.07) 0%, transparent 65%);
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
  color: rgba(10,22,40,0.65);
  letter-spacing: 0.05em;
  margin: 0;
}

/* ── MAIN HEADLINE ── */
.hero-h1 {
  font-size: clamp(44px, 6.5vw, 86px);
  font-weight: 800;
  line-height: 1.0;
  letter-spacing: -0.035em;
  color: var(--ink, #0A1628);
  margin: 0;
  white-space: nowrap;
}

/* ── DESCRIPTION ── */
.hero-desc {
  font-size: clamp(14px, 1.4vw, 17px);
  color: rgba(10,22,40,0.75);
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
  background: rgba(255,255,255,0.65);
  border: 1.5px solid rgba(0,63,136,0.18);
  color: rgba(10,22,40,0.75);
  border-radius: 100px;
  font-size: 14px; font-weight: 700;
  text-decoration: none;
  backdrop-filter: blur(8px);
  transition: background 0.22s, border-color 0.22s, transform 0.22s, color 0.22s;
}

.hero-btn-ghost:hover {
  background: rgba(255,255,255,0.90);
  border-color: rgba(0,63,136,0.32);
  color: var(--ink, #0A1628);
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
  border-top: 1px solid rgba(0,63,136,0.10);
  background: rgba(255,255,255,0.45);
  backdrop-filter: blur(8px);
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
  color: rgba(10,22,40,0.90);
  letter-spacing: -0.04em; line-height: 1;
}

.hero-stat-n sup {
  font-size: 11px; font-weight: 700;
  color: var(--bri-gold, #F5A623);
  vertical-align: top; margin-top: 2px;
}

.hero-stat-l {
  font-size: 9px; font-weight: 700;
  color: rgba(10,22,40,0.60);
  text-transform: uppercase; letter-spacing: 0.09em;
  white-space: nowrap;
}

.hero-stat-vline {
  width: 1px; height: 28px;
  background: rgba(0,63,136,0.10);
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
  padding: 10px 18px; border-radius: 100px;
  border: 2px solid rgba(0,63,136,0.18);
  background: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
  cursor: pointer; font-size: 12.5px; font-weight: 700;
  font-family: inherit; color: rgba(10,22,40,0.82);
  white-space: nowrap;
  transition: border-color 0.25s, background 0.25s, box-shadow 0.25s, transform 0.22s;
}

.is-open .hero-status-pill {
  border-color: rgba(34,197,94,0.70);
  background: #f0fdf4;
  box-shadow: 0 2px 14px rgba(34,197,94,0.18);
}

.is-closed .hero-status-pill {
  border-color: rgba(239,68,68,0.65);
  background: #ffffff;
  box-shadow: 0 2px 14px rgba(239,68,68,0.10);
}

.hero-status-pill:hover { transform: translateY(-1px); box-shadow: 0 4px 18px rgba(0,0,0,0.12); }

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
  color: rgba(10,22,40,0.62); flex-shrink: 0;
  transition: transform 0.28s cubic-bezier(0.22,1,0.36,1);
}
.status-chevron.rotated { transform: rotate(180deg); }

/* ── HOURS DROPDOWN ── */
.hero-hours-card {
  background: rgba(255,255,255,0.97);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border: 1.5px solid rgba(0,63,136,0.14);
  border-radius: 14px; width: 234px;
  box-shadow: 0 20px 56px rgba(0,63,136,0.14), inset 0 0 0 0.5px rgba(255,255,255,0.80);
  overflow: hidden;
}

.hero-hours-head {
  display: flex; align-items: center; gap: 8px;
  padding: 11px 14px;
  font-size: 10px; font-weight: 800;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: rgba(10,22,40,0.60);
  border-bottom: 1px solid rgba(0,63,136,0.08);
}

.hero-hours-list { padding: 4px 0; }

.hero-hours-row {
  display: flex; align-items: center;
  justify-content: space-between; padding: 7px 14px;
  transition: background 0.14s;
}

.hero-hours-row:hover { background: rgba(0,63,136,0.04); }
.hero-hours-row.is-today { background: rgba(0,63,136,0.05); }
.hours-day { font-size: 12.5px; color: rgba(10,22,40,0.72); }
.hero-hours-row.is-today .hours-day { font-weight: 700; color: rgba(10,22,40,0.92); }
.hours-time { font-size: 12px; font-weight: 600; color: rgba(10,22,40,0.70); }
.hours-time.closed { color: rgba(10,22,40,0.72); font-weight: 400; }
.hero-hours-row.is-today .hours-time:not(.closed) { color: #15803d; }

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
  /* Tombol lebih ramping agar tidak terlalu makan ruang */
  .hero-btn-primary, .hero-btn-ghost {
    padding: 12px 24px;
    font-size: 13.5px;
    width: 100%;
    justify-content: center;
  }
  .hero-ctas {
    flex-direction: column;
    align-items: center;
    bottom: 92px;
    gap: 8px;
    width: calc(100% - 32px);
    left: 16px;
    transform: none;
  }
  /* Status pill naik supaya tidak overlap tombol stacked */
  .hero-status-float { bottom: 222px; right: 16px; }
  .hero-stat { padding: 0 16px; }
}
</style>
