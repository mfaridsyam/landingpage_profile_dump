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
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20"/><path d="M6 15h2"/><path d="M10 15h6"/></svg>`
  },
  {
    name: 'KUR & Kredit UMKM',
    desc: 'Kredit Usaha Rakyat dengan bunga rendah untuk mendorong pertumbuhan usaha mikro, kecil, dan menengah di Polewali Mandar.',
    tags: ['KUR Mikro', 'KUR Kecil', 'KUR TKI'],
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 12h3v8h5v-5h4v5h5v-8h3L12 2z"/><circle cx="12" cy="10" r="2"/></svg>`
  },
  {
    name: 'BRImo Mobile Banking',
    desc: 'Transaksi kapan saja, di mana saja lewat aplikasi BRImo — transfer, pembayaran tagihan, investasi, dan lebih banyak lagi.',
    tags: ['Transfer', 'Pembayaran', 'QRIS'],
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="3"/><path d="M9 7h6"/><path d="M9 11h6"/><path d="M11 19h2"/></svg>`
  },
  {
    name: 'Kredit Pemilikan Rumah',
    desc: 'KPR BRI dengan cicilan ringan dan proses mudah untuk mewujudkan impian memiliki hunian idaman bersama keluarga.',
    tags: ['KPR Subsidi', 'KPR Non-Subsidi'],
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V10.5z"/><path d="M9 21V12h6v9"/></svg>`
  },
  {
    name: 'Layanan Digital 24/7',
    desc: 'ATM, CDM, dan AgenBRI tersebar luas di wilayah Polewali Mandar — layanan perbankan tanpa batas waktu untuk Anda.',
    tags: ['ATM', 'CDM', 'AgenBRI'],
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 8h2v4H7z"/><path d="M11 10h6"/><path d="M11 13h4"/></svg>`
  },
  {
    name: 'Valuta Asing & Remitansi',
    desc: 'Penukaran valuta asing dan layanan pengiriman uang internasional dengan kurs kompetitif dan proses cepat.',
    tags: ['Forex', 'Remittance', 'SWIFT'],
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 6v12"/><path d="M15 8.5H10.5a2.5 2.5 0 000 5h3a2.5 2.5 0 010 5H9"/></svg>`
  },
]
</script>

<style scoped>
.service-card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;
}

.service-name {
  font-size: 15px;
  font-weight: 600;
  color: rgba(255,255,255,0.92);
  line-height: 1.3;
}
</style>
