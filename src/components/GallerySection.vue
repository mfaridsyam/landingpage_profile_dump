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

      <!-- ─── ARTIKEL ─── -->
      <div v-show="tab === 'artikel'">
        <div class="artikel-layout">
          <div class="artikel-featured reveal" @click="openArtikel(0)">
            <div class="artikel-featured-img-wrap">
              <img :src="articles[0].img" :alt="articles[0].label" />
              <div class="artikel-featured-overlay"></div>
            </div>
            <div class="artikel-featured-body">
              <div class="artikel-cat-badge">{{ articles[0].category }}</div>
              <span class="artikel-time">{{ articles[0].time }}</span>
              <h3 class="artikel-featured-title">{{ articles[0].label }}</h3>
              <p class="artikel-featured-excerpt">{{ articles[0].excerpt }}</p>
            </div>
          </div>
          <div class="artikel-side-col">
            <div v-for="(art, i) in articles.slice(1, 3)" :key="art.label"
              class="artikel-side-item reveal" :class="`reveal-delay-${i+1}`"
              @click="openArtikel(i+1)">
              <div class="artikel-side-img-wrap"><img :src="art.img" :alt="art.label" /></div>
              <div class="artikel-side-body">
                <div class="artikel-cat-badge artikel-cat-badge--sm">{{ art.category }}</div>
                <p class="artikel-side-title">{{ art.label }}</p>
                <span class="artikel-time">{{ art.time }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="artikel-list-rows reveal">
          <div v-for="(art, i) in articles.slice(3, 6)" :key="art.label"
            class="artikel-row-item"
            @click="openArtikel(i+3)">
            <div class="artikel-row-thumb">
              <img :src="art.img" :alt="art.label" />
            </div>
            <div class="artikel-row-body">
              <div class="artikel-cat-badge artikel-cat-badge--sm">{{ art.category }}</div>
              <p class="artikel-row-title">{{ art.label }}</p>
            </div>
            <div class="artikel-row-meta">
              <span class="artikel-time">{{ art.time }}</span>
              <svg class="artikel-row-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          </div>
        </div>
        <div class="load-more-wrap reveal">
          <button class="btn-load-more" @click="openMoreModal('artikel')">
            <span>Lihat Semua Artikel</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </div>

      <!-- ─── FOTO ─── -->
      <div v-show="tab === 'foto'">
        <div class="foto-grid">
          <div v-for="(photo, i) in photos" :key="i"
            class="foto-grid-item reveal" :class="i > 0 ? `reveal-delay-${i % 3}` : ''"
            @click="openFoto(i)">
            <img :src="photo.img" :alt="photo.label" />
            <div class="foto-grid-overlay">
              <span class="foto-grid-label">{{ photo.label }}</span>
            </div>
          </div>
        </div>
        <div class="load-more-wrap reveal">
          <button class="btn-load-more" @click="openMoreModal('foto')">
            <span>Lihat Semua Foto</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </div>

      <!-- ─── VIDEO ─── -->
      <div v-show="tab === 'video'">
        <div class="video-layout">
          <!-- Featured video (large) -->
          <div class="video-featured reveal"
            @mouseenter="videoHover = true"
            @mouseleave="videoHover = false"
            @click="openVideoModal()">
            <div class="video-thumb-wrap">
              <img :src="`https://img.youtube.com/vi/${videos[videoOrder[0]].ytId.trim()}/maxresdefault.jpg`"
                :alt="videos[videoOrder[0]].title"
                @error="onThumbError($event, videoOrder[0])" />
              <div class="video-featured-overlay"></div>
              <div class="video-play-center" :class="{ visible: videoHover }">
                <div class="video-play-circle">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                </div>
              </div>
            </div>
            <div class="video-featured-info">
              <div class="video-badge">Video Terbaru</div>
              <div class="video-featured-title">{{ videos[videoOrder[0]].title }}</div>
              <div class="video-meta">{{ videos[videoOrder[0]].meta }}</div>
            </div>
          </div>

          <!-- Sidebar videos -->
          <div class="video-side-list">
            <div v-for="(orderIdx, pos) in videoOrder.slice(1)" :key="orderIdx"
              class="video-side-item"
              @click="swapToFeatured(pos + 1)">
              <div class="video-side-thumb">
                <img :src="`https://img.youtube.com/vi/${videos[orderIdx].ytId.trim()}/mqdefault.jpg`"
                  :alt="videos[orderIdx].title"
                  @error="onThumbError($event, orderIdx)" />
                <div class="video-side-play-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                </div>
              </div>
              <div class="video-side-info">
                <div class="video-side-title">{{ videos[orderIdx].title }}</div>
                <div class="video-meta">{{ videos[orderIdx].meta }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="load-more-wrap reveal">
          <button class="btn-load-more" @click="openMoreModal('video')">
            <span>Lihat Semua Video</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════
         ARTIKEL MODAL (full-screen reader)
         ═══════════════════════════════════ -->
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

          <!-- Related Articles -->
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

    <!-- ═══════════════════════════════════
         FOTO LIGHTBOX (modern)
         ═══════════════════════════════════ -->
    <Transition name="modal-fade">
      <div v-if="fotoModal.open" class="foto-modal-overlay" @keydown.left="prevFoto" @keydown.right="nextFoto" @keydown.escape="closeFoto" tabindex="0" ref="fotoOverlayRef">
        <button class="foto-close-btn" @click="closeFoto">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <!-- Counter -->
        <div class="foto-counter">{{ fotoModal.idx + 1 }} / {{ photos.length }}</div>

        <!-- Nav arrows -->
        <button class="foto-nav foto-nav-left" @click="prevFoto">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button class="foto-nav foto-nav-right" @click="nextFoto">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>

        <!-- Image area -->
        <div class="foto-modal-stage" @click.self="closeFoto">
          <Transition name="foto-slide" mode="out-in">
            <img :key="fotoModal.idx" :src="photos[fotoModal.idx].img" :alt="photos[fotoModal.idx].label" class="foto-modal-img" />
          </Transition>
        </div>

        <!-- Info panel (slide up) -->
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
              <a :href="photos[fotoModal.idx].instagram" target="_blank" class="foto-social-btn foto-ig" title="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
                Instagram
              </a>
              <a :href="photos[fotoModal.idx].facebook" target="_blank" class="foto-social-btn foto-fb" title="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                Facebook
              </a>
              <a :href="photos[fotoModal.idx].twitter" target="_blank" class="foto-social-btn foto-tw" title="X / Twitter">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                X
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ═══════════════════════════════════
         VIDEO MODAL (YouTube-like fullscreen)
         ═══════════════════════════════════ -->
    <Transition name="modal-fade">
      <div v-if="videoModal.open" class="video-modal-overlay">
        <!-- Top bar -->
        <div class="video-modal-topbar">
          <div class="video-modal-channel-mini">
            <div class="video-modal-channel-avatar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
            </div>
            <span class="video-modal-topbar-title">BRI Official</span>
          </div>
          <button class="video-modal-close" @click="closeVideoModal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <!-- Body: player left + sidebar right -->
        <div class="video-modal-body">
          <div class="video-modal-left" data-lenis-prevent>
            <div class="video-modal-player-wrap">
              <iframe
                :src="`https://www.youtube.com/embed/${videos[videoModal.idx].ytId.trim()}?autoplay=1&rel=0&modestbranding=1`"
                :title="videos[videoModal.idx].title"
                allowfullscreen
                allow="autoplay; encrypted-media"
                referrerpolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
            <div class="video-modal-info">
              <div class="video-modal-channel">
                <div class="video-modal-channel-avatar">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                </div>
                <div>
                  <div class="video-modal-channel-name">BRI Official</div>
                  <div class="video-modal-channel-sub">Kanal Resmi Bank BRI</div>
                </div>
                <button class="video-modal-subscribe">Subscribe</button>
              </div>
              <h3 class="video-modal-title">{{ videos[videoModal.idx].title }}</h3>
              <div class="video-modal-tags">
                <span v-for="tag in videos[videoModal.idx].tags" :key="tag" class="video-tag">#{{ tag }}</span>
              </div>
              <div class="video-modal-desc-box">
                <p class="video-modal-desc">{{ videos[videoModal.idx].description }}</p>
              </div>
            </div>
          </div>

          <!-- Sidebar suggestions -->
          <div class="video-modal-sidebar" data-lenis-prevent>
            <div class="video-sidebar-label">Video Lainnya</div>
            <template v-for="(vid, i) in videos" :key="i">
              <div v-if="i !== videoModal.idx" class="video-suggestion" @click="videoModal.idx = i">
                <div class="video-suggestion-thumb">
                  <img :src="`https://img.youtube.com/vi/${vid.ytId.trim()}/mqdefault.jpg`" :alt="vid.title"
                    @error="onThumbError($event, i)" />
                  <div class="video-suggestion-play">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                  </div>
                </div>
                <div class="video-suggestion-info">
                  <p class="video-suggestion-title">{{ vid.title }}</p>
                  <span class="video-suggestion-meta">{{ vid.meta }}</span>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ═══════════════════════════════════
         TAMPILKAN LAINNYA MODAL
         ═══════════════════════════════════ -->
    <Transition name="modal-fade">
      <div v-if="showModal" class="more-modal-overlay" :class="{'more-fullscreen': modalType==='foto'}" @click.self="closeMoreModal()">
        <div class="more-modal-box" :class="{'more-fullscreen-box': modalType==='foto'}" data-lenis-prevent>
          <div class="more-modal-header">
            <div class="more-modal-title">
              <svg v-if="modalType==='artikel'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              <svg v-else-if="modalType==='foto'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
              Semua {{ modalType === 'artikel' ? 'Artikel' : modalType === 'foto' ? 'Foto' : 'Video' }}
            </div>
            <button class="more-modal-close" @click="closeMoreModal()">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div v-if="modalType==='artikel'" class="more-modal-scroll" data-lenis-prevent>
            <div class="more-artikel-list">
              <div v-for="(art, i) in [...articles, ...articles]" :key="i"
                class="more-artikel-row" @click="closeMoreModal(); openArtikel(i % articles.length)">
                <div class="more-artikel-row-thumb">
                  <img :src="art.img" :alt="art.label" />
                </div>
                <div class="more-artikel-row-body">
                  <div class="artikel-cat-badge artikel-cat-badge--sm">{{ art.category }}</div>
                  <p class="more-artikel-row-title">{{ art.label }}</p>
                </div>
                <div class="more-artikel-row-right">
                  <span class="artikel-time">{{ art.time }}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="more-artikel-row-arrow"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="modalType==='foto'" class="more-modal-scroll" data-lenis-prevent>
            <div class="more-foto-grid">
              <div v-for="(photo, i) in [...photos, ...photos]" :key="i"
                class="more-foto-item" @click="closeMoreModal(); openFoto(i % photos.length)">
                <img :src="photo.img" :alt="photo.label" />
                <div class="more-foto-overlay"><span>{{ photo.label }}</span></div>
              </div>
            </div>
          </div>
          <div v-else class="more-modal-scroll" data-lenis-prevent>
            <div class="more-artikel-list">
              <div v-for="(vid, i) in [...videos, ...videos]" :key="i"
                class="more-artikel-row" @click="closeMoreModal(); openVideoModalDirect(i % videos.length)">
                <div class="more-artikel-row-thumb more-video-row-thumb">
                  <img :src="`https://img.youtube.com/vi/${vid.ytId.trim()}/mqdefault.jpg`" :alt="vid.title" />
                  <div class="more-video-row-play">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                  </div>
                </div>
                <div class="more-artikel-row-body">
                  <div class="artikel-cat-badge artikel-cat-badge--sm">Video</div>
                  <p class="more-artikel-row-title">{{ vid.title }}</p>
                </div>
                <div class="more-artikel-row-right">
                  <span class="artikel-time">{{ vid.meta }}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="more-artikel-row-arrow"><polyline points="9 18 15 12 9 6"/></svg>
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
import { lenis } from '@/lenis.js'

const tab = ref('artikel')
const showModal = ref(false)
const modalType = ref('artikel')
const videoHover = ref(false)
const fotoOverlayRef = ref(null)

const artikelModal = reactive({ open: false, idx: 0 })
const fotoModal = reactive({ open: false, idx: 0 })
const videoModal = reactive({ open: false, idx: 0 })

// Video ordering — index 0 is always featured
const videoOrder = ref([0, 1, 2, 3])

function swapToFeatured(pos) {
  const order = [...videoOrder.value]
  ;[order[0], order[pos]] = [order[pos], order[0]]
  videoOrder.value = order
}

function openArtikel(idx) {
  artikelModal.idx = idx
  artikelModal.open = true
  document.body.style.overflow = 'hidden'
  lenis.stop()
}
function closeArtikel() {
  artikelModal.open = false
  document.body.style.overflow = ''
  lenis.start()
}

function openFoto(idx) {
  fotoModal.idx = idx
  fotoModal.open = true
  document.body.style.overflow = 'hidden'
  lenis.stop()
  nextTick(() => fotoOverlayRef.value?.focus())
}
function closeFoto() {
  fotoModal.open = false
  document.body.style.overflow = ''
  lenis.start()
}
function prevFoto() {
  fotoModal.idx = (fotoModal.idx - 1 + photos.length) % photos.length
}
function nextFoto() {
  fotoModal.idx = (fotoModal.idx + 1) % photos.length
}

function openVideoModal() {
  videoModal.idx = videoOrder.value[0]
  videoModal.open = true
  document.body.style.overflow = 'hidden'
  lenis.stop()
}
function openVideoModalDirect(idx) {
  videoModal.idx = idx
  videoModal.open = true
  document.body.style.overflow = 'hidden'
  lenis.stop()
}
function closeVideoModal() {
  videoModal.open = false
  document.body.style.overflow = ''
  lenis.start()
}

function openMoreModal(type) {
  modalType.value = type
  showModal.value = true
  document.body.style.overflow = 'hidden'
  lenis.stop()
}
function closeMoreModal() {
  showModal.value = false
  document.body.style.overflow = ''
  lenis.start()
}

function onThumbError(e, idx) {
  e.target.src = `https://img.youtube.com/vi/${videos[idx].ytId.trim()}/hqdefault.jpg`
}

function relatedArticles(currentIdx) {
  return articles
    .map((art, i) => ({ ...art, originalIdx: i }))
    .filter((_, i) => i !== currentIdx)
    .slice(0, 3)
}

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => {
    if (fotoModal.open) {
      if (e.key === 'ArrowLeft') prevFoto()
      if (e.key === 'ArrowRight') nextFoto()
      if (e.key === 'Escape') closeFoto()
    }
    if (artikelModal.open && e.key === 'Escape') closeArtikel()
    if (videoModal.open && e.key === 'Escape') closeVideoModal()
    if (showModal.value && e.key === 'Escape') closeMoreModal()
  })
}

