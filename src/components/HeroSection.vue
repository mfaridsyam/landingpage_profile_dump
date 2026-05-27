<template>
  <section class="hero">
    <div class="hero-bg-dots"></div>
    <div class="hero-bg-glow"></div>

    <!-- ── 5-ROW BRI MARQUEE (alternating directions) ── -->
    <div class="hero-bri-marquee" aria-hidden="true">
      <div class="hero-bri-row">
        <div class="hero-bri-track dir-left sp1"><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span></div>
      </div>
      <div class="hero-bri-row">
        <div class="hero-bri-track dir-right sp2"><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span></div>
      </div>
      <div class="hero-bri-row">
        <div class="hero-bri-track dir-left sp3"><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span></div>
      </div>
      <div class="hero-bri-row">
        <div class="hero-bri-track dir-right sp4"><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span></div>
      </div>
      <div class="hero-bri-row">
        <div class="hero-bri-track dir-left sp5"><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span><span>BRI</span></div>
      </div>
    </div>

    <!-- ── MAIN CONTENT: LEFT + RIGHT ── -->
    <div class="hero-inner">

      <!-- LEFT -->
      <div class="hero-left">
        <div class="hero-tag">
          <span class="hero-tag-dot"></span>
          #MelayaniSepenuhHati
        </div>
        <h1 class="hero-title">Bank <em>Rakyat</em><br>Indonesia</h1>
        <p class="hero-cabang-label">Cabang Polewali</p>
        <p class="hero-subtitle">
          Melayani dengan sepenuh hati, mendorong pertumbuhan ekonomi masyarakat Polewali Mandar menuju kesejahteraan yang berkelanjutan.
        </p>
        <div class="hero-actions">
          <a href="#layanan" class="btn-hero-primary">
            Produk &amp; Layanan
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="#kontak" class="btn-hero-ghost">Hubungi Kami</a>
        </div>
        <div class="hero-stats">
          <div class="hero-stat-item">
            <span class="hero-stat-num">128<sup>+</sup></span>
            <span class="hero-stat-lbl">Tahun Melayani</span>
          </div>
          <div class="hero-stat-sep"></div>
          <div class="hero-stat-item">
            <span class="hero-stat-num">13</span>
            <span class="hero-stat-lbl">Unit Kerja</span>
          </div>
          <div class="hero-stat-sep"></div>
          <div class="hero-stat-item">
            <span class="hero-stat-num">24/7</span>
            <span class="hero-stat-lbl">ATM &amp; CDM</span>
          </div>
        </div>
      </div>

      <!-- RIGHT: Quick Access Panel -->
      <div class="hero-right">
        <div class="hero-right-glow" aria-hidden="true"></div>

        <div class="hero-panel">
          <div class="hero-panel-eyebrow">Akses Cepat</div>
          <div class="hero-quick-grid">

            <a href="#layanan" class="hero-quick-card">
              <div class="hero-quick-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="3"/><path d="M9 7h6"/><path d="M9 11h6"/><path d="M11 19h2"/></svg>
              </div>
              <div class="hero-quick-body">
                <div class="hero-quick-name">BRImo</div>
                <div class="hero-quick-sub">Mobile Banking 24/7</div>
              </div>
              <svg class="hero-quick-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>

            <a href="#layanan" class="hero-quick-card">
              <div class="hero-quick-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 12h3v8h5v-5h4v5h5v-8h3L12 2z"/><circle cx="12" cy="10" r="2"/></svg>
              </div>
              <div class="hero-quick-body">
                <div class="hero-quick-name">KUR UMKM</div>
                <div class="hero-quick-sub">Bunga mulai 6% p.a.</div>
              </div>
              <svg class="hero-quick-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>

            <a href="#jaringan" class="hero-quick-card">
              <div class="hero-quick-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 8h2v4H7z"/><path d="M11 10h6"/><path d="M11 13h4"/></svg>
              </div>
              <div class="hero-quick-body">
                <div class="hero-quick-name">ATM &amp; CDM</div>
                <div class="hero-quick-sub">Tersebar di Polman</div>
              </div>
              <svg class="hero-quick-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>

            <a href="#layanan" class="hero-quick-card">
              <div class="hero-quick-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20"/><path d="M6 15h2"/><path d="M10 15h6"/></svg>
              </div>
              <div class="hero-quick-body">
                <div class="hero-quick-name">Tabungan</div>
                <div class="hero-quick-sub">BritAma &amp; Simpedes</div>
              </div>
              <svg class="hero-quick-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>

          </div>
        </div>

        <!-- Address card -->
        <a href="https://maps.google.com/?q=Bank+BRI+Polewali" target="_blank" rel="noopener" class="hero-addr-card">
          <div class="hero-addr-pin">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
          </div>
          <div class="hero-addr-body">
            <div class="hero-addr-name">Jl. H. Andi Depu No.177</div>
            <div class="hero-addr-city">Polewali Mandar, Sulawesi Barat</div>
          </div>
          <svg class="hero-addr-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M7 7h10v10"/></svg>
        </a>

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

    <!-- ── SCROLL INDICATOR ── -->
    <div class="scroll-indicator" :class="{ hidden: scrolledPast }">
      <span class="scroll-label">Gulir ke bawah</span>
      <div class="scroll-chevrons">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useBranchStatus } from '@/composables/useBranchStatus.js'

