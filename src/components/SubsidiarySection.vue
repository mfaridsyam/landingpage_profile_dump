<template>
  <section class="subsidiary-section">
    <div class="container">
      <div class="subsidiary-header reveal">
        <div class="section-eyebrow">Grup BRI</div>
        <h2 class="section-title" style="margin-bottom:8px">Anak Perusahaan</h2>
        <p class="section-sub">Ekosistem keuangan BRI yang terintegrasi untuk melayani setiap kebutuhan finansial Anda.</p>
      </div>

      <div class="sub-carousel-wrap reveal">
        <button class="sub-nav sub-nav-left" @click="prev" :disabled="currentIdx === 0" aria-label="Previous">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>

        <div class="sub-track-outer" ref="trackOuter">
          <div class="sub-track" :style="trackStyle">
            <a v-for="(sub, i) in subsidiaries" :key="i"
              :href="sub.url" target="_blank"
              class="sub-card">
              <div class="sub-logo-wrap">
                <img :src="sub.logo" :alt="sub.name" class="sub-logo" @error="onLogoError($event, sub)" />
              </div>
              <div class="sub-name">{{ sub.name }}</div>
              <div class="sub-desc">{{ sub.desc }}</div>
            </a>
          </div>
        </div>

        <button class="sub-nav sub-nav-right" @click="next" :disabled="currentIdx >= maxIdx" aria-label="Next">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      <!-- Dots -->
      <div class="sub-dots reveal">
        <button v-for="i in (maxIdx + 1)" :key="i"
          class="sub-dot" :class="{ active: currentIdx === i - 1 }"
          @click="currentIdx = i - 1" :aria-label="`Slide ${i}`">
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentIdx = ref(0)
const trackOuter = ref(null)
const visibleCount = ref(5)

const subsidiaries = [
  {
    name: 'BRI Manajemen Investasi',
    desc: 'Layanan reksa dana & investasi',
    url: 'https://bri-mi.co.id',
    logo: 'https://bri-mi.co.id/images/header/logo-navbar.png',
    fallbackText: 'BRI-MI',
  },
  {
    name: 'BRI Insurance',
    desc: 'Solusi asuransi jiwa & umum',
    url: 'https://briinsurance.co.id',
    logo: 'https://www.bri.co.id/documents/20143/159832/bri-insurance.png',
    fallbackText: 'BRI Insurance',
  },
  {
    name: 'Pegadaian',
    desc: 'Gadai & pembiayaan mikro',
    url: 'https://pegadaian.co.id',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Pegadaian_logo.svg/320px-Pegadaian_logo.svg.png',
    fallbackText: 'Pegadaian',
  },
  {
    name: 'PNM',
    desc: 'Permodalan Nasional Madani',
    url: 'https://pnm.co.id',
    logo: 'https://pnm.co.id/wp-content/uploads/2021/09/logo-pnm.png',
    fallbackText: 'PNM',
  },
  {
    name: 'BRI Danareksa Sekuritas',
    desc: 'Layanan sekuritas & pasar modal',
    url: 'https://brids.co.id',
    logo: 'https://www.bri.co.id/documents/20143/159832/bri-danareksa.png',
    fallbackText: 'BRI-DS',
  },
  {
    name: 'BRI Finance',
    desc: 'Pembiayaan kendaraan bermotor',
    url: 'https://brifinance.co.id',
    logo: 'https://www.bri.co.id/documents/20143/159832/bri-finance.png',
    fallbackText: 'BRI Finance',
  },
  {
    name: 'BRI Ventures',
    desc: 'Modal ventura & startup',
    url: 'https://briventures.id',
    logo: 'https://www.bri.co.id/documents/20143/159832/bri-ventures.png',
    fallbackText: 'BRI Ventures',
  },
  {
    name: 'BRILink',
    desc: 'Agen banking & fintech',
    url: 'https://brilink.id',
    logo: 'https://www.bri.co.id/documents/20143/159832/brilink.png',
    fallbackText: 'BRILink',
  },
]

