<template>
  <Transition name="modal-fade">
    <div v-if="modelValue" class="career-overlay" @click.self="close">
      <div class="career-modal">

        <!-- Header -->
        <div class="career-modal-head">
          <div class="career-modal-head-left">
            <div class="career-eyebrow">Karier BRI Group</div>
            <h3 class="career-title">Temukan Peluang Karier</h3>
          </div>
          <button class="career-close" @click="close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <!-- Intro -->
        <p class="career-intro">Pilih jalur karier yang sesuai dengan profil dan tujuan Anda bersama BRI Group.</p>

        <!-- List -->
        <div class="career-list">
          <a v-for="(item, i) in careers" :key="item.name"
            :href="item.url" target="_blank" rel="noopener"
            class="career-item">
            <div class="career-item-logo">
              <img :src="item.logo" :alt="item.name" />
            </div>
            <div class="career-item-body">
              <div class="career-item-name">{{ item.name }}</div>
              <div class="career-item-desc">{{ item.desc }}</div>
            </div>
            <div class="career-item-badge">{{ item.tag }}</div>
            <div class="career-item-arrow">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </div>
          </a>
        </div>

        <!-- Footer -->
        <div class="career-footer">
          Butuh informasi lebih lanjut? Hubungi kami di (0428) 21027
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { lenis } from '@/lenis.js'

const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue'])

const careers = [
  {
    name: 'BRI Recruitment',
    url:  'https://e-recruitment.bri.co.id/',
    logo: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1778344147/Logo_rekrutmen_bri_ori_p2o5qd.png',
    desc: 'Portal resmi rekrutmen pegawai tetap Bank BRI.',
    tag:  'Pegawai Tetap',
  },
  {
    name: 'Talenta Brillian',
    url:  'https://www.talentabrilian.id/',
    logo: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1778344853/Logo_rekrutmen_talentabrillian_bc9nus.png',
    desc: 'Program Management Trainee — BRI Future Leader Program (BFLP).',
    tag:  'Management Trainee',
  },
  {
    name: 'PKSS',
    url:  'https://recruitment.ptpkss.com/',
    logo: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1778344854/Logo_rekrutmen_pkss_avqbp4.png',
    desc: 'Rekrutmen tenaga penunjang dan outsourcing BRI Group.',
    tag:  'Tenaga Penunjang',
  },
  {
    name: 'Magenta',
    url:  'https://magentaku.id/',
    logo: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1778408438/Logo_Magenta_p7w0ne.png',
    desc: 'Program magang dan karier di anak perusahaan BRI Group.',
    tag:  'Magang & Anak Usaha',
  },
]

function close() { emit('update:modelValue', false) }

function onKeydown(e) { if (e.key === 'Escape') close() }

watch(() => props.modelValue, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
    lenis.stop()
  } else {
    document.body.style.overflow = ''
    lenis.start()
  }
})

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
/* ── OVERLAY ── */
.career-overlay {
  position: fixed; inset: 0;
  background: rgba(4,11,24,0.78);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 9000;
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}

/* ── MODAL ── */
.career-modal {
  background: #0B1A30;
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 20px;
  width: 100%; max-width: 520px;
  max-height: 90vh;
  display: flex; flex-direction: column;
  box-shadow: 0 40px 100px rgba(0,0,0,0.60), 0 0 0 1px rgba(0,87,184,0.15);
  overflow: hidden;
}

/* ── HEAD ── */
.career-modal-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 24px 24px 16px;
  gap: 16px;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.career-eyebrow {
  font-size: 10px; font-weight: 800;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--bri-gold, #F5A623);
  margin-bottom: 4px;
}
.career-title {
  font-size: 18px; font-weight: 800;
  color: rgba(255,255,255,0.95);
  letter-spacing: -0.02em; line-height: 1.2;
  margin: 0;
}
.career-close {
  width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10);
  color: rgba(255,255,255,0.50);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: background 0.2s, color 0.2s;
}
.career-close:hover { background: rgba(255,255,255,0.12); color: #fff; }

/* ── INTRO ── */
.career-intro {
  font-size: 13px; color: rgba(255,255,255,0.38);
  line-height: 1.6; padding: 14px 24px 0;
  flex-shrink: 0;
}

/* ── LIST ── */
.career-list {
  display: flex; flex-direction: column;
  overflow-y: auto;
  flex: 1;
  padding: 8px 0;
}
.career-list::-webkit-scrollbar { width: 4px; }
.career-list::-webkit-scrollbar-track { background: transparent; }
.career-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 4px; }

.career-item {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 24px;
  text-decoration: none;
  border-radius: 0;
  transition: background 0.18s;
  cursor: pointer;
  position: relative;
}
.career-item::after {
  content: '';
  position: absolute;
  bottom: 0; left: 24px; right: 24px;
  height: 1px;
  background: rgba(255,255,255,0.05);
}
.career-item:last-child::after { display: none; }
.career-item:hover { background: rgba(255,255,255,0.04); }
.career-item:hover .career-item-arrow { opacity: 1; transform: translate(2px, -2px); }

.career-item-logo {
  width: 44px; height: 44px; border-radius: 10px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.09);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden; flex-shrink: 0;
}
.career-item-logo img {
  width: 32px; height: 32px; object-fit: contain; display: block;
}

.career-item-body { flex: 1; min-width: 0; }
.career-item-name {
  font-size: 13.5px; font-weight: 700;
  color: rgba(255,255,255,0.88);
  margin-bottom: 2px;
}
.career-item-desc {
  font-size: 12px; color: rgba(255,255,255,0.35);
  line-height: 1.4; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

.career-item-badge {
  font-size: 9.5px; font-weight: 700;
  letter-spacing: 0.04em;
  color: rgba(255,255,255,0.30);
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.09);
  padding: 3px 9px; border-radius: 100px;
  white-space: nowrap; flex-shrink: 0;
}

.career-item-arrow {
  color: rgba(255,255,255,0.22); flex-shrink: 0;
  transition: opacity 0.2s, transform 0.2s;
}

/* ── FOOTER ── */
.career-footer {
  padding: 14px 24px;
  border-top: 1px solid rgba(255,255,255,0.06);
  font-size: 11.5px;
  color: rgba(255,255,255,0.22);
  text-align: center;
  flex-shrink: 0;
}

/* ── TRANSITION ── */
.modal-fade-enter-active {
  transition: opacity 0.25s ease;
}
.modal-fade-leave-active {
  transition: opacity 0.20s ease;
}
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-fade-enter-active .career-modal {
  animation: modal-pop-in 0.28s cubic-bezier(0.22,1,0.36,1) forwards;
}
.modal-fade-leave-active .career-modal {
  animation: modal-pop-out 0.18s ease forwards;
}
@keyframes modal-pop-in {
  from { transform: translateY(16px) scale(0.97); opacity: 0; }
  to   { transform: translateY(0) scale(1); opacity: 1; }
}
@keyframes modal-pop-out {
  from { transform: translateY(0) scale(1); opacity: 1; }
  to   { transform: translateY(8px) scale(0.98); opacity: 0; }
}

@media (max-width: 560px) {
  .career-modal { border-radius: 16px 16px 0 0; max-height: 85vh; align-self: flex-end; }
  .career-overlay { align-items: flex-end; padding: 0; }
}
</style>
