<template>
  <TheBackground />
  <TheCursor />
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import TheCursor from '@/components/TheCursor.vue'
import TheBackground from '@/components/TheBackground.vue'
</script>
