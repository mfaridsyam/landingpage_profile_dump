<template>
  <div class="gallery-page">
    <TheNavbar />

    <!-- Page Hero -->
    <div class="gpage-hero">
      <div class="gpage-hero-bg"></div>
      <div class="gpage-hero-inner">
        <div class="gpage-breadcrumb">
          <a @click.prevent="router.push('/')" href="/" class="gpage-bc-link">Beranda</a>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          <span>Media &amp; Galeri</span>
        </div>
        <h1 class="gpage-title">
          <span class="gpage-title-accent">Media</span> &amp; Galeri
        </h1>
        <p class="gpage-subtitle">Kumpulan artikel, foto, dan video terkini dari BRI Cabang Polewali Mandar</p>

        <!-- Tab bar -->
        <div class="gpage-tabs">
          <button class="gpage-tab" :class="{ active: activeTab === 'artikel' }" @click="setTab('artikel')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            Artikel
            <span class="gpage-tab-count">{{ articles.length }}</span>
          </button>
          <button class="gpage-tab" :class="{ active: activeTab === 'foto' }" @click="setTab('foto')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            Foto
            <span class="gpage-tab-count">{{ photos.length }}</span>
          </button>
          <button class="gpage-tab" :class="{ active: activeTab === 'video' }" @click="setTab('video')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
            Video
            <span class="gpage-tab-count">{{ videos.length }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="gpage-content">

      <!-- ── ARTIKEL GRID ── -->
      <div v-show="activeTab === 'artikel'" class="gpage-section">
        <div class="gpage-artikel-grid">
          <div v-for="(art, i) in articles" :key="i"
            class="gpage-art-card"
            @click="openArtikel(i)">
            <div class="gpage-art-img">
              <img :src="art.img" :alt="art.label" loading="lazy" />
              <div class="gpage-art-img-overlay"></div>
              <div class="gpage-art-badge">{{ art.category }}</div>
            </div>
            <div class="gpage-art-body">
              <span class="gpage-art-time">{{ art.time }}</span>
              <h3 class="gpage-art-title">{{ art.label }}</h3>
              <p class="gpage-art-excerpt">{{ art.excerpt }}</p>
              <div class="gpage-art-cta">
                <span>Baca selengkapnya</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── FOTO GRID ── -->
      <div v-show="activeTab === 'foto'" class="gpage-section">
        <div class="gpage-foto-grid">
          <div v-for="(photo, i) in photos" :key="i"
            class="gpage-foto-item"
            @click="openFoto(i)">
            <img :src="photo.img" :alt="photo.label" loading="lazy" />
            <div class="gpage-foto-overlay">
              <div class="gpage-foto-expand">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
              </div>
              <span class="gpage-foto-label">{{ photo.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── VIDEO GRID ── -->
      <div v-show="activeTab === 'video'" class="gpage-section">
        <div class="gpage-video-grid">
          <div v-for="(vid, i) in videos" :key="i"
            class="gpage-vid-card"
            @click="openVideoModal(i)">
            <div class="gpage-vid-thumb">
              <img :src="`https://img.youtube.com/vi/${vid.ytId.trim()}/mqdefault.jpg`"
                :alt="vid.title"
                loading="lazy"
                @error="onThumbError($event, i)" />
              <div class="gpage-vid-overlay">
                <div class="gpage-vid-play">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                </div>
              </div>
            </div>
            <div class="gpage-vid-body">
              <div class="gpage-vid-num">{{ String(i + 1).padStart(2, '0') }}</div>
              <div>
                <div class="gpage-vid-title">{{ vid.title }}</div>
                <div class="gpage-vid-meta">{{ vid.meta }}</div>
                <div class="gpage-vid-tags">
                  <span v-for="tag in vid.tags" :key="tag" class="gpage-vid-tag">#{{ tag }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Footer bar -->
    <div class="gpage-footer">
      <button class="gpage-back-btn" @click="router.push('/')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        Kembali ke Beranda
      </button>
      <span class="gpage-footer-copy">© 2026 BRI Cabang Polewali Mandar</span>
    </div>

    <!-- ═══ ARTIKEL MODAL ═══ -->
    <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="artikelModal.open" class="artikel-modal-overlay" data-lenis-prevent>
        <button class="screen-close-btn" @click="closeArtikel" title="Tutup">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="artikel-modal-scroll">
          <article class="news-article">
            <div class="news-category-badge">{{ articles[artikelModal.idx].category }}</div>
            <h1 class="news-headline">{{ articles[artikelModal.idx].label }}</h1>
            <div class="news-meta">
              <span class="news-author">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                Tim Redaksi BRI Polewali
              </span>
              <span class="news-dot">·</span>
              <span class="news-date">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                {{ articles[artikelModal.idx].time }}
              </span>
              <span class="news-dot">·</span>
              <span class="news-read-time">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                5 menit baca
              </span>
            </div>
            <div class="news-divider"></div>
            <figure class="news-figure">
              <img :src="articles[artikelModal.idx].img" :alt="articles[artikelModal.idx].label" class="news-hero-img" />
              <figcaption>Foto: BRI Cabang Polewali Mandar</figcaption>
            </figure>
            <div class="news-body" v-html="articles[artikelModal.idx].body"></div>
          </article>
          <div class="related-articles">
            <h3 class="related-title">Artikel Terkait</h3>
            <div class="related-grid">
              <div v-for="(art, i) in relatedArticles(artikelModal.idx)" :key="i"
                class="related-item" @click="artikelModal.idx = art.originalIdx">
                <div class="related-img-wrap"><img :src="art.img" :alt="art.label" /></div>
                <div class="related-body">
                  <span class="artikel-time">{{ art.time }}</span>
                  <p class="related-item-title">{{ art.label }}</p>
                  <span class="related-read-link">Baca selengkapnya →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    </Teleport>

    <!-- ═══ FOTO LIGHTBOX ═══ -->
    <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="fotoModal.open" class="foto-modal-overlay" tabindex="0" ref="fotoOverlayRef">
        <button class="foto-close-btn" @click="closeFoto">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="foto-counter">{{ fotoModal.idx + 1 }} / {{ photos.length }}</div>
        <button class="foto-nav foto-nav-left" @click="prevFoto">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button class="foto-nav foto-nav-right" @click="nextFoto">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div class="foto-modal-stage" @click.self="closeFoto">
          <Transition name="foto-slide" mode="out-in">
            <img :key="fotoModal.idx" :src="photos[fotoModal.idx].img" :alt="photos[fotoModal.idx].label" class="foto-modal-img" />
          </Transition>
        </div>
        <div class="foto-info-panel">
          <div class="foto-info-main">
            <div class="foto-info-left">
              <div class="foto-info-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              </div>
              <div>
                <div class="foto-info-title">{{ photos[fotoModal.idx].label }}</div>
                <div class="foto-info-desc">{{ photos[fotoModal.idx].description }}</div>
              </div>
            </div>
            <div class="foto-social-links">
              <span class="foto-social-label">Bagikan:</span>
              <a :href="photos[fotoModal.idx].instagram" target="_blank" class="foto-social-btn foto-ig">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
                Instagram
              </a>
              <a :href="photos[fotoModal.idx].facebook" target="_blank" class="foto-social-btn foto-fb">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                Facebook
              </a>
              <a :href="photos[fotoModal.idx].twitter" target="_blank" class="foto-social-btn foto-tw">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                X
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    </Teleport>

    <!-- ═══ VIDEO MODAL ═══ -->
    <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="videoModal.open" class="vmod-overlay">
        <div class="vmod-topbar">
          <div class="vmod-brand">
            <div class="vmod-brand-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
            </div>
            <span>BRI Official</span>
          </div>
          <button class="vmod-close" @click="closeVideoModal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="vmod-body">
          <div class="vmod-main" data-lenis-prevent>
            <div class="vmod-player">
              <iframe
                :src="`https://www.youtube.com/embed/${videos[videoModal.idx].ytId.trim()}?autoplay=1&rel=0&modestbranding=1`"
                :title="videos[videoModal.idx].title"
                allowfullscreen allow="autoplay; encrypted-media"
                referrerpolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
            <div class="vmod-info">
              <div class="vmod-channel-row">
                <div class="vmod-avatar">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                </div>
                <div>
                  <div class="vmod-channel-name">BRI Official</div>
                  <div class="vmod-channel-sub">Kanal Resmi Bank BRI</div>
                </div>
                <button class="vmod-subscribe">Subscribe</button>
              </div>
              <h2 class="vmod-title">{{ videos[videoModal.idx].title }}</h2>
              <div class="vmod-tags">
                <span v-for="tag in videos[videoModal.idx].tags" :key="tag" class="vmod-tag">#{{ tag }}</span>
              </div>
              <div class="vmod-desc"><p>{{ videos[videoModal.idx].description }}</p></div>
            </div>
          </div>
          <div class="vmod-sidebar" data-lenis-prevent>
            <div class="vmod-sidebar-label">Video Lainnya</div>
            <template v-for="(vid, i) in videos" :key="i">
              <div v-if="i !== videoModal.idx" class="vmod-suggestion" @click="videoModal.idx = i">
                <div class="vmod-sug-thumb">
                  <img :src="`https://img.youtube.com/vi/${vid.ytId.trim()}/mqdefault.jpg`" :alt="vid.title" @error="onThumbError($event, i)" />
                  <div class="vmod-sug-play">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                  </div>
                </div>
                <div class="vmod-sug-info">
                  <p class="vmod-sug-title">{{ vid.title }}</p>
                  <span class="vmod-sug-meta">{{ vid.meta }}</span>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TheNavbar from '@/components/TheNavbar.vue'
import { articles, photos, videos } from '@/data/galleryData.js'

const route = useRoute()
const router = useRouter()

const validTabs = ['artikel', 'foto', 'video']
const activeTab = ref(validTabs.includes(route.params.type) ? route.params.type : 'artikel')

watch(() => route.params.type, (t) => {
  if (validTabs.includes(t)) activeTab.value = t
})

function setTab(tab) {
  activeTab.value = tab
  router.replace({ params: { type: tab } })
}

// Artikel modal
const artikelModal = reactive({ open: false, idx: 0 })
function openArtikel(idx) {
  artikelModal.idx = idx
  artikelModal.open = true
  document.body.style.overflow = 'hidden'
}
function closeArtikel() {
  artikelModal.open = false
  document.body.style.overflow = ''
}
function relatedArticles(currentIdx) {
  return articles
    .map((art, i) => ({ ...art, originalIdx: i }))
    .filter((_, i) => i !== currentIdx)
    .slice(0, 3)
}

// Foto lightbox
const fotoModal = reactive({ open: false, idx: 0 })
const fotoOverlayRef = ref(null)
function openFoto(idx) {
  fotoModal.idx = idx
  fotoModal.open = true
  document.body.style.overflow = 'hidden'
  nextTick(() => fotoOverlayRef.value?.focus())
}
function closeFoto() {
  fotoModal.open = false
  document.body.style.overflow = ''
}
function prevFoto() { fotoModal.idx = (fotoModal.idx - 1 + photos.length) % photos.length }
function nextFoto() { fotoModal.idx = (fotoModal.idx + 1) % photos.length }

// Video modal
const videoModal = reactive({ open: false, idx: 0 })
function openVideoModal(idx) {
  videoModal.idx = idx
  videoModal.open = true
  document.body.style.overflow = 'hidden'
}
function closeVideoModal() {
  videoModal.open = false
  document.body.style.overflow = ''
}

function onThumbError(e, idx) {
  e.target.src = `https://img.youtube.com/vi/${videos[idx].ytId.trim()}/hqdefault.jpg`
}

// Keyboard navigation
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => {
    if (fotoModal.open) {
      if (e.key === 'ArrowLeft') prevFoto()
      if (e.key === 'ArrowRight') nextFoto()
      if (e.key === 'Escape') closeFoto()
    }
    if (artikelModal.open && e.key === 'Escape') closeArtikel()
    if (videoModal.open && e.key === 'Escape') closeVideoModal()
  })
}
</script>

<style scoped>
.gallery-page {
  min-height: 100vh;
  background: #eef3fc;
  display: flex;
  flex-direction: column;
}

/* ── HERO ── */
.gpage-hero {
  position: relative;
  padding: 120px 0 0;
  overflow: hidden;
}
.gpage-hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #003F88 0%, #0057b8 60%, #0068d6 100%);
  z-index: 0;
}
.gpage-hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 50%),
    radial-gradient(circle at 10% 80%, rgba(255,255,255,0.04) 0%, transparent 40%);
}
.gpage-hero-inner {
  position: relative;
  z-index: 1;
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 32px;
}
.gpage-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  color: rgba(255,255,255,0.60);
  margin-bottom: 18px;
}
.gpage-bc-link {
  color: rgba(255,255,255,0.60);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.18s;
}
.gpage-bc-link:hover { color: rgba(255,255,255,0.90); }
.gpage-title {
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.03em;
  margin: 0 0 10px;
  line-height: 1.15;
}
.gpage-title-accent { color: #F5A623; }
.gpage-subtitle {
  font-size: 15px;
  color: rgba(255,255,255,0.72);
  margin: 0 0 32px;
  max-width: 480px;
  line-height: 1.6;
}

/* ── TABS ── */
.gpage-tabs {
  display: flex;
  gap: 4px;
}
.gpage-tab {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 11px 22px;
  border-radius: 12px 12px 0 0;
  font-size: 14px;
  font-weight: 600;
  color: rgba(255,255,255,0.65);
  background: rgba(255,255,255,0.10);
  border: none;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.gpage-tab:hover { background: rgba(255,255,255,0.16); color: #fff; }
.gpage-tab.active {
  background: #eef3fc;
  color: #003F88;
  font-weight: 700;
}
.gpage-tab-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: rgba(255,255,255,0.20);
  border-radius: 10px;
  font-size: 11px;
  font-weight: 700;
}
.gpage-tab.active .gpage-tab-count {
  background: rgba(0,63,136,0.12);
  color: #003F88;
}

/* ── CONTENT ── */
.gpage-content {
  flex: 1;
  max-width: 1160px;
  margin: 0 auto;
  width: 100%;
  padding: 36px 32px 48px;
}
.gpage-section { animation: fadeUp 0.35s ease both; }
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── ARTIKEL GRID ── */
.gpage-artikel-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.gpage-art-card {
  background: rgba(255,255,255,0.88);
  border: 1.5px solid rgba(0,63,136,0.10);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.28s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s, border-color 0.22s;
  display: flex;
  flex-direction: column;
}
.gpage-art-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(0,63,136,0.14);
  border-color: rgba(0,87,184,0.30);
}
.gpage-art-img {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}
.gpage-art-img img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.5s ease;
}
.gpage-art-card:hover .gpage-art-img img { transform: scale(1.05); }
.gpage-art-img-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(5,14,30,0.50) 0%, transparent 60%);
}
.gpage-art-badge {
  position: absolute;
  top: 12px; left: 12px;
  background: rgba(0,87,184,0.90);
  color: #fff;
  font-size: 10.5px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  letter-spacing: 0.04em;
}
.gpage-art-body {
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}
.gpage-art-time {
  font-size: 11px;
  font-weight: 600;
  color: rgba(10,22,40,0.50);
  letter-spacing: 0.04em;
}
.gpage-art-title {
  font-size: 14.5px;
  font-weight: 700;
  color: rgba(10,22,40,0.90);
  line-height: 1.4;
  letter-spacing: -0.015em;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.gpage-art-excerpt {
  font-size: 13px;
  color: rgba(10,22,40,0.60);
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}
.gpage-art-cta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 700;
  color: #0057b8;
  margin-top: 4px;
}

