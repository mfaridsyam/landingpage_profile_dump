<template>
  <section class="gallery-section" id="galeri">
    <div class="container">
      <div class="news-head">
        <div class="news-head-left">
          <div class="section-eyebrow reveal">Berita &amp; Media</div>
          <h2 class="section-title reveal" style="margin-bottom:0">Info Terkini</h2>
          <p class="news-head-desc reveal">Berita, foto, dan video terbaru dari BRI Cabang Polewali.</p>
        </div>
        <div class="news-tabs reveal">
          <button class="news-tab" :class="{ active: tab === 'artikel' }" @click="tab = 'artikel'">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            Artikel
          </button>
          <button class="news-tab" :class="{ active: tab === 'foto' }" @click="tab = 'foto'">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            Foto
          </button>
          <button class="news-tab" :class="{ active: tab === 'video' }" @click="tab = 'video'">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
            Video
          </button>
        </div>
      </div>

      <!-- ─── ARTIKEL ─── -->
      <div v-show="tab === 'artikel'">

        <!-- Hero article: full width -->
        <div class="art-hero reveal" @click="openArtikel(0)">
          <img :src="articles[0].img" :alt="articles[0].label" class="art-hero-img" />
          <div class="art-hero-overlay"></div>
          <div class="art-hero-body">
            <div class="art-cat-pill">{{ articles[0].category }}</div>
            <span class="art-time">{{ articles[0].time }}</span>
            <h3 class="art-hero-title">{{ articles[0].label }}</h3>
            <p class="art-hero-excerpt">{{ articles[0].excerpt }}</p>
          </div>
        </div>

        <!-- 3-column card grid -->
        <div class="art-grid reveal">
          <div v-for="(art, i) in articles.slice(1, 4)" :key="art.label"
            class="art-card" @click="openArtikel(i + 1)">
            <div class="art-card-img-wrap">
              <img :src="art.img" :alt="art.label" loading="lazy" />
              <div class="art-card-cat">{{ art.category }}</div>
            </div>
            <div class="art-card-content">
              <span class="art-time art-card-time">{{ art.time }}</span>
              <h4 class="art-card-title">{{ art.label }}</h4>
              <p class="art-card-excerpt">{{ art.excerpt }}</p>
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
        <div class="foto-gallery">

          <!-- Hero photo -->
          <div class="foto-hero" @click="openFoto(fotoActive)">
            <Transition name="foto-hero-fade" mode="out-in">
              <img :key="fotoActive"
                :src="photos[fotoActive].img"
                :alt="photos[fotoActive].label"
                class="foto-hero-img" />
            </Transition>
            <div class="foto-hero-overlay">
              <div class="foto-hero-info">
                <span class="foto-hero-label">{{ photos[fotoActive].label }}</span>
                <span class="foto-hero-count">{{ fotoActive + 1 }} / {{ photos.length }}</span>
              </div>
              <div class="foto-hero-expand">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
              </div>
            </div>
            <button class="foto-hero-arrow foto-hero-prev" @click.stop="fotoActivePrev" :disabled="fotoActive === 0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button class="foto-hero-arrow foto-hero-next" @click.stop="fotoActiveNext" :disabled="fotoActive === photos.length - 1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

          <!-- Thumbnails strip -->
          <div class="foto-thumbs">
            <div v-for="(photo, i) in photos" :key="i"
              class="foto-thumb"
              :class="{ active: i === fotoActive }"
              @click="fotoActive = i">
              <img :src="photo.img" :alt="photo.label" loading="lazy" />
              <div class="foto-thumb-bar"></div>
            </div>
          </div>

          <!-- Footer -->
          <div class="foto-gallery-footer">
            <div class="foto-progress">
              <div class="foto-progress-track">
                <div class="foto-progress-fill"
                  :style="{ width: `${((fotoActive + 1) / photos.length) * 100}%` }">
                </div>
              </div>
              <span class="foto-progress-label">{{ fotoActive + 1 }} dari {{ photos.length }} foto</span>
            </div>
            <button class="btn-load-more" @click="openMoreModal('foto')">
              <span>Lihat Semua Foto</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>

        </div>
      </div>

      <!-- ─── VIDEO ─── -->
      <div v-show="tab === 'video'">
        <div class="vid-gallery">

          <!-- Hero cinematic -->
          <div class="vid-hero"
            @mouseenter="videoHover = true"
            @mouseleave="videoHover = false"
            @click="openVideoModal()">
            <div class="vid-hero-thumb">
              <img :src="`https://img.youtube.com/vi/${videos[videoOrder[0]].ytId.trim()}/maxresdefault.jpg`"
                :alt="videos[videoOrder[0]].title"
                @error="onThumbError($event, videoOrder[0])" />
              <div class="vid-hero-overlay"></div>
              <div class="vid-hero-play" :class="{ hovered: videoHover }">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
              </div>
              <div class="vid-hero-info">
                <span class="vid-hero-badge">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                  Video Terbaru
                </span>
                <div class="vid-hero-title">{{ videos[videoOrder[0]].title }}</div>
                <div class="vid-hero-meta">{{ videos[videoOrder[0]].meta }}</div>
              </div>
              <div class="vid-hero-watch" :class="{ visible: videoHover }">
                Tonton Sekarang
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>
            </div>
          </div>

          <!-- Video grid -->
          <div class="vid-grid">
            <div v-for="(orderIdx, pos) in videoOrder.slice(1)" :key="orderIdx"
              class="vid-card"
              @click="openVideoModalDirect(orderIdx)">
              <div class="vid-card-thumb">
                <img :src="`https://img.youtube.com/vi/${videos[orderIdx].ytId.trim()}/mqdefault.jpg`"
                  :alt="videos[orderIdx].title"
                  @error="onThumbError($event, orderIdx)" />
                <div class="vid-card-overlay">
                  <div class="vid-card-play">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                  </div>
                </div>
              </div>
              <div class="vid-card-info">
                <div class="vid-card-num">{{ String(pos + 2).padStart(2, '0') }}</div>
                <div class="vid-card-title">{{ videos[orderIdx].title }}</div>
                <div class="vid-card-meta">{{ videos[orderIdx].meta }}</div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="load-more-wrap reveal">
            <button class="btn-load-more" @click="openMoreModal('video')">
              <span>Lihat Semua Video</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>

        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════
         ARTIKEL MODAL (full-screen reader)
         ═══════════════════════════════════ -->
    <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="artikelModal.open" class="artikel-modal-overlay" data-lenis-prevent>
        <button class="screen-close-btn" @click="closeArtikel" title="Tutup">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="artikel-modal-scroll">
          <div class="art-reader-layout">

            <!-- ── MAIN COLUMN ── -->
            <div class="art-reader-main">
              <article class="news-article">
                <figure class="news-figure">
                  <img :src="articles[artikelModal.idx].img" :alt="articles[artikelModal.idx].label" class="news-hero-img" />
                  <figcaption>Foto: BRI Cabang Polewali Mandar</figcaption>
                </figure>
                <h1 class="news-headline">{{ articles[artikelModal.idx].label }}</h1>
                <div class="news-meta">
                  <span class="news-date">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    {{ articles[artikelModal.idx].time }}
                  </span>
                  <span class="news-dot">/</span>
                  <span class="news-author">
                    Tim Redaksi BRI Polewali
                  </span>
                  <span class="news-dot">/</span>
                  <span class="news-category-inline">{{ articles[artikelModal.idx].category }}</span>
                  <span class="news-dot">/</span>
                  <span class="news-read-time">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    5 menit baca
                  </span>
                </div>
                <div class="news-divider"></div>
                <div class="news-body" v-html="articles[artikelModal.idx].body"></div>
              </article>

              <!-- Related Articles -->
              <div class="related-articles">
                <div class="art-sidebar-heading"><span>Artikel Terkait</span></div>
                <div class="related-grid">
                  <div v-for="(art, i) in relatedArticles(artikelModal.idx)" :key="i"
                    class="related-item" @click="artikelModal.idx = art.originalIdx">
                    <div class="related-img-wrap"><img :src="art.img" :alt="art.label" /></div>
                    <div class="related-body">
                      <span class="art-cat-inline">{{ art.category }}</span>
                      <p class="related-item-title">{{ art.label }}</p>
                      <span class="related-read-link">Baca selengkapnya →</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Comment Section -->
              <div class="comment-section">
                <div class="comment-section-head">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                  <h3 class="comment-section-title">Komentar ({{ articleComments.length }})</h3>
                </div>

                <div v-if="articleComments.length" class="comment-list">
                  <div v-for="c in articleComments" :key="c.id" class="comment-item">
                    <div class="comment-avatar">{{ c.initial }}</div>
                    <div class="comment-body">
                      <div class="comment-meta">
                        <span class="comment-name">{{ c.name }}</span>
                        <span class="comment-dot">·</span>
                        <span class="comment-time">{{ c.time }}</span>
                      </div>
                      <p class="comment-text">{{ c.text }}</p>
                    </div>
                  </div>
                </div>
                <div v-else class="comment-empty">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                  <p>Belum ada komentar. Jadilah yang pertama!</p>
                </div>

                <div class="comment-write">
                  <div v-if="commentVerified" class="comment-verified-user">
                    <div class="comment-write-avatar">{{ verifiedUser.name.charAt(0).toUpperCase() }}</div>
                    <span class="comment-write-name">{{ verifiedUser.name }}</span>
                    <span class="comment-write-badge">Terverifikasi</span>
                  </div>
                  <div class="comment-input-wrap" @click="onCommentFocus">
                    <textarea
                      v-model="commentText"
                      class="comment-textarea"
                      :placeholder="commentVerified ? 'Tulis komentar Anda...' : 'Klik untuk menulis komentar...'"
                      :readonly="!commentVerified"
                      rows="3"
                      maxlength="500"
                    ></textarea>
                  </div>
                  <div v-if="commentVerified" class="comment-footer">
                    <span class="comment-count">{{ commentText.length }}/500</span>
                    <button class="comment-submit-btn" @click="submitComment" :disabled="!commentText.trim()">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                      Kirim
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- ── SIDEBAR ── -->
            <aside class="art-sidebar">
              <!-- Recent News -->
              <div class="art-sidebar-block">
                <div class="art-sidebar-heading"><span>Berita Terkini</span></div>
                <div class="art-sidebar-news-list">
                  <div v-for="(art, i) in sidebarArticles(artikelModal.idx)" :key="i"
                    class="art-sidebar-news-item" @click="artikelModal.idx = art.originalIdx">
                    <div class="art-sidebar-thumb">
                      <img :src="art.img" :alt="art.label" />
                    </div>
                    <div class="art-sidebar-news-body">
                      <p class="art-sidebar-news-title">{{ art.label }}</p>
                      <span class="art-sidebar-news-meta">{{ art.time }} · {{ art.category }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Tag Cloud -->
              <div class="art-sidebar-block">
                <div class="art-sidebar-heading"><span>Tag Cloud</span></div>
                <div class="art-sidebar-tags">
                  <span v-for="cat in allCategories" :key="cat" class="art-sidebar-tag">{{ cat }}</span>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </Transition>
    </Teleport>

    <!-- OTP Verification Popup -->
    <Teleport to="body">
    <Transition name="otp-fade">
      <div v-if="otpPopup.show" class="otp-overlay">
        <div class="otp-box">
          <div class="otp-head">
            <div class="otp-head-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div class="otp-head-text">
              <h3 class="otp-title">Verifikasi Identitas</h3>
              <p class="otp-subtitle">Masukkan nama &amp; email untuk mendapatkan kode OTP</p>
            </div>
            <button class="otp-close-btn" @click="otpPopup.show = false">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <div class="otp-fields">
            <div class="otp-field">
              <label class="otp-label">Nama</label>
              <input v-model="otpPopup.name" class="otp-input" type="text"
                placeholder="Nama lengkap Anda" :disabled="otpPopup.codeSent" />
            </div>

            <div class="otp-field">
              <label class="otp-label">Email</label>
              <div class="otp-email-row">
                <input v-model="otpPopup.email" class="otp-input" type="email"
                  placeholder="email@contoh.com" :disabled="otpPopup.codeSent" />
                <button class="otp-send-btn" @click="sendOTP"
                  :disabled="otpPopup.sending || otpPopup.countdown > 0 || !otpPopup.name.trim() || !otpPopup.email.trim()">
                  <span v-if="otpPopup.sending">Mengirim…</span>
                  <span v-else-if="otpPopup.countdown > 0">{{ otpPopup.countdown }}d</span>
                  <span v-else>{{ otpPopup.codeSent ? 'Kirim Ulang' : 'Kirim Kode OTP' }}</span>
                </button>
              </div>
            </div>

            <Transition name="otp-slide">
              <div v-if="otpPopup.codeSent" class="otp-field">
                <label class="otp-label">Kode OTP</label>
                <input v-model="otpPopup.inputCode" class="otp-input otp-code-input"
                  type="text" inputmode="numeric" placeholder="_ _ _ _ _ _" maxlength="6"
                  @input="otpPopup.inputCode = otpPopup.inputCode.replace(/\D/g, '')" />
                <span class="otp-hint">Cek inbox atau folder spam email Anda</span>
              </div>
            </Transition>

            <p v-if="otpPopup.error" class="otp-error">{{ otpPopup.error }}</p>

            <button class="otp-verify-btn" @click="verifyOTP"
              :disabled="!otpPopup.codeSent || otpPopup.inputCode.length < 6">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Verifikasi &amp; Mulai Komentar
            </button>
          </div>
        </div>
      </div>
    </Transition>
    </Teleport>

    <!-- ═══════════════════════════════════
         FOTO LIGHTBOX (modern)
         ═══════════════════════════════════ -->
    <Teleport to="body">
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
    </Teleport>

    <!-- ═══════════════════════════════════
         VIDEO MODAL (YouTube-like fullscreen)
         ═══════════════════════════════════ -->
    <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="videoModal.open" class="vmod-overlay">
        <!-- Top bar -->
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

        <!-- Body -->
        <div class="vmod-body">
          <!-- Left: player + info -->
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
              <div class="vmod-desc">
                <p>{{ videos[videoModal.idx].description }}</p>
              </div>
            </div>
          </div>

          <!-- Right: sidebar -->
          <div class="vmod-sidebar" data-lenis-prevent>
            <div class="vmod-sidebar-label">Video Lainnya</div>
            <template v-for="(vid, i) in videos" :key="i">
              <div v-if="i !== videoModal.idx" class="vmod-suggestion" @click="videoModal.idx = i">
                <div class="vmod-sug-thumb">
                  <img :src="`https://img.youtube.com/vi/${vid.ytId.trim()}/mqdefault.jpg`" :alt="vid.title"
                    @error="onThumbError($event, i)" />
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

  </section>
</template>

<script setup>
import { ref, reactive, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { lenis } from '@/lenis.js'
import { articles, photos, videos } from '@/data/galleryData.js'
import emailjs from '@emailjs/browser'

// ── EmailJS — isi credentials dari emailjs.com ──
// Template perlu variabel: {{to_name}}, {{to_email}}, {{otp_code}}
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'

const router = useRouter()

const tab = ref('artikel')
const videoHover = ref(false)

const fotoActive = ref(0)
function fotoActivePrev() { if (fotoActive.value > 0) fotoActive.value-- }
function fotoActiveNext() { if (fotoActive.value < photos.length - 1) fotoActive.value++ }
const fotoOverlayRef = ref(null)

const artikelModal = reactive({ open: false, idx: 0 })
const fotoModal = reactive({ open: false, idx: 0 })
const videoModal = reactive({ open: false, idx: 0 })

// ── KOMENTAR ──
const comments = ref(typeof window !== 'undefined'
  ? JSON.parse(localStorage.getItem('bri_comments') || '[]')
  : [])
const commentText    = ref('')
const commentVerified = ref(false)
const verifiedUser   = reactive({ name: '', email: '' })

const otpPopup = reactive({
  show: false,
  name: '', email: '',
  inputCode: '', generatedCode: '',
  sending: false, codeSent: false,
  error: '', countdown: 0,
})
let otpTimer = null

const articleComments = computed(() =>
  comments.value.filter(c => c.articleIdx === artikelModal.idx)
)

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
  otpPopup.show = false
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
  router.push(`/galeri/${type}`)
}

function onThumbError(e, idx) {
  e.target.src = `https://img.youtube.com/vi/${videos[idx].ytId.trim()}/hqdefault.jpg`
}

function relatedArticles(currentIdx) {
  return articles
    .map((art, i) => ({ ...art, originalIdx: i }))
    .filter((_, i) => i !== currentIdx)
    .slice(0, 4)
}

function sidebarArticles(currentIdx) {
  return articles
    .map((art, i) => ({ ...art, originalIdx: i }))
    .filter((_, i) => i !== currentIdx)
    .slice(0, 5)
}

const allCategories = computed(() =>
  [...new Set(articles.map(a => a.category))]
)

// ── OTP & COMMENT FUNCTIONS ──
function onCommentFocus() {
  if (!commentVerified.value) {
    otpPopup.show  = true
    otpPopup.error = ''
  }
}

function generateOTP() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

async function sendOTP() {
  if (!otpPopup.name.trim() || !otpPopup.email.trim()) {
    otpPopup.error = 'Nama dan email harus diisi.'
    return
  }
  otpPopup.sending = true
  otpPopup.error   = ''
  otpPopup.generatedCode = generateOTP()
  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_name:  otpPopup.name,
      to_email: otpPopup.email,
      otp_code: otpPopup.generatedCode,
    }, EMAILJS_PUBLIC_KEY)
    otpPopup.codeSent = true
    otpPopup.inputCode = ''
    otpPopup.countdown = 60
    clearInterval(otpTimer)
    otpTimer = setInterval(() => {
      if (otpPopup.countdown > 0) otpPopup.countdown--
      else clearInterval(otpTimer)
    }, 1000)
  } catch {
    otpPopup.error = 'Gagal mengirim OTP. Periksa koneksi dan email Anda.'
  } finally {
    otpPopup.sending = false
  }
}

