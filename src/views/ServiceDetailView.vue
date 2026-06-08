<template>
  <div class="svc-page" v-if="service">
    <TheNavbar />

    <!-- HERO -->
    <section class="svc-hero">
      <div class="container svc-hero-inner">
        <div class="svc-hero-left">
          <span class="svc-cat-badge">{{ service.category }}</span>
          <h1 class="svc-hero-title">{{ service.title }}</h1>
          <p class="svc-hero-desc">{{ service.heroDesc }}</p>
          <div class="svc-hero-stats">
            <div v-for="s in service.stats" :key="s.label" class="svc-stat">
              <div class="svc-stat-val">{{ s.value }}</div>
              <div class="svc-stat-lbl">{{ s.label }}</div>
            </div>
          </div>
        </div>
        <div class="svc-hero-right">
          <div class="svc-hero-icon-frame">
            <img :src="service.iconImg" :alt="service.title" class="svc-hero-img" />
          </div>
        </div>
      </div>
    </section>

    <!-- PRODUK / FITUR UTAMA -->
    <section class="svc-section">
      <div class="container">
        <div class="svc-section-head">
          <div class="section-eyebrow">{{ service.productsLabel || 'Produk & Fitur' }}</div>
          <h2 class="section-title">{{ service.productsTitle }}</h2>
        </div>
        <div class="svc-products-grid">
          <div v-for="p in service.products" :key="p.name" class="svc-product-card">
            <div class="svc-product-head">
              <div class="svc-product-icon" v-html="p.icon"></div>
              <div class="svc-product-name">{{ p.name }}</div>
            </div>
            <div class="svc-product-desc">{{ p.desc }}</div>
            <div v-if="p.highlight" class="svc-product-highlight">{{ p.highlight }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- KEUNGGULAN -->
    <section class="svc-section svc-section--alt">
      <div class="container">
        <div class="svc-section-head">
          <div class="section-eyebrow">Keunggulan</div>
          <h2 class="section-title">Mengapa Memilih BRI?</h2>
        </div>
        <div class="svc-benefits-grid">
          <div v-for="b in service.benefits" :key="b.title" class="svc-benefit">
            <div class="svc-benefit-head">
              <div class="svc-benefit-icon" v-html="b.icon"></div>
              <div class="svc-benefit-title">{{ b.title }}</div>
            </div>
            <div class="svc-benefit-desc">{{ b.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- PERSYARATAN -->
    <section class="svc-section" v-if="service.requirements">
      <div class="container svc-req-inner">
        <div class="svc-req-left">
          <div class="section-eyebrow">Persyaratan</div>
          <h2 class="section-title">{{ service.requirements.title }}</h2>
          <p class="svc-req-desc">{{ service.requirements.desc }}</p>
        </div>
        <div class="svc-req-right">
          <ul class="svc-req-list">
            <li v-for="r in service.requirements.items" :key="r" class="svc-req-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0057b8" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>{{ r }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- CARA MENGAJUKAN / LANGKAH -->
    <section class="svc-section svc-section--alt" v-if="service.steps">
      <div class="container">
        <div class="svc-section-head">
          <div class="section-eyebrow">{{ service.steps.label || 'Cara Mengajukan' }}</div>
          <h2 class="section-title">{{ service.steps.title }}</h2>
        </div>
        <div class="svc-steps">
          <div v-for="(step, i) in service.steps.items" :key="i" class="svc-step">
            <div class="svc-step-head">
              <div class="svc-step-num">{{ String(i + 1).padStart(2, '0') }}</div>
              <div class="svc-step-title">{{ step.title }}</div>
            </div>
            <div class="svc-step-desc">{{ step.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="svc-cta-section">
      <div class="container svc-cta-inner">
        <div class="svc-cta-text">
          <h2 class="svc-cta-title">Tertarik? Hubungi Kami Sekarang</h2>
          <p class="svc-cta-desc">Tim BRI Polewali siap membantu Anda — kunjungi kantor kami atau hubungi call center 24 jam.</p>
        </div>
        <div class="svc-cta-btns">
          <router-link to="/#kontak" class="svc-cta-btn svc-cta-btn--primary">
            Hubungi Kami
          </router-link>
          <router-link to="/" class="svc-cta-btn svc-cta-btn--ghost">
            Kembali ke Beranda
          </router-link>
        </div>
      </div>
    </section>

    <TheFooter />
  </div>

  <!-- 404 -->
  <div v-else class="svc-notfound">
    <div class="container">
      <h2>Layanan tidak ditemukan</h2>
      <router-link to="/">← Kembali ke Beranda</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'

const route = useRoute()

watch(() => route.params.slug, () => {
  window.scrollTo({ top: 0, behavior: 'instant' })
})

const checkIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0057b8" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`
const starIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0057b8" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
const shieldIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0057b8" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
const clockIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0057b8" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
const globeIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0057b8" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>`
const homeIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0057b8" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
const phoneIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0057b8" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 0111.63 19 19.5 19.5 0 015 12.37a19.79 19.79 0 01-2.92-8.63A2 2 0 014 1.72h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 18v2z"/></svg>`
const zap = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0057b8" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
const creditCard = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0057b8" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`
const building = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0057b8" stroke-width="2"><path d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18z"/><path d="M6 12H4a2 2 0 00-2 2v6a2 2 0 002 2h2"/><path d="M18 9h2a2 2 0 012 2v9a2 2 0 01-2 2h-2"/><line x1="10" y1="6" x2="10" y2="6"/><line x1="14" y1="6" x2="14" y2="6"/><line x1="10" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="14" y2="10"/><line x1="10" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="14" y2="14"/></svg>`
const trendingUp = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0057b8" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`
const mapPin = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0057b8" stroke-width="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`
const dollar = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0057b8" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>`

const ALL_SERVICES = {
  'kur-kredit-umkm': {
    category: 'Kredit',
    title: 'KUR & Kredit UMKM',
    heroDesc: 'Kredit Usaha Rakyat (KUR) BRI hadir untuk mendorong pertumbuhan usaha Anda — dengan bunga rendah, proses cepat, dan persyaratan yang mudah dipenuhi oleh para pelaku UMKM di Polewali Mandar.',
    iconImg: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1780770580/KUR_dan_Kredit_UMKM_dmftty.png',
    stats: [
      { value: 'Rp 500 Jt', label: 'Plafon Maks.' },
      { value: '6%', label: 'Bunga p.a.' },
      { value: '≤ 7 Hari', label: 'Proses Cair' },
    ],
    productsTitle: 'Jenis KUR & Kredit UMKM',
    products: [
      { name: 'KUR Super Mikro', icon: zap, desc: 'Untuk usaha yang baru berjalan atau belum memiliki dokumen resmi. Plafon hingga Rp 10 juta tanpa agunan, cocok untuk modal awal usaha kecil.', highlight: 'Plafon s/d Rp 10 juta · Tanpa agunan' },
      { name: 'KUR Mikro', icon: trendingUp, desc: 'Untuk usaha mikro yang sudah berjalan minimal 6 bulan. Plafon hingga Rp 100 juta dengan bunga rendah 6% per tahun dan cicilan ringan.', highlight: 'Plafon s/d Rp 100 juta · Bunga 6%/tahun' },
      { name: 'KUR Kecil', icon: building, desc: 'Untuk usaha kecil yang membutuhkan modal lebih besar. Plafon Rp 100 juta hingga Rp 500 juta dengan agunan properti atau kendaraan.', highlight: 'Plafon Rp 100 jt – Rp 500 jt' },
      { name: 'KUR TKI', icon: globeIcon, desc: 'Khusus untuk Tenaga Kerja Indonesia yang ingin berangkat bekerja ke luar negeri. Membiayai biaya keberangkatan, pelatihan, dan akomodasi awal.', highlight: 'Untuk TKI · Proses cepat' },
      { name: 'Kredit Modal Kerja', icon: creditCard, desc: 'Fasilitas kredit untuk memenuhi kebutuhan modal kerja usaha — mulai dari pembelian bahan baku, pembayaran gaji, hingga biaya operasional harian.', highlight: 'Tenor fleksibel s/d 5 tahun' },
      { name: 'Kredit Investasi UMKM', icon: homeIcon, desc: 'Untuk membiayai pembelian aset usaha seperti mesin, peralatan produksi, atau kendaraan operasional. Tenor panjang hingga 10 tahun.', highlight: 'Tenor s/d 10 tahun' },
    ],
    benefits: [
      { icon: dollar, title: 'Bunga Paling Rendah', desc: 'KUR BRI menawarkan suku bunga 6% per tahun — salah satu yang terendah di perbankan nasional, dijamin oleh pemerintah.' },
      { icon: zap, title: 'Proses Cepat & Mudah', desc: 'Pengajuan dapat dilakukan di kantor BRI terdekat. Dana dapat cair dalam 1–7 hari kerja setelah berkas lengkap dan disetujui.' },
      { icon: shieldIcon, title: 'Dijamin Pemerintah', desc: 'KUR BRI dijamin oleh pemerintah melalui lembaga penjamin kredit, sehingga lebih aman dan prosesnya lebih mudah disetujui.' },
      { icon: starIcon, title: 'Tanpa Agunan (Mikro)', desc: 'KUR Mikro dan Super Mikro tidak memerlukan jaminan tambahan — cukup usaha Anda yang sudah berjalan sebagai dasar persetujuan.' },
    ],
    requirements: {
      title: 'Syarat Pengajuan KUR',
      desc: 'Pastikan Anda memenuhi persyaratan berikut sebelum mengajukan KUR BRI:',
      items: [
        'Warga Negara Indonesia (WNI)',
        'Berusia minimal 21 tahun atau sudah menikah',
        'Memiliki usaha produktif yang sudah berjalan',
        'Tidak sedang menerima kredit dari perbankan lain (kecuali KPR, kredit konsumtif)',
        'KTP (Kartu Tanda Penduduk)',
        'Kartu Keluarga (KK)',
        'Surat Keterangan Usaha (SKU) dari kelurahan/desa',
        'Dokumen agunan (untuk KUR Kecil)',
      ],
    },
    steps: {
      title: 'Cara Mengajukan KUR BRI',
      items: [
        { title: 'Kunjungi Kantor BRI', desc: 'Datang ke BRI Cabang Polewali atau unit kerja terdekat. Sampaikan kebutuhan modal usaha Anda kepada petugas.' },
        { title: 'Isi Formulir & Serahkan Dokumen', desc: 'Lengkapi formulir pengajuan dan serahkan semua dokumen persyaratan kepada petugas kredit BRI.' },
        { title: 'Verifikasi & Survei', desc: 'Petugas BRI akan melakukan verifikasi data dan survei ke lokasi usaha Anda dalam 1–3 hari kerja.' },
        { title: 'Persetujuan Kredit', desc: 'Jika disetujui, Anda akan mendapat pemberitahuan resmi dari BRI beserta rincian cicilan dan jadwal pembayaran.' },
        { title: 'Penandatanganan Akad', desc: 'Datang ke kantor BRI untuk menandatangani akad kredit dan perjanjian pinjaman.' },
        { title: 'Dana Cair', desc: 'Dana KUR langsung dicairkan ke rekening BRI Anda dan siap digunakan untuk keperluan usaha.' },
      ],
    },
  },

  'brimo-mobile-banking': {
    category: 'Digital',
    title: 'BRImo Mobile Banking',
    heroDesc: 'BRImo adalah financial super app dari BRI yang memungkinkan Anda melakukan beragam transaksi perbankan kapan saja dan di mana saja — mulai dari transfer, pembayaran, investasi, hingga asuransi, semua dalam satu aplikasi.',
    iconImg: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1780770586/BRImo_Mobile_Banking_zsjbjr.png',
    stats: [
      { value: '200+', label: 'Fitur Tersedia' },
      { value: '160+', label: 'Negara Transfer' },
      { value: '24/7', label: 'Selalu Aktif' },
    ],
    productsTitle: 'Fitur Unggulan BRImo',
    products: [
      { name: 'Transfer & Pembayaran', icon: creditCard, desc: 'Transfer ke sesama BRI dan bank lain secara real-time. Bayar tagihan PLN, PDAM, internet, telepon, dan cicilan kredit hanya dengan beberapa ketukan.', highlight: 'Gratis transfer sesama BRI' },
      { name: 'QRIS & Pembayaran Digital', icon: zap, desc: 'Bayar di merchant mana saja menggunakan QR code — tanpa uang tunai, tanpa kartu. Juga mendukung pembayaran QR di luar negeri.', highlight: 'Scan & Pay di seluruh Indonesia' },
      { name: 'Investasi Digital', icon: trendingUp, desc: 'Mulai investasi reksa dana, deposito digital, dan Surat Berharga Negara (SBN/Sukuk) langsung dari BRImo tanpa perlu ke kantor bank.', highlight: 'Mulai dari Rp 10.000' },
      { name: 'Asuransi & Proteksi', icon: shieldIcon, desc: 'Beli berbagai produk asuransi jiwa, kesehatan, dan kendaraan dari BRI Life dan mitra terpercaya — premi terjangkau, klaim mudah.', highlight: 'Premi mulai Rp 50.000/bulan' },
      { name: 'Tabungan Emas', icon: starIcon, desc: 'Beli dan jual emas digital secara mudah melalui BRImo. Mulai dari 0,01 gram dengan harga real-time. Simpan aset berharga Anda dengan aman.', highlight: 'Mulai 0,01 gram' },
      { name: 'Transfer Internasional', icon: globeIcon, desc: 'Kirim uang ke keluarga atau kolega di lebih dari 160 negara dengan nilai tukar kompetitif dan proses yang aman melalui jaringan SWIFT.', highlight: 'Transfer ke 160+ negara' },
      { name: 'Buka Rekening Online', icon: homeIcon, desc: 'Daftar dan buka rekening BRI baru langsung dari BRImo tanpa perlu ke kantor bank — cukup dengan foto KTP dan swafoto (selfie) video.', highlight: 'Online onboarding 24/7' },
      { name: 'Pencatatan Keuangan', icon: dollar, desc: 'Kelola keuangan pribadi Anda dengan fitur budgeting dan laporan pengeluaran otomatis. Pantau ke mana uang Anda pergi setiap bulan.', highlight: 'Manajemen keuangan pribadi' },
    ],
    benefits: [
      { icon: shieldIcon, title: 'Aman & Terenkripsi', desc: 'Setiap transaksi dilindungi enkripsi tingkat tinggi. Fitur biometrik (sidik jari/wajah) memastikan hanya Anda yang bisa mengakses akun.' },
      { icon: zap, title: 'Transaksi Instan', desc: 'Transfer dan pembayaran diproses secara real-time — uang sampai dalam hitungan detik, 24 jam sehari, 7 hari seminggu, termasuk hari libur.' },
      { icon: trendingUp, title: 'Satu App, Semua Kebutuhan', desc: 'Tidak perlu install banyak aplikasi. BRImo mengintegrasikan perbankan, investasi, dan proteksi dalam satu platform yang mudah digunakan.' },
      { icon: globeIcon, title: 'Tanpa Batas Wilayah', desc: 'Gunakan BRImo dari mana saja di seluruh dunia selama ada koneksi internet — termasuk transfer internasional ke 160+ negara.' },
    ],
    requirements: {
      title: 'Syarat Registrasi BRImo',
      desc: 'Untuk menggunakan BRImo, Anda memerlukan:',
      items: [
        'Rekening Tabungan BRI yang aktif (BritAma, Simpedes, atau TabunganKu)',
        'Smartphone Android (versi 6.0 ke atas) atau iPhone (iOS 12 ke atas)',
        'Nomor HP yang terdaftar di rekening BRI',
        'Koneksi internet yang stabil',
        'KTP untuk verifikasi identitas (khusus buka rekening online)',
      ],
    },
    steps: {
      label: 'Cara Mulai Menggunakan',
      title: 'Download & Aktivasi BRImo',
      items: [
        { title: 'Download Aplikasi', desc: 'Unduh BRImo dari Google Play Store (Android) atau App Store (iPhone). Aplikasi ini gratis dan tidak dikenakan biaya unduhan.' },
        { title: 'Pilih "Daftar"', desc: 'Buka aplikasi dan pilih "Daftar". Masukkan nomor rekening BRI dan nomor HP yang terdaftar di rekening Anda.' },
        { title: 'Verifikasi OTP', desc: 'Masukkan kode OTP (One-Time Password) yang dikirim ke nomor HP Anda untuk memverifikasi identitas.' },
        { title: 'Buat PIN BRImo', desc: 'Buat PIN 6 digit yang unik dan mudah Anda ingat. PIN ini digunakan untuk setiap transaksi di BRImo.' },
        { title: 'Aktifkan Biometrik', desc: 'Aktifkan login dengan sidik jari atau Face ID untuk keamanan dan kemudahan akses yang lebih baik.' },
        { title: 'Siap Bertransaksi', desc: 'BRImo Anda sudah aktif! Jelajahi 200+ fitur dan mulai transaksi perbankan kapan saja dan di mana saja.' },
      ],
    },
  },

  'simpanan-deposito': {
    category: 'Simpanan',
    title: 'Simpanan & Deposito',
    heroDesc: 'BRI menyediakan berbagai produk simpanan yang aman, menguntungkan, dan mudah diakses — mulai dari tabungan harian hingga deposito berjangka dengan bunga kompetitif. Dana Anda dijamin LPS hingga Rp 2 miliar.',
    iconImg: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1780770580/Simpanan_dan_Deposito_hwl54o.png',
    stats: [
      { value: 'Rp 2 M', label: 'Dijamin LPS' },
      { value: '4,25%', label: 'Bunga Deposito' },
      { value: '0%', label: 'Biaya TabunganKu' },
    ],
    productsTitle: 'Produk Simpanan BRI',
    products: [
      { name: 'BritAma', icon: creditCard, desc: 'Tabungan fleksibel untuk semua segmen nasabah. Dilengkapi kartu debit Mastercard/GPN yang dapat digunakan di seluruh ATM dan merchant. Bisa dibuka secara online melalui BRImo.', highlight: 'Setoran awal Rp 250.000' },
      { name: 'Simpedes', icon: homeIcon, desc: 'Tabungan yang dirancang untuk masyarakat pedesaan dan segmen grass-root. Setoran awal rendah, tanpa syarat rumit, bisa di seluruh unit BRI termasuk unit pedesaan.', highlight: 'Setoran awal Rp 50.000' },
      { name: 'TabunganKu', icon: starIcon, desc: 'Tabungan tanpa biaya administrasi bulanan — cocok untuk pelajar, ibu rumah tangga, dan masyarakat yang baru mulai menabung. Bebas biaya pengelolaan.', highlight: 'Gratis biaya administrasi' },
      { name: 'Deposito BRI', icon: trendingUp, desc: 'Simpan uang dalam jangka waktu tertentu (1, 3, 6, 12, atau 24 bulan) dan dapatkan bunga yang lebih tinggi dari tabungan biasa. Bunga dibayar setiap bulan atau di akhir tenor.', highlight: 'Bunga hingga 4,25% p.a.' },
      { name: 'Giro BRI', icon: building, desc: 'Rekening koran untuk kebutuhan bisnis dan perusahaan. Mendukung transaksi volume tinggi, pembayaran cek dan bilyet giro, serta fasilitas overdraft bagi nasabah tertentu.', highlight: 'Untuk kebutuhan bisnis' },
      { name: 'Simpanan Haji', icon: globeIcon, desc: 'Rencanakan ibadah haji Anda dengan tabungan haji BRI yang terhubung langsung ke sistem SISKOHAT Kemenag untuk pendaftaran porsi haji secara resmi.', highlight: 'Terintegrasi SISKOHAT' },
    ],
    benefits: [
      { icon: shieldIcon, title: 'Dana Dijamin LPS', desc: 'Simpanan Anda di BRI dijamin oleh Lembaga Penjamin Simpanan (LPS) hingga Rp 2 miliar per nasabah per bank — rasa aman yang sesungguhnya.' },
      { icon: trendingUp, title: 'Bunga Kompetitif', desc: 'Deposito BRI menawarkan bunga kompetitif sesuai kondisi pasar. Tenor fleksibel dari 1 bulan hingga 24 bulan untuk memaksimalkan hasil simpanan Anda.' },
      { icon: zap, title: 'Akses Mudah & Cepat', desc: 'Cek saldo, tarik tunai, dan kelola tabungan melalui 12.000+ ATM BRI, aplikasi BRImo, atau langsung di 13+ kantor BRI di Polewali Mandar.' },
      { icon: creditCard, title: 'Kartu Debit Internasional', desc: 'Kartu debit BritAma dan Simpedes berlogo Mastercard/GPN dapat digunakan di ATM dan merchant di seluruh Indonesia maupun luar negeri.' },
    ],
    requirements: {
      title: 'Syarat Membuka Rekening',
      desc: 'Persyaratan umum untuk membuka rekening simpanan BRI:',
      items: [
        'Warga Negara Indonesia: KTP yang masih berlaku',
        'Warga Negara Asing: Passport + KITAS/KITAP',
        'Usia minimal 17 tahun (atau 13 tahun dengan pendampingan orang tua)',
        'NPWP (untuk nasabah tertentu dengan saldo di atas batas tertentu)',
        'Setoran awal sesuai jenis produk yang dipilih',
        'Nomor HP aktif untuk verifikasi',
      ],
    },
    steps: {
      label: 'Cara Membuka Rekening',
      title: 'Mudah & Cepat, Online atau Offline',
      items: [
        { title: 'Pilih Produk Tabungan', desc: 'Tentukan jenis tabungan yang sesuai kebutuhan Anda — BritAma untuk umum, Simpedes untuk perdesaan, TabunganKu untuk pemula.' },
        { title: 'Kunjungi BRI atau Gunakan BRImo', desc: 'Datang ke kantor BRI Polewali dengan membawa KTP, atau buka rekening BritAma langsung via aplikasi BRImo tanpa perlu ke kantor.' },
        { title: 'Isi Formulir', desc: 'Isi formulir pembukaan rekening secara lengkap dan benar. Petugas BRI siap membantu jika ada pertanyaan.' },
        { title: 'Setoran Awal', desc: 'Lakukan setoran awal sesuai ketentuan produk yang dipilih. Rekening Anda langsung aktif dan siap digunakan.' },
        { title: 'Aktivasi BRImo', desc: 'Hubungkan rekening baru Anda dengan aplikasi BRImo untuk kemudahan transaksi kapan saja dan di mana saja.' },
      ],
    },
  },

  'kredit-pemilikan-rumah': {
    category: 'Kredit',
    title: 'Kredit Pemilikan Rumah',
    heroDesc: 'Wujudkan impian memiliki rumah bersama keluarga melalui KPR BRI — cicilan ringan, tenor panjang, proses mudah, dan didukung oleh bank BUMN terpercaya yang hadir di seluruh Indonesia.',
    iconImg: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1780770578/Kredit_Pemilikan_Rumah_cj0spd.png',
    stats: [
      { value: '30 Th', label: 'Tenor Maks.' },
      { value: '5%', label: 'Bunga Subsidi' },
      { value: '10%', label: 'DP Minimum' },
    ],
    productsTitle: 'Jenis Produk KPR BRI',
    products: [
      { name: 'KPR Bersubsidi (FLPP)', icon: homeIcon, desc: 'Program pemerintah untuk masyarakat berpenghasilan rendah (MBR). Bunga flat 5% per tahun sepanjang tenor, harga rumah maksimal Rp 162 juta, uang muka ringan mulai 1%.', highlight: 'Bunga flat 5% · DP mulai 1%' },
      { name: 'KPR BRI Non-Subsidi', icon: building, desc: 'Untuk pembelian rumah komersial di atas harga subsidi. Bunga bersaing dengan sistem bunga mengambang yang terikat suku bunga pasar. Plafon lebih tinggi dan properti lebih beragam.', highlight: 'Bunga kompetitif · Plafon fleksibel' },
      { name: 'KPR BRI Griya', icon: starIcon, desc: 'Produk KPR unggulan BRI untuk pembelian rumah tapak baru maupun bekas. Tersedia dalam pilihan tenor 1 hingga 30 tahun dengan simulasi cicilan yang transparan.', highlight: 'Tenor 1–30 tahun' },
      { name: 'Kredit Pemilikan Apartemen', icon: zap, desc: 'KPA BRI untuk pembelian unit apartemen baru atau bekas di kawasan strategis. Proses serupa KPR rumah tapak dengan syarat agunan berupa unit apartemen.', highlight: 'Untuk unit apartemen' },
      { name: 'KPR Take Over', icon: creditCard, desc: 'Pindahkan KPR Anda dari bank lain ke BRI dan nikmati suku bunga yang lebih kompetitif, layanan yang lebih baik, serta kemungkinan perpanjangan tenor.', highlight: 'Pindah KPR ke BRI' },
      { name: 'Kredit Renovasi Rumah', icon: trendingUp, desc: 'Perlu merenovasi rumah? BRI menyediakan fasilitas kredit renovasi dengan plafon sesuai kebutuhan dan tenor fleksibel untuk mempercantik hunian Anda.', highlight: 'Untuk renovasi hunian' },
    ],
    benefits: [
      { icon: dollar, title: 'Cicilan Ringan & Terencana', desc: 'Tenor hingga 30 tahun memungkinkan cicilan bulanan yang lebih terjangkau. Gunakan simulasi KPR di website BRI untuk menghitung cicilan sebelum mengajukan.' },
      { icon: shieldIcon, title: 'Bank Terpercaya', desc: 'BRI adalah bank BUMN milik pemerintah Indonesia yang telah berdiri sejak 1895. KPR BRI dijamin keamanannya dan proses yang transparan.' },
      { icon: zap, title: 'Proses Mudah & Cepat', desc: 'Pengajuan KPR BRI bisa dilakukan di kantor BRI terdekat. Tim analis kredit BRI akan membantu dari awal hingga akad kredit ditandatangani.' },
      { icon: homeIcon, title: 'Dukungan Developer Rekanan', desc: 'BRI bermitra dengan ratusan developer perumahan di seluruh Indonesia, termasuk di Polewali Mandar, untuk kemudahan proses KPR rumah baru.' },
    ],
    requirements: {
      title: 'Syarat Pengajuan KPR',
      desc: 'Siapkan dokumen-dokumen berikut untuk pengajuan KPR BRI:',
      items: [
        'WNI berusia 21–65 tahun (pada saat kredit lunas)',
        'Karyawan tetap (min. 2 tahun kerja) atau wiraswasta (min. 2 tahun usaha)',
        'Slip gaji 3 bulan terakhir (karyawan) atau laporan keuangan usaha (wiraswasta)',
        'KTP, Kartu Keluarga, dan NPWP',
        'Buku tabungan 3 bulan terakhir',
        'Sertifikat properti (SHM/SHGB) dan IMB/PBG',
        'Uang muka minimal 10–30% dari harga properti',
        'Surat keterangan kerja / SK pengangkatan (untuk karyawan)',
      ],
    },
    steps: {
      title: 'Proses Pengajuan KPR BRI',
      items: [
        { title: 'Konsultasi & Simulasi', desc: 'Kunjungi BRI Polewali dan konsultasikan kebutuhan KPR Anda. Lakukan simulasi cicilan untuk mengetahui kemampuan bayar sesuai penghasilan.' },
        { title: 'Pengajuan & Kelengkapan Dokumen', desc: 'Isi formulir pengajuan KPR dan serahkan semua dokumen persyaratan. Petugas akan membantu proses verifikasi awal.' },
        { title: 'Penilaian Properti (Appraisal)', desc: 'Tim penilai BRI akan melakukan survei ke properti yang akan dibeli untuk menentukan nilai agunan dan kelayakan properti.' },
        { title: 'Analisa Kredit', desc: 'Analis kredit BRI mengevaluasi kemampuan keuangan dan kelayakan kredit Anda berdasarkan dokumen yang diserahkan.' },
        { title: 'Persetujuan & SP3K', desc: 'Jika disetujui, Anda akan menerima Surat Penegasan Persetujuan Penyediaan Kredit (SP3K) sebagai tanda persetujuan resmi BRI.' },
        { title: 'Akad Kredit & Serah Terima', desc: 'Penandatanganan akad kredit di hadapan notaris. Dana langsung ditransfer ke rekening penjual/developer dan kunci rumah diserahkan.' },
      ],
    },
  },

  'layanan-digital': {
    category: 'Infrastruktur',
    title: 'Layanan Digital 24/7',
    heroDesc: 'BRI hadir tidak hanya di kantor — melalui jaringan ATM, CDM, dan AgenBRI yang tersebar luas di seluruh Polewali Mandar hingga pelosok desa, layanan perbankan BRI selalu siap melayani Anda 24 jam sehari, 7 hari seminggu.',
    iconImg: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1780770579/Layanan_24_per_7_nb3srl.png',
    stats: [
      { value: '12K+', label: 'ATM BRI Nasional' },
      { value: '3.800+', label: 'Titik AgenBRI' },
      { value: '24/7', label: 'Selalu Aktif' },
    ],
    productsTitle: 'Jaringan Layanan Digital BRI',
    products: [
      { name: 'ATM BRI', icon: creditCard, desc: 'Lebih dari 12.000 mesin ATM BRI tersebar di seluruh Indonesia — di pusat kota, mal, rumah sakit, minimarket, hingga kantor pemerintahan. Tersedia juga di banyak titik strategis di Polewali Mandar.', highlight: 'Tarik tunai · Transfer · Pembayaran' },
      { name: 'CDM (Cash Deposit Machine)', icon: building, desc: 'Mesin setor tunai CDM memungkinkan Anda menyetor uang ke rekening BRI kapan saja tanpa perlu teller. Transaksi langsung tercatat secara real-time.', highlight: 'Setor tunai 24 jam' },
      { name: 'AgenBRI / BRILink', icon: mapPin, desc: 'Warung, toko, atau individu yang terdaftar sebagai agen BRI dan menyediakan layanan perbankan dasar — setor, tarik, dan transfer — di desa dan wilayah terpencil.', highlight: '3.800+ agen di seluruh wilayah' },
      { name: 'EDC BRI', icon: creditCard, desc: 'Mesin Electronic Data Capture di merchant-merchant yang menerima pembayaran dengan kartu debit atau kredit BRI. Aman, cepat, dan tanpa uang tunai.', highlight: 'Bayar non-tunai di merchant' },
      { name: 'BRIVA (Virtual Account)', icon: zap, desc: 'BRI Virtual Account untuk menerima pembayaran dari pihak ketiga secara otomatis. Cocok untuk bisnis online, koperasi, sekolah, dan institusi yang memerlukan sistem pembayaran terintegrasi.', highlight: 'Pembayaran otomatis terintegrasi' },
      { name: 'Internet Banking BRI', icon: globeIcon, desc: 'Akses layanan perbankan BRI melalui browser di PC atau laptop tanpa perlu mengunduh aplikasi. Transfer, pembayaran, dan monitoring rekening dari komputer Anda.', highlight: 'Akses via browser desktop' },
    ],
    benefits: [
      { icon: clockIcon, title: 'Tersedia 24 Jam', desc: 'ATM BRI beroperasi 24 jam tanpa henti, 7 hari seminggu, termasuk hari libur nasional. Kebutuhan transaksi mendesak selalu bisa terpenuhi.' },
      { icon: mapPin, title: 'Jangkauan Terluas', desc: 'BRI memiliki jaringan terluas di Indonesia dengan kehadiran di desa-desa terpencil melalui AgenBRI — memastikan semua masyarakat terlayani.' },
      { icon: shieldIcon, title: 'Transaksi Aman', desc: 'Setiap transaksi di ATM dan CDM dilindungi teknologi keamanan PIN terenkripsi dan sistem deteksi fraud untuk keamanan dana Anda.' },
      { icon: zap, title: 'Langsung Real-Time', desc: 'Transfer dan setoran melalui ATM/CDM BRI diproses secara real-time — saldo langsung terupdate dan penerima langsung menerima dana.' },
    ],
    requirements: {
      title: 'Yang Anda Butuhkan',
      desc: 'Untuk menggunakan layanan digital BRI:',
      items: [
        'Rekening tabungan BRI yang aktif',
        'Kartu ATM BRI (untuk transaksi di ATM/CDM/EDC)',
        'PIN ATM 6 digit yang aktif',
        'Nomor HP terdaftar (untuk beberapa transaksi tertentu)',
        'Untuk AgenBRI: cukup KTP dan nominal transaksi yang diperlukan',
      ],
    },
    steps: {
      label: 'Cara Menggunakan ATM BRI',
      title: 'Panduan Transaksi di ATM BRI',
      items: [
        { title: 'Masukkan Kartu ATM', desc: 'Masukkan kartu ATM BRI dengan chip menghadap ke atas ke dalam slot kartu ATM.' },
        { title: 'Masukkan PIN', desc: 'Ketik PIN ATM 6 digit Anda dengan cermat. Pastikan tidak ada yang melihat saat Anda menginput PIN.' },
        { title: 'Pilih Jenis Transaksi', desc: 'Pilih transaksi yang diinginkan: Tarik Tunai, Transfer, Pembayaran, Cek Saldo, atau Ganti PIN.' },
        { title: 'Ikuti Panduan di Layar', desc: 'Ikuti instruksi yang muncul di layar ATM. Masukkan jumlah atau nomor rekening tujuan sesuai kebutuhan.' },
        { title: 'Konfirmasi & Selesai', desc: 'Konfirmasi transaksi dan ambil struk bukti transaksi. Jangan lupa ambil kembali kartu ATM Anda.' },
      ],
    },
  },

  'valuta-asing': {
    category: 'Internasional',
    title: 'Valuta Asing & Remitansi',
    heroDesc: 'BRI menyediakan layanan penukaran valuta asing dan pengiriman uang internasional yang aman, cepat, dan dengan kurs kompetitif — mendukung kebutuhan TKI, pelaku bisnis internasional, dan masyarakat yang terhubung dengan dunia.',
    iconImg: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1780770581/Valuta_Asing_dan_Remitasi_jb7fsm.png',
    stats: [
      { value: '160+', label: 'Negara Tujuan' },
      { value: 'Kurs', label: 'Real-Time' },
      { value: 'SWIFT', label: 'Transfer Aman' },
    ],
    productsTitle: 'Layanan Valas & Remitansi BRI',
    products: [
      { name: 'Penukaran Valuta Asing', icon: dollar, desc: 'Beli atau jual mata uang asing dengan kurs kompetitif langsung di kantor BRI Polewali. Tersedia USD, EUR, GBP, JPY, SGD, AUD, HKD, MYR, CHF, CNY, dan mata uang utama lainnya.', highlight: 'USD, EUR, GBP, JPY, dan 10+ mata uang' },
      { name: 'Remittance (Kiriman Uang)', icon: globeIcon, desc: 'Terima atau kirim uang dari/ke luar negeri melalui jaringan BRI yang luas. Cocok untuk TKI yang mengirim uang ke keluarga di Indonesia maupun sebaliknya.', highlight: 'Transfer masuk & keluar negeri' },
      { name: 'SWIFT Transfer', icon: zap, desc: 'Transfer internasional aman melalui jaringan SWIFT untuk keperluan bisnis, pembayaran kontrak, atau personal. Didukung oleh koneksi ke ribuan bank di seluruh dunia.', highlight: 'Untuk transaksi bisnis & personal' },
      { name: 'Western Union via BRI', icon: creditCard, desc: 'Layanan Western Union tersedia di kantor BRI — terima kiriman uang dari luar negeri dengan cepat, bahkan bisa diambil tunai di hari yang sama.', highlight: 'Pengambilan tunai hari yang sama' },
      { name: 'Tabungan Valas BRI', icon: trendingUp, desc: 'Simpan mata uang asing dalam rekening tabungan valuta asing BRI. Tersedia dalam USD, EUR, dan SGD. Bunga kompetitif dan bisa diakses kapan saja.', highlight: 'Tabungan dalam USD, EUR, SGD' },
      { name: 'Trade Finance', icon: building, desc: 'Layanan pembiayaan perdagangan internasional untuk pelaku usaha — Letter of Credit (L/C), Surat Kredit Berdokumen Dalam Negeri (SKBDN), dan fasilitas ekspor-impor.', highlight: 'Untuk bisnis ekspor-impor' },
    ],
    benefits: [
      { icon: dollar, title: 'Kurs Kompetitif', desc: 'BRI menawarkan nilai tukar yang kompetitif dan transparan, diperbarui secara real-time mengikuti kondisi pasar valuta asing global.' },
      { icon: zap, title: 'Transfer Cepat & Aman', desc: 'Transfer internasional melalui jaringan SWIFT BRI diproses dengan cepat dan aman, didukung sistem keamanan berlapis internasional.' },
      { icon: shieldIcon, title: 'Bank Devisa Resmi', desc: 'BRI adalah Bank Devisa resmi yang diizinkan Bank Indonesia untuk melakukan transaksi valuta asing — menjamin keabsahan dan keamanan setiap transaksi.' },
      { icon: globeIcon, title: 'Jaringan Global', desc: 'BRI terhubung dengan ratusan bank koresponden di seluruh dunia, memastikan kiriman uang Anda sampai ke tujuan di 160+ negara.' },
    ],
    requirements: {
      title: 'Syarat Layanan Valas & Remitansi',
      desc: 'Dokumen yang diperlukan untuk transaksi valuta asing:',
      items: [
        'KTP / Passport yang masih berlaku',
        'Untuk penukaran > USD 25.000: NPWP + dokumen pendukung',
        'Untuk transfer ke luar negeri: rekening BRI atau bisa walk-in',
        'Dokumen tujuan transfer (untuk jumlah > USD 10.000 sesuai regulasi BI)',
        'Informasi rekening penerima (nama, nomor rekening, nama bank, kode SWIFT/BIC)',
      ],
    },
    steps: {
      label: 'Cara Melakukan Transfer',
      title: 'Langkah Pengiriman Uang Internasional',
      items: [
        { title: 'Kunjungi BRI Polewali', desc: 'Datang ke kantor BRI Cabang Polewali atau unit kerja terdekat yang menyediakan layanan valuta asing.' },
        { title: 'Siapkan Dokumen', desc: 'Bawa KTP/Passport dan informasi rekening penerima termasuk nomor rekening dan kode SWIFT bank tujuan.' },
        { title: 'Isi Formulir Transfer', desc: 'Isi formulir pengiriman uang internasional yang disediakan petugas. Cantumkan tujuan transfer dan valuta yang diinginkan.' },
        { title: 'Konfirmasi Kurs & Biaya', desc: 'Petugas akan menginformasikan kurs saat ini dan biaya transfer. Konfirmasi sebelum transaksi diproses.' },
        { title: 'Pembayaran & Bukti Transaksi', desc: 'Lakukan pembayaran (debet rekening atau tunai). Anda akan menerima bukti pengiriman dengan nomor referensi untuk tracking.' },
        { title: 'Dana Tiba di Penerima', desc: 'Uang biasanya tiba dalam 1–5 hari kerja tergantung negara tujuan dan bank penerima. Western Union bisa hari yang sama.' },
      ],
    },
  },
}

const service = computed(() => ALL_SERVICES[route.params.slug] || null)
</script>

<style scoped>
.svc-page { padding-top: 68px; }

/* ── HERO ── */
.svc-hero {
  padding: 72px 0 56px;
  background: transparent;
}
.svc-hero-inner {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 48px;
  align-items: center;
}
.svc-cat-badge {
  display: inline-block;
  font-size: 11px; font-weight: 800;
  letter-spacing: 0.10em; text-transform: uppercase;
  color: var(--bri-gold, #F5A623);
  background: rgba(245,166,35,0.12);
  border: 1px solid rgba(245,166,35,0.28);
  border-radius: 100px;
  padding: 4px 12px;
  margin-bottom: 16px;
}
.svc-hero-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: var(--ink, #0A1628);
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin-bottom: 20px;
}
.svc-hero-desc {
  font-size: 16px;
  color: rgba(10,22,40,0.68);
  line-height: 1.75;
  max-width: 580px;
  margin-bottom: 36px;
}
.svc-hero-stats {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
}
.svc-stat {
  display: flex;
  align-items: baseline;
  gap: 7px;
}
.svc-stat-val {
  font-size: 22px; font-weight: 800;
  color: #0057b8;
  letter-spacing: -0.03em;
  line-height: 1;
  flex-shrink: 0;
}
.svc-stat-lbl {
  font-size: 10.5px; font-weight: 600;
  color: rgba(10,22,40,0.52);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  line-height: 1.3;
}
.svc-hero-icon-frame {
  width: 180px; height: 180px;
  border-radius: 28px;
  overflow: hidden;
  background: rgba(0,87,184,0.06);
  border: 1.5px solid rgba(0,87,184,0.12);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.svc-hero-img {
  width: 140px; height: 140px;
  object-fit: contain;
  opacity: 0.92;
  border-radius: 20px;
}

/* ── SECTIONS ── */
.svc-section {
  padding: 72px 0;
  background: transparent;
}
.svc-section--alt {
  background: rgba(0,63,136,0.03);
}
.svc-section-head {
  margin-bottom: 40px;
}

/* ── PRODUCTS GRID ── */
.svc-products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.svc-product-card {
  background: rgba(255,255,255,0.84);
  border: 1.5px solid rgba(0,63,136,0.12);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.28s cubic-bezier(0.22,1,0.36,1);
}
.svc-product-card:hover {
  border-color: rgba(0,87,184,0.30);
  box-shadow: 0 8px 32px rgba(0,63,136,0.10);
  transform: translateY(-3px);
}
.svc-product-head {
  display: flex;
  align-items: center;
  gap: 12px;
}
.svc-product-icon {
  width: 44px; height: 44px;
  border-radius: 12px;
  background: rgba(0,87,184,0.10);
  border: 1px solid rgba(0,87,184,0.18);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.svc-product-name {
  font-size: 15px; font-weight: 700;
  color: rgba(10,22,40,0.90);
  letter-spacing: -0.02em;
  line-height: 1.25;
}
.svc-product-desc {
  font-size: 13px;
  color: rgba(10,22,40,0.68);
  line-height: 1.65;
  flex: 1;
}
.svc-product-highlight {
  display: inline-block;
  font-size: 10px; font-weight: 700;
  color: #0057b8;
  background: rgba(0,87,184,0.08);
  border: 1px solid rgba(0,87,184,0.18);
  border-radius: 100px;
  padding: 3px 10px;
  align-self: flex-start;
  letter-spacing: 0.02em;
}

/* ── BENEFITS ── */
.svc-benefits-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.svc-benefit {
  background: rgba(255,255,255,0.82);
  border: 1.5px solid rgba(0,63,136,0.10);
  border-radius: 16px;
  padding: 24px 20px;
  display: flex; flex-direction: column; gap: 12px;
}
.svc-benefit-head {
  display: flex;
  align-items: center;
  gap: 12px;
}
.svc-benefit-icon {
  width: 44px; height: 44px;
  border-radius: 12px;
  background: rgba(0,87,184,0.08);
  border: 1px solid rgba(0,87,184,0.16);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.svc-benefit-title {
  font-size: 14px; font-weight: 700;
  color: rgba(10,22,40,0.88); letter-spacing: -0.01em;
  line-height: 1.3;
}
.svc-benefit-desc {
  font-size: 12.5px; color: rgba(10,22,40,0.65); line-height: 1.65;
}

/* ── REQUIREMENTS ── */
.svc-req-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: start;
}
.svc-req-desc {
  font-size: 14px; color: rgba(10,22,40,0.65); line-height: 1.7; margin-top: 12px;
}
.svc-req-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.svc-req-item {
  display: flex; align-items: flex-start; gap: 10px;
  font-size: 14px; color: rgba(10,22,40,0.75); line-height: 1.55;
}
.svc-req-item svg { flex-shrink: 0; margin-top: 2px; }

/* ── STEPS ── */
.svc-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.svc-step {
  background: rgba(255,255,255,0.82);
  border: 1.5px solid rgba(0,63,136,0.10);
  border-radius: 16px;
  padding: 24px;
  display: flex; flex-direction: column; gap: 12px;
}
.svc-step-head {
  display: flex; align-items: center; gap: 14px;
}
.svc-step-num {
  font-size: 26px; font-weight: 800;
  color: rgba(0,87,184,0.18);
  letter-spacing: -0.05em; line-height: 1;
  flex-shrink: 0;
}
.svc-step-title {
  font-size: 14.5px; font-weight: 700;
  color: rgba(10,22,40,0.90); letter-spacing: -0.01em;
  line-height: 1.3;
}
.svc-step-desc {
  font-size: 13px; color: rgba(10,22,40,0.65); line-height: 1.65;
}

/* ── CTA ── */
.svc-cta-section {
  padding: 72px 0;
  background: linear-gradient(135deg, #003f88 0%, #0057b8 60%, #1a7fd4 100%);
}
.svc-cta-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
}
.svc-cta-title {
  font-size: clamp(1.4rem, 2.5vw, 1.8rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.025em;
  margin-bottom: 10px;
}
.svc-cta-desc {
  font-size: 14px; color: rgba(255,255,255,0.72); line-height: 1.65;
}
.svc-cta-btns {
  display: flex; gap: 12px; flex-wrap: wrap; flex-shrink: 0;
}
.svc-cta-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 28px; border-radius: 12px;
  font-size: 14px; font-weight: 700;
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s;
}
.svc-cta-btn--primary {
  background: #fff; color: #0057b8;
}
.svc-cta-btn--primary:hover { background: #f0f4ff; }
.svc-cta-btn--ghost {
  background: rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.85);
  border: 1px solid rgba(255,255,255,0.25);
}
.svc-cta-btn--ghost:hover { background: rgba(255,255,255,0.20); }

/* ── NOT FOUND ── */
.svc-notfound {
  padding: 120px 0;
  text-align: center;
}
.svc-notfound h2 { font-size: 1.5rem; margin-bottom: 20px; }
.svc-notfound a { color: #0057b8; text-decoration: none; font-weight: 600; }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .svc-benefits-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 900px) {
  .svc-hero-inner { grid-template-columns: 1fr; }
  .svc-hero-img { display: none; }
  .svc-products-grid { grid-template-columns: repeat(2, 1fr); }
  .svc-steps { grid-template-columns: repeat(2, 1fr); }
  .svc-req-inner { grid-template-columns: 1fr; gap: 32px; }
}
@media (max-width: 600px) {
  .svc-products-grid { grid-template-columns: 1fr; }
  .svc-benefits-grid { grid-template-columns: 1fr; }
  .svc-steps { grid-template-columns: 1fr; }
  .svc-hero-stats { gap: 20px; }
  .svc-cta-inner { flex-direction: column; align-items: flex-start; }
}
</style>