const articles = [
  {
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80',
    label: 'BRI Dorong UMKM Polewali Naik Kelas Lewat Program KUR 2026',
    time: '30 menit lalu',
    category: 'Program KUR',
    excerpt: 'BRI terus berkomitmen mendorong pertumbuhan ekonomi masyarakat Polewali Mandar melalui program KUR yang menjangkau ribuan pelaku usaha kecil di seluruh pelosok Sulawesi Barat...',
    body: `<p class="news-lead">BRI terus berkomitmen mendorong pertumbuhan ekonomi masyarakat Polewali Mandar melalui program KUR yang menjangkau ribuan pelaku usaha kecil di seluruh pelosok Sulawesi Barat.</p>
<p>Dengan jaringan yang luas dan layanan digital yang semakin canggih, BRI hadir untuk melayani setiap kebutuhan perbankan masyarakat setempat. Mulai dari petani di pelosok desa hingga pelaku UMKM perkotaan, semua dapat mengakses layanan perbankan yang terpercaya dan terjangkau tanpa perlu menempuh perjalanan jauh ke kota.</p>
<h2 class="news-subheading">Ekspansi KUR ke Pelosok Sulawesi Barat</h2>
<p>Program Kredit Usaha Rakyat (KUR) yang dijalankan BRI Cabang Polewali telah berhasil menjangkau lebih dari 12.000 pelaku UMKM di seluruh wilayah Polewali Mandar. Total penyaluran KUR pada semester pertama 2026 mencapai Rp 1,2 triliun, meningkat 34% dibanding periode yang sama tahun sebelumnya.</p>
<p>Sektor pertanian, peternakan, dan perikanan mendominasi penerima KUR dengan porsi mencapai 62% dari total penyaluran. Hal ini sejalan dengan karakteristik perekonomian masyarakat Polewali Mandar yang sebagian besar bertumpu pada sektor primer. BRI secara aktif memberikan pendampingan bisnis kepada penerima KUR agar dana yang disalurkan benar-benar produktif dan mampu meningkatkan kapasitas usaha mereka.</p>
<blockquote class="news-quote">"Kami hadir bukan hanya sebagai bank, tetapi sebagai mitra tumbuh bagi seluruh masyarakat Polewali Mandar. Setiap rupiah yang kami salurkan adalah investasi bagi masa depan daerah ini."</blockquote>
<h2 class="news-subheading">Digitalisasi UMKM Lokal</h2>
<p>Selain penyaluran kredit, BRI juga aktif mendampingi para pelaku UMKM dalam proses digitalisasi usaha mereka. Program BRI UMKM EXPO dan pelatihan digital marketing rutin digelar di berbagai kecamatan, membantu pengusaha kecil memanfaatkan platform e-commerce dan media sosial untuk memperluas jangkauan pasar mereka.</p>
<p>Salah satu kisah sukses datang dari Ibu Nurhaeda, pemilik usaha tenun tradisional Mandar di Kecamatan Tinambung. Dengan modal KUR sebesar Rp 50 juta, ia berhasil mengembangkan usahanya dan kini memasarkan kain tenun Mandar hingga ke mancanegara melalui platform digital.</p>
<h2 class="news-subheading">Outlook dan Target 2026</h2>
<p>BRI Cabang Polewali menargetkan penyaluran KUR sebesar Rp 2,5 triliun hingga akhir tahun 2026. Target tersebut didukung oleh penambahan agen BRILink di 142 titik baru di wilayah pedesaan, serta perluasan layanan BRImo yang kini dapat diakses bahkan di wilayah dengan jaringan internet terbatas melalui fitur offline transaction.</p>
<p>Dengan strategi ini, BRI optimis dapat semakin memperdalam penetrasi layanan keuangan formal di Polewali Mandar dan berkontribusi signifikan terhadap penurunan angka kemiskinan di Sulawesi Barat.</p>`
  },
  {
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
    label: 'Ekspansi Jaringan AgenBRI Jangkau Desa Terpencil di Sulbar',
    time: '1 hari lalu',
    category: 'AgenBRI',
    excerpt: 'Jaringan AgenBRI terus diperluas ke wilayah terpencil untuk menghadirkan layanan perbankan yang inklusif bagi seluruh lapisan masyarakat...',
    body: `<p class="news-lead">Jaringan AgenBRI terus diperluas ke wilayah terpencil untuk menghadirkan layanan perbankan yang inklusif bagi seluruh lapisan masyarakat di Sulawesi Barat.</p>
<p>Sebagai ujung tombak inklusi keuangan, AgenBRI hadir di warung-warung kecil, koperasi desa, dan bahkan di rumah-rumah warga yang berprofesi sebagai agen. Hingga pertengahan 2026, jumlah AgenBRI aktif di wilayah Polewali Mandar telah mencapai 3.847 titik, menjadikan hampir setiap desa memiliki akses ke layanan perbankan dasar.</p>
<h2 class="news-subheading">Layanan yang Tersedia</h2>
<p>Melalui AgenBRI, masyarakat dapat melakukan berbagai transaksi keuangan seperti setor tunai, tarik tunai, transfer, pembayaran tagihan listrik, PDAM, cicilan, hingga pembelian pulsa dan token listrik. Semua layanan ini tersedia 24 jam sehari, 7 hari seminggu, tanpa perlu antri di kantor bank.</p>
<blockquote class="news-quote">"Dengan adanya AgenBRI di desa kami, warga tidak perlu lagi menempuh perjalanan 2 jam ke kota hanya untuk bayar tagihan atau kirim uang ke keluarga."</blockquote>
<h2 class="news-subheading">Program Perekrutan Agen Baru</h2>
<p>BRI Cabang Polewali terus membuka peluang bagi warga untuk menjadi AgenBRI. Persyaratan yang mudah dan training yang komprehensif membuat program ini sangat diminati. Dalam 6 bulan terakhir, lebih dari 500 agen baru berhasil direkrut dan aktif melayani masyarakat di lingkungan mereka masing-masing.</p>
<p>Ke depan, BRI menargetkan peningkatan kualitas agen melalui program sertifikasi dan pemberian perangkat teknologi yang lebih canggih untuk mendukung kegiatan operasional agen sehari-hari.</p>`
  },
  {
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
    label: 'Program CSR BRI untuk Masyarakat Polewali Mandar',
    time: '6 hari lalu',
    category: 'CSR',
    excerpt: 'BRI hadir memberdayakan masyarakat melalui berbagai program sosial yang menyentuh langsung kehidupan warga Polewali Mandar...',
    body: `<p class="news-lead">BRI hadir memberdayakan masyarakat melalui berbagai program sosial yang menyentuh langsung kehidupan warga Polewali Mandar, mulai dari bidang pendidikan, kesehatan, hingga pelestarian lingkungan.</p>
<p>Program Tanggung Jawab Sosial dan Lingkungan (TJSL) BRI Cabang Polewali pada tahun 2026 difokuskan pada tiga pilar utama: pemberdayaan ekonomi, peningkatan kualitas pendidikan, dan pelestarian budaya lokal. Total anggaran CSR yang disalurkan mencapai Rp 4,8 miliar untuk wilayah Polewali Mandar dan sekitarnya.</p>
<h2 class="news-subheading">BRI Peduli Pendidikan</h2>
<p>Melalui program BRI Peduli, sebanyak 250 siswa berprestasi dari keluarga kurang mampu mendapatkan beasiswa pendidikan senilai total Rp 1,2 miliar. Selain itu, BRI juga membantu renovasi 8 gedung sekolah dasar di daerah pelosok yang kondisinya tidak layak pakai.</p>
<blockquote class="news-quote">"Investasi terbaik adalah investasi pada generasi penerus bangsa. BRI berkomitmen untuk terus hadir membersamai perjalanan pendidikan anak-anak di Polewali Mandar."</blockquote>
<h2 class="news-subheading">Pelestarian Budaya Mandar</h2>
<p>Menyadari pentingnya pelestarian warisan budaya, BRI turut mendukung pengembangan industri tenun Mandar yang telah diakui sebagai warisan budaya tak benda nasional. Program ini melibatkan lebih dari 300 pengrajin tenun lokal yang mendapatkan bantuan alat, modal usaha, dan akses pasar yang lebih luas.</p>
<p>BRI juga mendukung penyelenggaraan Festival Budaya Mandar Tahunan sebagai upaya memperkenalkan kekayaan budaya Sulawesi Barat kepada wisatawan nasional maupun mancanegara.</p>`
  },
  {
    img: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80',
    label: 'KUR Berhasil Berdayakan Petani Lokal di Polewali',
    time: '1 jam lalu',
    category: 'Program KUR',
    excerpt: 'Ribuan petani di Polewali berhasil meningkatkan produksi dan pendapatan berkat akses KUR yang mudah dari BRI...',
    body: `<p class="news-lead">Ribuan petani di Polewali berhasil meningkatkan produksi dan pendapatan berkat akses KUR yang mudah dari BRI, mengubah wajah pertanian lokal yang lebih modern dan berdaya saing tinggi.</p>
<p>Sektor pertanian di Polewali Mandar kini bertransformasi pesat. Dengan dukungan KUR BRI, para petani tidak hanya mampu membeli bibit unggul dan pupuk berkualitas, tetapi juga berinvestasi pada peralatan pertanian modern yang meningkatkan efisiensi kerja dan hasil panen secara signifikan.</p>
<h2 class="news-subheading">Transformasi Pertanian Kakao</h2>
<p>Sulawesi Barat, termasuk Polewali Mandar, dikenal sebagai salah satu penghasil kakao terbaik di Indonesia. Dengan dukungan KUR BRI, petani kakao setempat berhasil menerapkan teknik budidaya modern dan sistem fermentasi yang tepat, menghasilkan kakao berkualitas premium yang diminati pasar ekspor.</p>
<blockquote class="news-quote">"Dulu saya hanya bisa menanam setengah hektar karena keterbatasan modal. Sekarang dengan KUR BRI, saya bisa menggarap 3 hektar dan pendapatan saya meningkat tiga kali lipat."</blockquote>
<p>Ke depan, BRI berencana mengembangkan program klaster pertanian yang menggabungkan akses pembiayaan, pendampingan teknis, dan jaminan offtaker untuk memberikan kepastian pasar bagi para petani binaan BRI di Polewali Mandar.</p>`
  },
  {
    img: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=600&q=80',
    label: 'BRImo Raih Penghargaan Best Digital Banking 2026',
    time: '6 jam lalu',
    category: 'Digital Banking',
    excerpt: 'Penghargaan bergengsi diraih BRImo atas inovasi dan kemudahan layanan perbankan digital yang terus berkembang...',
    body: `<p class="news-lead">BRImo kembali meraih penghargaan bergengsi sebagai Best Digital Banking Application 2026 dari lembaga riset keuangan internasional, mengukuhkan posisinya sebagai super app perbankan terdepan di Indonesia.</p>
<p>Penghargaan ini merupakan bukti nyata komitmen BRI dalam menghadirkan inovasi digital yang tidak hanya canggih secara teknologi, tetapi juga mudah digunakan oleh seluruh lapisan masyarakat, termasuk mereka yang berada di daerah terpencil dengan keterbatasan akses internet.</p>
<h2 class="news-subheading">Fitur Unggulan BRImo 2026</h2>
<p>Versi terbaru BRImo hadir dengan lebih dari 200 fitur layanan lengkap, mulai dari transaksi keuangan dasar, investasi reksa dana, asuransi, hingga layanan pinjaman yang dapat diproses sepenuhnya secara digital dalam hitungan menit. Fitur AI-powered financial advisor juga hadir untuk membantu pengguna merencanakan keuangan mereka dengan lebih baik.</p>
<blockquote class="news-quote">"BRImo dirancang untuk menjadi teman finansial setia bagi setiap orang Indonesia, dari Sabang sampai Merauke."</blockquote>
<p>Hingga pertengahan 2026, pengguna aktif BRImo di wilayah Polewali Mandar telah mencapai 187.000 pengguna, meningkat 78% dibanding tahun sebelumnya, mencerminkan besarnya antusiasme masyarakat terhadap layanan perbankan digital.</p>`
  },
  {
    img: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80',
    label: 'Literasi Keuangan BRI Sasar 10.000 Pelaku UMKM',
    time: '1 minggu lalu',
    category: 'Literasi Keuangan',
    excerpt: 'Program literasi keuangan BRI berhasil menjangkau lebih dari 10.000 pelaku UMKM di Sulawesi Barat...',
    body: `<p class="news-lead">Program literasi keuangan BRI berhasil menjangkau lebih dari 10.000 pelaku UMKM di Sulawesi Barat sepanjang semester pertama 2026, memberikan pemahaman komprehensif tentang pengelolaan keuangan, akses kredit, dan pemanfaatan teknologi finansial.</p>
<p>Edukasi keuangan menjadi fondasi penting dalam mewujudkan masyarakat yang sejahtera secara finansial. BRI Cabang Polewali menyadari bahwa akses ke produk keuangan saja tidak cukup; masyarakat perlu memiliki literasi yang memadai agar dapat memanfaatkan produk dan layanan keuangan secara optimal.</p>
<h2 class="news-subheading">Roadshow ke 18 Kecamatan</h2>
<p>Tim edukasi BRI melakukan roadshow ke 18 kecamatan di Polewali Mandar, menyelenggarakan workshop interaktif yang membahas topik-topik seperti pengelolaan arus kas usaha, strategi menabung, pentingnya asuransi, dan cara mengakses pembiayaan yang tepat sesuai kebutuhan.</p>
<blockquote class="news-quote">"Kami percaya bahwa literasi keuangan adalah kunci kemandirian ekonomi. Semakin banyak warga yang melek keuangan, semakin kuat fondasi perekonomian daerah ini."</blockquote>
<h2 class="news-subheading">Program Perempuan Berdaya</h2>
<p>Salah satu program unggulan dalam rangkaian literasi keuangan ini adalah "Perempuan Berdaya", yang khusus menyasar ibu-ibu rumah tangga dan pelaku usaha perempuan. Program ini memberikan pelatihan kewirausahaan, akses ke KUR Khusus Perempuan, dan mentoring bisnis dari pengusaha sukses lokal.</p>
<p>Hasil evaluasi menunjukkan bahwa peserta program literasi keuangan BRI mengalami peningkatan tabungan rata-rata sebesar 45% dalam 6 bulan setelah mengikuti pelatihan, membuktikan efektivitas program ini dalam mendorong perubahan perilaku keuangan yang positif.</p>`
  },
]

