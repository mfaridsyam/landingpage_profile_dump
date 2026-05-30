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

      <div class="contact-header reveal">
        <div class="section-eyebrow">Kontak</div>
        <h2 class="section-title" style="margin-bottom:10px">Ada yang bisa kami bantu?</h2>
        <p class="section-sub" style="max-width:500px">Tim BRI Cabang Polewali siap melayani setiap pertanyaan seputar produk, layanan, dan informasi perbankan Anda.</p>
      </div>

      <!-- Info strip -->
      <div class="contact-strip reveal">
        <div class="contact-strip-item">
          <div class="contact-strip-icon">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
          </div>
          <div>
            <div class="contact-strip-lbl">Alamat</div>
            <div class="contact-strip-val">Jl. H. Andi Depu No.177, Polewali</div>
          </div>
        </div>
        <div class="contact-strip-sep"></div>
        <div class="contact-strip-item">
          <div class="contact-strip-icon">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
          </div>
          <div>
            <div class="contact-strip-lbl">Jam Operasional</div>
            <div class="contact-strip-val">Senin – Jumat, 08.00 – 15.30</div>
          </div>
        </div>
        <div class="contact-strip-sep"></div>
        <div class="contact-strip-item">
          <a href="tel:042821027" class="contact-strip-btn btn-phone">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6.6 10.8a15.2 15.2 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
            (0428) 21027
          </a>
          <a href="https://wa.me/6214017" target="_blank" class="contact-strip-btn btn-wa">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp 14017
          </a>
        </div>
      </div>

      <!-- Form card -->
      <div class="contact-form-card reveal">
        <form class="contact-form" @submit.prevent="handleSubmit" novalidate>

          <div class="form-row-3">
            <div class="form-group">
              <label class="form-label">Nama Lengkap <span class="req">*</span></label>
              <input type="text" class="form-input" :class="{ err: errors.nama }"
                placeholder="Nama Anda" v-model="form.nama" @blur="validateField('nama')" />
              <span v-if="errors.nama" class="form-err">{{ errors.nama }}</span>
            </div>
            <div class="form-group">
              <label class="form-label">Email <span class="req">*</span></label>
              <input type="email" class="form-input" :class="{ err: errors.email }"
                placeholder="nama@email.com" v-model="form.email" @blur="validateField('email')" />
              <span v-if="errors.email" class="form-err">{{ errors.email }}</span>
            </div>
            <div class="form-group">
              <label class="form-label">No. Telepon <span class="form-opt">(opsional)</span></label>
              <input type="tel" class="form-input" placeholder="08xx-xxxx-xxxx" v-model="form.phone" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Pesan <span class="req">*</span></label>
            <textarea class="form-textarea" :class="{ err: errors.pesan }"
              placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
              v-model="form.pesan" @blur="validateField('pesan')"></textarea>
            <span v-if="errors.pesan" class="form-err">{{ errors.pesan }}</span>
          </div>

          <div class="form-action-row">
            <p class="form-note">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              Biasanya membalas dalam <strong>1×24 jam</strong> hari kerja.
            </p>
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
          </div>

        </form>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'

const showToast   = ref(false)
const isSubmitting = ref(false)
const form   = reactive({ nama: '', phone: '', email: '', pesan: '' })
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

.contact-header { margin-bottom: 40px; }

/* Info strip */
.contact-strip {
  display: flex; align-items: center;
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.04);
  border-radius: 18px; padding: 22px 32px;
  gap: 0; margin-bottom: 28px; flex-wrap: wrap;
  gap: 24px;
}
.contact-strip-sep {
  width: 1px; height: 48px;
  background: rgba(255,255,255,0.04); flex-shrink: 0;
}
.contact-strip-item {
  display: flex; align-items: center; gap: 14px;
  flex: 1; min-width: 200px;
}
.contact-strip-icon {
  width: 40px; height: 40px; border-radius: 12px;
  background: rgba(0,87,184,0.18);
  border: 1px solid rgba(0,87,184,0.28);
  display: flex; align-items: center; justify-content: center;
  color: #60a5fa; flex-shrink: 0;
}
.contact-strip-lbl {
  font-size: 10px; font-weight: 700;
  color: rgba(255,255,255,0.30);
  letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 3px;
}
.contact-strip-val {
  font-size: 13.5px; font-weight: 600;
  color: rgba(255,255,255,0.82);
}
.contact-strip-item:last-child {
  flex-direction: row; align-items: center; gap: 8px;
}
.contact-strip-btn {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 9px 16px; border-radius: 10px;
  font-size: 13px; font-weight: 600;
  text-decoration: none; flex-shrink: 0;
  transition: opacity 0.2s, transform 0.2s;
}
.contact-strip-btn:hover { opacity: 0.82; transform: translateY(-1px); }
.btn-phone {
  background: rgba(255,255,255,0.07);
  border: 1.5px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.80);
}
.btn-wa {
  background: #25d366;
  border: 1.5px solid #25d366;
  color: #fff;
}

