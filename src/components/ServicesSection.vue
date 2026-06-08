<template>
  <section class="services-section" id="layanan">
    <div class="container">

      <div class="services-header">
        <div class="services-header-left reveal">
          <div class="section-eyebrow">Produk &amp; Layanan</div>
          <h2 class="section-title" style="margin-bottom:10px">Solusi Keuangan<br><em>untuk Semua Kebutuhan</em></h2>
          <p class="section-sub">Dari simpanan hingga kredit — BRI Polewali hadir dengan produk lengkap yang dirancang untuk kehidupan finansial Anda.</p>
        </div>
        <div class="services-header-right reveal reveal-delay-1">
          <div class="services-stat-num">6</div>
          <div class="services-stat-lbl">Produk &amp;<br>Layanan</div>
        </div>
      </div>

      <div class="svc-grid">
        <router-link
          v-for="(svc, i) in allServices" :key="svc.name"
          :to="`/layanan/${svc.slug}`"
          class="svc-card reveal" :class="`reveal-delay-${i % 3}`"
        >
          <div class="svc-card-inner">
            <div class="svc-top">
              <!-- Icon + category + name kiri -->
              <div class="svc-head">
                <!-- Custom image icon -->
                <div v-if="svc.iconImg" class="svc-icon-img">
                  <img :src="svc.iconImg" :alt="svc.name" />
                </div>
                <!-- SVG icon dengan kotak -->
                <div v-else class="svc-icon" v-html="svc.icon"></div>
                <div class="svc-head-meta">
                  <div class="svc-name">{{ svc.name }}</div>
                  <span class="svc-cat">{{ svc.category }}</span>
                </div>
              </div>
              <!-- Nomor kanan -->
              <span class="svc-num">{{ String(i + 1).padStart(2, '0') }}</span>
            </div>

            <p class="svc-desc">{{ svc.desc }}</p>

            <div class="svc-bottom">
              <div class="svc-tags">
                <span v-for="tag in svc.tags" :key="tag" class="svc-tag">{{ tag }}</span>
              </div>
              <div class="svc-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          </div>
        </router-link>
      </div>

    </div>
  </section>
</template>

<script setup>
const allServices = [
  {
    slug: 'kur-kredit-umkm',
    name: 'KUR & Kredit UMKM',
    category: 'Kredit',
    desc: 'Kredit Usaha Rakyat dengan bunga rendah untuk mendorong pertumbuhan usaha mikro, kecil, dan menengah di Polewali Mandar.',
    tags: ['KUR Mikro', 'KUR Kecil', 'KUR TKI'],
    iconImg: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1780770580/KUR_dan_Kredit_UMKM_dmftty.png',
  },
  {
    slug: 'brimo-mobile-banking',
    name: 'BRImo Mobile Banking',
    category: 'Digital',
    desc: 'Transaksi kapan saja, di mana saja lewat aplikasi BRImo — transfer, pembayaran tagihan, investasi, dan lebih banyak lagi.',
    tags: ['Transfer', 'Pembayaran', 'QRIS'],
    iconImg: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1780770586/BRImo_Mobile_Banking_zsjbjr.png',
  },
  {
    slug: 'simpanan-deposito',
    name: 'Simpanan & Deposito',
    category: 'Simpanan',
    desc: 'Tabungan BritAma, Simpedes, Deposito BRI, dan Giro BRI — pilihan produk simpanan dengan bunga kompetitif dan aman.',
    tags: ['BritAma', 'Simpedes', 'Deposito'],
    iconImg: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1780770580/Simpanan_dan_Deposito_hwl54o.png',
  },
  {
    slug: 'kredit-pemilikan-rumah',
    name: 'Kredit Pemilikan Rumah',
    category: 'Kredit',
    desc: 'KPR BRI dengan cicilan ringan dan proses mudah untuk mewujudkan impian memiliki hunian idaman bersama keluarga.',
    tags: ['KPR Subsidi', 'KPR Non-Subsidi'],
    iconImg: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1780770578/Kredit_Pemilikan_Rumah_cj0spd.png',
  },
  {
    slug: 'layanan-digital',
    name: 'Layanan Digital 24/7',
    category: 'Infrastruktur',
    desc: 'ATM, CDM, dan AgenBRI tersebar luas di wilayah Polewali Mandar — layanan perbankan tanpa batas waktu untuk Anda.',
    tags: ['ATM', 'CDM', 'AgenBRI'],
    iconImg: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1780770579/Layanan_24_per_7_nb3srl.png',
  },
  {
    slug: 'valuta-asing',
    name: 'Valuta Asing & Remitansi',
    category: 'Internasional',
    desc: 'Penukaran valuta asing dan layanan pengiriman uang internasional dengan kurs kompetitif dan proses cepat.',
    tags: ['Forex', 'Remittance', 'SWIFT'],
    iconImg: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1780770581/Valuta_Asing_dan_Remitasi_jb7fsm.png',
  },
]
</script>

<style scoped>
.services-section { padding: 88px 0; background: transparent; }