const scrolledPast = ref(false)
const showHours    = ref(false)
const statusFloatRef = ref(null)

function onScroll() { scrolledPast.value = window.scrollY > 80 }
function onKeydown(e) { if (e.key === 'Escape') showHours.value = false }
function onClickOutside(e) {
  if (statusFloatRef.value && !statusFloatRef.value.contains(e.target)) showHours.value = false
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  document.addEventListener('mousedown', onClickOutside)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
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
/* ── 5-ROW BRI MARQUEE ── */
.hero-bri-marquee {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  overflow: hidden;
  pointer-events: none; z-index: 0;
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%);
  mask-image: linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%);
}
.hero-bri-row {
  flex: 1; overflow: hidden;
  display: flex; align-items: center;
}
.hero-bri-track {
  display: flex; flex-shrink: 0;
  gap: 72px; padding-right: 72px;
  will-change: transform;
}
.hero-bri-track span {
  font-size: clamp(54px, 7vw, 108px);
  font-weight: 900;
  color: rgba(255,255,255,0.028);
  letter-spacing: -0.04em; line-height: 1;
  user-select: none; white-space: nowrap;
}

/* Direction keyframes (24 items = 2× the 12-item visual repeat → -50% loops seamlessly) */
.dir-left  { animation: bri-left  linear infinite; }
.dir-right { animation: bri-right linear infinite; }
@keyframes bri-left  { 0% { transform: translateX(0);    } 100% { transform: translateX(-50%); } }
@keyframes bri-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0);    } }

/* Different speeds per row */
.sp1 { animation-duration: 36s; }
.sp2 { animation-duration: 27s; }
.sp3 { animation-duration: 43s; }
.sp4 { animation-duration: 24s; }
.sp5 { animation-duration: 33s; }

/* ── HERO TAG ── */
.hero-tag-dot {
  display: block; width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--bri-gold, #F5A623);
  flex-shrink: 0;
  animation: pulse-dot 2.8s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 6px rgba(245,166,35,0.45); }
  50%       { box-shadow: 0 0 14px rgba(245,166,35,0.85), 0 0 28px rgba(245,166,35,0.25); }
}

/* ── STATS ── */
.hero-stats {
  display: flex; align-items: center; gap: 20px;
  margin-top: 40px; padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,0.07);
}
.hero-stat-item { display: flex; flex-direction: column; gap: 4px; }
.hero-stat-num {
  font-size: 22px; font-weight: 800;
  color: rgba(255,255,255,0.90);
  letter-spacing: -0.04em; line-height: 1;
}
.hero-stat-num sup {
  font-size: 11px; font-weight: 700;
  color: var(--bri-gold, #F5A623);
  vertical-align: top; margin-top: 2px;
}
.hero-stat-lbl {
  font-size: 9.5px; font-weight: 700;
  color: rgba(255,255,255,0.30);
  text-transform: uppercase; letter-spacing: 0.06em;
}
.hero-stat-sep { width: 1px; height: 28px; background: rgba(255,255,255,0.09); flex-shrink: 0; }

/* ── RIGHT GLOW ── */
.hero-right-glow {
  position: absolute; top: 5%; right: -20%;
  width: 420px; height: 420px; border-radius: 50%;
  background: radial-gradient(circle, rgba(0,87,184,0.13) 0%, transparent 68%);
  pointer-events: none; z-index: 0;
}

/* ── QUICK ACCESS PANEL ── */
.hero-panel {
  position: relative; z-index: 1;
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.09);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(10px);
}
.hero-panel-eyebrow {
  padding: 14px 18px 10px;
  font-size: 10px; font-weight: 800;
  letter-spacing: 0.10em; text-transform: uppercase;
  color: rgba(255,255,255,0.30);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.hero-quick-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: rgba(255,255,255,0.06);
}
.hero-quick-card {
  display: flex; align-items: center; gap: 12px;
  padding: 16px 18px;
  text-decoration: none;
  background: rgba(6,14,32,0.55);
  transition: background 0.2s;
  position: relative;
}
.hero-quick-card:hover { background: rgba(0,87,184,0.12); }
.hero-quick-card:hover .hero-quick-arrow { opacity: 1; transform: translate(2px, -2px); }

