<template>
  <section class="portal-section">
    <div class="container">
      <div class="portal-header reveal">
        <div class="section-eyebrow">Portal Eksternal</div>
        <h2 class="section-title" style="margin-bottom:10px">Akses Portal Lainnya</h2>
        <p class="section-sub">Platform dan portal resmi yang terintegrasi dengan ekosistem BRI Group.</p>
      </div>

      <div class="portal-grid">

        <!-- Info Lelang -->
        <a href="https://infolelang.bri.co.id/" target="_blank" rel="noopener"
          class="portal-card reveal" style="--accent: #f5a623;">
          <div class="portal-card-body">
            <div class="portal-card-head">
              <div class="portal-logo-wrap">
                <img src="https://res.cloudinary.com/dnacoymkh/image/upload/v1778342902/Logo_Info_lelang_kbvebb.png" alt="Info Lelang" />
              </div>
              <div class="portal-card-meta">
                <div class="portal-card-tag">Lelang Aset</div>
                <div class="portal-card-name">Info Lelang</div>
              </div>
            </div>
            <div class="portal-card-desc">Platform lelang resmi aset BRI — temukan penawaran terbaik aset properti dan kendaraan dari seluruh Indonesia.</div>
          </div>
          <div class="portal-card-foot">
            <span class="portal-card-url">infolelang.bri.co.id</span>
            <span class="portal-card-cta">
              Kunjungi
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </span>
          </div>
          <div class="portal-card-accent"></div>
        </a>

        <!-- Karier -->
        <button class="portal-card reveal reveal-delay-1" style="--accent: #3b82f6;" @click="$emit('openCareer')">
          <div class="portal-card-body">
            <div class="portal-card-head">
              <div class="portal-logo-wrap">
                <img src="https://res.cloudinary.com/dnacoymkh/image/upload/v1778826643/logo_rekrut_n5gdut.png" alt="Karier BRI" />
              </div>
              <div class="portal-card-meta">
                <div class="portal-card-tag">Rekrutmen</div>
                <div class="portal-card-name">Karier BRI Group</div>
              </div>
            </div>
            <div class="portal-card-desc">Bergabunglah bersama BRI Group — portal rekrutmen resmi untuk talenta terbaik Indonesia di berbagai jalur karier.</div>
          </div>
          <div class="portal-card-foot">
            <span class="portal-card-url">E-Recruitment Portal</span>
            <span class="portal-card-cta">
              Lihat Portal
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </div>
          <div class="portal-card-accent"></div>
        </button>

        <!-- Saham BBRI -->
        <router-link to="/investasi" class="portal-card reveal reveal-delay-2" style="--accent: #10b981;">
          <div class="portal-card-body">
            <div class="portal-card-head">
              <div class="portal-logo-wrap">
                <img src="https://res.cloudinary.com/dnacoymkh/image/upload/v1778774735/lgogo_invest_zkkrvo.png" alt="Saham BBRI" />
              </div>
              <div class="portal-card-meta">
                <div class="portal-card-tag">Investor Relations</div>
                <div class="portal-card-name">Saham BBRI</div>
              </div>
            </div>
            <div class="portal-card-desc">Pantau kinerja saham BRI (BBRI) di Bursa Efek Indonesia — grafik interaktif, data harga, dan informasi investasi terkini.</div>
          </div>
          <div class="portal-card-foot">
            <span class="portal-card-url">IDX: BBRI</span>
            <span class="portal-card-cta">
              Lihat Grafik
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </div>
          <div class="portal-card-accent"></div>
        </router-link>

      </div>
    </div>
  </section>
</template>

<script setup>
defineEmits(['openCareer'])
</script>

<style scoped>
.portal-section { padding: 80px 0; background: transparent; }

.portal-header { margin-bottom: 48px; }

.portal-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* ── CARD ── */
.portal-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgba(255,255,255,0.80);
  border: 1.5px solid rgba(0,63,136,0.12);
  border-radius: 18px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  text-decoration: none;
  text-align: left;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.28s, transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s;
 
}
.portal-card:hover {
  border-color: rgba(0,87,184,0.30);
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0,63,136,0.12);
}

/* bottom accent line */
.portal-card-accent {
  height: 3px;
  background: var(--accent, rgba(0,87,184,0.50));
  flex-shrink: 0;
  opacity: 0;
  transform: scaleX(0);
  transform-origin: left center;
  transition: opacity 0.28s, transform 0.32s cubic-bezier(0.22,1,0.36,1);
}
.portal-card:hover .portal-card-accent { opacity: 1; transform: scaleX(1); }

/* body */
.portal-card-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 24px 16px;
  flex: 1;
}

/* icon + tag + name row */
.portal-card-head {
  display: flex;
  align-items: center;
  gap: 16px;
}

.portal-logo-wrap {
  width: 48px; height: 48px;
  flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.portal-logo-wrap img {
  width: 48px; height: 48px;
  object-fit: contain; display: block;
}

.portal-card-meta {
  display: flex; flex-direction: column; gap: 4px;
  min-width: 0;
}

.portal-card-tag {
  font-size: 10px; font-weight: 800;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--accent, rgba(0,87,184,0.70));
  opacity: 0.90;
}
.portal-card-name {
  font-size: 17px; font-weight: 800;
  color: rgba(10,22,40,0.92);
  letter-spacing: -0.02em; line-height: 1.2;
}
.portal-card-desc {
  font-size: 13.5px;
  color: rgba(10,22,40,0.72);
  line-height: 1.7;
}

/* footer */
.portal-card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  border-top: 1px solid rgba(0,63,136,0.08);
  margin-top: auto;
  gap: 12px;
}
.portal-card-url {
  font-size: 12px; font-weight: 600;
  color: rgba(10,22,40,0.58);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.portal-card-cta {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 12px; font-weight: 700;
  color: var(--accent, #0057b8);
  flex-shrink: 0;
  transition: gap 0.2s;
}
.portal-card:hover .portal-card-cta { gap: 8px; }

@media (max-width: 960px) {
  .portal-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .portal-grid { grid-template-columns: 1fr; }
}
</style>