/* Form card */
.contact-form-card {
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.10);
  border-radius: 24px;
  padding: 36px 36px 32px;

}
.contact-form { display: flex; flex-direction: column; gap: 22px; }

.form-row-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-label {
  font-size: 12.5px; font-weight: 700;
  color: rgba(255,255,255,0.50); letter-spacing: 0.01em;
}
.req { color: #f87171; margin-left: 2px; }
.form-opt { color: rgba(255,255,255,0.25); font-weight: 400; }

.form-input {
  background: rgba(255,255,255,0.05);
  border: 1.5px solid rgba(255,255,255,0.10);
  border-radius: 10px;
  color: rgba(255,255,255,0.88);
  font-family: inherit; font-size: 14px; font-weight: 500;
  padding: 12px 14px; outline: none; width: 100%;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.form-input::placeholder { color: rgba(255,255,255,0.18); }
.form-input:focus {
  border-color: rgba(0,87,184,0.55);
  box-shadow: 0 0 0 3px rgba(0,87,184,0.10);
}
.form-input.err { border-color: rgba(248,113,113,0.50); box-shadow: 0 0 0 3px rgba(248,113,113,0.08); }

.form-textarea {
  background: rgba(255,255,255,0.05);
  border: 1.5px solid rgba(255,255,255,0.10);
  border-radius: 10px;
  color: rgba(255,255,255,0.88);
  font-family: inherit; font-size: 14px; font-weight: 500;
  padding: 12px 14px; outline: none; width: 100%;
  resize: vertical; min-height: 120px; line-height: 1.6;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.form-textarea::placeholder { color: rgba(255,255,255,0.18); }
.form-textarea:focus {
  border-color: rgba(0,87,184,0.55);
  box-shadow: 0 0 0 3px rgba(0,87,184,0.10);
}
.form-textarea.err { border-color: rgba(248,113,113,0.50); box-shadow: 0 0 0 3px rgba(248,113,113,0.08); }

.form-err { font-size: 11.5px; color: #f87171; }

/* Action row */
.form-action-row {
  display: flex; align-items: center;
  justify-content: space-between; gap: 16px; flex-wrap: wrap;
}
.form-note {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; color: rgba(255,255,255,0.25);
}
.form-note strong { color: rgba(255,255,255,0.42); font-weight: 600; }

.btn-submit {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 13px 32px; min-width: 180px;
  background: var(--bri-gold, #F5A623);
  color: #0A1628;
  border: none; border-radius: 12px;
  font-family: inherit; font-size: 14.5px; font-weight: 800;
  cursor: pointer; flex-shrink: 0;
  transition: background 0.2s, transform 0.2s, opacity 0.2s;
}
.btn-submit:hover:not(:disabled) { background: #f8b83c; transform: translateY(-1px); }
.btn-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
.spin-icon { animation: spin 0.9s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Responsive */
@media (max-width: 900px) {
  .form-row-3 { grid-template-columns: repeat(2, 1fr); }
  .contact-strip { flex-direction: column; gap: 16px; padding: 20px; }
  .contact-strip-sep { width: 100%; height: 1px; }
}
@media (max-width: 600px) {
  .form-row-3 { grid-template-columns: 1fr; }
  .contact-form-card { padding: 24px 20px; }
  .form-action-row { flex-direction: column; align-items: stretch; }
  .btn-submit { width: 100%; min-width: auto; }
  .contact-strip-item:last-child { flex-wrap: wrap; }
}
</style>
