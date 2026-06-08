<template>
  <section class="keunggulan-section" id="keunggulan">
    <div class="container">
      <div class="keunggulan-header reveal">
        <div class="section-eyebrow">Keunggulan Kami</div>
        <h2 class="section-title" style="margin-bottom:8px">Mengapa Memilih BRI?</h2>
        <p class="section-sub" style="max-width:520px">Solusi keuangan terlengkap, jaringan terluas, dan teknologi terdepan — hadir untuk mendukung setiap langkah Anda.</p>
      </div>

      <div class="why-grid">
        <div v-for="(item, i) in whyItems" :key="i"
          class="why-card reveal" :class="i > 0 ? `reveal-delay-${Math.min(i, 4)}` : ''">
          <div class="why-card-header">
            <!-- Custom image icon -->
            <div v-if="item.iconImg" class="why-icon-img">
              <img :src="item.iconImg" :alt="item.title" />
            </div>
            <div v-else class="why-icon">
              <svg v-if="item.icon === 'shield'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <svg v-else-if="item.icon === 'map'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
              <svg v-else-if="item.icon === 'smartphone'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18" stroke-linecap="round" stroke-width="2.5"/></svg>
              <svg v-else-if="item.icon === 'trending-up'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              <svg v-else-if="item.icon === 'users'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
              <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div class="why-title">{{ item.title }}</div>
          </div>
          <div class="why-desc">{{ item.desc }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const whyItems = [
  {
    iconImg: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1780770581/Terpercaya_dan_Terjamin_bbpzut.png',
    iconImgHover: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1780770581/Terpercaya_dan_Terjamin_bbpzut.png',
    title: 'Terpercaya & Terjamin',
    desc: 'Bank BUMN milik pemerintah Indonesia, terpercaya dan diawasi langsung oleh OJK. Dana Anda dijamin LPS hingga Rp 2 miliar.',
    badge: 'Bank BUMN'
  },
  {
    iconImg: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1780770577/Jaringan_Paling_Luas_zfsot2.png',
    iconImgHover: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1780770577/Jaringan_Paling_Luas_zfsot2.png',
    title: 'Jaringan Paling Luas',
    desc: '13+ unit kerja yang tersebar merata di wilayah layanan kami — selalu ada kantor BRI terdekat yang siap melayani Anda.',
    badge: '13+ Kantor'
  },
  {
    iconImg: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1780770576/Digital_Terdepan_cif52c.png',
    iconImgHover: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1780770576/Digital_Terdepan_cif52c.png',
    title: 'Digital Terdepan',
    desc: 'BRImo super app dengan 200+ fitur lengkap. Transaksi, investasi, asuransi, dan pinjaman — semua dalam satu genggaman 24/7.',
    badge: 'BRImo'
  },
  {
    iconImg: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1780770577/KUR_Terbaik_untuk_UMKM_wvhner.png',
    iconImgHover: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1780770577/KUR_Terbaik_untuk_UMKM_wvhner.png',
    title: 'KUR Terbaik untuk UMKM',
    desc: 'Program KUR BRI dengan plafon hingga Rp 500 juta, bunga terjangkau, dan proses cepat — mitra tumbuh ribuan pelaku UMKM di seluruh Indonesia.',
    badge: 'KUR 6% p.a.'
  },
  {
    iconImg: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1780770575/Agen_BRILink_ooi9ey.png',
    iconImgHover: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1780770575/Agen_BRILink_ooi9ey.png',
    title: 'AgenBRI di Pelosok Desa',
    desc: '3.800+ titik AgenBRI memastikan layanan perbankan hadir di depan pintu Anda — termasuk di desa-desa paling terpencil sekalipun.',
    badge: '3.800+ Agen'
  },
  {
    iconImg: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1780770580/Layanan_Tanpa_Henti_ysucps.png',
    iconImgHover: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1780770580/Layanan_Tanpa_Henti_ysucps.png',
    title: 'Layanan Tanpa Henti',
    desc: 'ATM BRI tersedia 24 jam di berbagai titik strategis. Call center 14017 siap membantu Anda kapan pun Anda membutuhkan.',
    badge: '24/7 Aktif'
  },
]
</script>

<style scoped>
.keunggulan-section { padding: 72px 0; background: transparent; }
.keunggulan-header { margin-bottom: 48px; }

.numbers-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 56px;
}
.number-card {
  background: rgba(255,255,255,0.08);
  border: 1.5px solid rgba(255,255,255,0.13);
  border-radius: 16px;
  padding: 28px 24px;
  backdrop-filter: blur(8px);
  text-align: center;
}
.number-val {
  font-size: clamp(2.4rem, 4vw, 3.2rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.03em;
  line-height: 1;
  margin-bottom: 10px;
}
.number-val span {
  font-size: 1.4rem;
  color: var(--bri-gold, #F5A623);
  font-weight: 700;
}
.number-lbl {
  font-size: 13px;
  color: rgba(255,255,255,0.50);
  font-weight: 500;
  line-height: 1.4;
}

.why-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.why-card {
  background: rgba(255,255,255,0.80);
  border: 1.5px solid rgba(0,63,136,0.12);
  border-radius: 16px;
  padding: 24px 22px;
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: border-color 0.28s, transform 0.32s cubic-bezier(0.22,1,0.36,1),
              background 0.28s, box-shadow 0.32s;
  position: relative;
  overflow: hidden;
 
}
.why-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2.5px;
  background: linear-gradient(90deg, #0057B8, #60a5fa, #0057B8);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.38s cubic-bezier(0.22,1,0.36,1);
  z-index: 1;
}
.why-card:hover {
  border-color: rgba(0,87,184,0.35);
  transform: translateY(-4px);
  background: rgba(255,255,255,0.96);
  box-shadow: 0 0 0 1px rgba(0,87,184,0.14), 0 12px 40px rgba(0,63,136,0.12);
}
.why-card:hover::before { transform: scaleX(1); }
.why-card-header {
  display: flex;
  align-items: center;
  gap: 14px;
}
.why-icon {
  width: 48px; height: 48px;
  border-radius: 14px;
  background: rgba(0,87,184,0.18);
  border: 1px solid rgba(0,87,184,0.26);
  display: flex; align-items: center; justify-content: center;
  color: #0057b8;
  flex-shrink: 0;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}
.why-card:hover .why-icon {
  background: #0057b8;
  border-color: #0057b8;
  color: #fff;
}
.why-icon-img {
  width: 52px; height: 52px;
  flex-shrink: 0;
}
.why-icon-img img {
  width: 52px; height: 52px;
  object-fit: contain;
  display: block;
}

.why-title {
  font-size: 15px;
  font-weight: 700;
  color: rgba(10,22,40,0.92);
  letter-spacing: -0.01em;
  line-height: 1.3;
}
.why-desc {
  font-size: 13px;
  color: rgba(10,22,40,0.72);
  line-height: 1.65;
}
.why-badge {
  display: inline-block;
  font-size: 10px; font-weight: 800;
  letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--bri-gold, #F5A623);
  background: rgba(245,166,35,0.10);
  border: 1px solid rgba(245,166,35,0.25);
  border-radius: 100px;
  padding: 3px 10px;
  align-self: flex-start;
}

@media (max-width: 900px) {
  .numbers-grid { grid-template-columns: repeat(3, 1fr); }
  .why-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .numbers-grid { grid-template-columns: 1fr; }
  .why-grid { grid-template-columns: 1fr; }
}
</style>
