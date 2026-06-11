<template>
  <div class="stock-page">
    <TheNavbar />

    <!-- HERO -->
    <section class="stock-hero">
      <div class="container stock-hero-inner">
        <div class="stock-hero-left">
          <span class="stock-eyebrow">Investor Relations</span>
          <h1 class="stock-hero-title">Saham BRI <em>(BBRI)</em></h1>
          <p class="stock-hero-desc">
            PT. Bank Rakyat Indonesia (Persero) Tbk. tercatat di Bursa Efek Indonesia (BEI) dengan kode saham <strong>BBRI</strong>.
            Pantau pergerakan harga saham, volume perdagangan, dan kinerja investasi BRI secara real-time melalui grafik interaktif di bawah ini.
          </p>
          <div class="stock-info-row">
            <div class="stock-info-item">
              <span class="stock-info-lbl">Emiten</span>
              <span class="stock-info-val">PT Bank Rakyat Indonesia (Persero) Tbk.</span>
            </div>
            <div class="stock-info-item">
              <span class="stock-info-lbl">Kode Saham</span>
              <span class="stock-info-val stock-info-val--blue">BBRI</span>
            </div>
            <div class="stock-info-item">
              <span class="stock-info-lbl">Bursa</span>
              <span class="stock-info-val">IDX (Bursa Efek Indonesia)</span>
            </div>
          </div>
        </div>
        <div class="stock-hero-right">
          <div class="stock-badge-group">
            <div class="stock-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              Bank BUMN
            </div>
            <div class="stock-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Data Real-Time
            </div>
            <div class="stock-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              OJK Terdaftar
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CHART SECTION -->
    <section class="stock-chart-section">
      <div class="container">
        <div class="stock-chart-header">
          <h2 class="stock-chart-title">Grafik Harga Saham BBRI</h2>
          <div class="stock-chart-actions">
            <span v-if="lastUpdate" class="stock-last-update">Diperbarui: {{ lastUpdate }}</span>
            <a href="https://www.ir-bri.com/stock_chart_interactive.html"
              target="_blank" rel="noopener" class="stock-chart-btn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Buka di IR BRI
            </a>
            <span class="stock-chart-src">Powered by TradingView</span>
          </div>
        </div>

        <div class="stock-chart-wrap">
          <div ref="tvContainer" class="stock-chart-body"></div>
        </div>

        <p class="stock-disclaimer">
          Data saham bersifat informasi dan mungkin tertunda. Selalu lakukan riset mandiri sebelum membuat keputusan investasi.
          Investasi di pasar modal mengandung risiko. Untuk informasi resmi investor, kunjungi
          <a href="https://www.ir-bri.com" target="_blank" rel="noopener">ir-bri.com</a>.
        </p>
      </div>
    </section>

    <!-- INFO SECTION -->
    <section class="stock-info-section">
      <div class="container">
        <div class="stock-info-grid">

          <div class="stock-card">
            <div class="stock-card-head">
              <div class="stock-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0057b8" stroke-width="2"><path d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18z"/><path d="M6 12H4a2 2 0 00-2 2v6a2 2 0 002 2h2"/><path d="M18 9h2a2 2 0 012 2v9a2 2 0 01-2 2h-2"/></svg>
              </div>
              <h3 class="stock-card-title">Tentang BRI</h3>
            </div>
            <p class="stock-card-desc">
              PT Bank Rakyat Indonesia (Persero) Tbk. adalah bank BUMN terbesar di Indonesia berdasarkan aset, dengan fokus utama pada segmen UMKM. Didirikan pada 16 Desember 1895 di Purwokerto.
            </p>
          </div>

          <div class="stock-card">
            <div class="stock-card-head">
              <div class="stock-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0057b8" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              </div>
              <h3 class="stock-card-title">IPO &amp; Listing</h3>
            </div>
            <p class="stock-card-desc">
              BRI melakukan IPO pada 10 November 2003 dengan kode saham BBRI. Saham BRI termasuk dalam indeks LQ45, IDX30, dan MSCI Indonesia Index — sebagai salah satu blue chip di BEI.
            </p>
          </div>

          <div class="stock-card">
            <div class="stock-card-head">
              <div class="stock-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0057b8" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              </div>
              <h3 class="stock-card-title">Dividen</h3>
            </div>
            <p class="stock-card-desc">
              BRI secara konsisten membagikan dividen kepada pemegang saham setiap tahun. Besaran dividen ditentukan berdasarkan kinerja keuangan perusahaan dan diumumkan pada Rapat Umum Pemegang Saham (RUPS).
            </p>
          </div>

          <div class="stock-card">
            <div class="stock-card-head">
              <div class="stock-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0057b8" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 class="stock-card-title">Tata Kelola</h3>
            </div>
            <p class="stock-card-desc">
              Sebagai perusahaan publik, BRI menerapkan prinsip Good Corporate Governance (GCG) yang ketat, diawasi oleh OJK (Otoritas Jasa Keuangan) dan Kementerian BUMN.
            </p>
          </div>

        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="stock-cta-section">
      <div class="container stock-cta-inner">
        <div>
          <h2 class="stock-cta-title">Informasi Investasi Lengkap</h2>
          <p class="stock-cta-desc">Untuk laporan keuangan, presentasi investor, dan informasi korporasi resmi lainnya, kunjungi portal Investor Relations BRI.</p>
        </div>
        <div class="stock-cta-btns">
          <a href="https://www.ir-bri.com" target="_blank" rel="noopener" class="stock-cta-btn stock-cta-btn--primary">
            Portal IR BRI
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
          <router-link to="/" class="stock-cta-btn stock-cta-btn--ghost">
            Kembali ke Beranda
          </router-link>
        </div>
      </div>
    </section>

    <TheFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'

