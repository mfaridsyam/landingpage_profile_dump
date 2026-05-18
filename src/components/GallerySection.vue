<template>
  <section class="gallery-section" id="galeri">
    <div class="container">
      <div class="gallery-header">
        <div class="gallery-header-left">
          <div class="section-eyebrow reveal">Galeri &amp; Media</div>
          <h2 class="section-title reveal" style="margin-bottom:0">Info Terkini</h2>
        </div>
        <div class="gallery-tabs reveal">
          <button class="gallery-tab" :class="{ active: tab === 'artikel' }" @click="tab = 'artikel'">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            Artikel
          </button>
          <button class="gallery-tab" :class="{ active: tab === 'foto' }" @click="tab = 'foto'">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            Foto
          </button>
          <button class="gallery-tab" :class="{ active: tab === 'video' }" @click="tab = 'video'">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
            Video
          </button>
        </div>
      </div>

      <!-- Artikel Grid -->
      <div v-show="tab === 'artikel'" class="gallery-grid">
        <div v-for="(art, i) in articles" :key="i"
          class="gallery-item reveal" :class="[art.featured ? 'featured' : '', i > 0 ? `reveal-delay-${i}` : '']"
          style="cursor:pointer" @click="openArtikel(i)">
          <img :src="art.img" :alt="art.label" />
          <div class="gallery-item-overlay">
            <span class="gallery-item-label">{{ art.label }}</span>
          </div>
          <div class="gallery-play-icon artikel-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
        </div>
      </div>

      <!-- Photo Grid -->
      <div v-show="tab === 'foto'" class="gallery-grid">
        <div v-for="(photo, i) in photos" :key="i"
          class="gallery-item reveal" :class="[photo.featured ? 'featured' : '', photo.wide ? 'wide' : '', i > 0 ? `reveal-delay-${i % 3}` : '']"
          style="cursor:pointer" @click="openMedia('foto', i)">
          <img :src="photo.img" :alt="photo.label" />
          <div class="gallery-item-overlay">
            <span class="gallery-item-label">{{ photo.label }}</span>
          </div>
          <div class="gallery-play-icon foto-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          </div>
        </div>
      </div>

      <!-- Video Grid -->
      <div v-show="tab === 'video'" class="video-grid active">
        <div v-for="(vid, i) in videos" :key="i" class="video-card reveal" :class="i > 0 ? `reveal-delay-${i}` : ''"
          style="cursor:pointer" @click="openMedia('video', i)">
          <div class="video-thumb-wrap">
            <img :src="`https://img.youtube.com/vi/${vid.ytId}/hqdefault.jpg`" :alt="vid.title" />
            <div class="video-play-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
          </div>
          <div class="video-info">
            <div class="video-title">{{ vid.title }}</div>
            <div class="video-meta">{{ vid.meta }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Artikel Fullscreen Modal — Online News Style -->
    <Transition name="modal-fade">
      <div v-if="artikelModal.open" class="artikel-modal-overlay" @click.self="closeArtikel">
        <button class="screen-close-btn" @click="closeArtikel">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="artikel-modal-scroll">
          <article class="news-article">
            <div class="news-category-badge">Artikel</div>
            <h1 class="news-headline">{{ articles[artikelModal.idx].label }}</h1>
            <div class="news-meta">
              <span class="news-author">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                Tim Redaksi BRI Polewali
              </span>
              <span class="news-dot">·</span>
              <span class="news-date">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                {{ new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}
              </span>
            </div>
            <div class="news-divider"></div>
            <figure class="news-figure">
              <img :src="articles[artikelModal.idx].img" :alt="articles[artikelModal.idx].label" class="news-hero-img" />
              <figcaption>Foto: BRI Cabang Polewali Mandar</figcaption>
            </figure>
            <div class="news-body">
              <p class="news-lead">BRI terus berkomitmen untuk mendorong pertumbuhan ekonomi masyarakat Polewali Mandar melalui berbagai program unggulan yang menyentuh langsung kehidupan masyarakat bawah.</p>
              <p>Dengan jaringan yang luas dan layanan digital yang semakin canggih, BRI hadir untuk melayani setiap kebutuhan perbankan masyarakat setempat. Mulai dari petani di pelosok desa hingga pelaku UMKM perkotaan, semua dapat mengakses layanan perbankan yang terpercaya.</p>
              <h2 class="news-subheading">Ekspansi Digital dan KUR</h2>
              <p>Program KUR, BRImo, dan layanan AgenBRI terus diperluas untuk menjangkau lebih banyak masyarakat di pelosok Sulawesi Barat. Komitmen ini sejalan dengan visi BRI untuk memberdayakan perekonomian Indonesia dari desa hingga kota.</p>
              <p>Pada tahun 2025, BRI Cabang Polewali berhasil menyalurkan KUR senilai ratusan miliar rupiah kepada ribuan pelaku usaha kecil dan menengah di wilayah Polewali Mandar dan sekitarnya, membuktikan komitmen nyata bank dalam mendukung pertumbuhan ekonomi lokal.</p>
              <blockquote class="news-quote">
                "Kami hadir bukan hanya sebagai bank, tetapi sebagai mitra tumbuh bagi seluruh masyarakat Polewali Mandar."
              </blockquote>
              <p>Inovasi layanan digital seperti BRImo dan BRI API juga terus diperkenalkan kepada masyarakat melalui berbagai program literasi keuangan yang digelar secara rutin di berbagai kecamatan.</p>
            </div>
          </article>
        </div>
      </div>
    </Transition>

    <!-- Foto Modal — no blue bg, caption below with bg+rounded, X top-right screen -->
    <Transition name="modal-fade">
      <div v-if="mediaModal.open && mediaModal.type === 'foto'" class="foto-modal-overlay" @click.self="closeMedia" tabindex="0" ref="mediaOverlayRef">
        <button class="screen-close-btn" @click="closeMedia">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="foto-modal-inner">
          <img :src="photos[mediaModal.idx].img" :alt="photos[mediaModal.idx].label" class="foto-modal-img" />
          <div class="foto-modal-caption">{{ photos[mediaModal.idx].label }}</div>
        </div>
        <button class="media-nav-btn media-nav-left" @click="prevMedia">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button class="media-nav-btn media-nav-right" @click="nextMedia">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </Transition>

    <!-- Video Modal — no arrows, X top-right screen -->
    <Transition name="modal-fade">
      <div v-if="mediaModal.open && mediaModal.type === 'video'" class="video-modal-overlay" @click.self="closeMedia">
        <button class="screen-close-btn" @click="closeMedia">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="video-modal-box">
          <div class="gallery-modal-video-wrap">
            <iframe
              :src="`https://www.youtube.com/embed/${videos[mediaModal.idx].ytId}?autoplay=1`"
              :title="videos[mediaModal.idx].title"
              allowfullscreen
              allow="autoplay"
            ></iframe>
          </div>
          <div class="video-modal-caption">{{ videos[mediaModal.idx].title }}</div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'

const tab = ref('artikel')
const mediaOverlayRef = ref(null)

const artikelModal = reactive({ open: false, idx: 0 })
const mediaModal = reactive({ open: false, type: '', idx: 0 })

function openArtikel(idx) {
  artikelModal.idx = idx
  artikelModal.open = true
  document.body.style.overflow = 'hidden'
}

function closeArtikel() {
  artikelModal.open = false
  document.body.style.overflow = ''
}

function openMedia(type, idx) {
  mediaModal.type = type
  mediaModal.idx = idx
  mediaModal.open = true
  document.body.style.overflow = 'hidden'
  nextTick(() => mediaOverlayRef.value?.focus())
}

function closeMedia() {
  mediaModal.open = false
  document.body.style.overflow = ''
}

function prevMedia() {
  const list = mediaModal.type === 'foto' ? photos : videos
  mediaModal.idx = (mediaModal.idx - 1 + list.length) % list.length
}

function nextMedia() {
  const list = mediaModal.type === 'foto' ? photos : videos
  mediaModal.idx = (mediaModal.idx + 1) % list.length
}

// Keyboard arrow support
function handleKey(e) {
  if (!mediaModal.open) return
  if (e.key === 'ArrowLeft') prevMedia()
  if (e.key === 'ArrowRight') nextMedia()
  if (e.key === 'Escape') closeMedia()
}
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleKey)
}

