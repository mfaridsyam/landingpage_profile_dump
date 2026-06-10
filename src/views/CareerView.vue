<template>
  <div class="career-page">
    <TheNavbar />

    <!-- ── HERO ── -->
    <section class="career-hero">
      <div class="career-hero-bg" aria-hidden="true">
        <div class="career-hero-orb career-hero-orb--1"></div>
        <div class="career-hero-orb career-hero-orb--2"></div>
      </div>
      <div class="container career-hero-inner">
        <div class="career-hero-left">
          <div class="career-eyebrow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Panduan Melamar Kerja
          </div>
          <h1 class="career-h1">Mau Kerja di <em>Perusahaan Besar?</em><br>Mulai dari Sini.</h1>
          <p class="career-desc">
            Banyak orang tidak tahu harus mendaftar ke mana saat ingin bekerja di perusahaan besar atau BUMN.
            Halaman ini mengumpulkan portal-portal rekrutmen resmi agar Anda bisa langsung melamar dengan mudah.
          </p>
          <div class="career-hero-stats">
            <div class="career-stat">
              <span class="career-stat-n">4</span>
              <span class="career-stat-l">Portal Resmi</span>
            </div>
            <div class="career-stat-vline"></div>
            <div class="career-stat">
              <span class="career-stat-n">Gratis</span>
              <span class="career-stat-l">Tanpa Biaya</span>
            </div>
            <div class="career-stat-vline"></div>
            <div class="career-stat">
              <span class="career-stat-n">Resmi</span>
              <span class="career-stat-l">Terverifikasi</span>
            </div>
          </div>
        </div>
        <div class="career-hero-right" aria-hidden="true">
          <div class="career-hero-badge-stack">
            <div class="career-badge-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Portal Resmi &amp; Terpercaya
            </div>
            <div class="career-badge-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
              Proses Transparan
            </div>
            <div class="career-badge-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
              Berbagai Jalur Karier
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── PORTAL CARDS ── -->
    <section class="career-portals">
      <div class="container">
        <div class="career-portals-head">
          <div class="section-eyebrow">Portal Lowongan</div>
          <h2 class="section-title">Portal Rekrutmen yang Bisa Anda Coba</h2>
          <p class="career-portals-desc">
            Berikut beberapa portal rekrutmen resmi yang bisa Anda kunjungi langsung untuk melamar — gratis dan tanpa perantara.
          </p>
        </div>

        <div class="career-cards-grid">
          <a v-for="item in careers" :key="item.name"
            :href="item.url" target="_blank" rel="noopener"
            class="career-card">
            <div class="career-card-inner">
              <div class="career-card-top">
                <img class="career-card-logo" :src="item.logo" :alt="item.name" loading="lazy" />
                <div class="career-card-meta">
                  <h3 class="career-card-name">{{ item.name }}</h3>
                  <div class="career-card-badge">{{ item.tag }}</div>
                </div>
              </div>
              <p class="career-card-desc">{{ item.desc }}</p>
              <div class="career-card-cta">
                <span>Daftar Sekarang</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </div>
            </div>
            <div class="career-card-accent"></div>
          </a>
        </div>
      </div>
    </section>

    <!-- ── CONTACT CTA ── -->
    <section class="career-cta-section">
      <div class="container career-cta-inner">
        <div class="career-cta-left">
          <h2 class="career-cta-title">Butuh Informasi Lebih Lanjut?</h2>
          <p class="career-cta-desc">Hubungi BRI Cabang Polewali jika Anda membutuhkan panduan atau informasi seputar rekrutmen di wilayah Polman dan Mamasa.</p>
        </div>
        <div class="career-cta-btns">
          <a href="tel:042821027" class="career-cta-btn career-cta-btn--primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.9a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16z"/></svg>
            (0428) 21027
          </a>
          <router-link to="/" class="career-cta-btn career-cta-btn--ghost">
            Kembali ke Beranda
          </router-link>
        </div>
      </div>
    </section>

    <TheFooter />
  </div>
