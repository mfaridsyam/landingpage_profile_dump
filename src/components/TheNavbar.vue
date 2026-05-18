<template>
  <nav :class="{ scrolled: scrolled }" :style="navStyle">
    <div class="nav-inner">
      <a href="#" class="nav-logo">
        <img src="https://res.cloudinary.com/dnacoymkh/image/upload/v1778342906/Logo_header_mini_ihzdof.png" alt="BRI Cabang Polewali" />
      </a>
      <ul class="nav-links">
        <li><a href="#" class="active">Beranda</a></li>
        <li><a href="#layanan">Layanan</a></li>
        <li><a href="#tentang">Tentang</a></li>
        <li><a href="#galeri">Galeri</a></li>
        <li><a href="#kontak">Kontak</a></li>
      </ul>
      <div class="nav-cta">
        <a href="https://www.bri.co.id" target="_blank" class="btn-primary">
          Portal BRI
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const scrollY = ref(0)

const navStyle = computed(() => {
  const ratio = Math.min(scrollY.value / (window.innerHeight * 0.4), 1)
  return {
    background: `rgba(10,22,40,${ratio * 0.92})`,
    backdropFilter: `blur(${ratio * 20}px)`,
    borderBottomColor: `rgba(255,255,255,${ratio * 0.10})`,
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px'
  }
})

function onScroll() {
  scrollY.value = window.scrollY
  scrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