const maxIdx = computed(() => Math.max(0, subsidiaries.length - visibleCount.value))

const cardW = computed(() => 100 / visibleCount.value)
const trackStyle = computed(() => ({
  transform: `translateX(-${currentIdx.value * cardW.value}%)`,
  transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
  display: 'flex',
  width: `${(subsidiaries.length / visibleCount.value) * 100}%`,
}))

function prev() { if (currentIdx.value > 0) currentIdx.value-- }
function next() { if (currentIdx.value < maxIdx.value) currentIdx.value++ }

function onLogoError(e, sub) {
  e.target.style.display = 'none'
  const parent = e.target.parentElement
  if (parent && !parent.querySelector('.sub-fallback')) {
    const span = document.createElement('span')
    span.className = 'sub-fallback'
    span.textContent = sub.fallbackText || sub.name
    parent.appendChild(span)
  }
}

function updateVisible() {
  const w = window.innerWidth
  if (w < 600)       visibleCount.value = 2
  else if (w < 900)  visibleCount.value = 3
  else if (w < 1200) visibleCount.value = 4
  else               visibleCount.value = 5
  if (currentIdx.value > maxIdx.value) currentIdx.value = maxIdx.value
}

onMounted(() => {
  updateVisible()
  window.addEventListener('resize', updateVisible)
})
onUnmounted(() => window.removeEventListener('resize', updateVisible))
</script>

<style scoped>
.subsidiary-section { padding: 72px 0; background: transparent; }
.subsidiary-header { margin-bottom: 40px; }

.sub-carousel-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
}
.sub-track-outer { flex: 1; overflow: hidden; }
.sub-track { will-change: transform; }

.sub-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 28px 16px 24px;
  background: rgba(255,255,255,0.05);
  border: 1.5px solid rgba(255,255,255,0.10);
  border-radius: 16px;
  text-decoration: none;
  cursor: pointer;
  transition: border-color 0.25s, background 0.25s, transform 0.3s cubic-bezier(0.22,1,0.36,1);
  margin: 0 8px;
  backdrop-filter: blur(8px);
  flex-shrink: 0;
  width: calc(100% - 16px);
}
.sub-card:hover { border-color: rgba(0,87,184,0.45); background: rgba(255,255,255,0.09); transform: translateY(-4px); }

.sub-logo-wrap {
  width: 120px; height: 60px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.sub-logo {
  max-width: 100%; max-height: 100%;
  object-fit: contain; display: block;
  filter: brightness(0) invert(1) opacity(0.75);
  transition: filter 0.25s, opacity 0.25s;
}
.sub-card:hover .sub-logo { filter: brightness(0) invert(1) opacity(1); }

:deep(.sub-fallback) {
  font-size: 14px; font-weight: 800; color: rgba(255,255,255,0.70);
  text-align: center; letter-spacing: -0.01em;
}

.sub-name {
  font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.85);
  text-align: center; line-height: 1.35;
}
.sub-desc {
  font-size: 11.5px; color: rgba(255,255,255,0.38);
  text-align: center; line-height: 1.4;
}

.sub-nav {
  width: 44px; height: 44px; border-radius: 50%;
  background: rgba(255,255,255,0.07);
  border: 1.5px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.60);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; flex-shrink: 0;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.sub-nav:hover:not(:disabled) {
  background: rgba(0,87,184,0.20);
  border-color: rgba(0,87,184,0.40);
  color: #fff;
}
.sub-nav:disabled { opacity: 0.25; cursor: not-allowed; }

.sub-dots {
  display: flex; justify-content: center; gap: 8px;
  margin-top: 24px;
}
.sub-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: rgba(255,255,255,0.20);
  border: none; cursor: pointer; padding: 0;
  transition: background 0.2s, width 0.25s;
}
.sub-dot.active {
  background: rgba(255,255,255,0.80);
  width: 24px; border-radius: 4px;
}
</style>