const photos = [
  {
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    label: 'Kantor Cabang Polewali',
    description: 'Gedung BRI Cabang Polewali yang modern dan representatif melayani nasabah di jantung kota Polewali Mandar, Sulawesi Barat.',
    instagram: 'https://www.instagram.com/bankbri_id/',
    facebook: 'https://www.facebook.com/bankbri/',
    twitter: 'https://twitter.com/BANKBRI_ID'
  },
  {
    img: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800&q=80',
    label: 'Layanan Nasabah',
    description: 'Tim customer service BRI siap melayani setiap kebutuhan nasabah dengan penuh senyum dan profesionalisme tinggi.',
    instagram: 'https://www.instagram.com/bankbri_id/',
    facebook: 'https://www.facebook.com/bankbri/',
    twitter: 'https://twitter.com/BANKBRI_ID'
  },
  {
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    label: 'BRImo Digital',
    description: 'Aplikasi BRImo hadir sebagai super app perbankan digital yang memudahkan transaksi kapan saja dan di mana saja.',
    instagram: 'https://www.instagram.com/bankbri_id/',
    facebook: 'https://www.facebook.com/bankbri/',
    twitter: 'https://twitter.com/BANKBRI_ID'
  },
  {
    img: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80',
    label: 'Program KUR UMKM',
    description: 'BRI menyalurkan KUR kepada pelaku UMKM lokal untuk mendorong pertumbuhan ekonomi kerakyatan di Polewali Mandar.',
    instagram: 'https://www.instagram.com/bankbri_id/',
    facebook: 'https://www.facebook.com/bankbri/',
    twitter: 'https://twitter.com/BANKBRI_ID'
  },
  {
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    label: 'Kegiatan CSR Polewali',
    description: 'Program Corporate Social Responsibility BRI menyentuh kehidupan masyarakat melalui berbagai kegiatan sosial dan pemberdayaan.',
    instagram: 'https://www.instagram.com/bankbri_id/',
    facebook: 'https://www.facebook.com/bankbri/',
    twitter: 'https://twitter.com/BANKBRI_ID'
  },
  {
    img: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80',
    label: 'Pelayanan Prima',
    description: 'Standar pelayanan prima BRI diterapkan di setiap lini untuk memastikan kepuasan nasabah di seluruh Indonesia.',
    instagram: 'https://www.instagram.com/bankbri_id/',
    facebook: 'https://www.facebook.com/bankbri/',
    twitter: 'https://twitter.com/BANKBRI_ID'
  },
  {
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    label: 'Tim BRI Polewali',
    description: 'Tim profesional BRI Cabang Polewali yang berdedikasi tinggi dalam melayani masyarakat Polewali Mandar setiap harinya.',
    instagram: 'https://www.instagram.com/bankbri_id/',
    facebook: 'https://www.facebook.com/bankbri/',
    twitter: 'https://twitter.com/BANKBRI_ID'
  },
  {
    img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
    label: 'Rapat Koordinasi',
    description: 'Rapat koordinasi rutin digelar untuk memastikan sinergi seluruh unit kerja dalam mencapai target dan melayani nasabah optimal.',
    instagram: 'https://www.instagram.com/bankbri_id/',
    facebook: 'https://www.facebook.com/bankbri/',
    twitter: 'https://twitter.com/BANKBRI_ID'
  },
]

