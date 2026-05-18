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
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  },
  {
    label: 'Telepon Cabang',
    val: '(0428) 21027',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12 19.79 19.79 0 011.65 3.56 2 2 0 013.62 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.6a16 16 0 006 6l.96-.96a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0121.28 16z"/></svg>`,
  },
  {
    label: 'Jam Operasional',
    val: 'Sen – Jum: 08.00 – 15.30',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  },
]
</script>

<style scoped>
</style>