function verifyOTP() {
  if (otpPopup.inputCode.trim() === otpPopup.generatedCode) {
    verifiedUser.name  = otpPopup.name
    verifiedUser.email = otpPopup.email
    commentVerified.value = true
    otpPopup.show = false
    nextTick(() => document.querySelector('.comment-textarea')?.focus())
  } else {
    otpPopup.error = 'Kode OTP salah. Silakan coba lagi.'
  }
}

function submitComment() {
  const text = commentText.value.trim()
  if (!text) return
  const entry = {
    id: Date.now(),
    articleIdx: artikelModal.idx,
    name: verifiedUser.name,
    initial: verifiedUser.name.charAt(0).toUpperCase(),
    text,
    time: new Date().toLocaleString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Makassar',
    }),
  }
  comments.value = [entry, ...comments.value]
  try { localStorage.setItem('bri_comments', JSON.stringify(comments.value)) } catch {}
  commentText.value = ''
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
  })
}

</script>

<style scoped>
/* ── ARTIKEL NEW DESIGN ── */
.art-hero {
  position: relative; border-radius: 20px; overflow: hidden;
  cursor: pointer; aspect-ratio: 21/8; min-height: 240px;
  margin-bottom: 20px;
  transition: transform 0.32s cubic-bezier(0.22,1,0.36,1);
}
.art-hero:hover { transform: translateY(-2px); }
.art-hero-img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 0.55s ease;
}
.art-hero:hover .art-hero-img { transform: scale(1.03); }
.art-hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(
    to top,
    rgba(5,14,30,0.92) 0%,
    rgba(5,14,30,0.52) 45%,
    rgba(5,14,30,0.08) 70%,
    transparent 100%
  );
}
.art-hero-body {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 28px 36px; z-index: 1;
}
.art-cat-pill {
  display: inline-block; font-size: 9px; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.08em;
  background: rgba(245,166,35,0.92); color: #1a0800;
  padding: 3px 10px; border-radius: 100px; margin-bottom: 10px;
}
.art-time {
  display: block; font-size: 11px; font-weight: 600;
  color: rgba(255,255,255,0.58); margin-bottom: 10px;
}
.art-hero-title {
  font-size: clamp(17px, 2.4vw, 26px); font-weight: 800;
  color: #fff; letter-spacing: -0.02em; line-height: 1.2;
  margin-bottom: 10px; max-width: 780px;
}
.art-hero-excerpt {
  font-size: 14px; color: rgba(255,255,255,0.72); line-height: 1.6;
  max-width: 700px;
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

/* Card grid */
.art-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 18px; margin-bottom: 24px;
}
.art-card {
  background: rgba(255,255,255,0.82);
  border: 1.5px solid rgba(0,63,136,0.10);
  border-radius: 16px; overflow: hidden; cursor: pointer;
  display: flex; flex-direction: column;
  transition: all 0.28s cubic-bezier(0.22,1,0.36,1);
}
.art-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 36px rgba(0,63,136,0.12);
  border-color: rgba(0,87,184,0.26);
}
.art-card-img-wrap {
  position: relative; aspect-ratio: 16/9; overflow: hidden; flex-shrink: 0;
}
.art-card-img-wrap img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 0.42s ease;
}
.art-card:hover .art-card-img-wrap img { transform: scale(1.06); }
.art-card-cat {
  position: absolute; top: 10px; left: 10px;
  font-size: 8px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em;
  background: rgba(245,166,35,0.92); color: #1a0800;
  padding: 3px 8px; border-radius: 100px;
}
.art-card-content { padding: 16px 18px 18px; flex: 1; display: flex; flex-direction: column; }
.art-card-time { color: rgba(10,22,40,0.46) !important; margin-bottom: 8px; }
.art-card-title {
  font-size: 14.5px; font-weight: 700; color: rgba(10,22,40,0.90);
  letter-spacing: -0.01em; line-height: 1.35; margin-bottom: 8px; flex: 1;
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.art-card-excerpt {
  font-size: 12px; color: rgba(10,22,40,0.55); line-height: 1.6;
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

/* Stub — old classes */
.artikel-layout { display: none; }
.artikel-featured {
  background: rgba(0,20,60,0.06);
  border: 1.5px solid rgba(0,63,136,0.12);
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  min-height: 480px;
  transition: border-color 0.25s, transform 0.3s cubic-bezier(0.22,1,0.36,1);
  cursor: pointer;
}
.artikel-featured:hover { border-color: rgba(0,87,184,0.40); transform: translateY(-3px); }
.artikel-featured-img-wrap {
  position: absolute;
  inset: 0;
  overflow: hidden;
}
.artikel-featured-img-wrap img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 0.6s ease;
}
.artikel-featured:hover .artikel-featured-img-wrap img { transform: scale(1.04); }
.artikel-featured-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(
    to top,
    rgba(5,14,30,0.92) 0%,
    rgba(5,14,30,0.55) 40%,
    rgba(5,14,30,0.10) 75%,
    transparent 100%
  );
}
.artikel-featured-body {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 20px 22px 22px;
  z-index: 1;
}
.artikel-time {
  font-size: 11px; font-weight: 600; color: rgba(10,22,40,0.65);
  letter-spacing: 0.04em; display: block; margin-bottom: 6px;
}
.artikel-featured-body .artikel-time { color: rgba(255,255,255,0.72); }
.artikel-featured-title {
  font-size: 18px; font-weight: 700; color: rgba(10,22,40,0.92);
  line-height: 1.35; letter-spacing: -0.02em; margin-bottom: 10px;
}
.artikel-featured-body .artikel-featured-title {
  color: #ffffff;
  text-shadow: 0 1px 6px rgba(0,0,0,0.30);
}
.artikel-featured-excerpt {
  font-size: 13.5px; color: rgba(10,22,40,0.72); line-height: 1.65;
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical;
  overflow: hidden; margin: 0;
}
.artikel-featured-body .artikel-featured-excerpt { color: rgba(255,255,255,0.82); }
/* ── STACK COL (kanan) ── */
.artikel-stack-col {
  display: flex;
  flex-direction: column;
  background: rgba(255,255,255,0.72);
  border: 1.5px solid rgba(0,63,136,0.10);
  border-radius: 18px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.artikel-stack-item {
  position: relative;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(0,63,136,0.08);
  cursor: pointer;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: background 0.18s;
}
.artikel-stack-item:last-child { border-bottom: none; }
.artikel-stack-item:hover { background: rgba(255,255,255,0.65); }
.artikel-stack-item:hover .artikel-stack-arrow { opacity: 1; transform: translateX(3px); }
.artikel-stack-top {
  display: flex; align-items: center;
  justify-content: space-between; gap: 8px;
}
.artikel-stack-title {
  font-size: 13px; font-weight: 600;
  color: rgba(10,22,40,0.85);
  line-height: 1.45; margin: 0;
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
  flex: 1;
}
.artikel-stack-arrow {
  position: absolute; bottom: 14px; right: 16px;
  color: rgba(10,22,40,0.72); opacity: 0.4;
  transition: opacity 0.2s, transform 0.2s;
  flex-shrink: 0;
}

/* Old side styles kept as stub (no longer rendered) */
.artikel-side-item {
  background: rgba(255,255,255,0.80);
  border: 1.5px solid rgba(0,63,136,0.12);
  border-radius: 12px; overflow: hidden; backdrop-filter: blur(8px);
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
  font-size: 13px; font-weight: 600; color: rgba(10,22,40,0.85);
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
  background: rgba(255,255,255,0.60);
  border: 1.5px solid rgba(0,63,136,0.12);
  border-radius: 14px; overflow: hidden;
  margin-bottom: 24px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.artikel-row-item {
  display: flex; align-items: center; gap: 16px;
  padding: 14px 18px;
  cursor: pointer;
  border-bottom: 1px solid rgba(0,63,136,0.07);
  transition: background 0.18s;
}
.artikel-row-item:last-child { border-bottom: none; }
.artikel-row-item:hover { background: rgba(255,255,255,0.60); }
.artikel-row-item:hover .artikel-row-arrow { opacity: 1; transform: translateX(3px); }
.artikel-row-thumb {
  width: 110px; height: 70px; border-radius: 8px;
  overflow: hidden; flex-shrink: 0;
  background: rgba(255,255,255,0.65);
}
.artikel-row-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.artikel-row-body { flex: 1; min-width: 0; }
.artikel-row-title {
  font-size: 13.5px; font-weight: 600; color: rgba(10,22,40,0.85);
  line-height: 1.45; margin: 0;
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.artikel-row-meta {
  display: flex; flex-direction: column; align-items: flex-end; gap: 8px;
  flex-shrink: 0;
}
.artikel-row-arrow {
  color: rgba(10,22,40,0.72); opacity: 0.5;
  transition: opacity 0.2s, transform 0.2s;
}

/* ── FOTO GALLERY (redesign) ── */
.foto-gallery { display: flex; flex-direction: column; gap: 10px; }

/* Hero */
.foto-hero {
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  background: rgba(0,20,60,0.05);
  border: 1.5px solid rgba(0,63,136,0.10);
}
.foto-hero-img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 0.55s ease;
}
.foto-hero:hover .foto-hero-img { transform: scale(1.03); }

/* Fade transition for hero image */
.foto-hero-fade-enter-active, .foto-hero-fade-leave-active {
  transition: opacity 0.30s ease;
  position: absolute; inset: 0;
}
.foto-hero-fade-enter-from, .foto-hero-fade-leave-to { opacity: 0; }

/* Overlay */
.foto-hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,10,30,0.82) 0%, rgba(0,10,30,0.18) 40%, transparent 65%);
  display: flex; align-items: flex-end; justify-content: space-between;
  padding: 22px 24px;
}
.foto-hero-info { display: flex; flex-direction: column; gap: 3px; }
.foto-hero-label {
  font-size: 17px; font-weight: 700; color: #fff;
  letter-spacing: -0.02em; line-height: 1.3;
  text-shadow: 0 1px 8px rgba(0,0,0,0.45);
}
.foto-hero-count {
  font-size: 12px; font-weight: 600;
  color: rgba(255,255,255,0.60);
  letter-spacing: 0.05em;
}
.foto-hero-expand {
  width: 40px; height: 40px; border-radius: 50%;
  background: rgba(255,255,255,0.15);
  border: 1.5px solid rgba(255,255,255,0.25);
  backdrop-filter: blur(10px);
  display: flex; align-items: center; justify-content: center;
  color: #fff; flex-shrink: 0;
  transition: background 0.22s, transform 0.22s;
}
.foto-hero:hover .foto-hero-expand {
  background: rgba(255,255,255,0.26);
  transform: scale(1.08);
}