/* ── FOTO GRID ── */
.gpage-foto-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
.gpage-foto-item {
  position: relative;
  aspect-ratio: 4/3;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
}
.gpage-foto-item img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.5s ease;
}
.gpage-foto-item:hover img { transform: scale(1.06); }
.gpage-foto-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,20,60,0.72) 0%, rgba(0,20,60,0.10) 55%, transparent 100%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  padding: 12px;
  opacity: 0;
  transition: opacity 0.25s;
}
.gpage-foto-item:hover .gpage-foto-overlay { opacity: 1; }
.gpage-foto-expand {
  width: 32px; height: 32px;
  background: rgba(255,255,255,0.18);
  border: 1px solid rgba(255,255,255,0.30);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  color: #fff;
}
.gpage-foto-label {
  align-self: flex-start;
  font-size: 12.5px;
  font-weight: 600;
  color: rgba(255,255,255,0.92);
  text-shadow: 0 1px 4px rgba(0,0,0,0.40);
}

/* ── VIDEO GRID ── */
.gpage-video-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.gpage-vid-card {
  background: rgba(255,255,255,0.88);
  border: 1.5px solid rgba(0,63,136,0.10);
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  gap: 0;
  flex-direction: column;
  transition: transform 0.28s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s, border-color 0.22s;
}
.gpage-vid-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0,63,136,0.13);
  border-color: rgba(0,87,184,0.28);
}
.gpage-vid-thumb {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  background: #0a1628;
}
.gpage-vid-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.gpage-vid-card:hover .gpage-vid-thumb img { transform: scale(1.04); }
.gpage-vid-overlay {
  position: absolute; inset: 0;
  background: rgba(0,20,60,0.30);
  display: flex; align-items: center; justify-content: center;
  transition: background 0.25s;
}
.gpage-vid-card:hover .gpage-vid-overlay { background: rgba(0,20,60,0.45); }
.gpage-vid-play {
  width: 52px; height: 52px;
  background: rgba(255,255,255,0.92);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #0057b8;
  transition: transform 0.25s;
}
.gpage-vid-card:hover .gpage-vid-play { transform: scale(1.1); }
.gpage-vid-body {
  padding: 14px 16px;
  display: flex;
  gap: 14px;
  align-items: flex-start;
}
.gpage-vid-num {
  font-size: 24px;
  font-weight: 800;
  color: rgba(0,63,136,0.15);
  letter-spacing: -0.05em;
  line-height: 1;
  flex-shrink: 0;
  padding-top: 2px;
}
.gpage-vid-title {
  font-size: 14px;
  font-weight: 700;
  color: rgba(10,22,40,0.88);
  line-height: 1.4;
  margin-bottom: 4px;
}
.gpage-vid-meta {
  font-size: 11.5px;
  color: rgba(10,22,40,0.50);
  margin-bottom: 6px;
}
.gpage-vid-tags { display: flex; flex-wrap: wrap; gap: 4px; }
.gpage-vid-tag {
  font-size: 10.5px;
  font-weight: 600;
  color: #0057b8;
  background: rgba(0,87,184,0.08);
  border-radius: 20px;
  padding: 2px 8px;
}

