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

      <!-- ARTIKEL — layout mirip contoh: 1 besar kiri + kolom kanan -->
      <div v-show="tab === 'artikel'">
        <div class="artikel-layout">
          <!-- Featured artikel besar kiri -->
          <div class="artikel-featured reveal" style="cursor:pointer" @click="openArtikel(0)">
            <div class="artikel-featured-img-wrap">
              <img :src="articles[0].img" :alt="articles[0].label" />
              <div class="artikel-featured-overlay"></div>
            </div>
            <div class="artikel-featured-body">
              <span class="artikel-time">{{ articles[0].time }}</span>
              <h3 class="artikel-featured-title">{{ articles[0].label }}</h3>
            </div>
          </div>

          <!-- Kolom kanan: 2 artikel atas + 3 artikel bawah -->
          <div class="artikel-side-col">
            <div v-for="(art, i) in articles.slice(1, 3)" :key="art.label"
              class="artikel-side-item reveal" :class="`reveal-delay-${i+1}`"
              style="cursor:pointer" @click="openArtikel(i+1)">
              <div class="artikel-side-img-wrap">
                <img :src="art.img" :alt="art.label" />
              </div>
              <div class="artikel-side-body">
                <span class="artikel-time">{{ art.time }}</span>
                <p class="artikel-side-title">{{ art.label }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Row bawah: 3 artikel kecil -->
        <div class="artikel-bottom-row">
          <div v-for="(art, i) in articles.slice(3, 6)" :key="art.label"
            class="artikel-bottom-item reveal" :class="`reveal-delay-${i}`"
            style="cursor:pointer" @click="openArtikel(i+3)">
            <div class="artikel-bottom-img-wrap">
              <img :src="art.img" :alt="art.label" />
            </div>
            <div class="artikel-bottom-body">
              <span class="artikel-time">{{ art.time }}</span>
              <p class="artikel-bottom-title">{{ art.label }}</p>
            </div>
          </div>
        </div>

        <div class="gallery-load-more reveal">
          <button class="btn-load-more" @click="modalType='artikel'; showModal=true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
            Tampilkan Lainnya
          </button>
        </div>
      </div>

      <!-- FOTO — grid kotak-kotak semua sama besar -->
      <div v-show="tab === 'foto'">
        <div class="foto-grid">
          <div v-for="(photo, i) in photos" :key="i"
            class="foto-grid-item reveal" :class="i > 0 ? `reveal-delay-${i % 3}` : ''"
            style="cursor:pointer" @click="openMedia('foto', i)">
            <img :src="photo.img" :alt="photo.label" />
            <div class="foto-grid-overlay">
              <div class="foto-grid-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              </div>
              <span class="foto-grid-label">{{ photo.label }}</span>
            </div>
          </div>
        </div>
        <div class="gallery-load-more reveal">
          <button class="btn-load-more" @click="modalType='foto'; showModal=true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
            Tampilkan Lainnya
          </button>
        </div>
      </div>

      <!-- VIDEO — 1 besar + grid kecil di samping -->
      <div v-show="tab === 'video'">
        <div class="video-layout">
          <!-- Video utama besar -->
          <div class="video-featured reveal" style="cursor:pointer" @click="openMedia('video', 0)">
            <div class="video-thumb-wrap">
              <img :src="`https://img.youtube.com/vi/${videos[0].ytId}/hqdefault.jpg`" :alt="videos[0].title" />
              <div class="video-play-btn">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            </div>
            <div class="video-featured-info">
              <div class="video-badge">Video Terbaru</div>
              <div class="video-title">{{ videos[0].title }}</div>
              <div class="video-meta">{{ videos[0].meta }}</div>
            </div>
          </div>

          <!-- Video lainnya di kanan -->
          <div class="video-side-list">
            <div v-for="(vid, i) in videos.slice(1)" :key="i"
              class="video-side-item reveal" :class="`reveal-delay-${i+1}`"
              style="cursor:pointer" @click="openMedia('video', i+1)">
              <div class="video-side-thumb">
                <img :src="`https://img.youtube.com/vi/${vid.ytId}/hqdefault.jpg`" :alt="vid.title" />
                <div class="video-side-play">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
              </div>
              <div class="video-side-info">
                <div class="video-title" style="font-size:13px">{{ vid.title }}</div>
                <div class="video-meta">{{ vid.meta }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="gallery-load-more reveal">
          <button class="btn-load-more" @click="modalType='video'; showModal=true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
            Tampilkan Lainnya
          </button>
        </div>
      </div>
    </div>

    <!-- ===== ARTIKEL MODAL ===== -->
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
              <p class="news-lead">BRI terus berkomitmen untuk mendorong pertumbuhan ekonomi masyarakat Polewali Mandar melalui berbagai program unggulan yang menyentuh langsung kehidupan masyarakat.</p>
              <p>Dengan jaringan yang luas dan layanan digital yang semakin canggih, BRI hadir untuk melayani setiap kebutuhan perbankan masyarakat setempat. Mulai dari petani di pelosok desa hingga pelaku UMKM perkotaan, semua dapat mengakses layanan perbankan yang terpercaya.</p>
              <h2 class="news-subheading">Ekspansi Digital dan KUR</h2>
              <p>Program KUR, BRImo, dan layanan AgenBRI terus diperluas untuk menjangkau lebih banyak masyarakat di pelosok Sulawesi Barat. BRI Cabang Polewali berhasil menyalurkan KUR senilai ratusan miliar kepada ribuan pelaku usaha kecil dan menengah.</p>
              <blockquote class="news-quote">"Kami hadir bukan hanya sebagai bank, tetapi sebagai mitra tumbuh bagi seluruh masyarakat Polewali Mandar."</blockquote>
              <p>Inovasi layanan digital seperti BRImo dan BRI API terus diperkenalkan kepada masyarakat melalui program literasi keuangan yang digelar secara rutin di berbagai kecamatan.</p>
            </div>
          </article>
        </div>
      </div>
    </Transition>

    <!-- ===== FOTO LIGHTBOX ===== -->
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

    <!-- ===== VIDEO MODAL ===== -->
    <Transition name="modal-fade">
      <div v-if="mediaModal.open && mediaModal.type === 'video'" class="video-modal-overlay" @click.self="closeMedia">
        <button class="screen-close-btn" @click="closeMedia">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="video-modal-box">
          <div class="gallery-modal-video-wrap">
            <iframe :src="`https://www.youtube.com/embed/${videos[mediaModal.idx].ytId}?autoplay=1`" :title="videos[mediaModal.idx].title" allowfullscreen allow="autoplay"></iframe>
          </div>
          <div class="video-modal-caption">{{ videos[mediaModal.idx].title }}</div>
        </div>
      </div>
    </Transition>

    <!-- ===== TAMPILKAN LAINNYA MODAL ===== -->
    <Transition name="modal-fade">
      <div v-if="showModal" class="more-modal-overlay" @click.self="showModal=false">
        <div class="more-modal-box">
          <div class="more-modal-header">
            <div class="more-modal-title">
              <svg v-if="modalType==='artikel'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              <svg v-else-if="modalType==='foto'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
              Semua {{ modalType === 'artikel' ? 'Artikel' : modalType === 'foto' ? 'Foto' : 'Video' }}
            </div>
            <button class="more-modal-close" @click="showModal=false">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <!-- Artikel lainnya -->
          <div v-if="modalType==='artikel'" class="more-modal-scroll">
            <div class="more-artikel-grid">
              <div v-for="(art, i) in [...articles, ...articles]" :key="i"
                class="more-artikel-item" style="cursor:pointer" @click="showModal=false; openArtikel(i % articles.length)">
                <div class="more-artikel-img"><img :src="art.img" :alt="art.label" /></div>
                <div class="more-artikel-body">
                  <span class="artikel-time">{{ art.time }}</span>
                  <p class="more-artikel-title">{{ art.label }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Foto lainnya -->
          <div v-else-if="modalType==='foto'" class="more-modal-scroll">
            <div class="more-foto-grid">
              <div v-for="(photo, i) in [...photos, ...photos]" :key="i"
                class="more-foto-item" style="cursor:pointer" @click="showModal=false; openMedia('foto', i % photos.length)">
                <img :src="photo.img" :alt="photo.label" />
                <div class="more-foto-overlay"><span>{{ photo.label }}</span></div>
              </div>
            </div>
          </div>

          <!-- Video lainnya -->
          <div v-else class="more-modal-scroll">
            <div class="more-video-list">
              <div v-for="(vid, i) in [...videos, ...videos]" :key="i"
                class="more-video-item" style="cursor:pointer" @click="showModal=false; openMedia('video', i % videos.length)">
                <div class="more-video-thumb">
                  <img :src="`https://img.youtube.com/vi/${vid.ytId}/hqdefault.jpg`" :alt="vid.title" />
                  <div class="video-side-play">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                </div>
                <div class="more-video-info">
                  <p class="more-video-title">{{ vid.title }}</p>
                  <span class="video-meta">{{ vid.meta }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'

const tab = ref('artikel')
const mediaOverlayRef = ref(null)
const showModal = ref(false)
const modalType = ref('artikel')

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
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => {
    if (!mediaModal.open) return
    if (e.key === 'ArrowLeft') prevMedia()
    if (e.key === 'ArrowRight') nextMedia()
    if (e.key === 'Escape') closeMedia()
  })
}

const articles = [
  { img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80', label: 'BRI Dorong UMKM Polewali Naik Kelas Lewat Program KUR 2026', time: '30 menit lalu' },
  { img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80', label: 'Ekspansi Jaringan AgenBRI Jangkau Desa Terpencil di Sulbar', time: '1 hari lalu' },
  { img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80', label: 'Program CSR BRI untuk Masyarakat Polewali Mandar', time: '6 hari lalu' },
  { img: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80', label: 'KUR Berhasil Berdayakan Petani Lokal di Polewali', time: '1 jam lalu' },
  { img: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=600&q=80', label: 'BRImo Raih Penghargaan Best Digital Banking 2026', time: '6 jam lalu' },
  { img: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80', label: 'Literasi Keuangan BRI Sasar 10.000 Pelaku UMKM', time: '1 minggu lalu' },
]

const photos = [
  { img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80', label: 'Kantor Cabang Polewali' },
  { img: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=600&q=80', label: 'Layanan Nasabah' },
  { img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80', label: 'BRImo Digital' },
  { img: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80', label: 'Program KUR UMKM' },
  { img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80', label: 'Kegiatan CSR Polewali' },
  { img: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80', label: 'Pelayanan Prima' },
  { img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', label: 'Tim BRI Polewali' },
  { img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80', label: 'Rapat Koordinasi' },
]

const videos = [
  { ytId: 'yZjAU4yFSdU', title: 'BRI — Melayani Sepenuh Hati untuk Indonesia', meta: 'BRI Official · Profil Perusahaan' },
  { ytId: 'yZjAU4yFSdU', title: 'BRImo — Super App Perbankan Digital BRI', meta: 'BRI Official · Layanan Digital' },
  { ytId: 'yZjAU4yFSdU', title: 'KUR BRI — Kredit Usaha Rakyat untuk UMKM', meta: 'BRI Official · Program KUR' },
  { ytId: 'yZjAU4yFSdU', title: 'AgenBRI — Perbankan Tanpa Batas di Pelosok', meta: 'BRI Official · AgenBRI' },
]
</script>

<style scoped>
/* ── ARTIKEL LAYOUT ── */
.artikel-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 16px;
  margin-bottom: 16px;
}

.artikel-featured {
  background: rgba(255,255,255,0.05);
  border: 1.5px solid rgba(255,255,255,0.10);
  border-radius: 16px;
  overflow: hidden;
  backdrop-filter: blur(8px);
  transition: border-color 0.25s, transform 0.3s cubic-bezier(0.22,1,0.36,1);
}
.artikel-featured:hover { border-color: rgba(0,87,184,0.40); transform: translateY(-3px); }

.artikel-featured-img-wrap {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}
.artikel-featured-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}
.artikel-featured:hover .artikel-featured-img-wrap img { transform: scale(1.03); }
.artikel-featured-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%);
}
.artikel-featured-body {
  padding: 18px 20px 20px;
}
.artikel-time {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255,255,255,0.40);
  letter-spacing: 0.04em;
  display: block;
  margin-bottom: 6px;
}
.artikel-featured-title {
  font-size: 18px;
  font-weight: 700;
  color: rgba(255,255,255,0.92);
  line-height: 1.35;
  letter-spacing: -0.02em;
}

/* Side column */
.artikel-side-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.artikel-side-item {
  display: flex;
  gap: 12px;
  background: rgba(255,255,255,0.05);
  border: 1.5px solid rgba(255,255,255,0.10);
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(8px);
  transition: border-color 0.25s, transform 0.3s cubic-bezier(0.22,1,0.36,1);
  flex: 1;
}
.artikel-side-item:hover { border-color: rgba(0,87,184,0.40); transform: translateX(3px); }
.artikel-side-img-wrap {
  width: 110px;
  flex-shrink: 0;
  overflow: hidden;
}
.artikel-side-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}
.artikel-side-item:hover .artikel-side-img-wrap img { transform: scale(1.05); }
.artikel-side-body {
  padding: 12px 12px 12px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.artikel-side-title {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255,255,255,0.85);
  line-height: 1.45;
  margin: 0;
}

/* Bottom row 3 cards */
.artikel-bottom-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}
.artikel-bottom-item {
  background: rgba(255,255,255,0.05);
  border: 1.5px solid rgba(255,255,255,0.10);
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(8px);
  transition: border-color 0.25s, transform 0.3s cubic-bezier(0.22,1,0.36,1);
}
.artikel-bottom-item:hover { border-color: rgba(0,87,184,0.40); transform: translateY(-3px); }
.artikel-bottom-img-wrap {
  aspect-ratio: 16/9;
  overflow: hidden;
}
.artikel-bottom-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}
.artikel-bottom-item:hover .artikel-bottom-img-wrap img { transform: scale(1.04); }
.artikel-bottom-body { padding: 12px 14px 14px; }
.artikel-bottom-title {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255,255,255,0.85);
  line-height: 1.45;
  margin: 0;
}

/* ── FOTO GRID — semua kotak sama ── */
.foto-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}
.foto-grid-item {
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  border: 1.5px solid rgba(255,255,255,0.08);
  transition: border-color 0.25s, transform 0.3s cubic-bezier(0.22,1,0.36,1);
}
.foto-grid-item:hover { border-color: rgba(0,87,184,0.40); transform: scale(1.02); }
.foto-grid-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}
.foto-grid-item:hover img { transform: scale(1.08); }
.foto-grid-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 10px;
  opacity: 0;
  transition: opacity 0.25s;
}
.foto-grid-item:hover .foto-grid-overlay { opacity: 1; }
.foto-grid-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(59,130,246,0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin-bottom: 6px;
}
.foto-grid-label {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255,255,255,0.88);
  line-height: 1.3;
}

/* ── VIDEO LAYOUT ── */
.video-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 16px;
  margin-bottom: 24px;
}
.video-featured {
  background: rgba(255,255,255,0.05);
  border: 1.5px solid rgba(255,255,255,0.10);
  border-radius: 16px;
  overflow: hidden;
  backdrop-filter: blur(8px);
  transition: border-color 0.25s, transform 0.3s cubic-bezier(0.22,1,0.36,1);
}
.video-featured:hover { border-color: rgba(0,87,184,0.40); transform: translateY(-3px); }
.video-featured .video-thumb-wrap {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: 0;
}
.video-featured .video-thumb-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}
.video-featured:hover .video-thumb-wrap img { transform: scale(1.03); }
.video-featured-info { padding: 16px 20px 20px; }
.video-badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #60a5fa;
  background: rgba(0,87,184,0.20);
  border: 1px solid rgba(0,87,184,0.35);
  border-radius: 100px;
  padding: 3px 10px;
  margin-bottom: 8px;
}
.video-side-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.video-side-item {
  display: flex;
  gap: 12px;
  background: rgba(255,255,255,0.05);
  border: 1.5px solid rgba(255,255,255,0.10);
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(8px);
  transition: border-color 0.25s, transform 0.3s cubic-bezier(0.22,1,0.36,1);
  align-items: center;
}
.video-side-item:hover { border-color: rgba(0,87,184,0.40); transform: translateX(3px); }
.video-side-thumb {
  width: 110px;
  height: 70px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}