/* Arrows */
.foto-hero-arrow {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 46px; height: 46px; border-radius: 50%;
  background: rgba(10,22,40,0.40);
  border: 1.5px solid rgba(255,255,255,0.20);
  backdrop-filter: blur(12px);
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.22s, background 0.22s, transform 0.22s;
}
.foto-hero:hover .foto-hero-arrow:not(:disabled) { opacity: 1; }
.foto-hero-prev { left: 16px; }
.foto-hero-next { right: 16px; }
.foto-hero-arrow:hover:not(:disabled) {
  background: rgba(0,87,184,0.80);
  transform: translateY(-50%) scale(1.06);
}
.foto-hero-arrow:disabled { opacity: 0 !important; cursor: default; }

/* Thumbnails */
.foto-thumbs {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 8px;
}
.foto-thumb {
  position: relative;
  aspect-ratio: 4/3;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0.55;
  border: 2px solid transparent;
  transition: opacity 0.22s, transform 0.22s, border-color 0.22s;
}
.foto-thumb:hover { opacity: 0.85; transform: translateY(-2px); }
.foto-thumb.active {
  opacity: 1;
  border-color: #0057b8;
  box-shadow: 0 0 0 3px rgba(0,87,184,0.22);
}
.foto-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.foto-thumb-bar {
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 3px;
  background: #0057b8;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.25s ease;
}
.foto-thumb.active .foto-thumb-bar { transform: scaleX(1); }