const articles = [
  { img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80', label: 'BRI Dorong UMKM Polewali Naik Kelas', featured: true },
  { img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80', label: 'Ekspansi Jaringan AgenBRI 2026' },
  { img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80', label: 'Program CSR BRI untuk Masyarakat' },
  { img: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80', label: 'KUR Berhasil Berdayakan Petani Lokal' },
]

const photos = [
  { img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', label: 'Kantor Cabang Polewali', featured: true },
  { img: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=600&q=80', label: 'Layanan Nasabah' },
  { img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80', label: 'BRImo Digital' },
  { img: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80', label: 'Program KUR UMKM' },
  { img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80', label: 'Kegiatan CSR Polewali Mandar', wide: true },
]

const videos = [
  { ytId: 'yZjAU4yFSdU', title: 'BRI — Melayani Sepenuh Hati untuk Indonesia', meta: 'BRI Official · Profil Perusahaan' },
  { ytId: 'yZjAU4yFSdU', title: 'BRImo — Super App Perbankan Digital BRI', meta: 'BRI Official · Layanan Digital' },
  { ytId: 'yZjAU4yFSdU', title: 'KUR BRI — Kredit Usaha Rakyat untuk UMKM', meta: 'BRI Official · Program KUR' },
]
</script>

<style scoped>
.gallery-play-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.foto-icon { background: rgba(59,130,246,0.85); color: #fff; }
.artikel-icon { background: rgba(99,102,241,0.85); color: #fff; }

.gallery-item:hover .gallery-play-icon { opacity: 1; }

.video-thumb-wrap {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  aspect-ratio: 16/9;
}

.video-thumb-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-play-btn {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.35);
  color: #fff;
  transition: background 0.2s;
}

.video-card:hover .video-play-btn { background: rgba(0,0,0,0.55); }

/* ---- Screen-level close button (top-right of viewport) ---- */
.screen-close-btn {
  position: fixed;
  top: 20px;
  right: 24px;
  z-index: 10100;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.22);
  color: #fff;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}
.screen-close-btn:hover { background: rgba(255,255,255,0.25); }

/* ---- Artikel Modal — Online News Style ---- */
.artikel-modal-overlay {
  position: fixed;
  inset: 0;
  background: #f4f4f0;
  z-index: 9999;
  overflow-y: auto;
}

.artikel-modal-scroll {
  max-width: 760px;
  margin: 0 auto;
  padding: 72px 24px 80px;
}

.news-article {}

.news-category-badge {
  display: inline-block;
  background: #003f8a;
  color: #fff;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.news-headline {
  font-size: clamp(24px, 4vw, 40px);
  font-weight: 800;
  color: #0d1117;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin: 0 0 18px;
}

.news-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #555;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.news-author, .news-date {
  display: flex;
  align-items: center;
  gap: 5px;
}

.news-dot { color: #bbb; }

.news-divider {
  height: 2px;
  background: #e0e0e0;
  border-radius: 2px;
  margin-bottom: 28px;
}

.news-figure {
  margin: 0 0 32px;
}

.news-hero-img {
  width: 100%;
  border-radius: 10px;
  display: block;
  max-height: 460px;
  object-fit: cover;
}

.news-figure figcaption {
  font-size: 12px;
  color: #888;
  margin-top: 8px;
  font-style: italic;
}

.news-body {
  font-size: 17px;
  line-height: 1.8;
  color: #1a1a1a;
}

.news-body p {
  margin: 0 0 20px;
}

.news-lead {
  font-size: 19px !important;
  font-weight: 600 !important;
  color: #111 !important;
  line-height: 1.65 !important;
}

.news-subheading {
  font-size: 22px;
  font-weight: 700;
  color: #0d1117;
  margin: 32px 0 14px;
  letter-spacing: -0.01em;
}

.news-quote {
  border-left: 4px solid #003f8a;
  margin: 28px 0;
  padding: 12px 20px;
  font-size: 18px;
  font-style: italic;
  color: #333;
  background: rgba(0,63,138,0.05);
  border-radius: 0 8px 8px 0;
}

/* ---- Foto Modal ---- */
.foto-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.92);
  backdrop-filter: blur(10px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 80px 40px;
  outline: none;
}

.foto-modal-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 860px;
  width: 100%;
}

.foto-modal-img {
  max-width: 100%;
  max-height: 72vh;
  object-fit: contain;
  display: block;
  border-radius: 10px;
}

.foto-modal-caption {
  margin-top: 16px;
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255,255,255,0.18);
  color: #fff;
  font-size: 14px;
  padding: 8px 20px;
  border-radius: 100px;
  text-align: center;
  max-width: 90%;
}

/* ---- Video Modal ---- */
.video-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.92);
  backdrop-filter: blur(10px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 70px 40px 40px;
}

.video-modal-box {
  max-width: 900px;
  width: 100%;
  border-radius: 14px;
  overflow: hidden;
  background: #0d1f3c;
  border: 1px solid rgba(255,255,255,0.1);
}

.video-modal-caption {
  padding: 14px 20px;
  font-size: 14px;
  color: rgba(255,255,255,0.7);
}

.gallery-modal-video-wrap {
  aspect-ratio: 16/9;
  width: 100%;
}

.gallery-modal-video-wrap iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

/* Nav arrows (foto only) */
.media-nav-btn {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.20);
  color: #fff;
  border-radius: 50%;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  z-index: 10000;
}
.media-nav-btn:hover { background: rgba(255,255,255,0.22); }
.media-nav-left { left: 20px; }
.media-nav-right { right: 20px; }

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>