const videos = [
  {
    ytId: 'hVCfDFjeCb4',
    title: 'BRI — Melayani Sepenuh Hati untuk Indonesia',
    meta: 'BRI Official · Profil Perusahaan',
    description: 'BRI hadir untuk seluruh Indonesia, dari Sabang sampai Merauke, melayani setiap kebutuhan keuangan masyarakat dengan sepenuh hati. Video profil perusahaan ini menampilkan perjalanan panjang BRI dalam memberdayakan ekonomi rakyat.',
    tags: ['BRI', 'BankBRI', 'MelayaniSepenuhHati']
  },
  {
    ytId: 'yZjAU4yFSdU',
    title: 'BRImo — Super App Perbankan Digital BRI',
    meta: 'BRI Official · Layanan Digital',
    description: 'BRImo adalah super app perbankan digital dari BRI yang menghadirkan ratusan fitur lengkap dalam satu genggaman. Nikmati kemudahan transaksi, investasi, dan berbagai layanan keuangan kapan saja dan di mana saja.',
    tags: ['BRImo', 'DigitalBanking', 'SuperApp']
  },
  {
    ytId: 'yZjAU4yFSdU',
    title: 'KUR BRI — Kredit Usaha Rakyat untuk UMKM',
    meta: 'BRI Official · Program KUR',
    description: 'KUR BRI hadir sebagai solusi pembiayaan terpercaya bagi pelaku UMKM Indonesia. Dengan bunga rendah dan proses yang mudah, KUR BRI siap menjadi modal tumbuh bagi usaha Anda.',
    tags: ['KUR', 'UMKM', 'KreditUsahaRakyat']
  },
  {
    ytId: 'yZjAU4yFSdU',
    title: 'AgenBRI — Perbankan Tanpa Batas di Pelosok',
    meta: 'BRI Official · AgenBRI',
    description: 'AgenBRI hadir menjangkau daerah-daerah terpencil yang belum terlayani oleh kantor bank konvensional. Lewat ribuan titik AgenBRI, layanan perbankan kini bisa dinikmati oleh seluruh masyarakat Indonesia.',
    tags: ['AgenBRI', 'Inklusi', 'BRILink']
  },
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
  background: rgba(255,255,255,0.16);
  border: 1.5px solid rgba(255,255,255,0.13);
  border-radius: 16px;
  overflow: hidden;
  backdrop-filter: blur(5px);
  transition: border-color 0.25s, transform 0.3s cubic-bezier(0.22,1,0.36,1);
  cursor: pointer;
}
.artikel-featured:hover { border-color: rgba(0,87,184,0.40); transform: translateY(-3px); }
.artikel-featured-img-wrap {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}
.artikel-featured-img-wrap img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 0.5s ease;
}
.artikel-featured:hover .artikel-featured-img-wrap img { transform: scale(1.03); }
.artikel-featured-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%);
}
.artikel-featured-body { padding: 18px 20px 20px; }
.artikel-time {
  font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.40);
  letter-spacing: 0.04em; display: block; margin-bottom: 6px;
}
.artikel-featured-title {
  font-size: 18px; font-weight: 700; color: rgba(255,255,255,0.92);
  line-height: 1.35; letter-spacing: -0.02em; margin-bottom: 10px;
}
.artikel-featured-excerpt {
  font-size: 13.5px; color: rgba(255,255,255,0.50); line-height: 1.65;
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical;
  overflow: hidden; margin: 0;
}
.artikel-side-col { display: flex; flex-direction: column; gap: 12px; }
.artikel-side-item {
  background: rgba(255,255,255,0.16);
  border: 1.5px solid rgba(255,255,255,0.13);
  border-radius: 12px; overflow: hidden; backdrop-filter: blur(5px);
  transition: border-color 0.25s, transform 0.3s cubic-bezier(0.22,1,0.36,1);
  flex: 1; display: flex; flex-direction: column; cursor: pointer;
}
.artikel-side-item:hover { border-color: rgba(0,87,184,0.40); transform: translateY(-3px); }
.artikel-side-img-wrap { width: 100%; aspect-ratio: 16/9; overflow: hidden; flex-shrink: 0; }
.artikel-side-img-wrap img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 0.4s ease;
}
.artikel-side-item:hover .artikel-side-img-wrap img { transform: scale(1.04); }
.artikel-side-body {
  padding: 12px 14px 14px; flex: 1;
  display: flex; flex-direction: column; justify-content: flex-start;
}
.artikel-side-title {
  font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.85);
  line-height: 1.45; margin: 0;
}
/* category badge */
.artikel-cat-badge {
  display: inline-block;
  font-size: 10px; font-weight: 800; letter-spacing: 0.07em; text-transform: uppercase;
  color: var(--bri-gold, #F5A623);
  background: rgba(245,166,35,0.12);
  border: 1px solid rgba(245,166,35,0.25);
  border-radius: 100px; padding: 3px 9px;
  margin-bottom: 7px;
}
.artikel-cat-badge--sm { font-size: 9.5px; padding: 2px 7px; margin-bottom: 5px; }

/* ── BOTTOM LIST ROWS ── */
.artikel-list-rows {
  display: flex; flex-direction: column;
  border: 1.5px solid rgba(255,255,255,0.16);
  border-radius: 14px; overflow: hidden;
  margin-bottom: 24px;
}
.artikel-row-item {
  display: flex; align-items: center; gap: 16px;
  padding: 14px 18px;
  cursor: pointer;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  transition: background 0.18s;
}
.artikel-row-item:last-child { border-bottom: none; }
.artikel-row-item:hover { background: rgba(255,255,255,0.04); }
.artikel-row-item:hover .artikel-row-arrow { opacity: 1; transform: translateX(3px); }
.artikel-row-thumb {
  width: 110px; height: 70px; border-radius: 8px;
  overflow: hidden; flex-shrink: 0;
  background: rgba(255,255,255,0.05);
}
.artikel-row-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.artikel-row-body { flex: 1; min-width: 0; }
.artikel-row-title {
  font-size: 13.5px; font-weight: 600; color: rgba(255,255,255,0.85);
  line-height: 1.45; margin: 0;
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.artikel-row-meta {
  display: flex; flex-direction: column; align-items: flex-end; gap: 8px;
  flex-shrink: 0;
}
.artikel-row-arrow {
  color: rgba(255,255,255,0.25); opacity: 0.5;
  transition: opacity 0.2s, transform 0.2s;
}

/* ── FOTO GRID ── */
.foto-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 12px; margin-bottom: 24px;
}
.foto-grid-item {
  aspect-ratio: 1; border-radius: 12px; overflow: hidden; position: relative;
  border: 1.5px solid rgba(255,255,255,0.08); cursor: pointer;
  transition: border-color 0.25s, transform 0.3s cubic-bezier(0.22,1,0.36,1);
}
.foto-grid-item:hover { border-color: rgba(0,87,184,0.40); transform: scale(1.02); }
.foto-grid-item img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 0.4s ease;
}
.foto-grid-item:hover img { transform: scale(1.08); }
.foto-grid-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%);
  display: flex; align-items: flex-end; padding: 10px 12px;
  opacity: 0; transition: opacity 0.2s;
}
.foto-grid-item:hover .foto-grid-overlay { opacity: 1; }
.foto-grid-label {
  font-size: 11.5px; font-weight: 600; color: rgba(255,255,255,0.92); line-height: 1.3;
}