const tvContainer = ref(null)
const lastUpdate = ref('')

function formatUpdate() {
  const now = new Date()
  return now.toLocaleString('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
    timeZone: 'Asia/Makassar', hour12: false
  }) + ' WITA'
}

onMounted(() => {
  lastUpdate.value = formatUpdate()
  if (!tvContainer.value) return

  const script = document.createElement('script')
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
  script.async = true
  script.textContent = JSON.stringify({
    autosize: true,
    symbol: 'IDX:BBRI',
    interval: 'D',
    timezone: 'Asia/Jakarta',
    theme: 'light',
    style: '1',
    locale: 'id',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    gridColor: 'rgba(0, 63, 136, 0.06)',
    hide_top_toolbar: true,
    hide_legend: false,
    allow_symbol_change: false,
    save_image: false,
    calendar: false,
    hide_volume: false,
    support_host: 'https://www.tradingview.com',
    withdateranges: true,
    range: '6M',
  })
  tvContainer.value.appendChild(script)
})
</script>

<style scoped>
.stock-page { padding-top: 68px; }

/* ── HERO ── */
.stock-hero {
  padding: 64px 0 48px;
  background: transparent;
}
.stock-hero-inner {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 48px;
  align-items: center;
}
.stock-eyebrow {
  display: inline-block;
  font-size: 11px; font-weight: 800;
  letter-spacing: 0.10em; text-transform: uppercase;
  color: #10b981;
  background: rgba(16,185,129,0.10);
  border: 1px solid rgba(16,185,129,0.25);
  border-radius: 100px;
  padding: 4px 12px;
  margin-bottom: 16px;
}
.stock-hero-title {
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 800;
  color: var(--ink, #0A1628);
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin-bottom: 18px;
}
.stock-hero-title em { color: #0057b8; font-style: normal; }
.stock-hero-desc {
  font-size: 15px;
  color: rgba(10,22,40,0.68);
  line-height: 1.75;
  max-width: 600px;
  margin-bottom: 28px;
}
.stock-info-row {
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
}
.stock-info-item {
  display: flex; flex-direction: column; gap: 3px;
}
.stock-info-lbl {
  font-size: 10px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: rgba(10,22,40,0.45);
}
.stock-info-val {
  font-size: 13px; font-weight: 700;
  color: rgba(10,22,40,0.82);
}
.stock-info-val--blue { color: #0057b8; font-size: 15px; }

.stock-badge-group {
  display: flex; flex-direction: column; gap: 10px;
}
.stock-badge {
  display: flex; align-items: center; gap: 8px;
  font-size: 13px; font-weight: 600;
  color: rgba(10,22,40,0.72);
  background: rgba(255,255,255,0.82);
  border: 1.5px solid rgba(16,185,129,0.20);
  border-radius: 10px;
  padding: 10px 16px;
}

/* ── CHART ── */
.stock-chart-section {
  padding: 16px 0 56px;
  background: transparent;
}
.stock-chart-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 16px; gap: 12px; flex-wrap: wrap;
}
.stock-chart-title {
  font-size: 20px; font-weight: 800;
  color: rgba(10,22,40,0.88); letter-spacing: -0.02em;
}
.stock-chart-actions {
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
}
.stock-last-update {
  font-size: 10.5px; color: rgba(10,22,40,0.46); font-weight: 500;
}
.stock-chart-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 12px; border-radius: 8px;
  font-size: 12px; font-weight: 600;
  color: #0057b8;
  background: rgba(0,87,184,0.08);
  border: 1px solid rgba(0,87,184,0.18);
  text-decoration: none;
  transition: background 0.2s;
}
.stock-chart-btn:hover { background: rgba(0,87,184,0.14); }
.stock-chart-src {
  font-size: 10.5px; color: rgba(10,22,40,0.38); font-weight: 500;
}
.stock-chart-wrap {
  background: rgba(255,255,255,0.82);
  border: 1.5px solid rgba(0,63,136,0.12);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  height: 560px;
}
.stock-chart-body {
  width: 100%; height: 100%;
}
.stock-disclaimer {
  font-size: 11.5px; color: rgba(10,22,40,0.48); line-height: 1.65;
  margin-top: 14px;
}
.stock-disclaimer a { color: #0057b8; }

/* ── INFO SECTION ── */
.stock-info-section {
  padding: 64px 0;
  background: rgba(0,63,136,0.03);
}
.stock-info-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.stock-card {
  background: rgba(255,255,255,0.84);
  border: 1.5px solid rgba(0,63,136,0.10);
  border-radius: 16px;
  padding: 24px;
  display: flex; flex-direction: column; gap: 12px;
  transition: box-shadow 0.25s, border-color 0.25s;
}
.stock-card:hover {
  box-shadow: 0 8px 28px rgba(0,63,136,0.08);
  border-color: rgba(0,87,184,0.22);
}
.stock-card-head {
  display: flex;
  align-items: center;
  gap: 12px;
}
.stock-card-icon {
  width: 44px; height: 44px;
  border-radius: 12px;
  background: rgba(0,87,184,0.08);
  border: 1px solid rgba(0,87,184,0.16);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.stock-card-title {
  font-size: 15px; font-weight: 700;
  color: rgba(10,22,40,0.88); letter-spacing: -0.01em;
  line-height: 1.3;
}
.stock-card-desc {
  font-size: 13px; color: rgba(10,22,40,0.65); line-height: 1.65; text-align: justify;
}

/* ── CTA ── */
.stock-cta-section {
  padding: 64px 0;
  background: linear-gradient(135deg, #003f88 0%, #0057b8 60%, #1a7fd4 100%);
}
.stock-cta-inner {
  display: flex; align-items: center; justify-content: space-between;
  gap: 40px; flex-wrap: wrap;
}
.stock-cta-title {
  font-size: clamp(1.3rem, 2.5vw, 1.7rem);
  font-weight: 800; color: #fff;
  letter-spacing: -0.025em; margin-bottom: 8px;
}
.stock-cta-desc {
  font-size: 14px; color: rgba(255,255,255,0.72); line-height: 1.65;
}
.stock-cta-btns { display: flex; gap: 12px; flex-wrap: wrap; flex-shrink: 0; }
.stock-cta-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 26px; border-radius: 12px;
  font-size: 14px; font-weight: 700;
  text-decoration: none;
  transition: background 0.2s;
}
.stock-cta-btn--primary { background: #fff; color: #0057b8; }
.stock-cta-btn--primary:hover { background: #f0f4ff; }
.stock-cta-btn--ghost {
  background: rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.85);
  border: 1px solid rgba(255,255,255,0.25);
}
.stock-cta-btn--ghost:hover { background: rgba(255,255,255,0.20); }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .stock-info-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .stock-hero-inner { grid-template-columns: 1fr; }
  .stock-badge-group { flex-direction: row; flex-wrap: wrap; }
  .stock-badge { padding: 8px 12px; font-size: 12px; }
  .stock-chart-wrap { height: 420px; }
  .stock-cta-inner { flex-direction: column; align-items: flex-start; }
}
@media (max-width: 560px) {
  .stock-info-grid { grid-template-columns: 1fr; }
  .stock-info-row { flex-direction: column; gap: 16px; }
}
</style>
