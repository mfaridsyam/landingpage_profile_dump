<template>
  <div class="lelang-page">
    <TheNavbar />

    <!-- ══════════════════════════════
         HERO
    ══════════════════════════════ -->
    <section class="lelang-hero">
      <div class="lelang-hero-bg" aria-hidden="true">
        <div class="lelang-hero-orb lelang-hero-orb--1"></div>
        <div class="lelang-hero-orb lelang-hero-orb--2"></div>
      </div>
      <div class="container lelang-hero-inner">
        <div class="lelang-hero-left">
          <div class="lelang-eyebrow">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/></svg>
            Lelang Aset BRI
          </div>
          <h1 class="lelang-hero-title">
            Temukan Aset <em>Terbaik</em><br>Harga Kompetitif
          </h1>
          <p class="lelang-hero-desc">
            BRI Cabang Polewali menghadirkan lelang aset properti dan kendaraan dengan proses
            yang transparan, terjamin, dan mudah diikuti oleh siapa saja.
          </p>
          <div class="lelang-hero-actions">
            <a href="https://infolelang.bri.co.id/" target="_blank" rel="noopener" class="lelang-btn-primary">
              Lelang Resmi BRI
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
            <a href="#aset-lelang" class="lelang-btn-ghost">Lihat Aset Tersedia</a>
          </div>
        </div>
        <div class="lelang-hero-right" aria-hidden="true">
          <div class="lelang-stat-group">
            <div class="lelang-stat-item">
              <span class="lelang-stat-n">12+</span>
              <span class="lelang-stat-l">Aset Aktif</span>
            </div>
            <div class="lelang-stat-sep"></div>
            <div class="lelang-stat-item">
              <span class="lelang-stat-n">100%</span>
              <span class="lelang-stat-l">Terjamin</span>
            </div>
            <div class="lelang-stat-sep"></div>
            <div class="lelang-stat-item">
              <span class="lelang-stat-n">DJKN</span>
              <span class="lelang-stat-l">Resmi</span>
            </div>
          </div>
          <div class="lelang-badge-stack">
            <div class="lelang-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Aset Terverifikasi
            </div>
            <div class="lelang-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
              Proses Transparan
            </div>
            <div class="lelang-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              Ikuti Secara Online
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════
         CARA IKUT LELANG
    ══════════════════════════════ -->
    <section class="lelang-steps">
      <div class="container">
        <div class="lelang-section-head">
          <div class="section-eyebrow">Panduan</div>
          <h2 class="section-title" style="margin-bottom:8px">Cara Mengikuti Lelang</h2>
          <p class="lelang-section-sub">Ikuti langkah sederhana berikut untuk berpartisipasi dalam lelang aset BRI.</p>
        </div>
        <div class="lelang-steps-grid">
          <div v-for="(step, i) in steps" :key="i" class="lelang-step-card">
            <div class="lelang-step-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="lelang-step-icon">
              <component :is="'span'" v-html="step.icon"></component>
            </div>
            <h3 class="lelang-step-title">{{ step.title }}</h3>
            <p class="lelang-step-desc">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════
         ASET LELANG
    ══════════════════════════════ -->
    <section id="aset-lelang" class="lelang-assets">
      <div class="container">
        <div class="lelang-assets-head">
          <div class="lelang-assets-head-left">
            <div class="section-eyebrow">Katalog</div>
            <h2 class="section-title" style="margin-bottom:0">Aset Lelang Tersedia</h2>
          </div>
          <div class="lelang-filter-tabs">
            <button
              v-for="f in filters" :key="f.val"
              class="lelang-filter-tab"
              :class="{ active: activeFilter === f.val }"
              @click="activeFilter = f.val">
              {{ f.label }}
              <span class="lelang-filter-count">{{ countByType(f.val) }}</span>
            </button>
          </div>
        </div>

        <div class="lelang-grid">
          <div v-for="item in filteredItems" :key="item.id" class="lelang-card">
            <div class="lelang-card-img">
              <img :src="item.img" :alt="item.title" loading="lazy" />
              <div class="lelang-card-badge" :class="`badge-${item.status}`">
                {{ item.statusLabel }}
              </div>
              <div class="lelang-card-type">{{ item.type }}</div>
            </div>
            <div class="lelang-card-body">
              <h3 class="lelang-card-title">{{ item.title }}</h3>
              <div class="lelang-card-loc">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                {{ item.location }}
              </div>
              <div class="lelang-card-specs">
                <span v-for="spec in item.specs" :key="spec" class="lelang-card-spec">{{ spec }}</span>
              </div>
            </div>
            <div class="lelang-card-foot">
              <div class="lelang-card-price">
                <span class="lelang-price-label">Limit Price</span>
                <span class="lelang-price-val">{{ item.price }}</span>
              </div>
              <div class="lelang-card-date">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                {{ item.date }}
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Banner -->
        <div class="lelang-cta-banner">
          <div class="lelang-cta-left">
            <div class="lelang-cta-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <div>
              <p class="lelang-cta-title">Cari lebih banyak aset lelang dari seluruh Indonesia</p>
              <p class="lelang-cta-sub">Portal resmi BRI mencakup ribuan aset dari kantor cabang di seluruh Indonesia.</p>
            </div>
          </div>
          <a href="https://infolelang.bri.co.id/" target="_blank" rel="noopener" class="lelang-cta-btn">
            Buka Info Lelang BRI
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════
         INFO & DISCLAIMER
    ══════════════════════════════ -->
    <section class="lelang-info">
      <div class="container lelang-info-inner">
        <div class="lelang-info-card">
          <div class="lelang-info-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <div>
            <h3 class="lelang-info-title">Informasi Penting</h3>
            <p class="lelang-info-desc">
              Data aset lelang yang ditampilkan bersifat informatif dan dapat berubah sewaktu-waktu.
              Peserta wajib melakukan verifikasi langsung ke kantor BRI atau mengunjungi portal resmi sebelum mengajukan penawaran.
              Proses lelang dilaksanakan sesuai ketentuan Direktorat Jenderal Kekayaan Negara (DJKN).
            </p>
          </div>
        </div>
        <div class="lelang-info-card">
          <div class="lelang-info-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.9a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16z"/></svg>
          </div>
          <div>
            <h3 class="lelang-info-title">Hubungi Kami</h3>
            <p class="lelang-info-desc">
              Untuk informasi lebih lanjut mengenai aset lelang, jadwal pelaksanaan, atau prosedur pendaftaran,
              silakan hubungi BRI Cabang Polewali di <strong>(0428) 21027</strong> atau datang langsung ke kantor kami
              di Jl. Ahmad Yani No. 1, Polewali, Sulawesi Barat.
            </p>
          </div>
        </div>
      </div>
    </section>

    <TheFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'