/* ── VIDEO LAYOUT ── */
.video-layout {
  display: grid; grid-template-columns: 1fr 300px;
  gap: 16px; margin-bottom: 24px;
}
.video-featured {
  background: rgba(255,255,255,0.05);
  border: 1.5px solid rgba(255,255,255,0.10);
  border-radius: 16px; overflow: hidden; backdrop-filter: blur(8px);
  transition: border-color 0.25s; cursor: pointer;
}
.video-featured:hover { border-color: rgba(0,87,184,0.40); }
.video-thumb-wrap {
  position: relative; aspect-ratio: 16/9; overflow: hidden;
}
.video-thumb-wrap img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 0.5s ease;
}
.video-featured:hover .video-thumb-wrap img { transform: scale(1.03); }
.video-featured-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.20);
  transition: background 0.2s;
}
.video-featured:hover .video-featured-overlay { background: rgba(0,0,0,0.35); }
.video-play-center {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.12s ease;
}
.video-play-center.visible { opacity: 1; }
.video-play-circle {
  width: 68px; height: 68px; border-radius: 50%;
  background: rgba(255,0,0,0.90);
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  box-shadow: 0 4px 24px rgba(255,0,0,0.45);
  transition: transform 0.15s, background 0.15s;
}
.video-play-center.visible .video-play-circle { transform: scale(1.05); }
.video-featured-info { padding: 16px 20px 20px; }
.video-badge {
  display: inline-block; font-size: 10px; font-weight: 700;
  letter-spacing: 0.08em; text-transform: uppercase; color: #60a5fa;
  background: rgba(0,87,184,0.20); border: 1px solid rgba(0,87,184,0.35);
  border-radius: 100px; padding: 3px 10px; margin-bottom: 8px;
}
.video-featured-title {
  font-size: 15px; font-weight: 700; color: rgba(255,255,255,0.92);
  line-height: 1.4; margin-bottom: 4px;
}
.video-meta { font-size: 12px; color: rgba(255,255,255,0.40); }