.video-side-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.video-side-play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.40);
  color: #fff;
}
.video-side-info {
  padding: 8px 12px 8px 0;
  flex: 1;
}

/* ── TOMBOL TAMPILKAN LAINNYA ── */
.gallery-load-more {
  display: flex;
  justify-content: center;
  margin-top: 8px;
  margin-bottom: 4px;
}
.btn-load-more {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 28px;
  border-radius: 100px;
  background: rgba(255,255,255,0.06);
  border: 1.5px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.75);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  backdrop-filter: blur(8px);
  transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;
}
.btn-load-more:hover {
  background: rgba(0,87,184,0.20);
  border-color: rgba(0,87,184,0.50);
  color: #93c5fd;
  transform: translateY(-1px);
}

/* ── TAMPILKAN LAINNYA MODAL ── */
.more-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(5,14,30,0.88);
  backdrop-filter: blur(14px);
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
}
.more-modal-box {
  background: rgba(14,26,52,0.95);
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 20px;
  width: 100%;
  max-width: 900px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(0,0,0,0.60);
}
.more-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  flex-shrink: 0;
}
.more-modal-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
  color: rgba(255,255,255,0.90);
}
.more-modal-close {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.70);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}
.more-modal-close:hover { background: rgba(255,255,255,0.18); }
.more-modal-scroll {
  overflow-y: auto;
  padding: 20px 24px 24px;
  flex: 1;
}