/* Footer */
.foto-gallery-footer {
  display: flex; align-items: center;
  justify-content: space-between; gap: 20px;
  padding: 4px 2px;
}
.foto-progress { display: flex; align-items: center; gap: 12px; flex: 1; max-width: 260px; }
.foto-progress-track {
  flex: 1; height: 3px; border-radius: 2px;
  background: rgba(0,63,136,0.12);
  overflow: hidden;
}
.foto-progress-fill {
  height: 100%; background: #0057b8; border-radius: 2px;
  transition: width 0.35s cubic-bezier(0.22,1,0.36,1);
}
.foto-progress-label {
  font-size: 12px; font-weight: 600;
  color: rgba(10,22,40,0.55);
  white-space: nowrap;
}

/* ── VIDEO GALLERY (redesign) ── */
.vid-gallery { display: flex; flex-direction: column; gap: 12px; }

/* Hero cinematic */
.vid-hero {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  border: 1.5px solid rgba(0,63,136,0.10);
}
.vid-hero-thumb {
  position: relative;
  aspect-ratio: 21/9;
  overflow: hidden;
}
.vid-hero-thumb img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 0.55s ease;
}
.vid-hero:hover .vid-hero-thumb img { transform: scale(1.03); }
.vid-hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.08) 0%,
    transparent 28%,
    rgba(0,10,30,0.60) 65%,
    rgba(0,10,30,0.90) 100%
  );
}

/* Play button */
.vid-hero-play {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 76px; height: 76px; border-radius: 50%;
  background: rgba(204,0,0,0.90);
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  box-shadow: 0 4px 36px rgba(204,0,0,0.55);
  transition: transform 0.28s cubic-bezier(0.22,1,0.36,1), background 0.22s, box-shadow 0.28s;
}
.vid-hero-play.hovered {
  transform: translate(-50%, -50%) scale(1.14);
  background: #cc0000;
  box-shadow: 0 8px 56px rgba(204,0,0,0.70);
}

/* Info at bottom */
.vid-hero-info {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 22px 28px 68px;
  display: flex; flex-direction: column; gap: 5px;
}
.vid-hero-badge {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 10px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;
  color: #fff; background: rgba(204,0,0,0.88);
  border-radius: 100px; padding: 3px 10px;
  align-self: flex-start; margin-bottom: 2px;
}
.vid-hero-title {
  font-size: 20px; font-weight: 800; color: #fff;
  line-height: 1.3; letter-spacing: -0.02em;
  text-shadow: 0 1px 10px rgba(0,0,0,0.40);
}
.vid-hero-meta { font-size: 12.5px; color: rgba(255,255,255,0.60); font-weight: 500; }

/* "Tonton Sekarang" CTA slide-up */
.vid-hero-watch {
  position: absolute; bottom: 24px; right: 28px;
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 13px; font-weight: 700; color: #fff;
  background: rgba(255,255,255,0.15);
  border: 1.5px solid rgba(255,255,255,0.28);
  backdrop-filter: blur(10px);
  border-radius: 100px; padding: 8px 18px;
  opacity: 0; transform: translateY(8px);
  transition: opacity 0.25s, transform 0.25s;
}
.vid-hero-watch.visible { opacity: 1; transform: translateY(0); }

/* Video grid */
.vid-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.vid-card {
  background: rgba(255,255,255,0.84);
  border: 1.5px solid rgba(0,63,136,0.10);
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.25s, transform 0.32s cubic-bezier(0.22,1,0.36,1), box-shadow 0.32s;
}
.vid-card:hover {
  border-color: rgba(0,87,184,0.36);
  transform: translateY(-4px);
  box-shadow: 0 10px 36px rgba(0,63,136,0.12);
}
.vid-card-thumb {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}
.vid-card-thumb img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 0.45s ease;
}
.vid-card:hover .vid-card-thumb img { transform: scale(1.06); }
.vid-card-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.32);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.22s;
}
.vid-card:hover .vid-card-overlay { opacity: 1; }
.vid-card-play {
  width: 46px; height: 46px; border-radius: 50%;
  background: rgba(204,0,0,0.92);
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  box-shadow: 0 2px 20px rgba(204,0,0,0.60);
  transform: scale(0.80);
  transition: transform 0.25s cubic-bezier(0.22,1,0.36,1);
}
.vid-card:hover .vid-card-play { transform: scale(1); }
.vid-card-info {
  padding: 12px 14px 16px;
  display: flex; flex-direction: column; gap: 3px;
  position: relative;
}
.vid-card-num {
  position: absolute; top: 12px; right: 14px;
  font-size: 10px; font-weight: 800; letter-spacing: 0.06em;
  color: rgba(10,22,40,0.18); font-variant-numeric: tabular-nums;
}
.vid-card-title {
  font-size: 13.5px; font-weight: 700;
  color: rgba(10,22,40,0.88); line-height: 1.4;
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
  padding-right: 24px;
}
.vid-card-meta { font-size: 11.5px; color: rgba(10,22,40,0.50); margin-top: 1px; }

