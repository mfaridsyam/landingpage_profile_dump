<template>
  <div class="fab-wrap" :class="{ visible: fabVisible }">
    <button class="fab fab-top" aria-label="Ke atas" @click="scrollTop">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { lenis } from '@/lenis.js'

const fabVisible = ref(false)

function scrollTop() {
  lenis.scrollTo(0, { duration: 1.2 })
}

function onScroll() {
  fabVisible.value = window.scrollY > 400
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