/* Artikel grid in modal */
.more-artikel-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.more-artikel-item {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.2s, transform 0.25s;
}
.more-artikel-item:hover { border-color: rgba(0,87,184,0.40); transform: translateY(-2px); }
.more-artikel-img { aspect-ratio: 16/9; overflow: hidden; }
.more-artikel-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
.more-artikel-body { padding: 10px 12px 12px; }
.more-artikel-title { font-size: 12.5px; font-weight: 600; color: rgba(255,255,255,0.82); line-height: 1.4; margin: 0; }

/* Foto grid in modal */
.more-foto-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.more-foto-item {
  aspect-ratio: 1;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}
.more-foto-item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.3s; }
.more-foto-item:hover img { transform: scale(1.06); }
.more-foto-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%);
  display: flex;
  align-items: flex-end;
  padding: 8px;
  opacity: 0;
  transition: opacity 0.2s;
}
.more-foto-item:hover .more-foto-overlay { opacity: 1; }
.more-foto-overlay span { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.88); }

/* Video list in modal */
.more-video-list { display: flex; flex-direction: column; gap: 12px; }
.more-video-item {
  display: flex;
  gap: 14px;
  align-items: center;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.2s;
}
.more-video-item:hover { border-color: rgba(0,87,184,0.35); }
.more-video-thumb { width: 140px; height: 88px; flex-shrink: 0; position: relative; overflow: hidden; }
.more-video-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.more-video-info { padding: 10px 16px 10px 0; flex: 1; }
.more-video-title { font-size: 13.5px; font-weight: 600; color: rgba(255,255,255,0.85); margin: 0 0 4px; line-height: 1.4; }

