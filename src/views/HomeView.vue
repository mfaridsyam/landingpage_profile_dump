<template>
  <div>
    <FloatingParticles />
    <TheNavbar />
    <HeroSection />
    <StockBar />
    <PortalSection @open-career="careerOpen = true" />
    <CareerModal v-model="careerOpen" />
    <ServicesSection />
    <AboutSection />
    <GallerySection />
    <NetworkSection />
    <ContactSection />
    <TheFooter />
    <TheFab />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TheNavbar from '@/components/TheNavbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import StockBar from '@/components/StockBar.vue'
import PortalSection from '@/components/PortalSection.vue'
import CareerModal from '@/components/CareerModal.vue'
import ServicesSection from '@/components/ServicesSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import GallerySection from '@/components/GallerySection.vue'
import NetworkSection from '@/components/NetworkSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import TheFooter from '@/components/TheFooter.vue'
import TheFab from '@/components/TheFab.vue'
import FloatingParticles from '@/components/FloatingParticles.vue'
import { useScrollReveal } from '@/composables/useScrollReveal.js'

const careerOpen = ref(false)
useScrollReveal()
</script>