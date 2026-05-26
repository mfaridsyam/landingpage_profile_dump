<template>
  <!-- Toast notification -->
  <Teleport to="body">
    <Transition name="toast">
      <div v-if="showToast" class="toast-success">
        <div class="toast-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div class="toast-body">
          <div class="toast-title">Pesan Terkirim!</div>
          <div class="toast-sub">Kami akan menghubungi Anda segera.</div>
        </div>
        <button class="toast-close" @click="showToast = false">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </Transition>
  </Teleport>

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
          <!-- Response time note -->
          <div class="contact-response-note reveal reveal-delay-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            Kami biasanya membalas dalam <strong>1x24 jam</strong> hari kerja.
          </div>
        </div>

        <!-- Enhanced form -->
        <div class="reveal">
          <form class="contact-form" @submit.prevent="handleSubmit" novalidate>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Nama Lengkap <span class="form-required">*</span></label>
                <input
                  type="text"
                  class="form-input"
                  :class="{ 'input-error': errors.nama }"
                  placeholder="Nama Anda"
                  v-model="form.nama"
                  @blur="validateField('nama')"
                />
                <span v-if="errors.nama" class="form-error-msg">{{ errors.nama }}</span>
              </div>
              <div class="form-group">
                <label class="form-label">No. Telepon</label>
                <input type="tel" class="form-input" placeholder="08xx-xxxx-xxxx" v-model="form.phone" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Email <span class="form-required">*</span></label>
              <input
                type="email"
                class="form-input"
                :class="{ 'input-error': errors.email }"
                placeholder="nama@email.com"
                v-model="form.email"
                @blur="validateField('email')"
              />
              <span v-if="errors.email" class="form-error-msg">{{ errors.email }}</span>
            </div>

            <div class="form-group">
              <label class="form-label">Kategori</label>
              <div class="form-select-wrap">
                <select class="form-input form-select" v-model="form.kategori">
                  <option value="">Pilih kategori pertanyaan...</option>
                  <option value="umum">Pertanyaan Umum</option>
                  <option value="layanan">Informasi Produk &amp; Layanan</option>
                  <option value="kredit">Pengajuan KUR / Kredit</option>
                  <option value="digital">Layanan Digital (BRImo)</option>
                  <option value="lainnya">Lainnya</option>
                </select>
                <svg class="form-select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Pesan <span class="form-required">*</span></label>
              <textarea
                class="form-textarea"
                :class="{ 'input-error': errors.pesan }"
                placeholder="Tuliskan pesan Anda di sini..."
                v-model="form.pesan"
                @blur="validateField('pesan')"
              ></textarea>
              <span v-if="errors.pesan" class="form-error-msg">{{ errors.pesan }}</span>
            </div>

            <button type="submit" class="btn-form" :disabled="isSubmitting">
              <template v-if="isSubmitting">
                <svg class="spin-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                Mengirim...
              </template>
              <template v-else>
                Kirim Pesan
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </template>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'

const showToast = ref(false)
const isSubmitting = ref(false)

const form = reactive({
  nama: '',
  phone: '',
  email: '',
  kategori: '',
  pesan: '',
})

const errors = reactive({
  nama: '',
  email: '',
  pesan: '',
})

function validateField(field) {
  if (field === 'nama') {
    errors.nama = form.nama.trim() ? '' : 'Nama lengkap wajib diisi.'
  }
  if (field === 'email') {
    if (!form.email.trim()) {
      errors.email = 'Email wajib diisi.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Format email tidak valid.'
    } else {
      errors.email = ''
    }
  }
  if (field === 'pesan') {
    errors.pesan = form.pesan.trim() ? '' : 'Pesan wajib diisi.'
  }
}

function validate() {
  validateField('nama')
  validateField('email')
  validateField('pesan')
  return !errors.nama && !errors.email && !errors.pesan
}

function resetForm() {
  form.nama = ''
  form.phone = ''
  form.email = ''
  form.kategori = ''
  form.pesan = ''
  errors.nama = ''
  errors.email = ''
  errors.pesan = ''
}

async function handleSubmit() {
  if (!validate()) return
  isSubmitting.value = true
  await new Promise(r => setTimeout(r, 1400))
  isSubmitting.value = false
  resetForm()
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 5000)
}

const contactItems = [
  {
    label: 'Alamat Kantor',
    val: 'Jl. H. Andi Depu No.177, Polewali',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>`,
  },
  {
    label: 'Telepon Cabang',
    val: '(0428) 21027',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6.6 10.8a15.2 15.2 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/><path d="M16.5 4.5c1.5.5 2.7 1.7 3.2 3.2"/><path d="M16.5 1c3 .7 5.3 3 6 6"/></svg>`,
  },
  {
    label: 'Jam Operasional',
    val: 'Sen – Jum: 08.00 – 15.30',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  },
]
</script>

<style scoped>
.form-required { color: #f87171; margin-left: 2px; }

.form-select-wrap {
  position: relative;
}
.form-select {
  cursor: pointer;
  appearance: none;
  padding-right: 36px;
}
.form-select option { background: #0F1E35; color: white; }
.form-select-chevron {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255,255,255,0.40);
  pointer-events: none;
}

.input-error {
  border-color: rgba(248,113,113,0.55) !important;
  box-shadow: 0 0 0 3px rgba(248,113,113,0.10) !important;
}
.form-error-msg {
  font-size: 11.5px;
  color: #f87171;
  margin-top: 4px;
  display: block;
}

.btn-form:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
}
.spin-icon {
  animation: spin 0.9s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

.contact-response-note {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: rgba(255,255,255,0.30);
  padding: 14px 16px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 10px;
}
.contact-response-note strong { color: rgba(255,255,255,0.50); font-weight: 600; }
.contact-response-note svg { flex-shrink: 0; color: rgba(255,255,255,0.25); }
</style>
