<template>
  <div>
    <TheNavbar />
    <HeroSection />
    <ServicesSection />
    <KeunggulanSection />
    <LoanCalculatorSection />
    <KursSection />
    <BrimoSection />
    <GallerySection />
    <NetworkSection />
    <PortalSection />
    <ContactSection />
    <TheFooter />
    <TheFab />
  </div>
</template>

<script setup>
import TheNavbar from '@/components/TheNavbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import ServicesSection from '@/components/ServicesSection.vue'
import KeunggulanSection from '@/components/KeunggulanSection.vue'
import KursSection from '@/components/KursSection.vue'
import LoanCalculatorSection from '@/components/LoanCalculatorSection.vue'
import GallerySection from '@/components/GallerySection.vue'
import BrimoSection from '@/components/BrimoSection.vue'
import PortalSection from '@/components/PortalSection.vue'
import NetworkSection from '@/components/NetworkSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import TheFooter from '@/components/TheFooter.vue'
import TheFab from '@/components/TheFab.vue'
import { useScrollReveal } from '@/composables/useScrollReveal.js'

useScrollReveal()
</script>