/* ── TAMPILKAN LAINNYA BUTTON ── */
.load-more-wrap { display: flex; justify-content: center; margin-top: 8px; margin-bottom: 4px; }
.btn-load-more {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 12px 28px; border-radius: 8px;
  background: rgba(255,255,255,0.70);
  border: 1.5px solid rgba(0,63,136,0.18);
  color: rgba(10,22,40,0.70);
  font-size: 13.5px; font-weight: 600; cursor: pointer;
  font-family: inherit; letter-spacing: 0.01em;
  transition: background 0.2s, border-color 0.2s, color 0.2s, gap 0.2s;
}
.btn-load-more:hover {
  background: rgba(0,87,184,0.12);
  border-color: rgba(59,130,246,0.55);
  color: #0057b8;
  gap: 14px;
}
.btn-load-more svg { transition: transform 0.2s; flex-shrink: 0; }
.btn-load-more:hover svg { transform: translateX(3px); }

/* ── TAMPILKAN LAINNYA MODAL ── */
.more-modal-overlay {
  position: fixed; inset: 0; background: rgba(0,10,30,0.55);
  backdrop-filter: blur(14px); z-index: 9998;
  display: flex; align-items: center; justify-content: center; padding: 40px 24px;
}
.more-modal-box {
  background: rgba(248,251,255,0.98); border: 1.5px solid rgba(0,63,136,0.12);
  border-radius: 20px; width: 100%; max-width: 680px; max-height: 85vh;
  display: flex; flex-direction: column; overflow: hidden;
  box-shadow: 0 24px 80px rgba(0,0,0,0.60);
}
.more-modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 24px; border-bottom: 1px solid rgba(0,63,136,0.10); flex-shrink: 0;
}
.more-modal-title {
  display: flex; align-items: center; gap: 8px;
  font-size: 15px; font-weight: 700; color: rgba(10,22,40,0.90);
}
.more-modal-close {
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(0,63,136,0.07); border: 1px solid rgba(0,63,136,0.14);
  color: rgba(10,22,40,0.75); display: flex; align-items: center;
  justify-content: center; cursor: pointer; transition: background 0.2s;
}
.more-modal-close:hover { background: rgba(0,63,136,0.12); }
.more-modal-scroll { overflow-y: auto; padding: 8px 0 8px; flex: 1; }

