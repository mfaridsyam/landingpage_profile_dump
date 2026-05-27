<template>
  <div class="marquee-band" aria-hidden="true">
    <div class="marquee-track">
      <div class="marquee-content">
        <span v-for="item in items" :key="item" class="marquee-item">
          <span class="marquee-sep">◆</span>{{ item }}
        </span>
      </div>
      <div class="marquee-content" aria-hidden="true">
        <span v-for="item in items" :key="`${item}-2`" class="marquee-item">
          <span class="marquee-sep">◆</span>{{ item }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const items = [
  'BRI GROUP',
  'Melayani Sejak 1895',
  'BBRI.JK',
  'Bank Terpercaya Indonesia',
  'Lebih dari 175 Juta Nasabah',
  'Jaringan Terluas di Indonesia',
  'Layanan Digital 24/7',
  'OJK Berizin & Diawasi',
  'Polewali Mandar',
]
</script>

<style scoped>
.marquee-band {
  overflow: hidden;
  height: 42px;
  display: flex;
  align-items: center;
  background: rgba(0, 10, 28, 0.55);
  border-top: 1px solid rgba(255,255,255,0.04);
  border-bottom: 1px solid rgba(255,255,255,0.04);
  position: relative;
}

.marquee-band::before,
.marquee-band::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  z-index: 2;
  pointer-events: none;
}
.marquee-band::before {
  left: 0;
  background: linear-gradient(to right, #0A1628 0%, transparent 100%);
}
.marquee-band::after {
  right: 0;
  background: linear-gradient(to left, #0A1628 0%, transparent 100%);
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee-scroll 36s linear infinite;
}
.marquee-band:hover .marquee-track {
  animation-play-state: paused;
}

.marquee-content {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.marquee-item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0 20px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.28);
  white-space: nowrap;
}

.marquee-sep {
  font-size: 5px;
  color: var(--bri-gold, #F5A623);
  opacity: 0.65;
  flex-shrink: 0;
}

@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
</style>
