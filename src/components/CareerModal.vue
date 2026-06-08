<template>
  <Transition name="career-modal-fade">
    <div v-if="modelValue" class="career-overlay" @click.self="close">
      <div class="career-panel">

        <!-- Hero Header -->
        <div class="career-hero">
          <div class="career-hero-bg"></div>
          <div class="career-hero-content">
            <div class="career-hero-eyebrow">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/></svg>
              Peluang Karier BRI Group
            </div>
            <h2 class="career-hero-title">Bergabunglah Bersama <span>BRI Group</span></h2>
            <p class="career-hero-sub">Temukan posisi yang tepat dan wujudkan karier impian Anda bersama keluarga besar BRI Group.</p>
          </div>
          <button class="career-close-btn" @click="close" aria-label="Tutup">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <!-- Career Cards Grid -->
        <div class="career-grid-scroll">
          <div class="career-grid">
            <a v-for="item in careers" :key="item.name"
              :href="item.url" target="_blank" rel="noopener"
              class="career-card">
              <div class="career-card-top">
                <div class="career-card-logo">
                  <img :src="item.logo" :alt="item.name" />
                </div>
                <div class="career-card-badge">{{ item.tag }}</div>
              </div>
              <div class="career-card-name">{{ item.name }}</div>
              <div class="career-card-desc">{{ item.desc }}</div>
              <div class="career-card-cta">
                Daftar Sekarang
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </div>
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div class="career-footer">
          <div class="career-footer-left">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.9a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16z"/></svg>
            Butuh informasi? Hubungi (0428) 21027
          </div>
          <a href="https://bri.co.id" target="_blank" rel="noopener" class="career-footer-link">
            bri.co.id
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
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
    desc: 'Portal resmi rekrutmen pegawai tetap Bank BRI untuk berbagai posisi strategis.',
    tag:  'Pegawai Tetap',
  },
  {
    name: 'Talenta Brillian',
    url:  'https://www.talentabrilian.id/',
    logo: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1778344853/Logo_rekrutmen_talentabrillian_bc9nus.png',
    desc: 'Program Management Trainee — BRI Future Leader Program (BFLP) untuk lulusan terbaik.',
    tag:  'Management Trainee',
  },
  {
    name: 'PKSS',
    url:  'https://recruitment.ptpkss.com/',
    logo: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1778344854/Logo_rekrutmen_pkss_avqbp4.png',
    desc: 'Rekrutmen tenaga penunjang dan outsourcing untuk mendukung operasional BRI Group.',
    tag:  'Tenaga Penunjang',
  },
  {
    name: 'Magenta',
    url:  'https://magentaku.id/',
    logo: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1778408438/Logo_Magenta_p7w0ne.png',
    desc: 'Program magang dan karier di anak perusahaan BRI Group untuk generasi muda.',
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
  background: rgba(4,11,24,0.72);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  z-index: 9000;
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
}

/* ── PANEL ── */
.career-panel {
  background: #fff;
  border-radius: 24px;
  width: 100%; max-width: 640px;
  max-height: 92vh;
  display: flex; flex-direction: column;
  overflow: hidden;
  box-shadow: 0 32px 80px rgba(0,20,60,0.22), 0 0 0 1px rgba(0,87,184,0.10);
}

