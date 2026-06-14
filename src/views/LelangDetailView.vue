<template>
  <div class="detail-page">
    <TheNavbar />

    <main v-if="item" class="detail-main-wrap">

      <!-- ── BREADCRUMB ── -->
      <div class="d-bc-bar">
        <div class="container">
          <div class="d-bc">
            <RouterLink to="/" class="d-bc-link">Home</RouterLink>
            <svg class="d-bc-sep" width="5" height="9" viewBox="0 0 5 9" fill="none"><path d="M1 1l3 3.5L1 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            <RouterLink to="/lelang" class="d-bc-link">Lelang</RouterLink>
            <svg class="d-bc-sep" width="5" height="9" viewBox="0 0 5 9" fill="none"><path d="M1 1l3 3.5L1 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            <span class="d-bc-cur">{{ item.title }}</span>
          </div>
        </div>
      </div>

      <!-- ── GALLERY ── -->
      <div class="container">
        <div class="d-gallery">
          <div class="d-gallery-main">
            <img :src="activeImg" :alt="item.title" />
          </div>
          <div class="d-gallery-thumbs">
            <button
              v-for="(img, i) in item.imgs.slice(0, 3)"
              :key="i"
              class="d-thumb"
              :class="{ active: activeImg === img }"
              @click="activeImg = img"
            >
              <img :src="img" :alt="`Foto ${i + 1}`" />
            </button>
            <button
              v-if="item.imgs[3]"
              class="d-thumb d-thumb-more"
              :class="{ active: activeImg === item.imgs[3] }"
              @click="activeImg = item.imgs[3]"
            >
              <img :src="item.imgs[3]" alt="Foto 4" />
              <span class="d-thumb-overlay">Lihat semua</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ── META BAR ── -->
      <div class="container">
        <div class="d-meta">
          <div class="d-meta-left">
            <span class="d-meta-pub">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Dipublikasikan {{ item.publishedAt }} dikelola oleh <strong>{{ item.branch }}</strong>
            </span>
            <span class="d-meta-type">{{ item.typeLabel }}</span>
          </div>
          <div class="d-meta-right">
            <span class="d-meta-stat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              {{ item.views.toLocaleString('id') }}
            </span>
            <span class="d-meta-stat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              {{ item.shares }}
            </span>
          </div>
        </div>
      </div>

      <!-- ── LAYOUT ── -->
      <div class="container d-layout">

        <!-- ── CONTENT + TABS ── -->
        <div class="d-content-col">

          <!-- Tab Nav -->
          <div class="d-tabs-nav">
            <button
              v-for="tab in tabs" :key="tab.id"
              class="d-tab"
              :class="{ active: activeTab === tab.id }"
              @click="activeTab = tab.id"
            >{{ tab.label }}</button>
          </div>

          <!-- Tab: Deskripsi -->
          <div v-show="activeTab === 'deskripsi'" class="d-tab-panel">
            <h3 class="d-panel-title">Deskripsi Aset</h3>
            <p class="d-panel-desc">{{ item.desc }}</p>
            <div class="d-notice">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <p>Data aset bersifat informatif. Peserta wajib melakukan verifikasi langsung sebelum mengajukan penawaran. Proses lelang dilaksanakan sesuai ketentuan DJKN.</p>
            </div>
          </div>

          <!-- Tab: Spesifikasi -->
          <div v-show="activeTab === 'spesifikasi'" class="d-tab-panel">
            <h3 class="d-panel-title">Spesifikasi Aset</h3>
            <div class="d-spec-grid">
              <div v-for="spec in item.spesifikasi" :key="spec.key" class="d-spec-item">
                <span class="d-spec-label">{{ spec.label }}</span>
                <span class="d-spec-val">{{ spec.value }}</span>
              </div>
            </div>
          </div>

          <!-- Tab: Lokasi -->
          <div v-show="activeTab === 'lokasi'" class="d-tab-panel">
            <h3 class="d-panel-title">Lokasi Aset</h3>
            <p class="d-panel-subdesc">{{ item.location }}, {{ item.province }}</p>
            <div class="d-map-wrap">
              <div class="d-map-placeholder">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div class="d-map-overlay">
                <a href="tel:042821027" class="d-map-cta">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.9a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16z"/></svg>
                  Hubungi kami untuk info lokasi lengkap
                </a>
              </div>
            </div>
          </div>

          <!-- Tab: Akses & Fasilitas -->
          <div v-show="activeTab === 'fasilitas'" class="d-tab-panel">
            <h3 class="d-panel-title">Akses &amp; Fasilitas</h3>
            <div v-if="item.fasilitas && item.fasilitas.length" class="d-fac-grid">
              <div v-for="fac in item.fasilitas" :key="fac.name" class="d-fac-item">
                <span class="d-fac-name">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {{ fac.name }}
                </span>
                <span class="d-fac-status" :class="fac.status ? 'fac-ada' : 'fac-tdk'">
                  {{ fac.status ? 'Ada' : 'Tidak Ada' }}
                </span>
              </div>
            </div>
            <p v-else class="d-panel-desc">Informasi akses &amp; fasilitas tidak tersedia untuk aset kendaraan.</p>
          </div>

          <!-- Tab: Skema Pembelian -->
          <div v-show="activeTab === 'skema'" class="d-tab-panel">
            <h3 class="d-panel-title">Skema Pembelian</h3>
            <div class="d-skema-tag">Lelang</div>
            <p class="d-panel-desc">
              Pembelian aset dilakukan melalui mekanisme lelang resmi yang diselenggarakan oleh BRI bekerja sama dengan Direktorat Jenderal Kekayaan Negara (DJKN). Peserta wajib terdaftar dan menyetor uang jaminan sesuai ketentuan.
            </p>
            <div class="d-skema-flow">
              <div v-for="(step, i) in skemaSteps" :key="i" class="d-skema-step">
                <div class="d-skema-num">{{ i + 1 }}</div>
                <div class="d-skema-text">{{ step }}</div>
                <svg v-if="i < skemaSteps.length - 1" class="d-skema-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          </div>

        </div>

        <!-- ── SIDEBAR ── -->
        <aside class="d-sidebar-col">
          <div class="d-sidebar-card">

            <!-- Badges -->
            <div class="d-sb-badges">
              <span v-for="b in item.badges" :key="b" class="d-sb-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/></svg>
                {{ b }}
              </span>
            </div>

            <!-- Location -->
            <p class="d-sb-loc">{{ item.location.toUpperCase() }}, {{ item.province.toUpperCase() }}</p>

            <!-- Title -->
            <h2 class="d-sb-title">{{ item.title }}</h2>

            <!-- Price -->
            <div class="d-sb-price">{{ item.price }}</div>

            <!-- Specs chips -->
            <div class="d-sb-specs">
              <span v-for="spec in item.specs" :key="spec" class="d-sb-spec">{{ spec }}</span>
            </div>

            <!-- Date/Status -->
            <div class="d-sb-date">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Pelaksanaan: <strong>{{ item.date }}</strong>
              <span class="d-sb-status" :class="`status-${item.status}`">{{ item.statusLabel }}</span>
            </div>

            <div class="d-sb-divider"></div>

            <!-- CTA Primary -->
            <a
              href="https://infolelang.bri.co.id"
              target="_blank" rel="noopener"
              class="d-sb-cta-primary"
            >
              Daftar di BRI Info Lelang
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>

            <!-- CTA Secondary -->
            <a href="tel:042821027" class="d-sb-cta-secondary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.9a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16z"/></svg>
              Hubungi Kami
            </a>
            <p class="d-sb-hours">Jam operasional: Senin–Jumat, 07.30–16.30 WIB</p>

            <div class="d-sb-divider"></div>

            <!-- Action buttons -->
            <div class="d-sb-actions">
              <button class="d-sb-action" @click="handleShare">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                Bagikan
              </button>
              <button class="d-sb-action" @click="handlePrint">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                Cetak
              </button>
            </div>

          </div>
        </aside>

      </div>
    </main>

    <!-- Not found -->
    <div v-else class="container d-notfound">
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <h2>Aset tidak ditemukan</h2>
      <p>Aset yang Anda cari tidak tersedia atau telah selesai dilelang.</p>
      <RouterLink to="/lelang" class="d-back-btn">← Kembali ke Daftar Lelang</RouterLink>
    </div>

    <TheFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'
