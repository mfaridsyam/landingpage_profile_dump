<template>
  <section class="contact-section" id="kontak">
    <div class="container">
      <div class="section-eyebrow reveal">Kontak</div>
      <h2 class="section-title reveal">Hubungi Kami</h2>
      <p class="section-sub reveal">Tim kami siap membantu setiap pertanyaan dan kebutuhan perbankan Anda.</p>
      <div class="contact-grid">
        <!-- Info cards -->
        <div class="contact-info-list">
          <div v-for="(item, i) in contactItems" :key="item.label" class="contact-info-item reveal" :class="i > 0 ? `reveal-delay-${i}` : ''">
            <div class="contact-icon" v-html="item.icon"></div>
            <div>
              <div class="contact-info-label">{{ item.label }}</div>
              <div class="contact-info-val">{{ item.val }}</div>
            </div>
          </div>
        </div>

        <div class="reveal">
          <form class="contact-form" @submit.prevent>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Nama Lengkap</label>
                <input type="text" class="form-input" placeholder="Nama Anda" />
              </div>
              <div class="form-group">
                <label class="form-label">No. Telepon</label>
                <input type="tel" class="form-input" placeholder="08xx-xxxx-xxxx" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" class="form-input" placeholder="nama@email.com" />
            </div>
            <div class="form-group">
              <label class="form-label">Subjek</label>
              <input type="text" class="form-input" placeholder="Pertanyaan / keperluan Anda" />
            </div>
            <div class="form-group">
              <label class="form-label">Pesan</label>
              <textarea class="form-textarea" placeholder="Tuliskan pesan Anda di sini..."></textarea>
            </div>
            <button type="submit" class="btn-form">
              Kirim Pesan
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const contactItems = [
  {
    label: 'Alamat Kantor',
    val: 'Jl. H. Andi Depu No.177, Polewali',
    // Same map pin icon as HeroSection alamat card
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>`,
  },
  {
    label: 'Telepon Cabang',
    val: '(0428) 21027',
    // Handset with signal waves — distinct phone icon
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6.6 10.8a15.2 15.2 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/><path d="M16.5 4.5c1.5.5 2.7 1.7 3.2 3.2"/><path d="M16.5 1c3 .7 5.3 3 6 6"/></svg>`,
  },
  {
    label: 'Jam Operasional',
    val: 'Sen – Jum: 08.00 – 15.30',
    // Same clock icon as HeroSection jam operasional
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  },
]
</script>

<style scoped>
</style>
