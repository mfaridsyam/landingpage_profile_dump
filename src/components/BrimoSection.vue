<template>
  <section class="brimo-section" id="brimo">
    <div class="container">
      <div class="brimo-inner">

        <!-- Left: Info -->
        <div class="brimo-info reveal">
          <div class="section-eyebrow">Mobile Banking</div>
          <h2 class="section-title" style="margin-bottom: 20px">
            BRImo<br><em>Financial Super App</em>
          </h2>
          <p class="brimo-desc">
            BRImo merupakan financial super app untuk beragam transaksi nasabah kapan pun dan di mana pun.
            Mulai dari online on boarding, pembayaran, pembelian, investasi, asuransi, hingga pencatatan keuangan.
            BRImo juga mendukung transfer internasional ke lebih dari 160 negara serta pembayaran QR di luar negeri.
          </p>
          <div class="brimo-features">
            <div class="brimo-feat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Transfer ke 160+ negara
            </div>
            <div class="brimo-feat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Pembayaran QR luar negeri
            </div>
            <div class="brimo-feat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Investasi &amp; asuransi digital
            </div>
            <div class="brimo-feat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Online onboarding 24/7
            </div>
          </div>
        </div>

        <!-- Right: Download card -->
        <div class="brimo-dl-card reveal reveal-delay-1">
          <div class="brimo-dl-heading">Download BRImo</div>
          <div class="brimo-dl-sub">Tersedia di semua perangkat mobile</div>

          <div class="brimo-badges">
            <a href="https://play.google.com/store/apps/details?id=id.co.bri.brimo&hl=id"
               target="_blank" rel="noopener" class="brimo-badge">
              <img
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
                class="brimo-badge-img brimo-badge-img--gplay"
              />
            </a>
            <a href="https://apps.apple.com/id/app/brimo-bri/id1439730817"
               target="_blank" rel="noopener" class="brimo-badge">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                class="brimo-badge-img"
              />
            </a>
          </div>

          <div class="brimo-divider"></div>
          <div class="brimo-hashtags">#BRI &nbsp; #BRImo &nbsp; #BRImoMudahSerbaBisa</div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.brimo-section {
  padding: 96px 0;
  background: transparent;
}

/* ────────────────────────────────
   LAYOUT — desktop default (≥1280)
   ──────────────────────────────── */
.brimo-inner {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 56px;
  align-items: center;
}

/* ── LEFT INFO ── */
.brimo-desc {
  font-size: 15px;
  color: rgba(10,22,40,0.72);
  line-height: 1.8;
  margin: 0 0 28px;
}

.brimo-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;
}

.brimo-feat {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 600;
  color: rgba(10,22,40,0.60);
}

.brimo-feat svg {
  flex-shrink: 0;
  color: #0057b8;
}

/* ── RIGHT CARD ── */
.brimo-dl-card {
  background: rgba(255,255,255,0.82);
  border: 1.5px solid rgba(0,63,136,0.12);
  border-radius: 28px;
  padding: 44px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 14px;
 
}

