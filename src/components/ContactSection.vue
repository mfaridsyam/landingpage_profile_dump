<template>
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

      <div class="contact-layout">

        <!-- ── LEFT: info panel ── -->
        <div class="contact-left reveal">
          <div class="section-eyebrow">Kontak</div>
          <h2 class="section-title" style="margin-bottom:14px">Ada yang bisa<br>kami bantu?</h2>
          <p class="contact-intro">Tim BRI Cabang Polewali siap melayani setiap pertanyaan seputar produk, layanan, dan informasi perbankan Anda.</p>

          <div class="contact-items">
            <div class="contact-item">
              <div class="contact-item-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              </div>
              <div class="contact-item-body">
                <div class="contact-item-label">Alamat</div>
                <div class="contact-item-val">Jl. H. Andi Depu No.177, Polewali</div>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-item-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
              </div>
              <div class="contact-item-body">
                <div class="contact-item-label">Jam Operasional</div>
                <div class="contact-item-val">Senin – Jumat: 08.00 – 15.30</div>
              </div>
            </div>
          </div>

          <div class="contact-divider"></div>

          <div class="contact-direct-label">Hubungi Langsung</div>
          <div class="contact-direct-btns">
            <a href="tel:042821027" class="contact-btn contact-btn-phone">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6.6 10.8a15.2 15.2 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
              (0428) 21027
            </a>
            <a href="https://wa.me/6214017" target="_blank" class="contact-btn contact-btn-wa">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp 14017
            </a>
          </div>

          <div class="contact-response-note">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            Biasanya membalas dalam <strong>1×24 jam</strong> hari kerja.
          </div>
        </div>

        <!-- ── RIGHT: form ── -->
        <div class="contact-right reveal reveal-delay-1">
          <form class="contact-form" @submit.prevent="handleSubmit" novalidate>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Nama Lengkap <span class="form-required">*</span></label>
                <input type="text" class="form-input" :class="{ 'input-error': errors.nama }"
                  placeholder="Nama Anda" v-model="form.nama" @blur="validateField('nama')" />
                <span v-if="errors.nama" class="form-error-msg">{{ errors.nama }}</span>
              </div>
              <div class="form-group">
                <label class="form-label">No. Telepon</label>
                <input type="tel" class="form-input" placeholder="08xx-xxxx-xxxx" v-model="form.phone" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Email <span class="form-required">*</span></label>
              <input type="email" class="form-input" :class="{ 'input-error': errors.email }"
                placeholder="nama@email.com" v-model="form.email" @blur="validateField('email')" />
              <span v-if="errors.email" class="form-error-msg">{{ errors.email }}</span>
            </div>

            <div class="form-group">
              <label class="form-label">Pesan <span class="form-required">*</span></label>
              <textarea class="form-textarea" :class="{ 'input-error': errors.pesan }"
                placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                v-model="form.pesan" @blur="validateField('pesan')"></textarea>
              <span v-if="errors.pesan" class="form-error-msg">{{ errors.pesan }}</span>
            </div>

            <button type="submit" class="btn-submit" :disabled="isSubmitting">
              <template v-if="isSubmitting">
                <svg class="spin-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                Mengirim...
              </template>
              <template v-else>
                Kirim Pesan
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
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

const form = reactive({ nama: '', phone: '', email: '', pesan: '' })
const errors = reactive({ nama: '', email: '', pesan: '' })

function validateField(field) {
  if (field === 'nama') errors.nama = form.nama.trim() ? '' : 'Nama lengkap wajib diisi.'
  if (field === 'email') {
    if (!form.email.trim()) errors.email = 'Email wajib diisi.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Format email tidak valid.'
    else errors.email = ''
  }
  if (field === 'pesan') errors.pesan = form.pesan.trim() ? '' : 'Pesan wajib diisi.'
}

function validate() {
  validateField('nama'); validateField('email'); validateField('pesan')
  return !errors.nama && !errors.email && !errors.pesan
}

