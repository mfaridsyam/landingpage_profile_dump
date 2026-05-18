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

    <!-- Artikel Fullscreen Modal -->
    <Transition name="modal-fade">
      <div v-if="artikelModal.open" class="artikel-modal-overlay" @click.self="closeArtikel">
        <button class="artikel-modal-close" @click="closeArtikel">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="artikel-modal-content">
          <img :src="articles[artikelModal.idx].img" :alt="articles[artikelModal.idx].label" class="artikel-modal-img" />
          <div class="artikel-modal-body">
            <div class="artikel-modal-tag">Artikel</div>
            <h2 class="artikel-modal-title">{{ articles[artikelModal.idx].label }}</h2>
            <p class="artikel-modal-text">
              BRI terus berkomitmen untuk mendorong pertumbuhan ekonomi masyarakat Polewali Mandar melalui berbagai program unggulan. Dengan jaringan yang luas dan layanan digital yang semakin canggih, BRI hadir untuk melayani setiap kebutuhan perbankan masyarakat setempat.
            </p>
            <p class="artikel-modal-text">
              Program KUR, BRImo, dan layanan AgenBRI terus diperluas untuk menjangkau lebih banyak masyarakat di pelosok Sulawesi Barat. Komitmen ini sejalan dengan visi BRI untuk memberdayakan perekonomian Indonesia dari desa hingga kota.
            </p>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Media Modal (foto/video) with arrows -->
    <Transition name="modal-fade">
      <div v-if="mediaModal.open" class="gallery-modal-overlay" @click.self="closeMedia" @keydown.left="prevMedia" @keydown.right="nextMedia" tabindex="0" ref="mediaOverlayRef">
        <!-- Left arrow -->
        <button class="media-nav-btn media-nav-left" @click="prevMedia">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>

        <div class="gallery-modal-box">
          <button class="gallery-modal-close" @click="closeMedia">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          <!-- Photo modal -->
          <template v-if="mediaModal.type === 'foto'">
            <img :src="photos[mediaModal.idx].img" :alt="photos[mediaModal.idx].label" class="gallery-modal-img" />
            <div class="gallery-modal-caption">{{ photos[mediaModal.idx].label }}</div>
          </template>

          <!-- Video modal -->
          <template v-if="mediaModal.type === 'video'">
            <div class="gallery-modal-video-wrap">
              <iframe
                :src="`https://www.youtube.com/embed/${videos[mediaModal.idx].ytId}?autoplay=1`"
                :title="videos[mediaModal.idx].title"
                allowfullscreen
                allow="autoplay"
              ></iframe>
            </div>
            <div class="gallery-modal-caption">{{ videos[mediaModal.idx].title }}</div>
          </template>
        </div>

        <!-- Right arrow -->
        <button class="media-nav-btn media-nav-right" @click="nextMedia">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
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

/* ---- Artikel Fullscreen Modal ---- */
.artikel-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(5,12,28,0.96);
  backdrop-filter: blur(12px);
  z-index: 9999;
  display: flex;
  align-items: stretch;
  overflow-y: auto;
}

.artikel-modal-close {
  position: fixed;
  top: 20px;
  right: 24px;
  z-index: 10001;
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.18);
  color: #fff;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}
.artikel-modal-close:hover { background: rgba(255,255,255,0.20); }

.artikel-modal-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  min-height: 100vh;
}

.artikel-modal-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  position: sticky;
  top: 0;
  max-height: 100vh;
}

.artikel-modal-body {
  padding: 60px 56px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
}

.artikel-modal-tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  background: rgba(99,102,241,0.20);
  border: 1px solid rgba(99,102,241,0.35);
  border-radius: 100px;
  color: #a5b4fc;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  width: fit-content;
}

.artikel-modal-title {
  font-size: clamp(22px, 3vw, 36px);
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin: 0;
}

.artikel-modal-text {
  font-size: 15px;
  line-height: 1.8;
  color: rgba(255,255,255,0.65);
  margin: 0;
}

/* ---- Media Modal with arrows ---- */
.gallery-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.88);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 80px;
  outline: none;
}

.gallery-modal-box {
  position: relative;
  max-width: 900px;
  width: 100%;
  background: #0d1f3c;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.1);
}

.gallery-modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
  background: rgba(0,0,0,0.5);
  border: none;
  color: #fff;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}
.gallery-modal-close:hover { background: rgba(0,0,0,0.8); }

.gallery-modal-img {
  width: 100%;
  max-height: 70vh;
  object-fit: contain;
  display: block;
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

.gallery-modal-caption {
  padding: 14px 20px;
  font-size: 14px;
  color: rgba(255,255,255,0.7);
}

/* Nav arrows */
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