</template>

<script setup>
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'

const careers = [
  {
    name: 'BRI Recruitment',
    url:  'https://e-recruitment.bri.co.id/',
    logo: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1778344147/Logo_rekrutmen_bri_ori_p2o5qd.png',
    desc: 'Portal rekrutmen resmi untuk posisi pegawai tetap di Bank BRI — salah satu bank BUMN terbesar di Indonesia.',
    tag:  'Pegawai Tetap',
  },
  {
    name: 'Talenta Brillian',
    url:  'https://www.talentabrilian.id/',
    logo: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1778344853/Logo_rekrutmen_talentabrillian_bc9nus.png',
    desc: 'Program Management Trainee khusus lulusan sarjana — jalur cepat menuju posisi kepemimpinan di lingkungan perbankan.',
    tag:  'Management Trainee',
  },
  {
    name: 'PKSS',
    url:  'https://recruitment.ptpkss.com/',
    logo: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1778344854/Logo_rekrutmen_pkss_avqbp4.png',
    desc: 'Lowongan tenaga kerja penunjang dan outsourcing di berbagai bidang operasional perbankan di seluruh Indonesia.',
    tag:  'Tenaga Penunjang',
  },
  {
    name: 'Magenta',
    url:  'https://magentaku.id/',
    logo: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1778408438/Logo_Magenta_p7w0ne.png',
    desc: 'Platform karier dan magang untuk generasi muda yang ingin memulai perjalanan profesional di perusahaan ternama.',
    tag:  'Magang & Karier',
  },
]
</script>

<style scoped>
.career-page { padding-top: 68px; }

/* ── HERO ── */
.career-hero {
  position: relative;
  padding: 72px 0 64px;
  overflow: hidden;
}
.career-hero-bg {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, #002e72 0%, #003f88 40%, #0057b8 75%, #1a7fd4 100%);
}
.career-hero-orb {
  position: absolute; border-radius: 50%;
  background: rgba(255,255,255,0.055);
  pointer-events: none;
}
.career-hero-orb--1 { width: 420px; height: 420px; top: -120px; right: -80px; }
.career-hero-orb--2 { width: 260px; height: 260px; bottom: -80px; left: 100px; }

.career-hero-inner {
  position: relative; z-index: 1;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 60px;
  align-items: center;
}
.career-eyebrow {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 11px; font-weight: 800; letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.68);
  margin-bottom: 16px;
}
.career-h1 {
  font-size: clamp(1.9rem, 3.8vw, 3rem);
  font-weight: 800; color: #fff;
  letter-spacing: -0.03em; line-height: 1.15;
  margin: 0 0 18px;
}
.career-h1 em { color: #F5A623; font-style: normal; }
.career-desc {
  font-size: 15px; color: rgba(255,255,255,0.72);
  line-height: 1.75; max-width: 520px; margin: 0 0 32px;
}

.career-hero-stats {
  display: flex; align-items: center; gap: 24px; flex-wrap: wrap;
}
.career-stat { display: flex; flex-direction: column; gap: 2px; }
.career-stat-n {
  font-size: 22px; font-weight: 800; color: #fff; letter-spacing: -0.02em;
}
.career-stat-l { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.55); }
.career-stat-vline {
  width: 1px; height: 36px;
  background: rgba(255,255,255,0.20);
}

