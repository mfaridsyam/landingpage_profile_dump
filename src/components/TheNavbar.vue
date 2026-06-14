<template>
  <nav :class="{ scrolled: scrolled, 'on-dark-hero': onDarkHero }" :style="navStyle">
    <div class="nav-inner">
      <a href="#" class="nav-logo" @click.prevent="goHome">
        <img src="https://res.cloudinary.com/dnacoymkh/image/upload/v1780721401/Logo_header_mini_blue_lengkap_wblfyh.png" alt="BRI Cabang Polewali" />
      </a>
      <ul class="nav-links">
        <li><a href="#" :class="{ active: isHome && activeSection === 'hero' }" @click.prevent="scrollTo('hero')">Beranda</a></li>
        <li><a href="#layanan" :class="{ active: isHome && activeSection === 'layanan' }" @click.prevent="scrollTo('layanan')">Layanan</a></li>
        <li><a href="#simulasi" :class="{ active: isHome && activeSection === 'simulasi' }" @click.prevent="scrollTo('simulasi')">Simulasi</a></li>
        <li><a href="#galeri" :class="{ active: isHome && activeSection === 'galeri' }" @click.prevent="scrollTo('galeri')">Media</a></li>
        <li><a href="#jaringan" :class="{ active: isHome && activeSection === 'jaringan' }" @click.prevent="scrollTo('jaringan')">Lokasi</a></li>
        <li><a href="#kontak" :class="{ active: isHome && activeSection === 'kontak' }" @click.prevent="scrollTo('kontak')">Kontak</a></li>
      </ul>
      <div class="nav-cta">
        <button class="hamburger" :class="{ open: mobileOpen }" @click="mobileOpen = !mobileOpen" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
        <a href="https://bri.co.id" target="_blank" class="btn-primary">
          Portal BRI
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
      </div>

      <!-- Mobile nav overlay -->
      <Transition name="mobile-nav">
        <div v-if="mobileOpen" class="mobile-nav-overlay" @click.self="mobileOpen = false">
          <div class="mobile-nav-panel">
            <button class="mobile-nav-close" @click="mobileOpen = false">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <ul class="mobile-nav-links">
              <li v-for="item in navItems" :key="item.id">
                <a :href="item.id === 'hero' ? '#' : `#${item.id}`"
                  :class="{ active: isHome && activeSection === item.id }"
                  @click.prevent="scrollTo(item.id); mobileOpen = false">
                  {{ item.label }}
                </a>
              </li>
            </ul>
            <a href="https://www.bri.co.id" target="_blank" class="mobile-nav-cta">
              Portal BRI
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { lenis } from '@/lenis.js'

const route = useRoute()
const router = useRouter()

const isHome = computed(() => route.path === '/')
const onDarkHero = computed(() => !!route.meta?.darkHero && scrollY.value < 120)

const scrolled = ref(false)
const scrollY = ref(0)
const activeSection = ref('hero')

const mobileOpen = ref(false)

const navItems = [
  { id: 'hero', label: 'Beranda' },
  { id: 'layanan', label: 'Layanan' },
  { id: 'simulasi', label: 'Simulasi' },
  { id: 'galeri', label: 'Media' },
  { id: 'jaringan', label: 'Lokasi' },
  { id: 'kontak', label: 'Kontak' },
]

const sections = ['kontak', 'jaringan', 'galeri', 'simulasi', 'layanan', 'hero']

const navStyle = computed(() => {
  if (!isHome.value) {
    return {
      background: 'rgba(238,243,252,0.97)',
      backdropFilter: 'blur(20px)',
      borderBottomColor: 'rgba(0,63,136,0.10)',
      borderBottomStyle: 'solid',
      borderBottomWidth: '1px',
    }
  }
  const ratio = Math.min(scrollY.value / (window.innerHeight * 0.4), 1)
  return {
    background: `rgba(238,243,252,${ratio * 0.95})`,
    backdropFilter: `blur(${ratio * 20}px)`,
    borderBottomColor: `rgba(0,63,136,${ratio * 0.12})`,
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
  }
})

