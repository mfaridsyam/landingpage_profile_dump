<template>
  <nav class="svc-nav" :class="{ scrolled: scrolled }">
    <div class="svc-nav-inner">

      <router-link to="/" class="nav-logo">
        <img src="https://res.cloudinary.com/dnacoymkh/image/upload/v1780721401/Logo_header_mini_blue_lengkap_wblfyh.png" alt="BRI Cabang Polewali" />
      </router-link>

      <router-link to="/" class="back-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        Kembali ke Beranda
      </router-link>

      <a href="https://bri.co.id" target="_blank" rel="noopener" class="btn-primary">
        Portal BRI
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>

    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const scrolled = ref(false)
function onScroll() { scrolled.value = window.scrollY > 20 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.svc-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(238,243,252,0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0,63,136,0.10);
  padding: 0 var(--px, clamp(20px,5vw,80px));
  transition: box-shadow 0.3s;
}
.svc-nav.scrolled { box-shadow: 0 2px 24px rgba(0,63,136,0.10); }

.svc-nav-inner {
  width: 100%;
  max-width: var(--max-w, 1200px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.nav-logo img { height: 52px; width: auto; object-fit: contain; }

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(10,22,40,0.65);
  text-decoration: none;
  padding: 7px 14px;
  border-radius: 8px;
  border: 1px solid rgba(0,63,136,0.14);
  background: rgba(0,63,136,0.04);
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.back-btn:hover {
  background: rgba(0,87,184,0.10);
  color: #0057b8;
  border-color: rgba(0,87,184,0.28);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 13.5px;
  font-weight: 700;
  color: #fff;
  background: #0057b8;
  padding: 9px 18px;
  border-radius: 10px;
  text-decoration: none;
  transition: background 0.2s;
  white-space: nowrap;
}
.btn-primary:hover { background: #0068d6; }

@media (max-width: 560px) {
  .back-btn span { display: none; }
  .btn-primary { font-size: 12.5px; padding: 8px 14px; }
}
</style>
