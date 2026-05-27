<template>
  <nav :class="{ scrolled: scrolled }" :style="navStyle">
    <div class="nav-inner">
      <a href="#" class="nav-logo">
        <img src="https://res.cloudinary.com/dnacoymkh/image/upload/v1778342906/Logo_header_mini_ihzdof.png" alt="BRI Cabang Polewali" />
      </a>
      <ul class="nav-links">
        <li><a href="#" :class="{ active: activeSection === 'hero' }" @click.prevent="scrollTo('hero')">Beranda</a></li>
        <li><a href="#layanan" :class="{ active: activeSection === 'layanan' }" @click.prevent="scrollTo('layanan')">Layanan</a></li>
        <li><a href="#galeri" :class="{ active: activeSection === 'galeri' }" @click.prevent="scrollTo('galeri')">Media</a></li>
        <li><a href="#jaringan" :class="{ active: activeSection === 'jaringan' }" @click.prevent="scrollTo('jaringan')">Lokasi</a></li>
        <li><a href="#kontak" :class="{ active: activeSection === 'kontak' }" @click.prevent="scrollTo('kontak')">Kontak</a></li>
      </ul>
      <div class="nav-cta">
        <button class="hamburger" :class="{ open: mobileOpen }" @click="mobileOpen = !mobileOpen" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
        <a href="https://www.bri.co.id" target="_blank" class="btn-primary">
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
                  :class="{ active: activeSection === item.id }"
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
import { lenis } from '@/lenis.js'

const scrolled = ref(false)
const scrollY = ref(0)
const activeSection = ref('hero')

const mobileOpen = ref(false)

const navItems = [
  { id: 'hero', label: 'Beranda' },
  { id: 'layanan', label: 'Layanan' },
  { id: 'galeri', label: 'Media' },
  { id: 'jaringan', label: 'Lokasi' },
  { id: 'kontak', label: 'Kontak' },
]

const sections = ['kontak', 'jaringan', 'galeri', 'layanan', 'hero']

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

function scrollTo(id) {
  if (id === 'hero') {
    lenis.scrollTo(0, { duration: 1.2 })
  } else {
    const el = document.getElementById(id)
    if (el) lenis.scrollTo(el, { offset: -68, duration: 1.2 })
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
  gap: 5px;
  width: 36px;
  height: 36px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 8px;
  cursor: pointer;
  padding: 0;
}
.hamburger span {
  display: block;
  width: 18px;
  height: 2px;
  background: rgba(255,255,255,0.80);
  border-radius: 2px;
  transition: transform 0.25s, opacity 0.2s;
  transform-origin: center;
}
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (max-width: 900px) {
  .hamburger { display: flex; }
}

/* Mobile nav overlay */
.mobile-nav-overlay {
  position: fixed;
  inset: 0;
  background: rgba(5,14,30,0.60);
  backdrop-filter: blur(6px);
  z-index: 9000;
  display: flex;
  justify-content: flex-end;
}
.mobile-nav-panel {
  width: min(320px, 85vw);
  height: 100%;
  background: rgba(10,22,44,0.97);
  border-left: 1px solid rgba(255,255,255,0.10);
  display: flex;
  flex-direction: column;
  padding: 72px 28px 40px;
  gap: 8px;
  box-shadow: -16px 0 64px rgba(0,0,0,0.5);
}
.mobile-nav-close {
  position: absolute;
  top: 18px;
  right: 20px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.18);
  color: rgba(255,255,255,0.70);
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
  color: rgba(255,255,255,0.65);
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  position: relative;
}
.mobile-nav-links li a:hover,
.mobile-nav-links li a.active {
  background: rgba(0,87,184,0.18);
  color: white;
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
  background: linear-gradient(180deg, #60a5fa, #0057b8);
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