function goHome() {
  if (isHome.value) {
    lenis.scrollTo(0, { duration: 1.2 })
  } else {
    router.push('/')
  }
}

function scrollTo(id) {
  if (isHome.value) {
    if (id === 'hero') {
      lenis.scrollTo(0, { duration: 1.2 })
    } else {
      const el = document.getElementById(id)
      if (el) lenis.scrollTo(el, { offset: -68, duration: 1.2 })
    }
  } else {
    router.push({ path: '/', hash: id === 'hero' ? '' : `#${id}` })
  }
}

function detectSection() {
  const offset = 120
  for (const id of sections) {
    if (id === 'hero') {
      activeSection.value = 'hero'
      break
    }
    const el = document.getElementById(id)
    if (el && el.getBoundingClientRect().top <= offset) {
      activeSection.value = id
      break
    }
  }
}

function onScroll() {
  scrollY.value = window.scrollY
  scrolled.value = window.scrollY > 20
  detectSection()
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
/* Hamburger button */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4.5px;
  width: 42px;
  height: 42px;
  background: #fff;
  border: 1.5px solid rgba(0,63,136,0.14);
  border-radius: 12px;
  cursor: pointer;
  padding: 0;
  box-shadow: 0 2px 8px rgba(0,63,136,0.06);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.hamburger:active { border-color: rgba(0,87,184,0.40); }
.hamburger span {
  display: block;
  width: 19px;
  height: 2px;
  background: #0057b8;
  border-radius: 2px;
  transition: transform 0.25s, opacity 0.2s;
  transform-origin: center;
}
.hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

@media (max-width: 900px) {
  .hamburger { display: flex; }
}

/* Mobile nav overlay */
.mobile-nav-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,20,60,0.45);
  backdrop-filter: blur(4px);
  z-index: 9000;
  display: flex;
  justify-content: flex-end;
}
.mobile-nav-panel {
  position: relative;
  width: min(320px, 86vw);
  height: 100%;
  background: #f4f7fc;
  border-left: 1px solid rgba(0,63,136,0.14);
  display: flex;
  flex-direction: column;
  padding: 76px 24px 32px;
  gap: 8px;
  box-shadow: -16px 0 64px rgba(0,63,136,0.18);
}
.mobile-nav-close {
  position: absolute;
  top: 18px;
  right: 20px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0,63,136,0.08);
  border: 1px solid rgba(0,63,136,0.16);
  color: rgba(10,22,40,0.60);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.mobile-nav-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}
.mobile-nav-links li a {
  display: block;
  padding: 13px 16px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  color: rgba(10,22,40,0.65);
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  position: relative;
}
.mobile-nav-links li a:hover,
.mobile-nav-links li a.active {
  background: rgba(0,87,184,0.10);
  color: var(--ink, #0A1628);
}
.mobile-nav-links li a.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 60%;
  border-radius: 0 3px 3px 0;
  background: linear-gradient(180deg, #0057b8, #003f88);
}
.mobile-nav-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 13px;
  background: var(--bri-blue, #0057b8);
  color: white;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s;
}
.mobile-nav-cta:hover { background: #0068d6; }

/* Slide-in animation */
.mobile-nav-enter-active { transition: opacity 0.25s ease; }
.mobile-nav-leave-active { transition: opacity 0.20s ease; }
.mobile-nav-enter-from, .mobile-nav-leave-to { opacity: 0; }
.mobile-nav-enter-active .mobile-nav-panel { animation: slide-in-right 0.28s cubic-bezier(0.22,1,0.36,1) forwards; }
.mobile-nav-leave-active .mobile-nav-panel { animation: slide-out-right 0.20s ease forwards; }
@keyframes slide-in-right {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
@keyframes slide-out-right {
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
}
</style>