/* ── FOOTER ── */
.gpage-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  border-top: 1px solid rgba(0,63,136,0.10);
  background: rgba(255,255,255,0.60);
}
.gpage-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 18px;
  border: 1.5px solid rgba(0,63,136,0.20);
  border-radius: 10px;
  background: transparent;
  color: #003F88;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}
.gpage-back-btn:hover { background: rgba(0,63,136,0.07); border-color: rgba(0,63,136,0.35); }
.gpage-footer-copy {
  font-size: 12px;
  color: rgba(10,22,40,0.40);
}

/* Responsive */
@media (max-width: 1024px) {
  .gpage-artikel-grid { grid-template-columns: repeat(2, 1fr); }
  .gpage-foto-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 768px) {
  .gpage-hero-inner { padding: 0 20px; }
  .gpage-content { padding: 24px 20px 36px; }
  .gpage-artikel-grid { grid-template-columns: 1fr; }
  .gpage-foto-grid { grid-template-columns: repeat(2, 1fr); }
  .gpage-video-grid { grid-template-columns: 1fr; }
  .gpage-footer { flex-direction: column; gap: 12px; text-align: center; }
}

/* ═══ SHARED MODAL STYLES (duplicated from GallerySection) ═══ */
.modal-fade-enter-active { transition: opacity 0.22s ease; }
.modal-fade-leave-active { transition: opacity 0.18s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

/* Artikel modal */
.artikel-modal-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(238,243,252,0.97);
  backdrop-filter: blur(20px);
  overflow-y: auto;
}
.screen-close-btn {
  position: fixed; top: 18px; right: 22px; z-index: 10001;
  width: 40px; height: 40px; border-radius: 50%;
  background: rgba(0,63,136,0.09); border: 1.5px solid rgba(0,63,136,0.18);
  color: rgba(10,22,40,0.60); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s;
}
.screen-close-btn:hover { background: rgba(0,63,136,0.16); }
.artikel-modal-scroll { max-width: 720px; margin: 0 auto; padding: 60px 24px 80px; }
.news-article { font-family: inherit; }
.news-category-badge {
  display: inline-block; margin-bottom: 14px;
  background: rgba(0,87,184,0.10); color: #0057b8;
  font-size: 11px; font-weight: 700; letter-spacing: 0.06em;
  padding: 4px 12px; border-radius: 20px; border: 1px solid rgba(0,87,184,0.20);
}
.news-headline {
  font-size: clamp(20px, 3.5vw, 30px); font-weight: 800;
  color: rgba(10,22,40,0.93); line-height: 1.25; letter-spacing: -0.025em;
  margin: 0 0 16px;
}
.news-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 18px; }
.news-author, .news-date, .news-read-time {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 12.5px; color: rgba(10,22,40,0.55);
}
.news-dot { color: rgba(10,22,40,0.30); }
.news-divider { height: 1px; background: rgba(0,63,136,0.10); margin: 18px 0 24px; }
.news-figure { margin: 0 0 28px; }
.news-hero-img { width: 100%; border-radius: 14px; display: block; }
.news-figure figcaption { font-size: 11.5px; color: rgba(10,22,40,0.45); text-align: center; margin-top: 8px; }
.news-body { font-size: 15.5px; line-height: 1.8; color: rgba(10,22,40,0.80); }

