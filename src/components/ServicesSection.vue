<template>
  <section class="services-section" id="layanan">
    <div class="container">
      <div class="section-eyebrow reveal">Produk &amp; Layanan</div>
      <h2 class="section-title reveal">Solusi Keuangan<br>untuk Semua Kebutuhan</h2>
      <p class="section-sub reveal">Dari simpanan hingga kredit — BRI Polewali hadir dengan produk lengkap yang dirancang untuk kehidupan finansial Anda.</p>
      <div class="services-grid">
        <div v-for="(svc, i) in services" :key="svc.name" class="service-card reveal" :class="`reveal-delay-${i % 3}`">
          <div class="service-card-header">
            <div class="service-icon" v-html="svc.icon"></div>
            <div class="service-name">{{ svc.name }}</div>
          </div>
          <p class="service-desc">{{ svc.desc }}</p>
          <div class="service-tags">
            <span v-for="tag in svc.tags" :key="tag" class="service-tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    name: 'Simpanan & Deposito',
    desc: 'Tabungan BritAma, Simpedes, Deposito BRI, dan Giro BRI — pilihan produk simpanan dengan bunga kompetitif dan aman.',
    tags: ['BritAma', 'Simpedes', 'Deposito'],
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`
  },
  {
    name: 'KUR & Kredit UMKM',
    desc: 'Kredit Usaha Rakyat dengan bunga rendah untuk mendorong pertumbuhan usaha mikro, kecil, dan menengah di Polewali Mandar.',
    tags: ['KUR Mikro', 'KUR Kecil', 'KUR TKI'],
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`
  },
  {
    name: 'BRImo Mobile Banking',
    desc: 'Transaksi kapan saja, di mana saja lewat aplikasi BRImo — transfer, pembayaran tagihan, investasi, dan lebih banyak lagi.',
    tags: ['Transfer', 'Pembayaran', 'QRIS'],
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`
  },
  {
    name: 'Kredit Pemilikan Rumah',
    desc: 'KPR BRI dengan cicilan ringan dan proses mudah untuk mewujudkan impian memiliki hunian idaman bersama keluarga.',
    tags: ['KPR Subsidi', 'KPR Non-Subsidi'],
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
  },
  {
    name: 'Layanan Digital 24/7',
    desc: 'ATM, CDM, dan AgenBRI tersebar luas di wilayah Polewali Mandar — layanan perbankan tanpa batas waktu untuk Anda.',
    tags: ['ATM', 'CDM', 'AgenBRI'],
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
  },
  {
    name: 'Valuta Asing & Remitansi',
    desc: 'Penukaran valuta asing dan layanan pengiriman uang internasional dengan kurs kompetitif dan proses cepat.',
    tags: ['Forex', 'Remittance', 'SWIFT'],
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>`
  },
]
</script>

<style scoped>
.service-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.service-name {
  font-size: 15px;
  font-weight: 600;
  color: rgba(255,255,255,0.92);
  line-height: 1.3;
}
</style>
