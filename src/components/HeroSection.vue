<template>
  <section class="hero">
    <div class="hero-bg-dots"></div>
    <div class="hero-bg-glow"></div>
    <div class="hero-inner">

      <div class="hero-left">
        <div class="hero-tag">#MelayaniSepenuhHati</div>
        <h1 class="hero-title">Bank Rakyat<br>Indonesia</h1>
        <p class="hero-cabang-label">CABANG POLEWALI</p>
        <p class="hero-subtitle">
          Melayani dengan sepenuh hati, mendorong pertumbuhan ekonomi masyarakat Polewali Mandar menuju kesejahteraan yang berkelanjutan.
        </p>
        <div class="hero-actions">
          <a href="#layanan" class="btn-hero-primary">
            Produk &amp; Layanan
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="#kontak" class="btn-hero-ghost">Hubungi Kami</a>
        </div>

        <!-- Location Box as button -->
        <a href="#jaringan" class="hero-location-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          Jl. H. Andi Depu No.177, Polewali Mandar
        </a>
      </div>

      <div class="hero-right">
        <!-- Combined Status + Hours Card -->
        <div class="info-card-combined" :class="isOpen ? 'combined-open' : 'combined-closed'">
          <!-- Status Row -->
          <div class="combined-status-row">
            <div class="info-card-icon">
              <svg v-if="isOpen" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            </div>
            <div class="info-card-body">
              <div class="info-card-label">Status Layanan</div>
              <div class="combined-status-value">{{ isOpen ? 'Buka Sekarang' : 'Sedang Tutup' }}</div>
            </div>
          </div>

          <!-- Divider -->
          <div class="combined-divider"></div>

          <!-- Hours Row always expanded -->
          <div class="combined-hours-row">
            <div class="info-card-icon" style="margin-top:2px">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
            </div>
            <div class="info-card-body" style="flex:1">
              <div class="info-card-label">Jam Operasional</div>
              <div class="hours-table">
                <div v-for="row in hoursData" :key="row.id" class="hours-row">
                  <span class="hours-day" :class="{ 'hours-today-bold': row.isToday }">{{ row.day }}</span>
                  <span class="hours-time" :class="{ tutup: row.closed, today: row.isToday && !row.closed }">
                    {{ row.closed ? 'Tutup' : '08.00 – 15.00' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Alamat Card -->
        <a href="https://maps.google.com/?q=Bank+BRI+Polewali" target="_blank" class="hero-alamat-card">
          <div class="info-card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
            </div>
          <div class="info-card-body">
            <div class="info-card-label">Alamat</div>
            <div class="hero-alamat-val">Jl. H. Andi Depu No.177</div>
          </div>
          <div class="hero-alamat-arrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M7 7h10v10"/></svg>
          </div>
        </a>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useBranchStatus } from '@/composables/useBranchStatus.js'

const { isOpen } = useBranchStatus()

const todayIdx = computed(() => {
  const wib = new Date(new Date().getTime() + 8 * 3600000)
  return wib.getUTCDay()
})

const hoursData = computed(() => {
  const days = [
    { id: 'mon', day: 'Senin', closed: false, wday: 1 },
    { id: 'tue', day: 'Selasa', closed: false, wday: 2 },
    { id: 'wed', day: 'Rabu', closed: false, wday: 3 },
    { id: 'thu', day: 'Kamis', closed: false, wday: 4 },
    { id: 'fri', day: 'Jumat', closed: false, wday: 5 },
    { id: 'sat', day: 'Sabtu', closed: true, wday: 6 },
    { id: 'sun', day: 'Minggu', closed: true, wday: 0 },
  ]
  return days.map(d => ({ ...d, isToday: d.wday === todayIdx.value }))
})
</script>

<style scoped>
.hero-location-btn {
  display: none;
}

.hero-custom-icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
  display: block;
  flex-shrink: 0;
}

.hero-alamat-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  background: rgba(255,255,255,0.05);
  border: 1.5px solid rgba(255,255,255,0.10);
  border-radius: 16px;
  backdrop-filter: blur(8px);
  text-decoration: none;
  transition: border-color 0.25s, box-shadow 0.25s, background 0.25s, transform 0.3s cubic-bezier(0.22,1,0.36,1);
  cursor: pointer;
}
.hero-alamat-card:hover {
  border-color: rgba(0,87,184,0.50);
  box-shadow: 0 8px 40px rgba(0,0,0,0.40), 0 0 0 1px rgba(0,87,184,0.15);
  background: rgba(255,255,255,0.09);
  transform: translateX(4px);
}

.hero-alamat-val {
  font-size: 14px;
  font-weight: 700;
  color: rgba(255,255,255,0.88);
  margin-top: 2px;
}

.hero-alamat-arrow {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.45);
  flex-shrink: 0;
  margin-left: auto;
  transition: background 0.2s, color 0.2s;
}
.hero-alamat-card:hover .hero-alamat-arrow {
  background: rgba(0,87,184,0.30);
  color: #60a5fa;
}

.info-card-combined {
  border-radius: 16px;
  overflow: hidden;
  border: 1.5px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(8px);
  transition: background 0.4s, border-color 0.4s;
}

.combined-open {
  background: rgba(22, 163, 74, 0.10);
  border-color: rgba(22, 163, 74, 0.30);
}

.combined-closed {
  background: rgba(220, 38, 38, 0.08);
  border-color: rgba(220, 38, 38, 0.25);
}

.combined-status-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
}

.combined-status-value {
  font-size: 15px;
  font-weight: 600;
  margin-top: 2px;
}

.combined-open .combined-status-value { color: #86efac; }
.combined-closed .combined-status-value { color: #fca5a5; }

.combined-divider {
  height: 1px;
  margin: 0 20px;
}
.combined-open .combined-divider { background: rgba(22, 163, 74, 0.20); }
.combined-closed .combined-divider { background: rgba(220, 38, 38, 0.20); }

.combined-hours-row {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 18px 20px;
}

.hours-today-bold {
  font-weight: 700;
  color: rgba(255,255,255,0.98);
}
</style>