.video-side-list { display: flex; flex-direction: column; gap: 10px; }
.video-side-item {
  display: flex; gap: 0; background: rgba(255,255,255,0.05);
  border: 1.5px solid rgba(255,255,255,0.10); border-radius: 12px;
  overflow: hidden; backdrop-filter: blur(8px);
  transition: border-color 0.25s, background 0.2s; cursor: pointer;
  align-items: center;
}
.video-side-item:hover { border-color: rgba(0,87,184,0.40); background: rgba(0,87,184,0.08); }
.video-side-thumb {
  width: 110px; height: 70px; flex-shrink: 0; position: relative; overflow: hidden;
}
.video-side-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.video-side-play-icon {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.45); color: #fff;
}
.video-side-info { padding: 8px 12px; flex: 1; min-width: 0; }
.video-side-title {
  font-size: 12.5px; font-weight: 600; color: rgba(255,255,255,0.85);
  line-height: 1.4; margin-bottom: 3px;
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

/* ── TAMPILKAN LAINNYA BUTTON ── */
.load-more-wrap { display: flex; justify-content: center; margin-top: 8px; margin-bottom: 4px; }
.btn-load-more {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 12px 28px; border-radius: 8px;
  background: transparent;
  border: 1.5px solid rgba(255,255,255,0.18);
  color: rgba(255,255,255,0.70);
  font-size: 13.5px; font-weight: 600; cursor: pointer;
  font-family: inherit; letter-spacing: 0.01em;
  transition: background 0.2s, border-color 0.2s, color 0.2s, gap 0.2s;
}
.btn-load-more:hover {
  background: rgba(0,87,184,0.12);
  border-color: rgba(59,130,246,0.55);
  color: #93c5fd;
  gap: 14px;
}
.btn-load-more svg { transition: transform 0.2s; flex-shrink: 0; }
.btn-load-more:hover svg { transform: translateX(3px); }

/* ── TAMPILKAN LAINNYA MODAL ── */
.more-modal-overlay {
  position: fixed; inset: 0; background: rgba(5,14,30,0.88);
  backdrop-filter: blur(14px); z-index: 9998;
  display: flex; align-items: center; justify-content: center; padding: 40px 24px;
}
.more-modal-box {
  background: rgba(10,20,44,0.98); border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 20px; width: 100%; max-width: 680px; max-height: 85vh;
  display: flex; flex-direction: column; overflow: hidden;
  box-shadow: 0 24px 80px rgba(0,0,0,0.60);
}
.more-modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 24px; border-bottom: 1px solid rgba(255,255,255,0.08); flex-shrink: 0;
}
.more-modal-title {
  display: flex; align-items: center; gap: 8px;
  font-size: 15px; font-weight: 700; color: rgba(255,255,255,0.90);
}
.more-modal-close {
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.70); display: flex; align-items: center;
  justify-content: center; cursor: pointer; transition: background 0.2s;
}
.more-modal-close:hover { background: rgba(255,255,255,0.18); }
.more-modal-scroll { overflow-y: auto; padding: 8px 0 8px; flex: 1; }

