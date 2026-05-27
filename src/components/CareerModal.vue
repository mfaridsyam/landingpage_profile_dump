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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </div>
          </a>
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
  background: rgba(4,11,24,0.82);
  backdrop-filter: blur(16px);
  z-index: 9000;
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
}

/* ── MODAL ── */
.career-modal {
  background: rgba(10,22,46,0.98);
  border: 1.5px solid rgba(255,255,255,0.11);
  border-radius: 22px;
  width: 100%; max-width: 580px;
  box-shadow: 0 32px 80px rgba(0,0,0,0.55);
  overflow: hidden;
}

/* ── HEAD ── */
.career-modal-head {
  display: flex; align-items: flex-start; justify-content: space-between;
  padding: 28px 28px 0;
  gap: 16px;
}
.career-eyebrow {
  font-size: 10px; font-weight: 800;
  letter-spacing: 0.10em; text-transform: uppercase;
  color: var(--bri-gold, #F5A623);
  margin-bottom: 8px;
}
.career-title {
  font-size: 22px; font-weight: 800;
  color: rgba(255,255,255,0.95);
  letter-spacing: -0.02em; line-height: 1.2;
  margin: 0;
}
.career-close {
  width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.55);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: background 0.2s, color 0.2s;
  margin-top: 2px;
}
.career-close:hover { background: rgba(255,255,255,0.14); color: #fff; }

/* ── INTRO ── */
.career-intro {
  font-size: 13.5px; color: rgba(255,255,255,0.40);
  line-height: 1.6; margin: 10px 28px 20px;
}

/* ── LIST ── */
.career-list {
  display: flex; flex-direction: column;
  border-top: 1px solid rgba(255,255,255,0.07);
}

.career-item {
  display: flex; align-items: center; gap: 16px;
  padding: 18px 28px;
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  transition: background 0.18s;
  cursor: pointer;
}
.career-item:last-child { border-bottom: none; }
.career-item:hover { background: rgba(255,255,255,0.04); }
.career-item:hover .career-item-arrow { opacity: 1; transform: translate(2px, -2px); }

.career-item-logo {
  width: 48px; height: 48px; border-radius: 12px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.10);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden; flex-shrink: 0;
}
.career-item-logo img {
  width: 36px; height: 36px; object-fit: contain; display: block;
}

.career-item-body { flex: 1; min-width: 0; }
.career-item-name {
  font-size: 14px; font-weight: 700;
  color: rgba(255,255,255,0.90);
  margin-bottom: 3px;
}
.career-item-desc {
  font-size: 12.5px; color: rgba(255,255,255,0.38);
  line-height: 1.45;
}

.career-item-badge {
  font-size: 10px; font-weight: 700;
  letter-spacing: 0.04em;
  color: rgba(255,255,255,0.35);
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.10);
  padding: 4px 10px; border-radius: 100px;
  white-space: nowrap; flex-shrink: 0;
}

.career-item-arrow {
  color: rgba(255,255,255,0.25); flex-shrink: 0;
  opacity: 0.5;
  transition: opacity 0.2s, transform 0.2s;
}

/* ── TRANSITION ── */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.22s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>