/* ── HERO HEADER ── */
.career-hero {
  position: relative;
  padding: 32px 28px 28px;
  overflow: hidden;
  flex-shrink: 0;
}
.career-hero-bg {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, #003F88 0%, #0057b8 55%, #1a7fd4 100%);
}
.career-hero-bg::before {
  content: '';
  position: absolute;
  width: 260px; height: 260px;
  border-radius: 50%;
  background: rgba(255,255,255,0.06);
  top: -60px; right: -40px;
}
.career-hero-bg::after {
  content: '';
  position: absolute;
  width: 160px; height: 160px;
  border-radius: 50%;
  background: rgba(255,255,255,0.04);
  bottom: -40px; left: 60px;
}
.career-hero-content {
  position: relative; z-index: 1;
  padding-right: 48px;
}
.career-hero-eyebrow {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 10px; font-weight: 800; letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.70);
  margin-bottom: 10px;
}
.career-hero-title {
  font-size: 22px; font-weight: 800;
  color: #fff;
  letter-spacing: -0.025em; line-height: 1.2;
  margin: 0 0 10px;
}
.career-hero-title span { color: #F5A623; }
.career-hero-sub {
  font-size: 13px; color: rgba(255,255,255,0.70);
  line-height: 1.65; margin: 0;
  max-width: 440px;
}
.career-close-btn {
  position: absolute; top: 20px; right: 20px; z-index: 2;
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(255,255,255,0.15);
  border: 1.5px solid rgba(255,255,255,0.25);
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.career-close-btn:hover {
  background: rgba(255,255,255,0.26);
  transform: scale(1.06);
}

/* ── GRID SCROLL ── */
.career-grid-scroll {
  overflow-y: auto; flex: 1;
  padding: 20px;
}
.career-grid-scroll::-webkit-scrollbar { width: 4px; }
.career-grid-scroll::-webkit-scrollbar-track { background: transparent; }
.career-grid-scroll::-webkit-scrollbar-thumb { background: rgba(0,63,136,0.15); border-radius: 4px; }

/* ── CAREER CARDS GRID ── */
.career-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.career-card {
  display: flex; flex-direction: column;
  background: rgba(248,251,255,0.80);
  border: 1.5px solid rgba(0,63,136,0.12);
  border-radius: 16px;
  padding: 20px;
  text-decoration: none;
  cursor: pointer;
  gap: 10px;
  transition: border-color 0.22s, transform 0.28s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s;
}
.career-card:hover {
  border-color: rgba(0,87,184,0.35);
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(0,63,136,0.12);
}

.career-card-top {
  display: flex; align-items: center; justify-content: space-between;
  gap: 10px;
}
.career-card-logo {
  width: 48px; height: 48px;
  display: flex; align-items: center; justify-content: center;
  background: #fff;
  border: 1px solid rgba(0,63,136,0.10);
  border-radius: 12px;
  padding: 4px;
  flex-shrink: 0;
}
.career-card-logo img {
  width: 40px; height: 40px;
  object-fit: contain; display: block;
}
.career-card-badge {
  font-size: 9px; font-weight: 800;
  letter-spacing: 0.06em; text-transform: uppercase;
  color: #0057b8;
  background: rgba(0,87,184,0.08);
  border: 1px solid rgba(0,87,184,0.18);
  border-radius: 100px;
  padding: 3px 8px;
  white-space: nowrap;
  flex-shrink: 0;
}
.career-card-name {
  font-size: 14px; font-weight: 800;
  color: rgba(10,22,40,0.92);
  letter-spacing: -0.02em;
  line-height: 1.2;
}
.career-card-desc {
  font-size: 12px; color: rgba(10,22,40,0.62);
  line-height: 1.6; flex: 1;
}
.career-card-cta {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; font-weight: 700;
  color: #0057b8;
  margin-top: 4px;
  transition: gap 0.2s;
}
.career-card:hover .career-card-cta { gap: 9px; }

/* ── FOOTER ── */
.career-footer {
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  padding: 14px 24px;
  border-top: 1px solid rgba(0,63,136,0.08);
  flex-shrink: 0;
}
.career-footer-left {
  display: flex; align-items: center; gap: 7px;
  font-size: 12px; color: rgba(10,22,40,0.60);
}
.career-footer-link {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 12px; font-weight: 600;
  color: #0057b8; text-decoration: none;
  transition: opacity 0.2s;
}
.career-footer-link:hover { opacity: 0.78; }

/* ── TRANSITION ── */
.career-modal-fade-enter-active { transition: opacity 0.25s ease; }
.career-modal-fade-leave-active { transition: opacity 0.20s ease; }
.career-modal-fade-enter-from, .career-modal-fade-leave-to { opacity: 0; }
.career-modal-fade-enter-active .career-panel {
  animation: career-pop-in 0.30s cubic-bezier(0.22,1,0.36,1) forwards;
}
.career-modal-fade-leave-active .career-panel {
  animation: career-pop-out 0.18s ease forwards;
}
@keyframes career-pop-in {
  from { transform: translateY(20px) scale(0.96); opacity: 0; }
  to   { transform: translateY(0) scale(1); opacity: 1; }
}
@keyframes career-pop-out {
  from { transform: translateY(0) scale(1); opacity: 1; }
  to   { transform: translateY(10px) scale(0.97); opacity: 0; }
}

@media (max-width: 580px) {
  .career-overlay { padding: 0; align-items: flex-end; }
  .career-panel { border-radius: 20px 20px 0 0; max-height: 90vh; }
  .career-grid { grid-template-columns: 1fr; }
  .career-hero { padding: 24px 20px 22px; }
  .career-hero-title { font-size: 19px; }
}
</style>