function resetForm() {
  form.nama = ''; form.phone = ''; form.email = ''; form.pesan = ''
  errors.nama = ''; errors.email = ''; errors.pesan = ''
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
</script>

<style scoped>
.contact-section { padding: 88px 0; background: transparent; }

.contact-layout {
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 64px;
  align-items: start;
}

/* ── LEFT ── */
.contact-intro {
  font-size: 15px;
  color: rgba(255,255,255,0.50);
  line-height: 1.75;
  margin-bottom: 36px;
  max-width: 340px;
}

.contact-items { display: flex; flex-direction: column; gap: 0; }
.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 18px 0;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.contact-item:first-child { border-top: 1px solid rgba(255,255,255,0.07); }
.contact-item-icon {
  width: 38px; height: 38px;
  border-radius: 10px;
  background: rgba(0,87,184,0.18);
  border: 1px solid rgba(0,87,184,0.28);
  display: flex; align-items: center; justify-content: center;
  color: #60a5fa; flex-shrink: 0;
  margin-top: 1px;
}
.contact-item-label {
  font-size: 11px; font-weight: 700;
  color: rgba(255,255,255,0.35);
  letter-spacing: 0.07em; text-transform: uppercase;
  margin-bottom: 4px;
}
.contact-item-val {
  font-size: 14px; font-weight: 500;
  color: rgba(255,255,255,0.80);
  line-height: 1.4;
}

.contact-divider {
  height: 1px;
  background: rgba(255,255,255,0.07);
  margin: 28px 0 22px;
}

.contact-direct-label {
  font-size: 11px; font-weight: 700;
  color: rgba(255,255,255,0.30);
  letter-spacing: 0.08em; text-transform: uppercase;
  margin-bottom: 14px;
}
.contact-direct-btns { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px; }
.contact-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 18px; border-radius: 10px;
  font-size: 13.5px; font-weight: 600;
  text-decoration: none; cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
  flex-shrink: 0;
}
.contact-btn:hover { opacity: 0.85; transform: translateY(-1px); }
.contact-btn-phone {
  background: rgba(255,255,255,0.08);
  border: 1.5px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.82);
}
.contact-btn-wa {
  background: #25d366;
  border: 1.5px solid #25d366;
  color: #fff;
}

.contact-response-note {
  display: flex; align-items: center; gap: 7px;
  font-size: 12px; color: rgba(255,255,255,0.28);
}
.contact-response-note strong { color: rgba(255,255,255,0.45); font-weight: 600; }
.contact-response-note svg { flex-shrink: 0; }

/* ── RIGHT / FORM ── */
.contact-right {
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.10);
  border-radius: 20px;
  padding: 36px 32px;
  backdrop-filter: blur(10px);
}

.contact-form { display: flex; flex-direction: column; gap: 20px; }

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

.form-group { display: flex; flex-direction: column; gap: 8px; }

.form-label {
  font-size: 12.5px; font-weight: 700;
  color: rgba(255,255,255,0.55);
  letter-spacing: 0.01em;
}
.form-required { color: #f87171; margin-left: 2px; }

.form-input {
  background: rgba(255,255,255,0.05);
  border: 1.5px solid rgba(255,255,255,0.10);
  border-radius: 10px;
  color: rgba(255,255,255,0.88);
  font-family: inherit; font-size: 14px; font-weight: 500;
  padding: 12px 14px;
  outline: none; width: 100%;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.form-input::placeholder { color: rgba(255,255,255,0.22); }
.form-input:focus {
  border-color: rgba(0,87,184,0.55);
  box-shadow: 0 0 0 3px rgba(0,87,184,0.12);
}

.form-textarea {
  background: rgba(255,255,255,0.05);
  border: 1.5px solid rgba(255,255,255,0.10);
  border-radius: 10px;
  color: rgba(255,255,255,0.88);
  font-family: inherit; font-size: 14px; font-weight: 500;
  padding: 12px 14px;
  outline: none; width: 100%; resize: vertical; min-height: 130px;
  transition: border-color 0.2s, box-shadow 0.2s;
  line-height: 1.6;
}
.form-textarea::placeholder { color: rgba(255,255,255,0.22); }
.form-textarea:focus {
  border-color: rgba(0,87,184,0.55);
  box-shadow: 0 0 0 3px rgba(0,87,184,0.12);
}

.input-error {
  border-color: rgba(248,113,113,0.55) !important;
  box-shadow: 0 0 0 3px rgba(248,113,113,0.10) !important;
}
.form-error-msg {
  font-size: 11.5px; color: #f87171; display: block;
}

.btn-submit {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%; padding: 14px;
  background: var(--bri-gold, #F5A623);
  color: #0A1628;
  border: none; border-radius: 10px;
  font-family: inherit; font-size: 14.5px; font-weight: 800;
  cursor: pointer; margin-top: 4px;
  transition: background 0.2s, transform 0.2s, opacity 0.2s;
}
.btn-submit:hover:not(:disabled) { background: #f8b83c; transform: translateY(-1px); }
.btn-submit:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }
.spin-icon { animation: spin 0.9s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .contact-layout { grid-template-columns: 1fr; gap: 40px; }
  .contact-intro { max-width: 100%; }
}
@media (max-width: 600px) {
  .contact-right { padding: 24px 20px; }
  .form-row { grid-template-columns: 1fr; }
  .contact-direct-btns { flex-direction: column; }
  .contact-btn { justify-content: center; }
}
</style>