/* ── MODALS (shared) ── */
.screen-close-btn {
  position: fixed; top: 20px; right: 24px; z-index: 10100;
  background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.22);
  color: #fff; border-radius: 50%; width: 44px; height: 44px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: background 0.2s;
}
.screen-close-btn:hover { background: rgba(255,255,255,0.25); }

.artikel-modal-overlay {
  position: fixed; inset: 0; background: #f4f4f0; z-index: 9999; overflow-y: auto;
}
.artikel-modal-scroll { max-width: 760px; margin: 0 auto; padding: 72px 24px 80px; }
.news-category-badge { display: inline-block; background: #003f8a; color: #fff; font-size: 10px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; margin-bottom: 16px; }
.news-headline { font-size: clamp(24px, 4vw, 40px); font-weight: 800; color: #0d1117; line-height: 1.15; letter-spacing: -0.02em; margin: 0 0 18px; }
.news-meta { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #555; flex-wrap: wrap; margin-bottom: 16px; }
.news-author, .news-date { display: flex; align-items: center; gap: 5px; }
.news-dot { color: #bbb; }
.news-divider { height: 2px; background: #e0e0e0; border-radius: 2px; margin-bottom: 28px; }
.news-figure { margin: 0 0 32px; }
.news-hero-img { width: 100%; border-radius: 10px; display: block; max-height: 460px; object-fit: cover; }
.news-figure figcaption { font-size: 12px; color: #888; margin-top: 8px; font-style: italic; }
.news-body { font-size: 17px; line-height: 1.8; color: #1a1a1a; }
.news-body p { margin: 0 0 20px; }
.news-lead { font-size: 19px !important; font-weight: 600 !important; color: #111 !important; line-height: 1.65 !important; }
.news-subheading { font-size: 22px; font-weight: 700; color: #0d1117; margin: 32px 0 14px; letter-spacing: -0.01em; }
.news-quote { border-left: 4px solid #003f8a; margin: 28px 0; padding: 12px 20px; font-size: 18px; font-style: italic; color: #333; background: rgba(0,63,138,0.05); border-radius: 0 8px 8px 0; }

.foto-modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.92); backdrop-filter: blur(10px);
  z-index: 9999; display: flex; align-items: center; justify-content: center;
  padding: 60px 80px 40px; outline: none;
}
.foto-modal-inner { display: flex; flex-direction: column; align-items: center; max-width: 860px; width: 100%; }
.foto-modal-img { max-width: 100%; max-height: 72vh; object-fit: contain; display: block; border-radius: 10px; }
.foto-modal-caption { margin-top: 16px; background: rgba(255,255,255,0.12); backdrop-filter: blur(6px); border: 1px solid rgba(255,255,255,0.18); color: #fff; font-size: 14px; padding: 8px 20px; border-radius: 100px; text-align: center; max-width: 90%; }

.video-modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.92); backdrop-filter: blur(10px);
  z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 70px 40px 40px;
}
.video-modal-box { max-width: 900px; width: 100%; border-radius: 14px; overflow: hidden; background: #0d1f3c; border: 1px solid rgba(255,255,255,0.1); }
.video-modal-caption { padding: 14px 20px; font-size: 14px; color: rgba(255,255,255,0.7); }
.gallery-modal-video-wrap { aspect-ratio: 16/9; width: 100%; }
.gallery-modal-video-wrap iframe { width: 100%; height: 100%; border: none; display: block; }

.media-nav-btn {
  position: fixed; top: 50%; transform: translateY(-50%);
  background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.20);
  color: #fff; border-radius: 50%; width: 52px; height: 52px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: background 0.2s; z-index: 10000;
}
.media-nav-btn:hover { background: rgba(255,255,255,0.22); }
.media-nav-left { left: 20px; }
.media-nav-right { right: 20px; }

.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.25s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

/* Responsive */
@media (max-width: 900px) {
  .artikel-layout { grid-template-columns: 1fr; }
  .artikel-side-col { flex-direction: row; }
  .artikel-bottom-row { grid-template-columns: 1fr 1fr; }
  .foto-grid { grid-template-columns: repeat(3, 1fr); }
  .video-layout { grid-template-columns: 1fr; }
  .video-side-list { flex-direction: row; flex-wrap: wrap; }
  .video-side-item { flex: 1; min-width: 200px; }
  .more-artikel-grid { grid-template-columns: 1fr 1fr; }
  .more-foto-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 600px) {
  .artikel-bottom-row { grid-template-columns: 1fr; }
  .foto-grid { grid-template-columns: repeat(2, 1fr); }
  .more-artikel-grid { grid-template-columns: 1fr; }
  .more-foto-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