import { asetItems } from '@/data/lelangData.js'

const route = useRoute()

const item = computed(() =>
  asetItems.find(a => a.id === Number(route.params.id))
)

const activeImg = ref(null)
const activeTab = ref('deskripsi')

import { watch } from 'vue'
watch(item, (val) => {
  if (val) activeImg.value = val.imgs[0]
}, { immediate: true })

const tabs = [
  { id: 'deskripsi', label: 'Deskripsi' },
  { id: 'spesifikasi', label: 'Spesifikasi' },
  { id: 'lokasi', label: 'Lokasi' },
  { id: 'fasilitas', label: 'Akses & Fasilitas' },
  { id: 'skema', label: 'Skema Pembelian' },
]

const skemaSteps = [
  'Registrasi di infolelang.bri.co.id',
  'Setor uang jaminan',
  'Ajukan penawaran',
  'Penetapan pemenang',
]

function handleShare() {
  if (navigator.share) {
    navigator.share({ title: item.value?.title, url: window.location.href })
  } else {
    navigator.clipboard?.writeText(window.location.href)
  }
}

function handlePrint() {
  window.print()
}
</script>

<style scoped>
.detail-page {
  background: #fff;
  min-height: 100vh;
  position: relative;
  z-index: 1;
  padding-top: 68px;
}
.detail-main-wrap { background: #fff; }

/* ── BREADCRUMB ── */
.d-bc-bar { background: #f8faff; border-bottom: 1px solid rgba(0,63,136,0.08); }
.d-bc {
  display: flex; align-items: center; gap: 6px;
  padding: 13px 0; font-size: 13px;
}
.d-bc-link { color: rgba(10,22,40,0.50); text-decoration: none; transition: color 0.18s; }
.d-bc-link:hover { color: #0057b8; }
.d-bc-sep { color: rgba(10,22,40,0.25); flex-shrink: 0; }
.d-bc-cur { color: rgba(10,22,40,0.80); font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 320px; }

/* ── GALLERY ── */
.d-gallery { margin: 20px 0 0; border-radius: 16px; overflow: hidden; background: #e8eef6; }
.d-gallery-main {
  width: 100%; aspect-ratio: 16/7; overflow: hidden; background: #e8eef6;
}
.d-gallery-main img { width: 100%; height: 100%; object-fit: cover; display: block; }
.d-gallery-thumbs {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 3px; margin-top: 3px;
}
.d-thumb {
  aspect-ratio: 4/3; overflow: hidden; border: none; padding: 0; cursor: pointer;
  background: #d0ddef; position: relative;
  transition: opacity 0.2s;
}
.d-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.35s; }
.d-thumb:hover img { transform: scale(1.06); }
.d-thumb.active::after {
  content: ''; position: absolute; inset: 0;
  box-shadow: inset 0 0 0 3px #0057b8;
}
.d-thumb-more { position: relative; }
.d-thumb-overlay {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.50); color: #fff;
  font-size: 12.5px; font-weight: 700; letter-spacing: 0.02em;
}

/* ── META BAR ── */
.d-meta {
  display: flex; align-items: center; justify-content: space-between;
  gap: 16px; padding: 13px 0 12px; flex-wrap: wrap;
  border-bottom: 1px solid rgba(0,63,136,0.08);
  background: #fff;
}
.d-meta-left { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.d-meta-pub {
  display: flex; align-items: center; gap: 6px;
  font-size: 12.5px; color: rgba(10,22,40,0.52);
}
.d-meta-pub strong { color: #0057b8; font-weight: 700; }
.d-meta-type {
  font-size: 11px; font-weight: 700; letter-spacing: 0.05em;
  background: #0057b8; color: #fff;
  padding: 3px 10px; border-radius: 100px;
}
.d-meta-right { display: flex; align-items: center; gap: 14px; }
.d-meta-stat {
  display: flex; align-items: center; gap: 5px;
  font-size: 12.5px; color: rgba(10,22,40,0.48); font-weight: 500;
}

/* ── LAYOUT ── */
.d-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;
  padding-top: 24px;
  padding-bottom: 72px;
  align-items: start;
  background: #fff;
}

/* ── TABS ── */
.d-content-col { min-width: 0; }
.d-tabs-nav {
  display: flex; gap: 0;
  border-bottom: 1.5px solid rgba(0,63,136,0.09);
  margin-bottom: 20px; overflow-x: auto;
  scrollbar-width: none; background: #fff;
}
.d-tabs-nav::-webkit-scrollbar { display: none; }
.d-tab {
  padding: 11px 16px; background: none; border: none;
  font-size: 13px; font-weight: 600; color: rgba(10,22,40,0.48);
  cursor: pointer; font-family: inherit; white-space: nowrap;
  border-bottom: 2.5px solid transparent; margin-bottom: -1.5px;
  transition: color 0.2s, border-color 0.2s;
}
.d-tab:hover { color: rgba(10,22,40,0.75); }
.d-tab.active { color: #0057b8; border-bottom-color: #0057b8; }

/* ── TAB PANEL ── */
.d-tab-panel {
  background: #f8faff; border: 1.5px solid rgba(0,63,136,0.08);
  border-radius: 14px; padding: 24px;
}
.d-panel-title { font-size: 16px; font-weight: 800; color: #0a1628; margin: 0 0 12px; letter-spacing: -0.02em; }
.d-panel-desc { font-size: 13.5px; color: rgba(10,22,40,0.68); line-height: 1.75; margin: 0; }
.d-panel-subdesc { font-size: 13px; color: rgba(10,22,40,0.58); margin: 0 0 14px; }

/* Notice */
.d-notice {
  display: flex; align-items: flex-start; gap: 10px;
  background: #fff; border: 1px solid rgba(0,87,184,0.14);
  border-radius: 10px; padding: 13px 15px; margin-top: 18px;
  color: rgba(10,22,40,0.60); font-size: 12.5px; line-height: 1.65;
}
.d-notice svg { flex-shrink: 0; color: #0057b8; margin-top: 1px; }
.d-notice p { margin: 0; }

/* Specs */
.d-spec-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.d-spec-item {
  display: flex; flex-direction: column; gap: 4px;
  background: #fff; border: 1px solid rgba(0,63,136,0.09);
  border-radius: 12px; padding: 13px 15px;
}
.d-spec-label { font-size: 10.5px; font-weight: 700; color: rgba(10,22,40,0.42); text-transform: uppercase; letter-spacing: 0.06em; }
.d-spec-val { font-size: 14.5px; font-weight: 800; color: #0a1628; letter-spacing: -0.01em; }

/* Map */
.d-map-wrap { position: relative; border-radius: 12px; overflow: hidden; margin-top: 8px; }
.d-map-placeholder {
  height: 260px; background: #dce8f5;
  display: flex; align-items: center; justify-content: center;
}
.d-map-overlay {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  background: rgba(248,250,255,0.70); backdrop-filter: blur(4px);
}
.d-map-cta {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 24px; background: #0057b8; color: #fff;
  border-radius: 100px; font-size: 13.5px; font-weight: 700;
  text-decoration: none; transition: background 0.2s;
}
.d-map-cta:hover { background: #0068d6; }

/* Fasilitas */
.d-fac-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0; }
.d-fac-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 13px 4px; border-bottom: 1px solid rgba(0,63,136,0.07);
}
.d-fac-item:nth-last-child(-n+2) { border-bottom: none; }
.d-fac-name { display: flex; align-items: center; gap: 8px; font-size: 13.5px; color: rgba(10,22,40,0.72); font-weight: 500; }
.d-fac-name svg { color: rgba(10,22,40,0.30); flex-shrink: 0; }
.d-fac-status { font-size: 13px; font-weight: 700; }
.fac-ada { color: #16a34a; }
.fac-tdk { color: rgba(10,22,40,0.38); }

/* Skema */
.d-skema-tag {
  display: inline-block; font-size: 12px; font-weight: 700;
  border: 1.5px solid #0057b8; color: #0057b8;
  padding: 4px 14px; border-radius: 100px; margin-bottom: 16px;
}
.d-skema-flow {
  display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-top: 24px;
}
.d-skema-step { display: flex; flex-direction: column; align-items: center; gap: 10px; }
.d-skema-num {
  width: 44px; height: 44px; border-radius: 50%;
  background: rgba(0,87,184,0.08); border: 2px solid rgba(0,87,184,0.20);
  display: flex; align-items: center; justify-content: center;
  font-size: 15px; font-weight: 900; color: #0057b8;
}
.d-skema-text { font-size: 12.5px; font-weight: 600; color: rgba(10,22,40,0.70); text-align: center; max-width: 100px; }
.d-skema-arrow { color: rgba(10,22,40,0.25); margin-bottom: 24px; }

/* ── SIDEBAR ── */
.d-sidebar-col { position: sticky; top: 88px; }
.d-sidebar-card {
  background: #fff; border: 1.5px solid rgba(0,63,136,0.10);
  border-radius: 16px; padding: 22px;
  box-shadow: 0 2px 20px rgba(0,63,136,0.06);
}

.d-sb-badges { display: flex; gap: 8px; margin-bottom: 14px; flex-wrap: wrap; }
.d-sb-badge {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 11.5px; font-weight: 700;
  border: 1.5px solid rgba(0,87,184,0.30); color: #0057b8;
  padding: 4px 12px; border-radius: 100px;
}

.d-sb-loc { font-size: 11px; font-weight: 700; color: rgba(10,22,40,0.45); letter-spacing: 0.04em; margin: 0 0 8px; }
.d-sb-title { font-size: 20px; font-weight: 800; color: #0a1628; margin: 0 0 10px; letter-spacing: -0.02em; line-height: 1.25; }
.d-sb-price { font-size: 24px; font-weight: 900; color: #0057b8; letter-spacing: -0.03em; margin-bottom: 14px; }

.d-sb-specs { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
.d-sb-spec {
  font-size: 11.5px; font-weight: 700; color: #0057b8;
  background: rgba(0,87,184,0.08); padding: 4px 10px; border-radius: 100px;
}

.d-sb-date {
  display: flex; align-items: center; gap: 6px;
  font-size: 12.5px; color: rgba(10,22,40,0.55); margin-bottom: 4px;
}
.d-sb-status {
  font-size: 10.5px; font-weight: 800; letter-spacing: 0.06em;
  padding: 2px 8px; border-radius: 100px; margin-left: 4px;
}
.status-aktif { background: #dcfce7; color: #15803d; }
.status-segera { background: #fef9c3; color: #a16207; }
.status-selesai { background: #f3f4f6; color: #6b7280; }

.d-sb-divider { height: 1px; background: rgba(0,63,136,0.08); margin: 18px 0; }

.d-sb-cta-primary {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%; padding: 14px 20px;
  background: #0057b8; color: #fff;
  border-radius: 12px; font-size: 14px; font-weight: 800;
  text-decoration: none; margin-bottom: 10px;
  transition: background 0.2s, transform 0.2s;
}
.d-sb-cta-primary:hover { background: #0068d6; transform: translateY(-1px); }

.d-sb-cta-secondary {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%; padding: 13px 20px;
  background: transparent; color: rgba(10,22,40,0.78);
  border: 1.5px solid rgba(0,63,136,0.20);
  border-radius: 12px; font-size: 13.5px; font-weight: 700;
  text-decoration: none; margin-bottom: 8px;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}
.d-sb-cta-secondary:hover { border-color: #0057b8; color: #0057b8; background: rgba(0,87,184,0.04); }

.d-sb-hours { font-size: 11.5px; color: rgba(10,22,40,0.45); text-align: center; margin: 0; }

.d-sb-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.d-sb-action {
  display: flex; align-items: center; justify-content: center; gap: 7px;
  padding: 10px; border-radius: 10px;
  background: #f8faff; border: 1.5px solid rgba(0,63,136,0.10);
  font-size: 12.5px; font-weight: 600; color: rgba(10,22,40,0.65);
  cursor: pointer; font-family: inherit;
  transition: border-color 0.2s, color 0.2s;
}
.d-sb-action:hover { border-color: rgba(0,87,184,0.30); color: #0057b8; }

/* ── NOT FOUND ── */
.d-notfound {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 16px; padding: 100px 20px; text-align: center;
  color: rgba(10,22,40,0.40);
}
.d-notfound h2 { font-size: 24px; font-weight: 800; color: #0a1628; margin: 0; }
.d-notfound p { font-size: 14px; margin: 0; }
.d-back-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 24px; background: #0057b8; color: #fff;
  border-radius: 100px; font-size: 14px; font-weight: 700;
  text-decoration: none; transition: background 0.2s;
}
.d-back-btn:hover { background: #0068d6; }

/* ── RESPONSIVE ── */

/* Large tablet / small laptop */
@media (max-width: 1024px) {
  .d-layout { grid-template-columns: 1fr 300px; gap: 20px; }
}

/* Tablet portrait & below: single column, price card surfaces first */
@media (max-width: 900px) {
  .d-layout {
    grid-template-columns: 1fr;
    gap: 20px;
    padding-top: 20px;
  }
  .d-sidebar-col { position: static; order: -1; }
  .d-gallery-main { aspect-ratio: 16/8; }
}

/* Large phone / small tablet */
@media (max-width: 640px) {
  .d-gallery-main { aspect-ratio: 4/3; }
  .d-gallery-thumbs { gap: 2px; }
  .d-meta { flex-direction: column; align-items: flex-start; gap: 8px; }
  .d-spec-grid { grid-template-columns: repeat(2, 1fr); }
  .d-fac-grid { grid-template-columns: 1fr; }
  .d-fac-item:nth-last-child(-n+2) { border-bottom: 1px solid rgba(0,63,136,0.07); }
  .d-fac-item:last-child { border-bottom: none; }
  .d-skema-flow { flex-direction: column; align-items: stretch; gap: 6px; }
  .d-skema-step { flex-direction: row; align-items: center; gap: 14px; }
  .d-skema-text { text-align: left; max-width: none; }
  .d-skema-num { margin-bottom: 0; }
  .d-skema-arrow { display: none; }
  .d-tab-panel { padding: 20px 18px; }
  .d-sidebar-card { padding: 20px 18px; }
}

/* Phones */
@media (max-width: 420px) {
  .d-gallery-main { aspect-ratio: 3/2; }
  .d-spec-grid { grid-template-columns: 1fr; }
  .d-sb-title { font-size: 18px; }
  .d-sb-price { font-size: 21px; }
  .d-tab { padding: 10px 13px; font-size: 12.5px; }
  .d-sb-actions { grid-template-columns: 1fr; }
}
</style>