/* ── artikel / video list rows in modal ── */
.more-artikel-list { display: flex; flex-direction: column; }
.more-artikel-row {
  display: flex; align-items: center; gap: 14px;
  padding: 12px 24px;
  cursor: pointer;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  transition: background 0.18s;
}
.more-artikel-row:last-child { border-bottom: none; }
.more-artikel-row:hover { background: rgba(255,255,255,0.04); }
.more-artikel-row:hover .more-artikel-row-arrow { opacity: 1; transform: translateX(3px); }
.more-artikel-row-thumb {
  width: 100px; height: 64px; border-radius: 8px;
  overflow: hidden; flex-shrink: 0;
  background: rgba(255,255,255,0.05);
}
.more-artikel-row-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.more-artikel-row-body { flex: 1; min-width: 0; }
.more-artikel-row-title {
  font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.85);
  line-height: 1.45; margin: 0;
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.more-artikel-row-right {
  display: flex; flex-direction: column; align-items: flex-end; gap: 8px;
  flex-shrink: 0;
}
.more-artikel-row-arrow {
  color: rgba(255,255,255,0.25); opacity: 0.4;
  transition: opacity 0.2s, transform 0.2s;
}
.more-video-row-thumb { position: relative; }
.more-video-row-play {
  position: absolute; inset: 0; display: flex; align-items: center;
  justify-content: center; background: rgba(0,0,0,0.40); color: #fff;
}
.more-foto-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.more-foto-item {
  aspect-ratio: 1; border-radius: 10px; overflow: hidden;
  position: relative; cursor: pointer;
}
.more-foto-item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.3s; }
.more-foto-item:hover img { transform: scale(1.06); }
.more-foto-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%);
  display: flex; align-items: flex-end; padding: 8px;
  opacity: 0; transition: opacity 0.2s;
}
.more-foto-item:hover .more-foto-overlay { opacity: 1; }
.more-foto-overlay span { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.88); }
.more-video-list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.more-video-item {
  display: flex; flex-direction: column; align-items: stretch;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px; overflow: hidden; cursor: pointer; transition: border-color 0.2s;
}
.more-video-item:hover { border-color: rgba(0,87,184,0.35); }
.more-video-thumb { width: 100%; aspect-ratio: 16/9; position: relative; overflow: hidden; }
.more-video-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.more-video-play {
  position: absolute; inset: 0; display: flex; align-items: center;
  justify-content: center; background: rgba(0,0,0,0.40); color: #fff;
}
.more-video-info { padding: 10px 12px 12px; flex: 1; }
.more-video-title { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.85); margin: 0 0 4px; line-height: 1.4; }

/* Fullscreen foto modal */
.more-modal-overlay.more-fullscreen { padding: 0; align-items: stretch; }
.more-fullscreen-box { max-width: 100% !important; max-height: 100vh !important; height: 100vh; border-radius: 0 !important; border: none !important; }