.hero-quick-icon {
  width: 42px; height: 42px; border-radius: 12px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.11);
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.75);
  flex-shrink: 0;
  transition: background 0.2s, border-color 0.2s;
}
.hero-quick-card:hover .hero-quick-icon {
  background: rgba(0,87,184,0.25);
  border-color: rgba(0,87,184,0.40);
  color: #60a5fa;
}

.hero-quick-body { flex: 1; min-width: 0; }
.hero-quick-name {
  font-size: 13px; font-weight: 700;
  color: rgba(255,255,255,0.88);
  margin-bottom: 2px;
}
.hero-quick-sub {
  font-size: 11px; color: rgba(255,255,255,0.35);
  line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.hero-quick-arrow {
  color: rgba(255,255,255,0.30); flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.18s, transform 0.18s;
}

/* ── ADDRESS CARD ── */
.hero-addr-card {
  position: relative; z-index: 1;
  display: flex; align-items: center; gap: 12px;
  padding: 14px 18px;
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.09);
  border-radius: 14px;
  text-decoration: none;
  backdrop-filter: blur(8px);
  transition: border-color 0.22s, background 0.22s, transform 0.25s cubic-bezier(0.22,1,0.36,1);
}
.hero-addr-card:hover {
  border-color: rgba(0,87,184,0.45);
  background: rgba(0,87,184,0.08);
  transform: translateX(4px);
}
.hero-addr-pin {
  width: 36px; height: 36px; border-radius: 10px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.11);
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.55); flex-shrink: 0;
  transition: background 0.2s, color 0.2s;
}
.hero-addr-card:hover .hero-addr-pin { background: rgba(0,87,184,0.25); color: #60a5fa; }
.hero-addr-body { flex: 1; min-width: 0; }
.hero-addr-name {
  font-size: 13px; font-weight: 700;
  color: rgba(255,255,255,0.88); margin-bottom: 2px;
}
.hero-addr-city {
  font-size: 11px; color: rgba(255,255,255,0.35);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.hero-addr-arrow {
  color: rgba(255,255,255,0.30); flex-shrink: 0;
  transition: color 0.2s, transform 0.2s;
}
.hero-addr-card:hover .hero-addr-arrow { color: #60a5fa; transform: translate(2px, -2px); }

/* ── FLOATING STATUS PILL ── */
.hero-status-float {
  position: absolute; bottom: 80px; right: var(--px, 40px);
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
  border-color: rgba(74,222,128,0.40); background: rgba(16,185,129,0.14);
  box-shadow: 0 4px 20px rgba(22,163,74,0.18);
}
.is-closed .hero-status-pill {
  border-color: rgba(248,113,113,0.38); background: rgba(220,38,38,0.12);
  box-shadow: 0 4px 20px rgba(220,38,38,0.14);
}
.hero-status-pill:hover { transform: translateY(-1px); box-shadow: 0 8px 30px rgba(0,0,0,0.40); }

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

/* ── SCROLL INDICATOR ── */
.scroll-indicator {
  position: absolute; bottom: 28px; left: 50%;
  transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  opacity: 1; transition: opacity 0.5s ease; pointer-events: none; z-index: 2;
}
.scroll-indicator.hidden { opacity: 0; }
.scroll-label {
  font-size: 9.5px; font-weight: 700;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: rgba(255,255,255,0.22);
}
.scroll-chevrons {
  display: flex; flex-direction: column; align-items: center;
  color: rgba(255,255,255,0.25);
  animation: bounce-scroll 2s ease-in-out infinite;
}
.scroll-chevrons svg:first-child { opacity: 0.45; margin-bottom: -6px; }
@keyframes bounce-scroll {
  0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px); }
}

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .hero-quick-grid { grid-template-columns: 1fr; }
}
@media (max-width: 700px) {
  .scroll-indicator { display: none; }
  .hero-status-float { bottom: 24px; right: 16px; }
}
</style>