.career-hero-badge-stack {
  display: flex; flex-direction: column; gap: 10px;
}
.career-badge-item {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 18px; border-radius: 12px;
  background: rgba(255,255,255,0.10);
  border: 1.5px solid rgba(255,255,255,0.18);
  font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.88);
  backdrop-filter: blur(10px);
  white-space: nowrap;
}
.career-badge-item svg { color: #F5A623; flex-shrink: 0; }

/* ── PORTAL CARDS SECTION ── */
.career-portals {
  padding: 80px 0;
  background: transparent;
}
.career-portals-head { margin-bottom: 48px; }
.career-portals-desc {
  font-size: 15px; color: rgba(10,22,40,0.58);
  margin-top: 8px; max-width: 480px; line-height: 1.65;
}

.career-cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.career-card {
  display: flex; flex-direction: column;
  background: rgba(255,255,255,0.84);
  border: 1.5px solid rgba(0,63,136,0.11);
  border-radius: 20px; overflow: hidden;
  text-decoration: none; cursor: pointer;
  transition: border-color 0.25s, transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s;
}
.career-card:hover {
  border-color: rgba(0,87,184,0.32);
  transform: translateY(-5px);
  box-shadow: 0 16px 44px rgba(0,63,136,0.13);
}
.career-card-inner {
  padding: 26px 24px 22px;
  flex: 1; display: flex; flex-direction: column; gap: 14px;
}
.career-card-top {
  display: flex; align-items: center; gap: 14px;
}
.career-card-logo {
  width: 42px; height: 42px; flex-shrink: 0;
  object-fit: contain; display: block;
}
.career-card-meta {
  display: flex; flex-direction: column; gap: 5px; min-width: 0;
}
.career-card-badge {
  display: inline-block;
  font-size: 9px; font-weight: 800;
  letter-spacing: 0.07em; text-transform: uppercase;
  color: #0057b8; background: rgba(0,87,184,0.08);
  border: 1px solid rgba(0,87,184,0.18);
  border-radius: 100px; padding: 3px 9px;
  white-space: nowrap; align-self: flex-start;
}
.career-card-name {
  font-size: 15px; font-weight: 800;
  color: rgba(10,22,40,0.92); letter-spacing: -0.02em;
  line-height: 1.2; margin: 0;
}
.career-card-desc {
  font-size: 13px; color: rgba(10,22,40,0.62);
  line-height: 1.65; flex: 1; margin: 0;
}
.career-card-cta {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 12.5px; font-weight: 700; color: #0057b8;
  margin-top: 4px; transition: gap 0.2s;
}
.career-card:hover .career-card-cta { gap: 10px; }
.career-card-accent {
  height: 3px; flex-shrink: 0;
  background: linear-gradient(90deg, #003f88, #0057b8);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.32s cubic-bezier(0.22,1,0.36,1);
}
.career-card:hover .career-card-accent { transform: scaleX(1); }

/* ── CONTACT CTA ── */
.career-cta-section {
  padding: 64px 0;
  background: linear-gradient(135deg, #002e72 0%, #003f88 50%, #0057b8 100%);
}
.career-cta-inner {
  display: flex; align-items: center; justify-content: space-between;
  gap: 40px;
}
.career-cta-title {
  font-size: clamp(1.2rem, 2.4vw, 1.6rem);
  font-weight: 800; color: #fff;
  letter-spacing: -0.025em; margin: 0 0 8px;
}
.career-cta-desc {
  font-size: 14px; color: rgba(255,255,255,0.68); line-height: 1.65; margin: 0;
}
.career-cta-btns { display: flex; gap: 12px; flex-shrink: 0; }
.career-cta-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 26px; border-radius: 12px;
  font-size: 14px; font-weight: 700;
  text-decoration: none; transition: background 0.2s;
}
.career-cta-btn--primary {
  background: #fff; color: #0057b8;
}
.career-cta-btn--primary:hover { background: #eef2ff; }
.career-cta-btn--ghost {
  background: rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.85);
  border: 1px solid rgba(255,255,255,0.24);
}
.career-cta-btn--ghost:hover { background: rgba(255,255,255,0.20); }

/* ── RESPONSIVE ── */
@media (max-width: 1100px) {
  .career-cards-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 900px) {
  .career-hero-inner { grid-template-columns: 1fr; gap: 32px; }
  .career-hero-right { display: none; }
}
@media (max-width: 600px) {
  .career-cards-grid { grid-template-columns: 1fr; }
  .career-hero { padding: 52px 0 48px; }
  .career-cta-inner { flex-direction: column; align-items: flex-start; }
}
</style>
