<template>
  <section class="portal-section">
    <div class="container">
      <div class="portal-layout">
        <div class="portal-left reveal">
          <div class="section-eyebrow">Portal Eksternal</div>
          <h2 class="section-title">Akses Portal<br>Lainnya</h2>
          <p class="section-sub">Portal dan platform resmi yang terintegrasi dengan ekosistem BRI.</p>
        </div>
        <div class="portal-grid">
          <a href="https://infolelang.bri.co.id/" target="_blank" class="portal-card reveal">
            <div class="portal-card-header">
              <div class="portal-card-logo">
                <img src="https://res.cloudinary.com/dnacoymkh/image/upload/v1778342902/Logo_Info_lelang_kbvebb.png" alt="Info Lelang" />
              </div>
              <div class="portal-card-name">Info Lelang</div>
            </div>
            <div class="portal-card-desc">Platform lelang resmi aset BRI — temukan penawaran terbaik aset properti dan kendaraan.</div>
            <span class="portal-card-url">infolelang.bri.co.id</span>
            <div class="portal-card-arrow">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </a>

          <button class="portal-card reveal reveal-delay-1" @click="$emit('openCareer')">
            <div class="portal-card-header">
              <div class="portal-card-logo">
                <img src="https://res.cloudinary.com/dnacoymkh/image/upload/v1778826643/logo_rekrut_n5gdut.png" alt="Karier BRI" />
              </div>
              <div class="portal-card-name">Karier</div>
            </div>
            <div class="portal-card-desc">Bergabunglah bersama BRI Group — portal rekrutmen resmi untuk talenta terbaik Indonesia.</div>
            <span class="portal-card-url">E-Recruitment Portal</span>
            <div class="portal-card-arrow">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </button>

          <a href="https://www.ir-bri.com/" target="_blank" class="portal-card reveal reveal-delay-2">
            <div class="portal-card-header">
              <div class="portal-card-logo">
                <img src="https://res.cloudinary.com/dnacoymkh/image/upload/v1778774735/lgogo_invest_zkkrvo.png" alt="Investor Relations" />
              </div>
              <div class="portal-card-name">Investor Relations</div>
            </div>
            <div class="portal-card-desc">Informasi saham BBRI, laporan keuangan, dan data korporat untuk para investor.</div>
            <span class="portal-card-url">ir-bri.com</span>
            <div class="portal-card-arrow">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineEmits(['openCareer'])
</script>

<style scoped>
.portal-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.portal-card-name {
  font-size: 15px;
  font-weight: 600;
  color: rgba(255,255,255,0.92);
}
</style>
