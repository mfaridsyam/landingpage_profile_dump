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
          <div class="services-stat">
            <div class="services-stat-num">6</div>
            <div class="services-stat-lbl">Produk &amp;<br>Layanan Unggulan</div>
          </div>
          <div class="services-stat-sep"></div>
          <div class="services-stat">
            <div class="services-stat-num">128<span>+</span></div>
            <div class="services-stat-lbl">Tahun<br>Melayani</div>
          </div>
        </div>
      </div>

      <div class="svc-grid">
        <a
          v-for="(svc, i) in allServices" :key="svc.name"
          href="#kontak"
          class="svc-card reveal" :class="`reveal-delay-${i % 3}`"
        >
          <div class="svc-card-inner">
            <div class="svc-top">
              <span class="svc-cat">{{ svc.category }}</span>
              <span class="svc-num">{{ String(i + 1).padStart(2, '0') }}</span>
            </div>
            <div class="svc-name">{{ svc.name }}</div>
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
        </a>
      </div>

    </div>
  </section>
</template>

<script setup>
const allServices = [
  {
    name: 'KUR & Kredit UMKM',
    category: 'Kredit',
    desc: 'Kredit Usaha Rakyat dengan bunga rendah untuk mendorong pertumbuhan usaha mikro, kecil, dan menengah di Polewali Mandar.',
    tags: ['KUR Mikro', 'KUR Kecil', 'KUR TKI'],
  },
  {
    name: 'BRImo Mobile Banking',
    category: 'Digital',
    desc: 'Transaksi kapan saja, di mana saja lewat aplikasi BRImo — transfer, pembayaran tagihan, investasi, dan lebih banyak lagi.',
    tags: ['Transfer', 'Pembayaran', 'QRIS'],
  },
  {
    name: 'Simpanan & Deposito',
    category: 'Simpanan',
    desc: 'Tabungan BritAma, Simpedes, Deposito BRI, dan Giro BRI — pilihan produk simpanan dengan bunga kompetitif dan aman.',
    tags: ['BritAma', 'Simpedes', 'Deposito'],
  },
  {
    name: 'Kredit Pemilikan Rumah',
    category: 'Kredit',
    desc: 'KPR BRI dengan cicilan ringan dan proses mudah untuk mewujudkan impian memiliki hunian idaman bersama keluarga.',
    tags: ['KPR Subsidi', 'KPR Non-Subsidi'],
  },
  {
    name: 'Layanan Digital 24/7',
    category: 'Infrastruktur',
    desc: 'ATM, CDM, dan AgenBRI tersebar luas di wilayah Polewali Mandar — layanan perbankan tanpa batas waktu untuk Anda.',
    tags: ['ATM', 'CDM', 'AgenBRI'],
  },
  {
    name: 'Valuta Asing & Remitansi',
    category: 'Internasional',
    desc: 'Penukaran valuta asing dan layanan pengiriman uang internasional dengan kurs kompetitif dan proses cepat.',
    tags: ['Forex', 'Remittance', 'SWIFT'],
  },
]
</script>

<style scoped>
.services-section { padding: 88px 0; background: transparent; }

/* ── HEADER ── */
.services-header {
  display: flex; align-items: flex-end;
  justify-content: space-between;
  gap: 32px; margin-bottom: 56px; flex-wrap: wrap;
}
.services-header-right {
  display: flex; align-items: center; gap: 24px;
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.09);
  border-radius: 14px; padding: 18px 28px; flex-shrink: 0;
}
.services-stat { text-align: center; }
.services-stat-num {
  font-size: 28px; font-weight: 800;
  color: #fff; letter-spacing: -0.03em; line-height: 1;
}
.services-stat-num span { font-size: 18px; color: var(--bri-gold, #F5A623); }
.services-stat-lbl {
  font-size: 11px; font-weight: 600;
  color: rgba(255,255,255,0.35);
  margin-top: 5px; line-height: 1.35;
  text-transform: uppercase; letter-spacing: 0.04em;
}
.services-stat-sep {
  width: 1px; height: 36px;
  background: rgba(255,255,255,0.10); flex-shrink: 0;
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
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  text-decoration: none;
  overflow: hidden;
  position: relative;
  transition: border-color 0.28s, transform 0.32s cubic-bezier(0.22,1,0.36,1);
}
.svc-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0,87,184,0.07) 0%, transparent 55%);
  opacity: 0;
  transition: opacity 0.28s;
  pointer-events: none;
}
.svc-card:hover {
  border-color: rgba(0,87,184,0.38);
  transform: translateY(-4px);
}
.svc-card:hover::before { opacity: 1; }

.svc-card-inner {
  padding: 28px 26px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
  box-sizing: border-box;
}

/* Top row: category + number */
.svc-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.svc-cat {
  font-size: 10px; font-weight: 800;
  letter-spacing: 0.10em; text-transform: uppercase;
  color: var(--bri-gold, #F5A623);
  background: rgba(245,166,35,0.10);
  border: 1px solid rgba(245,166,35,0.22);
  border-radius: 100px;
  padding: 3px 10px;
}
.svc-num {
  font-size: 11.5px; font-weight: 700;
  color: rgba(255,255,255,0.12);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.08em;
  user-select: none;
}

/* Name */
.svc-name {
  font-size: 19px; font-weight: 700;
  color: rgba(255,255,255,0.90);
  letter-spacing: -0.025em; line-height: 1.25;
  transition: color 0.22s;
}
.svc-card:hover .svc-name { color: #fff; }

/* Description */
.svc-desc {
  font-size: 13.5px;
  color: rgba(255,255,255,0.42);
  line-height: 1.68;
  margin: 0;
  flex: 1;
}

/* Bottom: tags + arrow */
.svc-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
  margin-top: 4px;
}
.svc-tags { display: flex; flex-wrap: wrap; gap: 5px; }
.svc-tag {
  font-size: 10px; font-weight: 600;
  color: rgba(255,255,255,0.28);
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  padding: 2px 8px; border-radius: 100px;
}

/* Arrow circle */
.svc-arrow {
  width: 30px; height: 30px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.04);
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.22);
  flex-shrink: 0;
  transition: color 0.22s, border-color 0.22s, background 0.22s, transform 0.22s;
}
.svc-card:hover .svc-arrow {
  color: #60a5fa;
  border-color: rgba(96,165,250,0.32);
  background: rgba(0,87,184,0.18);
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
  .svc-card-inner { padding: 22px 20px; }
}
</style>
