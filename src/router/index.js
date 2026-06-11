import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/layanan/:slug',
    name: 'ServiceDetail',
    component: () => import('@/views/ServiceDetailView.vue'),
    meta: { scrollToTop: true }
  },
  {
    path: '/investasi',
    name: 'Stock',
    component: () => import('@/views/StockView.vue'),
    meta: { scrollToTop: true }
  },
  {
    path: '/galeri/:type',
    name: 'Gallery',
    component: () => import('@/views/GalleryView.vue'),
    meta: { scrollToTop: true, darkHero: true }
  },
  {
    path: '/karir',
    name: 'Career',
    component: () => import('@/views/CareerView.vue'),
    meta: { scrollToTop: true }
  },
  {
    path: '/lelang',
    name: 'Lelang',
    component: () => import('@/views/LelangView.vue'),
    meta: { scrollToTop: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.meta?.scrollToTop) return { top: 0 }
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})

export default router