/* ── ARTIKEL MODAL (full-screen reader) ── */
.screen-close-btn {
  position: fixed; top: 20px; right: 24px; z-index: 10100;
  background: #111827; border: 1px solid rgba(0,0,0,0.15);
  color: #fff; border-radius: 50%; width: 44px; height: 44px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: background 0.2s;
  box-shadow: 0 4px 16px rgba(0,0,0,0.30);
}
.screen-close-btn:hover { background: #374151; }
.artikel-modal-overlay {
  position: fixed; inset: 0; background: #f4f4f0; z-index: 9999; overflow-y: auto;
}
.artikel-modal-scroll { max-width: 760px; margin: 0 auto; padding: 72px 24px 80px; }
.news-category-badge {
  display: inline-block; background: #003f8a; color: #fff;
  font-size: 10px; font-weight: 800; letter-spacing: 0.12em;
  text-transform: uppercase; padding: 4px 10px; border-radius: 4px; margin-bottom: 16px;
}
.news-headline {
  font-size: clamp(24px, 4vw, 40px); font-weight: 800; color: #0d1117;
  line-height: 1.15; letter-spacing: -0.02em; margin: 0 0 18px;
}
.news-meta {
  display: flex; align-items: center; gap: 10px;
  font-size: 13px; color: #555; flex-wrap: wrap; margin-bottom: 16px;
}
.news-author, .news-date, .news-read-time { display: flex; align-items: center; gap: 5px; }
.news-dot { color: #bbb; }
.news-divider { height: 2px; background: #e0e0e0; border-radius: 2px; margin-bottom: 28px; }
.news-figure { margin: 0 0 32px; }
.news-hero-img { width: 100%; border-radius: 10px; display: block; max-height: 460px; object-fit: cover; }
.news-figure figcaption { font-size: 12px; color: #888; margin-top: 8px; font-style: italic; }
.news-body { font-size: 17px; line-height: 1.8; color: #1a1a1a; }
:deep(.news-body p) { margin: 0 0 20px; }
:deep(.news-lead) { font-size: 19px !important; font-weight: 600 !important; color: #111 !important; line-height: 1.65 !important; }
:deep(.news-subheading) { font-size: 22px; font-weight: 700; color: #0d1117; margin: 32px 0 14px; letter-spacing: -0.01em; }
:deep(.news-quote) {
  border-left: 4px solid #003f8a; margin: 28px 0; padding: 12px 20px;
  font-size: 18px; font-style: italic; color: #333;
  background: rgba(0,63,138,0.05); border-radius: 0 8px 8px 0;
}

/* Related articles */
.related-articles {
  max-width: 760px; margin: 48px auto 0; padding-top: 40px;
  border-top: 2px solid #e0e0e0;
}
.related-title {
  font-size: 20px; font-weight: 800; color: #0d1117;
  margin: 0 0 24px; letter-spacing: -0.01em;
}
.related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.related-item {
  background: #fff; border-radius: 12px; overflow: hidden;
  border: 1.5px solid #ebebeb; cursor: pointer;
  transition: border-color 0.2s, transform 0.25s, box-shadow 0.25s;
}
.related-item:hover { border-color: #003f8a; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.10); }
.related-img-wrap { aspect-ratio: 16/9; overflow: hidden; }
.related-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s; }
.related-item:hover .related-img-wrap img { transform: scale(1.04); }
.related-body { padding: 12px 14px 14px; }
.related-item-title { font-size: 13px; font-weight: 700; color: #0d1117; line-height: 1.45; margin: 4px 0 8px; }
.related-read-link { font-size: 11.5px; font-weight: 600; color: #003f8a; }

/* ── FOTO LIGHTBOX (modern) ── */
.foto-modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.96);
  z-index: 9999; display: flex; flex-direction: column;
  align-items: center; justify-content: center; outline: none;
}
.foto-close-btn {
  position: absolute; top: 20px; right: 24px; z-index: 10100;
  background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.20);
  color: #fff; border-radius: 50%; width: 44px; height: 44px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: background 0.2s;
}
.foto-close-btn:hover { background: rgba(255,255,255,0.22); }
.foto-counter {
  position: absolute; top: 24px; left: 50%; transform: translateX(-50%);
  font-size: 13px; color: rgba(255,255,255,0.55); font-weight: 500;
  background: rgba(255,255,255,0.08); padding: 5px 14px; border-radius: 100px;
}
.foto-nav {
  position: absolute; top: 50%; transform: translateY(-50%);
  background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.20);
  color: #fff; border-radius: 50%; width: 52px; height: 52px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: background 0.2s; z-index: 10000;
}
.foto-nav:hover { background: rgba(255,255,255,0.22); }
.foto-nav-left { left: 24px; }
.foto-nav-right { right: 24px; }
.foto-modal-stage {
  flex: 1; display: flex; align-items: center; justify-content: center;
  width: 100%; padding: 60px 100px 0;
}
.foto-modal-img {
  max-width: 100%; max-height: calc(100vh - 200px); object-fit: contain;
  display: block; border-radius: 8px;
}
.foto-info-panel {
  width: 100%; flex-shrink: 0; background: rgba(20,30,48,0.95);
  border-top: 1px solid rgba(255,255,255,0.10);
  backdrop-filter: blur(20px); margin-top: 20px;
}
.foto-info-main {
  max-width: 900px; margin: 0 auto; padding: 16px 24px;
  display: flex; align-items: center; justify-content: space-between; gap: 20px;
}
.foto-info-left { display: flex; align-items: flex-start; gap: 14px; flex: 1; min-width: 0; }
.foto-info-icon {
  width: 40px; height: 40px; border-radius: 10px;
  background: rgba(0,87,184,0.25); border: 1px solid rgba(0,87,184,0.35);
  display: flex; align-items: center; justify-content: center;
  color: #60a5fa; flex-shrink: 0;
}
.foto-info-title { font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.90); margin-bottom: 3px; }
.foto-info-desc { font-size: 12.5px; color: rgba(255,255,255,0.50); line-height: 1.5; }
.foto-social-links { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.foto-social-label { font-size: 12px; color: rgba(255,255,255,0.40); font-weight: 500; }
.foto-social-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 14px; border-radius: 8px;
  font-size: 12px; font-weight: 600; text-decoration: none;
  transition: opacity 0.2s, transform 0.2s; cursor: pointer;
}
.foto-social-btn:hover { opacity: 0.85; transform: translateY(-1px); }
.foto-ig {
  background: linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  color: #fff;
}
.foto-fb { background: #1877f2; color: #fff; }
.foto-tw { background: #000; border: 1px solid rgba(255,255,255,0.20); color: #fff; }

/* foto slide transition */
.foto-slide-enter-active, .foto-slide-leave-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.foto-slide-enter-from { opacity: 0; transform: scale(0.97); }
.foto-slide-leave-to { opacity: 0; transform: scale(1.02); }

/* ── VIDEO MODAL (YouTube-like fullscreen) ── */
.video-modal-overlay {
  position: fixed; inset: 0; background: #0f0f0f;
  z-index: 9999; display: flex; flex-direction: column; overflow: hidden;
}
.video-modal-topbar {
  height: 56px; flex-shrink: 0; padding: 0 20px;
  display: flex; align-items: center; justify-content: space-between;
  border-bottom: 1px solid rgba(255,255,255,0.08); background: #0f0f0f;
}
.video-modal-channel-mini { display: flex; align-items: center; gap: 10px; }
.video-modal-topbar-title { font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.80); }
.video-modal-body {
  flex: 1; overflow: hidden;
  display: grid; grid-template-columns: 1fr 380px;
}
.video-modal-left {
  overflow-y: auto; padding: 20px 24px;
  border-right: 1px solid rgba(255,255,255,0.08);
}
.video-modal-player-wrap {
  aspect-ratio: 16/9; width: 100%; background: #000;
  border-radius: 8px; overflow: hidden; margin-bottom: 16px;
}
.video-modal-player-wrap iframe {
  width: 100%; height: 100%; border: none; display: block;
}
.video-modal-channel {
  display: flex; align-items: center; gap: 12px; margin-bottom: 12px;
}
.video-modal-channel-avatar {
  width: 40px; height: 40px; border-radius: 50%;
  background: linear-gradient(135deg, #003f8a, #0057b8);
  display: flex; align-items: center; justify-content: center;
  color: #fff; flex-shrink: 0;
}
.video-modal-channel-name { font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.92); }
.video-modal-channel-sub { font-size: 12px; color: rgba(255,255,255,0.45); margin-top: 1px; }
.video-modal-subscribe {
  margin-left: auto; padding: 8px 16px; border-radius: 100px;
  background: rgba(255,255,255,0.92); border: none;
  color: #0f0f0f; font-size: 13px; font-weight: 700;
  cursor: pointer; transition: background 0.2s;
}
.video-modal-subscribe:hover { background: #fff; }
.video-modal-close {
  width: 40px; height: 40px; border-radius: 50%;
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.70); display: flex; align-items: center;
  justify-content: center; cursor: pointer; transition: background 0.2s; flex-shrink: 0;
}
.video-modal-close:hover { background: rgba(255,255,255,0.18); color: #fff; }
.video-modal-title {
  font-size: 18px; font-weight: 700; color: rgba(255,255,255,0.95);
  line-height: 1.4; margin: 0 0 10px;
}
.video-modal-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
.video-tag { font-size: 12.5px; color: #3b82f6; font-weight: 500; cursor: pointer; }
.video-tag:hover { text-decoration: underline; }
.video-modal-desc-box {
  background: rgba(255,255,255,0.06); border-radius: 10px; padding: 12px 16px;
}
.video-modal-desc {
  font-size: 13.5px; color: rgba(255,255,255,0.62); line-height: 1.65; margin: 0;
}
/* Sidebar */
.video-modal-sidebar {
  overflow-y: auto; padding: 14px 12px;
  display: flex; flex-direction: column; gap: 4px;
  background: #0f0f0f;
}
.video-sidebar-label {
  font-size: 11px; font-weight: 800; color: rgba(255,255,255,0.40);
  letter-spacing: 0.08em; text-transform: uppercase;
  padding-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.08);
  margin-bottom: 6px;
}
.video-suggestion {
  display: flex; gap: 10px; cursor: pointer;
  border-radius: 8px; padding: 8px;
  transition: background 0.2s;
}
.video-suggestion:hover { background: rgba(255,255,255,0.06); }
.video-suggestion-thumb {
  width: 160px; height: 90px; flex-shrink: 0;
  border-radius: 6px; overflow: hidden; background: #1a1a1a; position: relative;
}
.video-suggestion-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.video-suggestion-play {
  position: absolute; inset: 0; display: flex; align-items: center;
  justify-content: center; background: rgba(0,0,0,0.35); color: #fff;
}
.video-suggestion-info { flex: 1; min-width: 0; padding-top: 2px; }
.video-suggestion-title {
  font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.85);
  line-height: 1.4; margin: 0 0 5px;
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
}
.video-suggestion-meta { font-size: 11.5px; color: rgba(255,255,255,0.40); }

/* Shared */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.25s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .artikel-layout { grid-template-columns: 1fr; }
  .artikel-side-col { flex-direction: row; }
  .foto-grid { grid-template-columns: repeat(3, 1fr); }
  .video-layout { grid-template-columns: 1fr; }
  .video-side-list { flex-direction: row; flex-wrap: wrap; }
  .video-side-item { flex: 1; min-width: 200px; }
  .more-foto-grid { grid-template-columns: repeat(3, 1fr); }
  .related-grid { grid-template-columns: 1fr 1fr; }
  .foto-modal-stage { padding: 60px 70px 0; }
  .foto-info-main { flex-direction: column; align-items: flex-start; gap: 12px; }
  .video-modal-body { grid-template-columns: 1fr; }
  .video-modal-sidebar { border-left: none; border-top: 1px solid rgba(255,255,255,0.08); max-height: 240px; }
  .video-suggestion-thumb { width: 120px; height: 68px; }
}
@media (max-width: 600px) {
  .foto-grid { grid-template-columns: repeat(2, 1fr); }
  .more-foto-grid { grid-template-columns: repeat(2, 1fr); }
  .related-grid { grid-template-columns: 1fr; }
  .foto-modal-stage { padding: 56px 56px 0; }
  .foto-nav-left { left: 8px; }
  .foto-nav-right { right: 8px; }
  .foto-social-links { flex-wrap: wrap; }
  .artikel-row-thumb { width: 80px; height: 52px; }
  .more-artikel-row-thumb { width: 76px; height: 50px; }
  .more-artikel-row { padding: 10px 16px; gap: 10px; }
}

/* ── MODAL SCROLLBAR ── */
.video-modal-left::-webkit-scrollbar,
.video-modal-sidebar::-webkit-scrollbar,
.more-modal-scroll::-webkit-scrollbar { width: 4px; }
.video-modal-left::-webkit-scrollbar-track,
.video-modal-sidebar::-webkit-scrollbar-track,
.more-modal-scroll::-webkit-scrollbar-track { background: transparent; }
.video-modal-left::-webkit-scrollbar-thumb,
.video-modal-sidebar::-webkit-scrollbar-thumb,
.more-modal-scroll::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.14);
  border-radius: 100px;
}
.video-modal-left::-webkit-scrollbar-thumb:hover,
.video-modal-sidebar::-webkit-scrollbar-thumb:hover,
.more-modal-scroll::-webkit-scrollbar-thumb:hover { background: rgba(0,87,184,0.50); }
</style>