/* ── HEADER ── */
.services-header {
  display: flex; align-items: center;
  justify-content: space-between;
  gap: 32px; margin-bottom: 56px; flex-wrap: wrap;
}
.services-header-right {
  display: flex; align-items: center; gap: 14px;
  background: rgba(255,255,255,0.75);
  border: 1.5px solid rgba(0,63,136,0.14);
  border-radius: 14px; padding: 16px 24px; flex-shrink: 0;
 
}
.services-stat-num {
  font-size: 40px; font-weight: 800;
  color: var(--ink, #0A1628); letter-spacing: -0.04em; line-height: 1;
}
.services-stat-lbl {
  font-size: 11px; font-weight: 700;
  color: rgba(10,22,40,0.65);
  line-height: 1.45;
  text-transform: uppercase; letter-spacing: 0.06em;
}

/* ── GRID ── */
.svc-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

/* ── CARD ── */
.svc-card {
  display: block;
  background: rgba(255,255,255,0.82);
  border: 1.5px solid rgba(0,63,136,0.12);
  border-radius: 20px;
  text-decoration: none;
  overflow: hidden;
  backdrop-filter: blur(8px);
  position: relative;
  transition: border-color 0.28s, transform 0.32s cubic-bezier(0.22,1,0.36,1),
              background 0.28s, box-shadow 0.32s;
 
}
.svc-card::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(0,87,184,0.06) 0%, transparent 55%);
  opacity: 0; transition: opacity 0.28s; pointer-events: none;
}
.svc-card:hover {
  border-color: rgba(0,87,184,0.38);
  transform: translateY(-4px);
  background: rgba(255,255,255,0.96);
  box-shadow: 0 0 0 1px rgba(0,87,184,0.14), 0 12px 40px rgba(0,63,136,0.12);
}
.svc-card:hover::before { opacity: 1; }
.svc-card::after {
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
.svc-card:hover::after { transform: scaleX(1); }

.svc-card-inner {
  padding: 26px 24px;
  display: flex; flex-direction: column;
  gap: 14px;
}

/* Top: head (icon+cat+name) + number */
.svc-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}
.svc-head {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.svc-icon {
  width: 48px; height: 48px;
  border-radius: 14px;
  background: rgba(0,87,184,0.18);
  border: 1px solid rgba(0,87,184,0.26);
  display: flex; align-items: center; justify-content: center;
  color: #0057b8;
  flex-shrink: 0;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}
.svc-card:hover .svc-icon {
  background: #0057b8;
  border-color: #0057b8;
  color: #fff;
}

/* ── IMAGE ICON ── */
.svc-icon-img {
  width: 52px; height: 52px;
  flex-shrink: 0;
}
.svc-icon-img img {
  width: 52px; height: 52px;
  object-fit: contain;
  display: block;
}

.svc-head-meta {
  display: flex; flex-direction: column; gap: 5px;
}
.svc-cat {
  font-size: 10px; font-weight: 800;
  letter-spacing: 0.10em; text-transform: uppercase;
  color: var(--bri-gold, #F5A623);
  background: rgba(245,166,35,0.10);
  border: 1px solid rgba(245,166,35,0.22);
  border-radius: 100px;
  padding: 2px 9px;
  align-self: flex-start;
}
.svc-name {
  font-size: 17px; font-weight: 700;
  color: rgba(10,22,40,0.90);
  letter-spacing: -0.025em; line-height: 1.25;
  transition: color 0.22s;
}
.svc-card:hover .svc-name { color: var(--ink, #0A1628); }

.svc-num {
  font-size: 11px; font-weight: 700;
  color: rgba(10,22,40,0.16);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.08em;
  user-select: none;
  flex-shrink: 0;
  margin-top: 2px;
}

/* Description */
.svc-desc {
  font-size: 13px;
  color: rgba(10,22,40,0.70);
  line-height: 1.68; margin: 0;
  flex: 1;
}

/* Bottom: tags + arrow */
.svc-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
  margin-top: 2px;
}
.svc-tags { display: flex; flex-wrap: wrap; gap: 5px; }
.svc-tag {
  font-size: 10px; font-weight: 600;
  color: rgba(10,22,40,0.62);
  background: rgba(0,63,136,0.06);
  border: 1px solid rgba(0,63,136,0.10);
  padding: 2px 8px; border-radius: 100px;
}

/* Arrow */
.svc-arrow {
  width: 30px; height: 30px;
  border-radius: 50%;
  border: 1px solid rgba(0,63,136,0.12);
  background: rgba(0,63,136,0.05);
  display: flex; align-items: center; justify-content: center;
  color: rgba(10,22,40,0.75);
  flex-shrink: 0;
  transition: color 0.22s, border-color 0.22s, background 0.22s, transform 0.22s;
}
.svc-card:hover .svc-arrow {
  color: #0057b8;
  border-color: rgba(0,87,184,0.28);
  background: rgba(0,87,184,0.12);
  transform: translateX(3px);
}

/* ── RESPONSIVE ── */
@media (max-width: 960px) {
  .svc-grid { grid-template-columns: repeat(2, 1fr); }
  .services-header { align-items: flex-start; }
}
@media (max-width: 560px) {
  .svc-grid { grid-template-columns: 1fr; }
  .services-header-right { width: 100%; justify-content: center; }
  .svc-card-inner { padding: 20px 18px; }
}
</style>