import { useScrollReveal } from '@/composables/useScrollReveal.js'

useScrollReveal()

const activeFilter = ref('semua')

const filters = [
  { val: 'semua',    label: 'Semua' },
  { val: 'properti', label: 'Properti' },
  { val: 'kendaraan',label: 'Kendaraan' },
  { val: 'tanah',    label: 'Tanah' },
]

const steps = [
  {
    title: 'Registrasi Online',
    desc: 'Daftarkan diri Anda di portal infolelang.bri.co.id menggunakan KTP dan data diri yang valid.',
    icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  },
  {
    title: 'Setor Uang Jaminan',
    desc: 'Transfer uang jaminan sesuai ketentuan ke rekening virtual yang diberikan sistem setelah registrasi.',
    icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>',
  },
  {
    title: 'Ajukan Penawaran',
    desc: 'Masukkan harga penawaran melalui aplikasi atau portal lelang sesuai jadwal yang telah ditetapkan.',
    icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
  },
  {
    title: 'Penetapan Pemenang',
    desc: 'Penawar tertinggi ditetapkan sebagai pemenang dan wajib melunasi pembayaran sesuai ketentuan.',
    icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><polyline points="20 6 9 17 4 12"/></svg>',
  },
]

const asetItems = [
  {
    id: 1, type: 'Properti',
    title: 'Rumah Tinggal 2 Lantai',
    location: 'Kec. Polewali, Kab. Polman',
    specs: ['LT 180 m²', 'LB 140 m²', '3 KT', '2 KM'],
    price: 'Rp 385.000.000',
    date: '25 Jun 2026',
    status: 'aktif', statusLabel: 'Aktif',
    img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=75',
  },
  {
    id: 2, type: 'Kendaraan',
    title: 'Toyota Kijang Innova 2019',
    location: 'BRI Cab. Polewali',
    specs: ['2019', 'Manual', 'Diesel', '98.000 km'],
    price: 'Rp 178.000.000',
    date: '25 Jun 2026',
    status: 'aktif', statusLabel: 'Aktif',
    img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=75',
  },
  {
    id: 3, type: 'Tanah',
    title: 'Tanah Kosong SHM Pinggir Jalan',
    location: 'Kec. Campalagian, Kab. Polman',
    specs: ['LT 450 m²', 'SHM', 'Strategis'],
    price: 'Rp 220.000.000',
    date: '02 Jul 2026',
    status: 'aktif', statusLabel: 'Aktif',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=75',
  },
  {
    id: 4, type: 'Properti',
    title: 'Ruko 2 Lantai Pusat Kota',
    location: 'Kec. Polewali, Kab. Polman',
    specs: ['LT 80 m²', 'LB 160 m²', 'SHM', 'Strategis'],
    price: 'Rp 650.000.000',
    date: '02 Jul 2026',
    status: 'aktif', statusLabel: 'Aktif',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=75',
  },
  {
    id: 5, type: 'Kendaraan',
    title: 'Honda BR-V 2020',
    location: 'BRI Cab. Polewali',
    specs: ['2020', 'Matic', 'Bensin', '67.000 km'],
    price: 'Rp 155.000.000',
    date: '10 Jul 2026',
    status: 'segera', statusLabel: 'Segera',
    img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=75',
  },
  {
    id: 6, type: 'Tanah',
    title: 'Kavling Perumahan SHM',
    location: 'Kec. Wonomulyo, Kab. Polman',
    specs: ['LT 200 m²', 'SHM', 'Siap Bangun'],
    price: 'Rp 95.000.000',
    date: '10 Jul 2026',
    status: 'segera', statusLabel: 'Segera',
    img: 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=600&q=75',
  },
  {
    id: 7, type: 'Properti',
    title: 'Rumah Tinggal 1 Lantai',
    location: 'Kec. Mamasa, Kab. Mamasa',
    specs: ['LT 120 m²', 'LB 72 m²', '2 KT', '1 KM'],
    price: 'Rp 195.000.000',
    date: '18 Jul 2026',
    status: 'segera', statusLabel: 'Segera',
    img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=75',
  },
  {
    id: 8, type: 'Kendaraan',
    title: 'Daihatsu Xenia 2018',
    location: 'BRI KCP Wonomulyo',
    specs: ['2018', 'Manual', 'Bensin', '112.000 km'],
    price: 'Rp 118.000.000',
    date: '18 Jul 2026',
    status: 'segera', statusLabel: 'Segera',
    img: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?w=600&q=75',
  },
]

