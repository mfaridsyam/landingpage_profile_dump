<template>
  <section class="about-section" id="tentang">
    <div class="about-bg"></div>

    <!-- Intro row -->
    <div class="about-hero-layout">
      <div class="about-hero-left reveal">
        <div class="about-eyebrow">Tentang Kami</div>
        <h2 class="about-title">Melayani Polewali Mandar<br>Sejak Puluhan Tahun</h2>
        <p class="about-desc">
          BRI Cabang Polewali hadir sebagai mitra keuangan terpercaya bagi seluruh lapisan masyarakat Polewali Mandar. Berdiri sejak puluhan tahun lalu, kami telah menemani perjalanan ekonomi daerah ini — dari petani dan nelayan, hingga pelaku UMKM dan pengusaha lokal yang terus tumbuh. Dengan jaringan unit kerja yang tersebar di seluruh Kabupaten Polewali Mandar dan Kabupaten Mamasa, kami berkomitmen menghadirkan layanan perbankan yang inklusif, mudah dijangkau, dan relevan.
        </p>
      </div>
      <div class="about-hero-right reveal">
        <div class="about-building-frame">
          <img src="https://res.cloudinary.com/dnacoymkh/image/upload/v1778776946/Bangunan_ueq8ie.png" alt="Gedung BRI Cabang Polewali" class="about-building-img" />
        </div>
      </div>
    </div>

    <!-- Stats row -->
    <div class="container" style="margin-top:0; position:relative; z-index:1;">
      <div class="numbers-grid">
        <div class="number-card reveal">
          <div class="number-val">1946<span style="font-size:1.2rem">est.</span></div>
          <div class="number-lbl">Tahun Berdiri BRI</div>
        </div>
        <div class="number-card reveal reveal-delay-1">
          <div class="number-val">13<span>+</span></div>
          <div class="number-lbl">Unit Kerja di Polewali Mandar</div>
        </div>
        <div class="number-card reveal reveal-delay-3">
          <div class="number-val">24<span>/7</span></div>
          <div class="number-lbl">Layanan Digital ATM &amp; BRImo</div>
        </div>
      </div>
    </div>

    <!-- Mengapa Memilih Kami -->
    <div class="container why-section">
      <div class="why-header reveal">
        <div class="section-eyebrow">Keunggulan Kami</div>
        <h2 class="section-title" style="margin-bottom:8px">Mengapa Memilih BRI Polewali?</h2>
        <p class="section-sub" style="max-width:520px">Kami hadir dengan solusi keuangan terlengkap, jaringan terluas, dan teknologi terdepan untuk mendukung setiap langkah Anda.</p>
      </div>
      <div class="why-grid">
        <div v-for="(item, i) in whyItems" :key="i"
          class="why-card reveal" :class="i > 0 ? `reveal-delay-${Math.min(i,4)}` : ''">
          <div class="why-icon">
            <svg v-if="item.icon === 'shield'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <svg v-else-if="item.icon === 'map'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
            <svg v-else-if="item.icon === 'smartphone'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18" stroke-linecap="round" stroke-width="2.5"/></svg>
            <svg v-else-if="item.icon === 'trending-up'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            <svg v-else-if="item.icon === 'users'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
            <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div class="why-content">
            <div class="why-title">{{ item.title }}</div>
            <div class="why-desc">{{ item.desc }}</div>
          </div>
          <div class="why-badge">{{ item.badge }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const whyItems = [
  {
    icon: 'shield',
    title: 'Terpercaya & Terjamin',
    desc: 'Bank BUMN milik pemerintah Indonesia dengan reputasi terjaga lebih dari 128 tahun. Dana Anda dijamin LPS hingga Rp 2 miliar.',
    badge: 'Bank BUMN'
  },
  {
    icon: 'map',
    title: 'Jaringan Paling Luas',
    desc: '13+ unit kerja yang tersebar merata di seluruh wilayah Polewali Mandar dan Mamasa — tidak ada yang terlalu jauh dari layanan BRI.',
    badge: '13+ Kantor'
  },
  {
    icon: 'smartphone',
    title: 'Digital Terdepan',
    desc: 'BRImo super app dengan 200+ fitur lengkap. Transaksi, investasi, asuransi, dan pinjaman — semua dalam satu genggaman 24/7.',
    badge: 'BRImo'
  },
  {
    icon: 'trending-up',
    title: 'KUR Terbaik untuk UMKM',
    desc: 'Program KUR BRI dengan plafon hingga Rp 500 juta, bunga terjangkau, dan proses cepat. Mitra tumbuh ribuan UMKM Polewali Mandar.',
    badge: 'KUR 6% p.a.'
  },
  {
    icon: 'users',
    title: 'AgenBRI di Pelosok Desa',
    desc: '3.800+ titik AgenBRI memastikan layanan perbankan hadir di depan pintu Anda — termasuk di desa-desa paling terpencil sekalipun.',
    badge: '3.800+ Agen'
  },
  {
    icon: 'clock',
    title: 'Layanan Tanpa Henti',
    desc: 'ATM BRI tersedia 24 jam di berbagai titik strategis. Call center 14017 siap membantu Anda kapan pun Anda membutuhkan.',
    badge: '24/7 Aktif'
  },
]
</script>