/* ── artikel / video list rows in modal ── */
.more-artikel-list { display: flex; flex-direction: column; }
.more-artikel-row {
  display: flex; align-items: center; gap: 14px;
  padding: 12px 24px;
  cursor: pointer;
  border-bottom: 1px solid rgba(0,63,136,0.07);
  transition: background 0.18s;
}
.more-artikel-row:last-child { border-bottom: none; }
.more-artikel-row:hover { background: rgba(255,255,255,0.60); }
.more-artikel-row:hover .more-artikel-row-arrow { opacity: 1; transform: translateX(3px); }
.more-artikel-row-thumb {
  width: 100px; height: 64px; border-radius: 8px;
  overflow: hidden; flex-shrink: 0;
  background: rgba(255,255,255,0.65);
}
.more-artikel-row-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.more-artikel-row-body { flex: 1; min-width: 0; }
.more-artikel-row-title {
  font-size: 13px; font-weight: 600; color: rgba(10,22,40,0.85);
  line-height: 1.45; margin: 0;
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.more-artikel-row-right {
  display: flex; flex-direction: column; align-items: flex-end; gap: 8px;
  flex-shrink: 0;
}
.more-artikel-row-arrow {
  color: rgba(10,22,40,0.72); opacity: 0.4;
  transition: opacity 0.2s, transform 0.2s;
}
.more-video-row-thumb { position: relative; }
.more-video-row-play {
  position: absolute; inset: 0; display: flex; align-items: center;
  justify-content: center; background: rgba(0,0,0,0.40); color: white;
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
.more-foto-overlay span { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.92); }
.more-video-list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.more-video-item {
  display: flex; flex-direction: column; align-items: stretch;
  background: rgba(255,255,255,0.80); border: 1px solid rgba(0,63,136,0.12);
  border-radius: 12px; overflow: hidden; cursor: pointer; transition: border-color 0.2s;
}
.more-video-item:hover { border-color: rgba(0,87,184,0.35); }
.more-video-thumb { width: 100%; aspect-ratio: 16/9; position: relative; overflow: hidden; }
.more-video-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.more-video-play {
  position: absolute; inset: 0; display: flex; align-items: center;
  justify-content: center; background: rgba(0,0,0,0.40); color: white;
}
.more-video-info { padding: 10px 12px 12px; flex: 1; }
.more-video-title { font-size: 13px; font-weight: 600; color: rgba(10,22,40,0.85); margin: 0 0 4px; line-height: 1.4; }

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
.artikel-modal-scroll { max-width: 1320px; margin: 0 auto; padding: 72px 48px 80px; }

/* ── 2-COLUMN READER LAYOUT ── */
.art-reader-layout {
  display: grid;
  grid-template-columns: 1fr 290px;
  gap: 52px;
  align-items: start;
}
.art-reader-main { min-width: 0; }

/* ── ARTICLE CONTENT ── */
.news-headline {
  font-size: clamp(22px, 3.2vw, 36px); font-weight: 800; color: #0d1117;
  line-height: 1.2; letter-spacing: -0.02em; margin: 18px 0 14px;
}
.news-meta {
  display: flex; align-items: center; gap: 8px;
  font-size: 12.5px; color: #666; flex-wrap: wrap; margin-bottom: 14px;
}
.news-date, .news-read-time { display: flex; align-items: center; gap: 4px; }
.news-category-inline { font-weight: 700; color: #003f8a; text-transform: uppercase; font-size: 11.5px; letter-spacing: 0.04em; }
.news-dot { color: #bbb; font-weight: 300; }
.news-divider { height: 1.5px; background: #e0e0e0; border-radius: 2px; margin-bottom: 24px; }
.news-figure { margin: 0 0 0; }
.news-hero-img { width: 100%; border-radius: 8px; display: block; max-height: 480px; object-fit: cover; }
.news-figure figcaption { font-size: 11.5px; color: #999; margin-top: 7px; font-style: italic; }
.news-body { font-size: 16.5px; line-height: 1.82; color: #1a1a1a; margin-top: 24px; }
:deep(.news-body p) { margin: 0 0 20px; }
:deep(.news-lead) { font-size: 18px !important; font-weight: 600 !important; color: #111 !important; line-height: 1.65 !important; }
:deep(.news-subheading) { font-size: 20px; font-weight: 700; color: #0d1117; margin: 32px 0 12px; letter-spacing: -0.01em; }
:deep(.news-quote) {
  border-left: 4px solid #003f8a; margin: 28px 0; padding: 12px 20px;
  font-size: 17px; font-style: italic; color: #333;
  background: rgba(0,63,138,0.05); border-radius: 0 8px 8px 0;
}

/* ── SIDEBAR HEADING (shared) ── */
.art-sidebar-heading {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 16px;
}
.art-sidebar-heading span {
  font-size: 14px; font-weight: 800; color: #0d1117;
  white-space: nowrap; letter-spacing: -0.01em;
}
.art-sidebar-heading::after {
  content: ''; flex: 1; height: 2px;
  background: #006400;
}

/* ── SIDEBAR ── */
.art-sidebar { position: sticky; top: 80px; display: flex; flex-direction: column; gap: 32px; }
.art-sidebar-block {}

/* Recent news list */
.art-sidebar-news-list { display: flex; flex-direction: column; gap: 0; }
.art-sidebar-news-item {
  display: flex; gap: 12px; padding: 12px 0;
  border-bottom: 1px solid #ebebeb; cursor: pointer;
  transition: background 0.15s;
}
.art-sidebar-news-item:last-child { border-bottom: none; }
.art-sidebar-news-item:hover .art-sidebar-news-title { color: #003f8a; }
.art-sidebar-thumb {
  width: 72px; height: 52px; flex-shrink: 0;
  border-radius: 6px; overflow: hidden;
}
.art-sidebar-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.art-sidebar-news-body { flex: 1; min-width: 0; }
.art-sidebar-news-title {
  font-size: 12.5px; font-weight: 600; color: #0d1117;
  line-height: 1.45; margin: 0 0 5px;
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  transition: color 0.15s;
}
.art-sidebar-news-meta { font-size: 11px; color: #888; }

/* Tag cloud */
.art-sidebar-tags { display: flex; flex-wrap: wrap; gap: 7px; }
.art-sidebar-tag {
  display: inline-block; padding: 5px 11px;
  background: #006400; color: #fff;
  font-size: 11.5px; font-weight: 700;
  border-radius: 3px; text-transform: uppercase; letter-spacing: 0.04em;
  cursor: pointer; transition: background 0.18s;
}
.art-sidebar-tag:hover { background: #004d00; }

/* ── RELATED ARTICLES ── */
.related-articles { margin: 44px 0 0; padding-top: 36px; border-top: 2px solid #e0e0e0; }
.related-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 16px; }
.related-item {
  background: #fff; border-radius: 10px; overflow: hidden;
  border: 1.5px solid #ebebeb; cursor: pointer;
  transition: border-color 0.2s, transform 0.25s, box-shadow 0.25s;
}
.related-item:hover { border-color: #003f8a; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.10); }
.related-img-wrap { aspect-ratio: 16/9; overflow: hidden; }
.related-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s; }
.related-item:hover .related-img-wrap img { transform: scale(1.04); }
.related-body { padding: 10px 12px 12px; }
.art-cat-inline {
  font-size: 10px; font-weight: 800; color: #003f8a;
  text-transform: uppercase; letter-spacing: 0.06em;
}
.related-item-title { font-size: 12.5px; font-weight: 700; color: #0d1117; line-height: 1.45; margin: 4px 0 8px; }
.related-read-link { font-size: 11px; font-weight: 600; color: #003f8a; }

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
  font-size: 13px; color: rgba(10,22,40,0.75); font-weight: 500;
  background: rgba(255,255,255,0.80); padding: 5px 14px; border-radius: 100px;
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
  color: #0057b8; flex-shrink: 0;
}
.foto-info-title { font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.90); margin-bottom: 3px; }
.foto-info-desc { font-size: 12.5px; color: rgba(255,255,255,0.50); line-height: 1.5; }
.foto-social-links { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.foto-social-label { font-size: 12px; color: rgba(255,255,255,0.42); font-weight: 500; }
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

/* ── VIDEO MODAL ── */
.vmod-overlay {
  position: fixed; inset: 0;
  background: #0c1219;
  z-index: 9999; display: flex; flex-direction: column; overflow: hidden;
}
.vmod-topbar {
  height: 52px; flex-shrink: 0; padding: 0 24px;
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(255,255,255,0.025);
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.vmod-brand { display: flex; align-items: center; gap: 10px; }
.vmod-brand-icon {
  width: 34px; height: 34px; border-radius: 50%;
  background: linear-gradient(135deg, #003f8a, #0057b8);
  display: flex; align-items: center; justify-content: center; color: #fff;
}
.vmod-brand span {
  font-size: 14px; font-weight: 700;
  color: rgba(255,255,255,0.80); letter-spacing: -0.01em;
}
.vmod-close {
  width: 38px; height: 38px; border-radius: 50%;
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.70); display: flex; align-items: center;
  justify-content: center; cursor: pointer; transition: background 0.2s, color 0.2s;
}
.vmod-close:hover { background: rgba(255,255,255,0.16); color: #fff; }
.vmod-body {
  flex: 1; overflow: hidden;
  display: grid; grid-template-columns: 1fr 340px;
}
/* Left */
.vmod-main {
  overflow-y: auto; padding: 24px 28px;
  border-right: 1px solid rgba(255,255,255,0.06);
}
.vmod-player {
  aspect-ratio: 16/9; width: 100%; background: #000;
  border-radius: 12px; overflow: hidden; margin-bottom: 20px;
  box-shadow: 0 4px 40px rgba(0,0,0,0.55);
}
.vmod-player iframe { width: 100%; height: 100%; border: none; display: block; }
.vmod-info { display: flex; flex-direction: column; gap: 14px; }
.vmod-channel-row {
  display: flex; align-items: center; gap: 12px;
  padding-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,0.07);
}
.vmod-avatar {
  width: 42px; height: 42px; border-radius: 50%; flex-shrink: 0;
  background: linear-gradient(135deg, #003f8a, #0057b8);
  display: flex; align-items: center; justify-content: center; color: #fff;
}
.vmod-channel-name { font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.90); }
.vmod-channel-sub { font-size: 12px; color: rgba(255,255,255,0.42); margin-top: 2px; }
.vmod-subscribe {
  margin-left: auto; padding: 8px 20px; border-radius: 100px;
  background: rgba(255,255,255,0.94); border: none;
  color: #0c1219; font-size: 13px; font-weight: 700;
  cursor: pointer; transition: background 0.2s; flex-shrink: 0;
}
.vmod-subscribe:hover { background: #fff; }
.vmod-title {
  font-size: 19px; font-weight: 800; color: #fff;
  line-height: 1.35; letter-spacing: -0.02em; margin: 0;
}
.vmod-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.vmod-tag {
  font-size: 12.5px; color: #60a5fa; font-weight: 500;
  cursor: pointer; transition: color 0.18s;
}
.vmod-tag:hover { color: #93c5fd; text-decoration: underline; }
.vmod-desc {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px; padding: 14px 16px;
}
.vmod-desc p { font-size: 13.5px; color: rgba(255,255,255,0.55); line-height: 1.70; margin: 0; }
/* Sidebar */
.vmod-sidebar {
  overflow-y: auto; padding: 16px 14px;
  background: rgba(0,0,0,0.20);
  display: flex; flex-direction: column; gap: 2px;
}
.vmod-sidebar-label {
  font-size: 10.5px; font-weight: 800; color: rgba(255,255,255,0.35);
  letter-spacing: 0.10em; text-transform: uppercase;
  padding: 4px 6px 12px;
  border-bottom: 1px solid rgba(255,255,255,0.07); margin-bottom: 4px;
}
.vmod-suggestion {
  display: flex; gap: 10px; border-radius: 10px; padding: 10px 8px;
  cursor: pointer; transition: background 0.18s;
}
.vmod-suggestion:hover { background: rgba(255,255,255,0.07); }
.vmod-sug-thumb {
  width: 140px; height: 80px; border-radius: 8px; flex-shrink: 0;
  overflow: hidden; background: #1a2235; position: relative;
}
.vmod-sug-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.vmod-sug-play {
  position: absolute; inset: 0; display: flex; align-items: center;
  justify-content: center; background: rgba(0,0,0,0.40); color: #fff;
  opacity: 0; transition: opacity 0.18s;
}
.vmod-suggestion:hover .vmod-sug-play { opacity: 1; }
.vmod-sug-info { flex: 1; min-width: 0; padding-top: 2px; }
.vmod-sug-title {
  font-size: 12.5px; font-weight: 600; color: rgba(255,255,255,0.82);
  line-height: 1.40; margin: 0 0 5px;
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
}
.vmod-sug-meta { font-size: 11px; color: rgba(255,255,255,0.38); }

/* Shared */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.25s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .artikel-layout { grid-template-columns: 1fr; }
  .artikel-stack-col { flex-direction: row; flex-wrap: wrap; }
  .artikel-stack-item { flex: 1 1 45%; }
  .foto-carousel-slide { flex: 0 0 50%; }
  .video-layout { grid-template-columns: 1fr; }
  .video-side-list { flex-direction: row; flex-wrap: wrap; }
  .video-side-item { flex: 1; min-width: 200px; }
  .more-foto-grid { grid-template-columns: repeat(3, 1fr); }
  .related-grid { grid-template-columns: 1fr 1fr; }
  .foto-modal-stage { padding: 60px 70px 0; }
  .foto-info-main { flex-direction: column; align-items: flex-start; gap: 12px; }
  .vmod-body { grid-template-columns: 1fr; }
  .vmod-sidebar { border-left: none; border-top: 1px solid rgba(255,255,255,0.07); max-height: 240px; }
  .vmod-sug-thumb { width: 120px; height: 68px; }
}
@media (max-width: 600px) {
  .foto-carousel-slide { flex: 0 0 100%; }
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
.vmod-main::-webkit-scrollbar,
.vmod-sidebar::-webkit-scrollbar,
.more-modal-scroll::-webkit-scrollbar { width: 4px; }
.vmod-main::-webkit-scrollbar-track,
.vmod-sidebar::-webkit-scrollbar-track,
.more-modal-scroll::-webkit-scrollbar-track { background: transparent; }
.vmod-main::-webkit-scrollbar-thumb,
.vmod-sidebar::-webkit-scrollbar-thumb,
.more-modal-scroll::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.14);
  border-radius: 100px;
}
.video-modal-left::-webkit-scrollbar-thumb:hover,
.video-modal-sidebar::-webkit-scrollbar-thumb:hover,
.more-modal-scroll::-webkit-scrollbar-thumb:hover { background: rgba(0,87,184,0.50); }

/* ══════════════════════════════════════════
   GALLERY HEADER & TABS (redesigned)
   ══════════════════════════════════════════ */
.gallery-section { padding: 80px 0; }

/* ── SECTION HEADER ── */
.news-head {
  display: flex; align-items: flex-end;
  justify-content: space-between;
  gap: 24px; margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1.5px solid rgba(0,63,136,0.10);
  flex-wrap: wrap;
}
.news-head-desc {
  font-size: 14px; color: rgba(10,22,40,0.55);
  margin-top: 8px; max-width: 420px;
}
.news-tabs {
  display: flex; align-items: center; gap: 4px;
  background: rgba(255,255,255,0.72);
  border: 1.5px solid rgba(0,63,136,0.12);
  border-radius: 14px; padding: 5px; flex-shrink: 0;
}
.news-tab {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 8px 18px; border-radius: 10px;
  background: transparent; border: none;
  font-size: 13px; font-weight: 600;
  color: rgba(10,22,40,0.56);
  cursor: pointer; font-family: inherit;
  transition: all 0.2s;
}
.news-tab svg { opacity: 0.60; transition: opacity 0.2s; }
.news-tab.active {
  background: #0057b8;
  color: #fff;
  box-shadow: 0 3px 12px rgba(0,87,184,0.28);
  font-weight: 700;
}
.news-tab.active svg { opacity: 1; filter: brightness(0) invert(1); }
.news-tab:not(.active):hover {
  background: rgba(0,87,184,0.08);
  color: rgba(10,22,40,0.82);
}

/* ══════════════════════════════════════════
   TAMPILKAN LAINNYA MODAL (full-screen redesign)
   ══════════════════════════════════════════ */

/* Full-screen overlay */
.mmore-overlay {
  position: fixed; inset: 0;
  background: rgba(240,245,255,0.98);
  backdrop-filter: blur(0);
  z-index: 9998;
  display: flex; flex-direction: column;
  overflow: hidden;
  outline: none;
}

/* Top bar */
.mmore-topbar {
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  padding: 16px 32px;
  background: #fff;
  border-bottom: 1.5px solid rgba(0,63,136,0.10);
  flex-shrink: 0;
  box-shadow: 0 2px 12px rgba(0,63,136,0.05);
}
.mmore-topbar-left {
  display: flex; align-items: center; gap: 14px;
}
.mmore-topbar-icon {
  width: 44px; height: 44px; border-radius: 12px;
  background: rgba(0,87,184,0.08);
  border: 1.5px solid rgba(0,87,184,0.16);
  display: flex; align-items: center; justify-content: center;
  color: #0057b8; flex-shrink: 0;
}
.mmore-topbar-title {
  font-size: 16px; font-weight: 800;
  color: rgba(10,22,40,0.92);
  letter-spacing: -0.02em;
}
.mmore-topbar-count {
  font-size: 12px; color: rgba(10,22,40,0.50); font-weight: 500; margin-top: 1px;
}
.mmore-close {
  width: 44px; height: 44px; border-radius: 12px;
  background: rgba(0,63,136,0.06);
  border: 1.5px solid rgba(0,63,136,0.12);
  color: rgba(10,22,40,0.72);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; flex-shrink: 0;
  transition: background 0.2s, color 0.2s;
}
.mmore-close:hover { background: rgba(0,63,136,0.12); color: rgba(10,22,40,0.92); }

/* Scrollable body */
.mmore-body {
  flex: 1; overflow-y: auto; padding: 28px 32px 40px;
}
.mmore-body::-webkit-scrollbar { width: 5px; }
.mmore-body::-webkit-scrollbar-track { background: transparent; }
.mmore-body::-webkit-scrollbar-thumb { background: rgba(0,63,136,0.15); border-radius: 4px; }

/* ── Artikel card grid ── */
.mmore-artikel-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.mmore-artikel-card {
  background: #fff;
  border: 1.5px solid rgba(0,63,136,0.10);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  display: flex; flex-direction: column;
  transition: border-color 0.22s, transform 0.28s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s;
}
.mmore-artikel-card:hover {
  border-color: rgba(0,87,184,0.32);
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(0,63,136,0.12);
}
.mmore-artikel-img {
  position: relative;
  aspect-ratio: 16/9; overflow: hidden;
}
.mmore-artikel-img img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 0.45s ease;
}
.mmore-artikel-card:hover .mmore-artikel-img img { transform: scale(1.05); }
.mmore-artikel-img-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(5,14,30,0.30) 0%, transparent 60%);
}
.mmore-artikel-body {
  padding: 16px 18px 12px; flex: 1;
}
.mmore-artikel-top {
  display: flex; align-items: center; justify-content: space-between; gap: 8px;
  margin-bottom: 8px;
}
.mmore-artikel-title {
  font-size: 14px; font-weight: 700;
  color: rgba(10,22,40,0.90);
  line-height: 1.45; margin: 0 0 8px;
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
}
.mmore-artikel-excerpt {
  font-size: 12px; color: rgba(10,22,40,0.58);
  line-height: 1.6; margin: 0;
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
}
.mmore-artikel-footer {
  display: flex; align-items: center; gap: 6px;
  padding: 10px 18px 14px;
  border-top: 1px solid rgba(0,63,136,0.07);
}
.mmore-read-link {
  font-size: 12px; font-weight: 700; color: #0057b8;
  flex: 1;
  transition: color 0.18s;
}
.mmore-artikel-card:hover .mmore-read-link { color: #003F88; }
.mmore-artikel-footer svg { color: #0057b8; flex-shrink: 0; }

/* ── Foto grid ── */
.mmore-foto-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.mmore-foto-item {
  aspect-ratio: 1; border-radius: 12px; overflow: hidden;
  position: relative; cursor: pointer;
  border: 1.5px solid transparent;
  transition: border-color 0.22s, transform 0.28s cubic-bezier(0.22,1,0.36,1);
}
.mmore-foto-item:hover {
  border-color: rgba(0,87,184,0.40);
  transform: scale(1.02);
}
.mmore-foto-item img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 0.40s ease;
}
.mmore-foto-item:hover img { transform: scale(1.08); }
.mmore-foto-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,10,30,0.75) 0%, transparent 55%);
  display: flex; align-items: flex-end; justify-content: space-between;
  padding: 12px;
  opacity: 0; transition: opacity 0.25s;
}
.mmore-foto-item:hover .mmore-foto-overlay { opacity: 1; }
.mmore-foto-label {
  font-size: 12px; font-weight: 600;
  color: rgba(255,255,255,0.92); line-height: 1.3; flex: 1;
}
.mmore-foto-overlay svg { color: #fff; flex-shrink: 0; opacity: 0.80; }

/* ── Video card grid ── */
.mmore-video-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.mmore-video-card {
  background: #fff;
  border: 1.5px solid rgba(0,63,136,0.10);
  border-radius: 14px; overflow: hidden; cursor: pointer;
  transition: border-color 0.22s, transform 0.28s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s;
}
.mmore-video-card:hover {
  border-color: rgba(0,87,184,0.30);
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(0,63,136,0.10);
}
.mmore-video-thumb {
  position: relative; aspect-ratio: 16/9; overflow: hidden;
  background: #0c1219;
}
.mmore-video-thumb img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 0.40s ease;
}
.mmore-video-card:hover .mmore-video-thumb img { transform: scale(1.05); }
.mmore-video-play {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.32);
}
.mmore-video-play svg {
  width: 46px; height: 46px;
  background: rgba(204,0,0,0.92);
  border-radius: 50%;
  padding: 12px;
  color: #fff;
  box-shadow: 0 2px 18px rgba(204,0,0,0.50);
  transform: scale(0.85);
  transition: transform 0.25s cubic-bezier(0.22,1,0.36,1);
}
.mmore-video-card:hover .mmore-video-play svg { transform: scale(1); }
.mmore-video-body {
  padding: 14px 16px 16px;
  display: flex; flex-direction: column; gap: 6px;
}
.mmore-video-title {
  font-size: 13.5px; font-weight: 700;
  color: rgba(10,22,40,0.90);
  line-height: 1.4; margin: 0;
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
}
.mmore-video-meta {
  font-size: 11.5px; color: rgba(10,22,40,0.50); font-weight: 500;
}

/* Responsive */
@media (max-width: 960px) {
  .mmore-artikel-grid { grid-template-columns: repeat(2, 1fr); }
  .mmore-video-grid { grid-template-columns: repeat(2, 1fr); }
  .mmore-foto-grid { grid-template-columns: repeat(3, 1fr); }
  .mmore-body { padding: 20px 20px 32px; }
  .mmore-topbar { padding: 14px 20px; }
}
@media (max-width: 580px) {
  .mmore-artikel-grid { grid-template-columns: 1fr; }
  .mmore-video-grid { grid-template-columns: 1fr; }
  .mmore-foto-grid { grid-template-columns: repeat(2, 1fr); }
  .mmore-body { padding: 16px 16px 28px; }
  .mmore-topbar { padding: 12px 16px; }
  .news-head { flex-direction: column; align-items: flex-start; gap: 16px; }
  .art-grid { grid-template-columns: 1fr; }
  .art-hero { aspect-ratio: 4/3; min-height: 200px; }
  .art-hero-body { padding: 20px 20px; }
}
@media (max-width: 760px) {
  .art-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .art-grid { grid-template-columns: 1fr; }
}

/* ══════════════════════════════════════════
   COMMENT SECTION
   ══════════════════════════════════════════ */
.comment-section {
  max-width: 760px; margin: 48px auto 0;
  padding: 40px 0 60px;
  border-top: 2px solid #e0e0e0;
}
.comment-section-head {
  display: flex; align-items: center; gap: 10px; margin-bottom: 28px;
  color: #0057b8;
}
.comment-section-title {
  font-size: 20px; font-weight: 800; color: #0d1117;
  letter-spacing: -0.01em; margin: 0;
}

/* List */
.comment-list { display: flex; flex-direction: column; margin-bottom: 28px; }
.comment-item {
  display: flex; gap: 14px; padding: 18px 0;
  border-bottom: 1px solid #f0f0f0;
}
.comment-item:last-child { border-bottom: none; }
.comment-avatar {
  width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
  background: linear-gradient(135deg, #003f8a, #0057b8);
  color: #fff; font-size: 15px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}
.comment-body { flex: 1; min-width: 0; }
.comment-meta {
  display: flex; align-items: center; gap: 6px;
  margin-bottom: 6px; flex-wrap: wrap;
}
.comment-name { font-size: 13px; font-weight: 700; color: #0d1117; }
.comment-dot { color: #ccc; }
.comment-time { font-size: 12px; color: #888; }
.comment-text { font-size: 14.5px; color: #333; line-height: 1.65; margin: 0; }

/* Empty */
.comment-empty {
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  padding: 32px 0 24px; color: #aaa; text-align: center;
}
.comment-empty p { font-size: 14px; margin: 0; }
.comment-empty svg { opacity: 0.30; }

/* Write */
.comment-write {
  background: #fff;
  border: 1.5px solid #e2e8f0;
  border-radius: 16px; overflow: hidden;
}
.comment-verified-user {
  display: flex; align-items: center; gap: 10px;
  padding: 14px 16px 0;
}
.comment-write-avatar {
  width: 30px; height: 30px; border-radius: 50%;
  background: linear-gradient(135deg, #003f8a, #0057b8);
  color: #fff; font-size: 12px; font-weight: 700;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.comment-write-name { font-size: 13px; font-weight: 700; color: #0d1117; }
.comment-write-badge {
  font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;
  color: #10b981; background: rgba(16,185,129,0.10);
  border: 1px solid rgba(16,185,129,0.25); border-radius: 100px; padding: 2px 8px;
}
.comment-input-wrap { padding: 12px 16px; cursor: text; }
.comment-textarea {
  width: 100%; border: none; outline: none; resize: none;
  font-size: 14.5px; font-family: inherit;
  color: #1a1a1a; background: transparent; line-height: 1.65;
  cursor: inherit;
}
.comment-textarea::placeholder { color: #bbb; }
.comment-textarea[readonly] { cursor: pointer; }
.comment-footer {
  display: flex; align-items: center; justify-content: flex-end; gap: 12px;
  padding: 10px 16px 14px;
  border-top: 1px solid #f0f0f0;
}
.comment-count { font-size: 12px; color: #bbb; }
.comment-submit-btn {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 9px 22px; border-radius: 100px;
  background: #0057b8; color: #fff; border: none;
  font-size: 13px; font-weight: 700; cursor: pointer; font-family: inherit;
  transition: background 0.2s, transform 0.18s;
}
.comment-submit-btn:hover:not(:disabled) { background: #003f88; transform: translateY(-1px); }
.comment-submit-btn:disabled { opacity: 0.40; cursor: default; }

/* ══════════════════════════════════════════
   OTP POPUP
   ══════════════════════════════════════════ */
.otp-overlay {
  position: fixed; inset: 0; z-index: 10200;
  background: rgba(0,10,30,0.65);
  backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
}
.otp-box {
  background: #fff; border-radius: 20px;
  width: 100%; max-width: 420px;
  box-shadow: 0 24px 80px rgba(0,0,0,0.30);
  padding: 28px;
}
.otp-head {
  display: flex; align-items: flex-start; gap: 14px; margin-bottom: 24px;
}
.otp-head-icon {
  width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
  background: rgba(0,87,184,0.10); border: 1.5px solid rgba(0,87,184,0.20);
  display: flex; align-items: center; justify-content: center; color: #0057b8;
}
.otp-head-text { flex: 1; }
.otp-title { font-size: 16px; font-weight: 800; color: #0d1117; margin: 0 0 4px; }
.otp-subtitle { font-size: 13px; color: #666; margin: 0; line-height: 1.5; }
.otp-close-btn {
  width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
  background: rgba(0,0,0,0.06); border: none; color: #666;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; margin-top: 2px; transition: background 0.18s;
}
.otp-close-btn:hover { background: rgba(0,0,0,0.12); }

.otp-fields { display: flex; flex-direction: column; gap: 16px; }
.otp-field { display: flex; flex-direction: column; gap: 6px; }
.otp-label {
  font-size: 11px; font-weight: 700; color: #666;
  text-transform: uppercase; letter-spacing: 0.07em;
}
.otp-input {
  width: 100%; padding: 11px 14px; border-radius: 10px;
  border: 1.5px solid #d1d5db; font-size: 14px; font-family: inherit;
  outline: none; transition: border-color 0.2s; box-sizing: border-box;
}
.otp-input:focus { border-color: #0057b8; box-shadow: 0 0 0 3px rgba(0,87,184,0.10); }
.otp-input:disabled { background: #f8f9fa; color: #999; }

.otp-email-row { display: flex; gap: 8px; align-items: stretch; }
.otp-email-row .otp-input { flex: 1; }
.otp-send-btn {
  padding: 11px 16px; border-radius: 10px; white-space: nowrap;
  background: #003f88; color: #fff; border: none;
  font-size: 13px; font-weight: 700; cursor: pointer;
  font-family: inherit; flex-shrink: 0;
  transition: background 0.2s, opacity 0.2s;
}
.otp-send-btn:hover:not(:disabled) { background: #0057b8; }
.otp-send-btn:disabled { opacity: 0.45; cursor: default; }

.otp-code-input {
  letter-spacing: 0.25em; font-size: 22px; font-weight: 700;
  text-align: center; padding: 14px;
}
.otp-hint { font-size: 12px; color: #999; margin: 0; }
.otp-error {
  font-size: 13px; color: #dc2626;
  background: rgba(220,38,38,0.07);
  border: 1px solid rgba(220,38,38,0.18);
  border-radius: 8px; padding: 9px 14px; margin: 0;
}

.otp-verify-btn {
  width: 100%; padding: 14px; border-radius: 12px;
  background: #0057b8; color: #fff; border: none;
  font-size: 14px; font-weight: 700;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  cursor: pointer; font-family: inherit; margin-top: 4px;
  transition: background 0.2s, transform 0.18s, opacity 0.2s;
}
.otp-verify-btn:hover:not(:disabled) { background: #003f88; transform: translateY(-1px); }
.otp-verify-btn:disabled { opacity: 0.38; cursor: default; }

.otp-fade-enter-active, .otp-fade-leave-active { transition: opacity 0.22s ease; }
.otp-fade-enter-from, .otp-fade-leave-to { opacity: 0; }
.otp-slide-enter-active, .otp-slide-leave-active { transition: opacity 0.22s, transform 0.22s; }
.otp-slide-enter-from { opacity: 0; transform: translateY(-8px); }
.otp-slide-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