function countByType(val) {
  if (val === 'semua') return asetItems.length
  return asetItems.filter(i => i.type.toLowerCase() === val).length
}

const filteredItems = computed(() => {
  if (activeFilter.value === 'semua') return asetItems
  return asetItems.filter(i => i.type.toLowerCase() === activeFilter.value)
})
</script>

<style scoped>
.lelang-page { background: #f4f6fb; min-height: 100vh; }

/* ── HERO ── */
.lelang-hero {
  position: relative; overflow: hidden;
  background: #fff;
  padding: 100px 0 72px;
  border-bottom: 1.5px solid rgba(0,63,136,0.08);
}
.lelang-hero-bg { position: absolute; inset: 0; pointer-events: none; }
.lelang-hero-orb {
  position: absolute; border-radius: 50%;
  filter: blur(80px); opacity: 0.25;
}
.lelang-hero-orb--1 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, #0057b8, transparent 70%);
  top: -120px; right: -80px;
}
.lelang-hero-orb--2 {
  width: 350px; height: 350px;
  background: radial-gradient(circle, #f5a623, transparent 70%);
  bottom: -80px; left: 10%;
}
.lelang-hero-inner {
  display: grid; grid-template-columns: 1fr 340px;
  gap: 64px; align-items: center; position: relative; z-index: 1;
}
.lelang-eyebrow {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 11.5px; font-weight: 800; letter-spacing: 0.10em;
  text-transform: uppercase; color: #f5a623;
  margin-bottom: 18px;
}
.lelang-hero-title {
  font-size: clamp(32px, 4.5vw, 58px);
  font-weight: 800; line-height: 1.1;
  letter-spacing: -0.03em; color: #0a1628;
  margin: 0 0 20px;
}
.lelang-hero-title em { color: #0057b8; font-style: normal; }
.lelang-hero-desc {
  font-size: clamp(14px, 1.4vw, 16.5px);
  color: rgba(10,22,40,0.68); line-height: 1.78; margin: 0 0 32px;
}
.lelang-hero-actions { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.lelang-btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 30px; background: #0057b8; color: #fff;
  border-radius: 100px; font-size: 14px; font-weight: 800;
  text-decoration: none;
  transition: transform 0.22s, box-shadow 0.22s, background 0.22s;
}
.lelang-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 36px rgba(0,87,184,0.50);
  background: #0068d6;
}
.lelang-btn-ghost {
  display: inline-flex; align-items: center;
  padding: 14px 30px;
  background: transparent; border: 1.5px solid rgba(0,63,136,0.22);
  color: rgba(10,22,40,0.75); border-radius: 100px;
  font-size: 14px; font-weight: 700; text-decoration: none;
  transition: background 0.22s, border-color 0.22s, color 0.22s;
}
.lelang-btn-ghost:hover {
  background: rgba(0,87,184,0.07);
  border-color: rgba(0,87,184,0.35);
  color: #0057b8;
}
.lelang-stat-group {
  display: flex; align-items: center; justify-content: center;
  gap: 0; background: #fff; border: 1.5px solid rgba(0,63,136,0.10);
  border-radius: 16px; padding: 20px 24px;
  box-shadow: 0 4px 24px rgba(0,63,136,0.07);
  margin-bottom: 20px;
}
.lelang-stat-item { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 0 24px; }
.lelang-stat-n { font-size: 26px; font-weight: 800; color: #0057b8; letter-spacing: -0.04em; }
.lelang-stat-l { font-size: 10px; font-weight: 700; color: rgba(10,22,40,0.55); text-transform: uppercase; letter-spacing: 0.08em; }
.lelang-stat-sep { width: 1px; height: 36px; background: rgba(0,63,136,0.10); }
.lelang-badge-stack { display: flex; flex-direction: column; gap: 10px; }
.lelang-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 16px; background: rgba(0,87,184,0.06);
  border: 1.5px solid rgba(0,87,184,0.14);
  border-radius: 10px; font-size: 13px; font-weight: 600;
  color: rgba(10,22,40,0.78);
}

/* ── STEPS ── */
.lelang-steps { padding: 72px 0; background: #fff; border-bottom: 1.5px solid rgba(0,63,136,0.06); }
.lelang-section-head { text-align: center; margin-bottom: 48px; }
.lelang-section-sub { font-size: 15px; color: rgba(10,22,40,0.60); max-width: 500px; margin: 0 auto; }
.lelang-steps-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;
}
.lelang-step-card {
  background: #f8faff; border: 1.5px solid rgba(0,63,136,0.09);
  border-radius: 16px; padding: 28px 24px 24px;
  position: relative; transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
}
.lelang-step-card:hover {
  border-color: rgba(0,87,184,0.28);
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(0,63,136,0.10);
}
.lelang-step-num {
  font-size: 11px; font-weight: 800; color: #0057b8;
  letter-spacing: 0.10em; margin-bottom: 14px;
}
.lelang-step-icon {
  width: 48px; height: 48px; border-radius: 12px;
  background: rgba(0,87,184,0.08); border: 1.5px solid rgba(0,87,184,0.14);
  display: flex; align-items: center; justify-content: center;
  color: #0057b8; margin-bottom: 16px;
}
.lelang-step-title { font-size: 15px; font-weight: 800; color: #0a1628; margin: 0 0 10px; letter-spacing: -0.01em; }
.lelang-step-desc { font-size: 13px; color: rgba(10,22,40,0.62); line-height: 1.65; margin: 0; text-align: justify; }

/* ── ASSETS ── */
.lelang-assets { padding: 72px 0; }
.lelang-assets-head {
  display: flex; align-items: flex-end; justify-content: space-between;
  gap: 24px; margin-bottom: 32px; flex-wrap: wrap;
}
.lelang-filter-tabs {
  display: flex; align-items: center; gap: 4px;
  background: rgba(255,255,255,0.80);
  border: 1.5px solid rgba(0,63,136,0.12);
  border-radius: 14px; padding: 5px;
}
.lelang-filter-tab {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 16px; border-radius: 10px;
  background: transparent; border: none;
  font-size: 13px; font-weight: 600; color: rgba(10,22,40,0.55);
  cursor: pointer; font-family: inherit; transition: all 0.2s;
}
.lelang-filter-tab.active {
  background: #0057b8; color: #fff;
  box-shadow: 0 3px 12px rgba(0,87,184,0.28); font-weight: 700;
}
.lelang-filter-tab:not(.active):hover { background: rgba(0,87,184,0.08); color: rgba(10,22,40,0.82); }
.lelang-filter-count {
  font-size: 10.5px; font-weight: 700;
  background: rgba(0,87,184,0.12); color: #0057b8;
  padding: 1px 6px; border-radius: 100px;
}
.lelang-filter-tab.active .lelang-filter-count { background: rgba(255,255,255,0.25); color: #fff; }

.lelang-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 20px; margin-bottom: 40px;
}
.lelang-card {
  background: #fff; border-radius: 16px; overflow: hidden;
  border: 1.5px solid rgba(0,63,136,0.10);
  display: flex; flex-direction: column;
  transition: border-color 0.25s, transform 0.28s, box-shadow 0.28s;
}
.lelang-card:hover {
  border-color: rgba(0,87,184,0.28);
  transform: translateY(-4px);
  box-shadow: 0 16px 44px rgba(0,63,136,0.12);
}
.lelang-card-img {
  position: relative; aspect-ratio: 4/3; overflow: hidden;
}
.lelang-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.45s; }
.lelang-card:hover .lelang-card-img img { transform: scale(1.05); }
.lelang-card-badge {
  position: absolute; top: 10px; right: 10px;
  font-size: 10.5px; font-weight: 800; letter-spacing: 0.06em;
  text-transform: uppercase; padding: 4px 10px; border-radius: 100px;
}
.badge-aktif  { background: #dcfce7; color: #15803d; }
.badge-segera { background: #fef9c3; color: #a16207; }
.badge-selesai{ background: #f3f4f6; color: #6b7280; }
.lelang-card-type {
  position: absolute; bottom: 10px; left: 10px;
  font-size: 10px; font-weight: 800; letter-spacing: 0.07em;
  text-transform: uppercase; padding: 4px 10px;
  background: rgba(0,0,0,0.55); color: #fff;
  border-radius: 100px; backdrop-filter: blur(6px);
}
.lelang-card-body { padding: 16px 16px 10px; flex: 1; }
.lelang-card-title {
  font-size: 14.5px; font-weight: 700; color: #0a1628;
  line-height: 1.35; margin: 0 0 8px; letter-spacing: -0.01em;
}
.lelang-card-loc {
  display: flex; align-items: center; gap: 5px;
  font-size: 12px; color: rgba(10,22,40,0.52); margin-bottom: 10px;
}
.lelang-card-specs { display: flex; flex-wrap: wrap; gap: 5px; }
.lelang-card-spec {
  font-size: 11px; font-weight: 600; color: #0057b8;
  background: rgba(0,87,184,0.08); padding: 3px 8px; border-radius: 100px;
}
.lelang-card-foot {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 16px; border-top: 1px solid rgba(0,63,136,0.07);
  margin-top: auto;
}
.lelang-card-price { display: flex; flex-direction: column; gap: 2px; }
.lelang-price-label { font-size: 9.5px; font-weight: 700; color: rgba(10,22,40,0.45); text-transform: uppercase; letter-spacing: 0.06em; }
.lelang-price-val { font-size: 14px; font-weight: 800; color: #0a1628; letter-spacing: -0.02em; }
.lelang-card-date {
  display: flex; align-items: center; gap: 4px;
  font-size: 11px; color: rgba(10,22,40,0.50); font-weight: 500;
}

/* ── CTA BANNER ── */
.lelang-cta-banner {
  display: flex; align-items: center; justify-content: space-between;
  gap: 24px; flex-wrap: wrap;
  background: #0057b8; border-radius: 18px;
  padding: 28px 36px;
  box-shadow: 0 8px 40px rgba(0,87,184,0.30);
}
.lelang-cta-left { display: flex; align-items: center; gap: 18px; flex: 1; min-width: 0; }
.lelang-cta-icon {
  width: 52px; height: 52px; border-radius: 14px;
  background: rgba(255,255,255,0.15); color: #fff;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.lelang-cta-title { font-size: 16px; font-weight: 800; color: #fff; margin: 0 0 4px; }
.lelang-cta-sub { font-size: 13px; color: rgba(255,255,255,0.72); margin: 0; }
.lelang-cta-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px; background: #fff; color: #0057b8;
  border-radius: 100px; font-size: 14px; font-weight: 800;
  text-decoration: none; flex-shrink: 0;
  transition: transform 0.22s, box-shadow 0.22s;
}
.lelang-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.18); }

/* ── INFO ── */
.lelang-info { padding: 56px 0 72px; background: #fff; border-top: 1.5px solid rgba(0,63,136,0.07); }
.lelang-info-inner {
  display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
}
.lelang-info-card {
  display: flex; gap: 18px; align-items: flex-start;
  background: #f8faff; border: 1.5px solid rgba(0,63,136,0.09);
  border-radius: 16px; padding: 24px;
}
.lelang-info-icon {
  width: 46px; height: 46px; border-radius: 12px;
  background: rgba(0,87,184,0.08); border: 1.5px solid rgba(0,87,184,0.14);
  display: flex; align-items: center; justify-content: center;
  color: #0057b8; flex-shrink: 0;
}
.lelang-info-title { font-size: 15px; font-weight: 800; color: #0a1628; margin: 0 0 8px; }
.lelang-info-desc { font-size: 13.5px; color: rgba(10,22,40,0.65); line-height: 1.68; margin: 0; text-align: justify; }

/* ── RESPONSIVE ── */
@media (max-width: 1100px) {
  .lelang-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 900px) {
  .lelang-hero-inner { grid-template-columns: 1fr; }
  .lelang-hero-right { display: none; }
  .lelang-steps-grid { grid-template-columns: repeat(2, 1fr); }
  .lelang-grid { grid-template-columns: repeat(2, 1fr); }
  .lelang-info-inner { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .lelang-steps-grid { grid-template-columns: 1fr; }
  .lelang-grid { grid-template-columns: 1fr; }
  .lelang-cta-banner { flex-direction: column; text-align: center; }
  .lelang-cta-left { flex-direction: column; align-items: center; text-align: center; }
  .lelang-assets-head { flex-direction: column; align-items: flex-start; }
}
</style>