.brimo-dl-heading {
  font-size: 22px;
  font-weight: 800;
  color: var(--ink, #0A1628);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.brimo-dl-sub {
  font-size: 13.5px;
  color: rgba(10,22,40,0.65);
  margin-bottom: 6px;
}

.brimo-badges {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
}

.brimo-badge {
  display: block;
  border-radius: 10px;
  overflow: hidden;
  line-height: 0;
  transition: transform 0.28s cubic-bezier(0.22,1,0.36,1), opacity 0.24s;
  opacity: 0.90;
}
.brimo-badge:hover {
  transform: scale(1.06);
  opacity: 1;
}

/* Samakan tinggi visual — Google Play butuh nilai lebih besar karena padding internal gambar */
.brimo-badge-img {
  display: block;
  height: 44px;
  width: auto;
}
.brimo-badge-img--gplay {
  height: 64px; /* kompensasi ~30% whitespace built-in pada badge Google Play */
}

.brimo-divider {
  width: 100%;
  height: 1px;
  background: rgba(0,63,136,0.10);
  margin: 2px 0;
}

.brimo-hashtags {
  font-size: 12px;
  font-weight: 700;
  color: rgba(10,22,40,0.75);
  letter-spacing: 0.04em;
}

/* ────────────────────────────────
   LAPTOP — medium (1024–1279px)
   ──────────────────────────────── */
@media (max-width: 1279px) {
  .brimo-section { padding: 88px 0; }
  .brimo-inner { gap: 44px; }
  .brimo-dl-card { padding: 40px 32px; }
  .brimo-desc { font-size: 14.5px; }
}

/* ────────────────────────────────
   LAPTOP — small (900–1023px)
   ──────────────────────────────── */
@media (max-width: 1023px) {
  .brimo-inner {
    grid-template-columns: 1fr 1fr;
    gap: 36px;
  }
  .brimo-dl-card { padding: 36px 28px; border-radius: 24px; }
  .brimo-dl-heading { font-size: 20px; }
  .brimo-features { gap: 10px 16px; }
  .brimo-feat { font-size: 13px; }
}

/* ────────────────────────────────
   TABLET LANDSCAPE (768–899px)
   ──────────────────────────────── */
@media (max-width: 899px) {
  .brimo-section { padding: 72px 0; }
  .brimo-inner {
    grid-template-columns: 1fr 1fr;
    gap: 28px;
    align-items: start;
  }
  .brimo-dl-card { padding: 32px 24px; }
  .brimo-dl-heading { font-size: 18px; }
  .brimo-dl-sub { font-size: 13px; }
  .brimo-desc { font-size: 14px; }
}

/* ────────────────────────────────
   TABLET PORTRAIT (600–767px)
   ──────────────────────────────── */
@media (max-width: 767px) {
  .brimo-section { padding: 64px 0; }
  .brimo-inner {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .brimo-features {
    grid-template-columns: 1fr 1fr;
  }
  .brimo-dl-card {
    padding: 36px 32px;
    border-radius: 22px;
    max-width: 420px;
    margin: 0 auto;
    width: 100%;
  }
  .brimo-dl-heading { font-size: 20px; }
  .brimo-badge-img { height: 40px; }
  .brimo-badge-img--gplay { height: 60px; }
}

/* ────────────────────────────────
   SMARTPHONE — large (480–599px)
   ──────────────────────────────── */
@media (max-width: 599px) {
  .brimo-section { padding: 56px 0; }
  .brimo-inner { gap: 28px; }
  .brimo-desc { font-size: 14px; line-height: 1.75; }
  .brimo-features { grid-template-columns: 1fr 1fr; gap: 10px 14px; }
  .brimo-feat { font-size: 12.5px; }
  .brimo-dl-card {
    padding: 32px 24px;
    max-width: 100%;
    border-radius: 20px;
  }
  .brimo-dl-heading { font-size: 19px; }
  .brimo-badges { flex-direction: column; }
  .brimo-badge-img { height: 40px; }
  .brimo-badge-img--gplay { height: 60px; }
}

/* ────────────────────────────────
   SMARTPHONE — medium (390–479px)
   ──────────────────────────────── */
@media (max-width: 479px) {
  .brimo-section { padding: 48px 0; }
  .brimo-features { grid-template-columns: 1fr; gap: 10px; }
  .brimo-dl-card { padding: 28px 20px; border-radius: 18px; gap: 12px; }
  .brimo-dl-heading { font-size: 18px; }
  .brimo-dl-sub { font-size: 12.5px; }
  .brimo-badge-img { height: 38px; }
  .brimo-badge-img--gplay { height: 57px; }
  .brimo-hashtags { font-size: 11.5px; }
}

/* ────────────────────────────────
   SMARTPHONE — small (≤389px)
   ──────────────────────────────── */
@media (max-width: 389px) {
  .brimo-section { padding: 44px 0; }
  .brimo-dl-card { padding: 24px 16px; border-radius: 16px; }
  .brimo-dl-heading { font-size: 17px; }
  .brimo-desc { font-size: 13.5px; }
  .brimo-feat { font-size: 12px; }
  .brimo-badge-img { height: 36px; }
  .brimo-badge-img--gplay { height: 54px; }
}
</style>
