<template>
  <div class="modal-overlay" :class="{ open: modelValue }" @click.self="$emit('update:modelValue', false)">
    <div class="modal-box">
      <div class="modal-header">
        <div>
          <div class="modal-eyebrow">Karier BRI Group</div>
          <h3 class="modal-title">Temukan Peluang Karier</h3>
        </div>
        <button class="modal-close" @click="$emit('update:modelValue', false)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="modal-grid">
        <a v-for="item in careers" :key="item.name" :href="item.url" target="_blank" class="modal-card">
          <img :src="item.logo" :alt="item.name" />
          <div class="modal-card-name">{{ item.name }}</div>
          <div class="modal-card-desc">{{ item.desc }}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue'])

const careers = [
  { name: 'BRI Recruitment', url: 'https://e-recruitment.bri.co.id/', logo: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1778344147/Logo_rekrutmen_bri_ori_p2o5qd.png', desc: 'Portal resmi rekrutmen tetap Bank BRI.' },
  { name: 'Talenta Brillian', url: 'https://www.talentabrilian.id/', logo: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1778344853/Logo_rekrutmen_talentabrillian_bc9nus.png', desc: 'Program Management Trainee (BFLP)' },
  { name: 'PKSS', url: 'https://recruitment.ptpkss.com/', logo: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1778344854/Logo_rekrutmen_pkss_avqbp4.png', desc: 'Rekrutmen Tenaga Penunjang (Outsourcing)' },
  { name: 'Magenta', url: 'https://magentaku.id/', logo: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1778408438/Logo_Magenta_p7w0ne.png', desc: 'Magang & Karier Anak Perusahaan' },
]

function onKeydown(e) {
  if (e.key === 'Escape') emit('update:modelValue', false)
}

watch(() => props.modelValue, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>
