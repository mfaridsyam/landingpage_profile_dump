import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './assets/main.css'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { lenis } from './lenis.js'

gsap.registerPlugin(ScrollTrigger)
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => { lenis.raf(time * 1000) })
gsap.ticker.lagSmoothing(0)

createApp(App).use(router).mount('#app')