/* Foto lightbox */
.foto-modal-overlay {
  position: fixed; inset: 0; z-index: 9998;
  background: rgba(5,12,28,0.94);
  display: flex; flex-direction: column; outline: none;
}
.foto-close-btn {
  position: absolute; top: 16px; right: 20px; z-index: 10;
  width: 38px; height: 38px; border-radius: 50%;
  background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.20);
  color: rgba(255,255,255,0.80); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
}
.foto-counter {
  position: absolute; top: 20px; left: 50%; transform: translateX(-50%);
  font-size: 12.5px; font-weight: 600; color: rgba(255,255,255,0.60);
  background: rgba(255,255,255,0.10); padding: 4px 14px; border-radius: 20px;
}
.foto-nav {
  position: absolute; top: 50%; transform: translateY(-50%); z-index: 10;
  width: 44px; height: 44px; border-radius: 50%;
  background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.20);
  color: rgba(255,255,255,0.80); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s;
}
.foto-nav:hover { background: rgba(255,255,255,0.22); }
.foto-nav-left { left: 20px; }
.foto-nav-right { right: 20px; }
.foto-modal-stage {
  flex: 1; display: flex; align-items: center; justify-content: center; padding: 60px 80px 140px;
}
.foto-modal-img { max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 8px; }
.foto-slide-enter-active, .foto-slide-leave-active { transition: opacity 0.2s; }
.foto-slide-enter-from, .foto-slide-leave-to { opacity: 0; }
.foto-info-panel {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: linear-gradient(to top, rgba(5,12,28,0.92) 0%, rgba(5,12,28,0.50) 70%, transparent 100%);
  padding: 24px 24px 20px;
}
.foto-info-main { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.foto-info-left { display: flex; align-items: flex-start; gap: 12px; }
.foto-info-icon { width: 36px; height: 36px; border-radius: 8px; background: rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.70); flex-shrink: 0; }
.foto-info-title { font-size: 14.5px; font-weight: 700; color: #fff; margin-bottom: 3px; }
.foto-info-desc { font-size: 12.5px; color: rgba(255,255,255,0.60); line-height: 1.5; }
.foto-social-links { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.foto-social-label { font-size: 11.5px; color: rgba(255,255,255,0.50); }
.foto-social-btn {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 6px 12px; border-radius: 8px;
  font-size: 12px; font-weight: 600; text-decoration: none;
  transition: opacity 0.2s;
}
.foto-social-btn:hover { opacity: 0.80; }
.foto-ig { background: linear-gradient(135deg,#e1306c,#833ab4); color: #fff; }
.foto-fb { background: #1877f2; color: #fff; }
.foto-tw { background: #000; color: #fff; }

/* Video modal */
.vmod-overlay { position: fixed; inset: 0; z-index: 9999; background: #0a0e1a; display: flex; flex-direction: column; }
.vmod-topbar { display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; background: rgba(255,255,255,0.04); border-bottom: 1px solid rgba(255,255,255,0.07); flex-shrink: 0; }
.vmod-brand { display: flex; align-items: center; gap: 9px; font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.88); }
.vmod-brand-icon { width: 30px; height: 30px; border-radius: 6px; background: rgba(204,0,0,0.20); border: 1px solid rgba(204,0,0,0.30); display: flex; align-items: center; justify-content: center; color: #cc0000; }
.vmod-close { width: 34px; height: 34px; border-radius: 8px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.70); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
.vmod-close:hover { background: rgba(255,255,255,0.14); }
.vmod-body { flex: 1; display: flex; overflow: hidden; }
.vmod-main { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 20px; }
.vmod-player { width: 100%; aspect-ratio: 16/9; background: #000; border-radius: 10px; overflow: hidden; }
.vmod-player iframe { width: 100%; height: 100%; border: none; display: block; }
.vmod-info { padding: 0 4px; }
.vmod-channel-row { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
.vmod-avatar { width: 38px; height: 38px; border-radius: 50%; background: rgba(204,0,0,0.20); border: 1px solid rgba(204,0,0,0.30); display: flex; align-items: center; justify-content: center; color: #cc0000; flex-shrink: 0; }
.vmod-channel-name { font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.88); }
.vmod-channel-sub { font-size: 11.5px; color: rgba(255,255,255,0.45); }
.vmod-subscribe { margin-left: auto; padding: 7px 14px; background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.18); border-radius: 20px; color: rgba(255,255,255,0.80); font-size: 12.5px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
.vmod-subscribe:hover { background: rgba(255,255,255,0.16); }
.vmod-title { font-size: 17px; font-weight: 700; color: rgba(255,255,255,0.92); line-height: 1.4; margin: 0 0 12px; }
.vmod-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
.vmod-tag { font-size: 12px; font-weight: 600; color: #60a5fa; }
.vmod-desc { font-size: 13.5px; color: rgba(255,255,255,0.55); line-height: 1.7; }
.vmod-sidebar { width: 300px; flex-shrink: 0; border-left: 1px solid rgba(255,255,255,0.06); overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 4px; }
.vmod-sidebar-label { font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.40); letter-spacing: 0.06em; margin-bottom: 10px; }
.vmod-suggestion { display: flex; gap: 10px; padding: 10px; border-radius: 10px; cursor: pointer; transition: background 0.18s; }
.vmod-suggestion:hover { background: rgba(255,255,255,0.06); }
.vmod-sug-thumb { position: relative; width: 108px; height: 62px; border-radius: 6px; overflow: hidden; flex-shrink: 0; background: #0a1628; }
.vmod-sug-thumb img { width: 100%; height: 100%; object-fit: cover; }
.vmod-sug-play { position: absolute; inset: 0; background: rgba(0,0,0,0.30); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.80); }
.vmod-sug-info { flex: 1; }
.vmod-sug-title { font-size: 12.5px; font-weight: 600; color: rgba(255,255,255,0.82); line-height: 1.4; margin: 0 0 4px; display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.vmod-sug-meta { font-size: 11px; color: rgba(255,255,255,0.40); }

/* Shared: artikel related */
.related-articles { margin-top: 48px; padding-top: 32px; border-top: 1px solid rgba(0,63,136,0.10); }
.related-title { font-size: 18px; font-weight: 700; color: rgba(10,22,40,0.88); margin: 0 0 20px; }
.related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.related-item { border-radius: 12px; overflow: hidden; background: rgba(255,255,255,0.80); border: 1.5px solid rgba(0,63,136,0.08); cursor: pointer; transition: transform 0.25s; }
.related-item:hover { transform: translateY(-3px); }
.related-img-wrap { aspect-ratio: 16/9; overflow: hidden; }
.related-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
.related-body { padding: 12px 14px; display: flex; flex-direction: column; gap: 6px; }
.related-item-title { font-size: 13.5px; font-weight: 700; color: rgba(10,22,40,0.88); line-height: 1.4; margin: 0; }
.related-read-link { font-size: 12px; font-weight: 600; color: #0057b8; }
.artikel-time { font-size: 11px; font-weight: 600; color: rgba(10,22,40,0.50); letter-spacing: 0.04em; }
</style>
