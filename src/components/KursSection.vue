<template>
  <section class="kurs-section" id="kurs">
    <div class="container">

      <div class="kurs-header reveal">
        <div>
          <div class="section-eyebrow">Informasi Valuta</div>
          <h2 class="section-title" style="margin-bottom:6px">Kurs BRI</h2>
          <p class="kurs-note">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Terakhir diperbarui {{ lastUpdated }} · Transaksi &lt; eq. USD 3.500
          </p>
        </div>
      </div>

      <!-- Tabs -->
      <div class="kurs-tabs reveal">
        <button class="kurs-tab" :class="{ active: tab === 'erate' }" @click="tab = 'erate'">
          <span class="tab-dot"></span>E-Rate
        </button>
        <button class="kurs-tab" :class="{ active: tab === 'tt' }" @click="tab = 'tt'">
          <span class="tab-dot"></span>Kurs TT Counter
        </button>
      </div>

      <div class="kurs-body reveal">

        <!-- Currency grid -->
        <div class="kurs-grid">
          <div
            v-for="rate in currentRates" :key="rate.code"
            class="kurs-card" :class="{ selected: calcCurrency === rate.code }"
            @click="calcCurrency = rate.code; calcFromCurrency = 'IDR'; calcToCurrency = rate.code"
          >
            <div class="kurs-card-top">
              <div class="kurs-flag-wrap">
                <img
                  class="kurs-flag-img"
                  :src="`https://flagcdn.com/w40/${rate.code.slice(0,2).toLowerCase()}.png`"
                  :srcset="`https://flagcdn.com/w80/${rate.code.slice(0,2).toLowerCase()}.png 2x`"
                  :alt="rate.code"
                  loading="lazy"
                />
              </div>
              <span class="kurs-code">{{ rate.code }}</span>
              <svg v-if="calcCurrency === rate.code" class="kurs-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="kurs-rates">
              <div class="kurs-rate-item">
                <span class="kurs-rate-lbl">Beli</span>
                <span class="kurs-rate-val">{{ formatRate(rate.buy) }}</span>
              </div>
              <div class="kurs-rate-sep"></div>
              <div class="kurs-rate-item">
                <span class="kurs-rate-lbl">Jual</span>
                <span class="kurs-rate-val">{{ formatRate(rate.sell) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Calculator -->
        <div class="kurs-calc">
          <div class="kurs-calc-top">
            <div class="kurs-calc-header">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="13" y2="14"/></svg>
              Kalkulator Kurs
            </div>
            <div class="kurs-mode-row">
              <button class="kurs-mode-btn" :class="{ active: mode === 'buy' }" @click="mode = 'buy'">Beli</button>
              <button class="kurs-mode-btn" :class="{ active: mode === 'sell' }" @click="mode = 'sell'">Jual</button>
            </div>
          </div>

          <!-- Backdrop closes dropdowns -->
          <div v-if="calcFromOpen || calcToOpen" class="kurs-csel-backdrop"
            @click="calcFromOpen = false; calcToOpen = false"></div>

          <div class="kurs-calc-fields">
            <div class="kurs-field-group">
              <label class="kurs-field-label">Dari</label>
              <div class="kurs-field-row">
                <!-- Custom flag select: FROM -->
                <div class="kurs-csel" :class="{ open: calcFromOpen }"
                  @click.stop="calcFromOpen = !calcFromOpen; calcToOpen = false">
                  <img class="kurs-csel-flag" :src="flagUrl(calcFromCurrency)" :alt="calcFromCurrency" />
                  <span class="kurs-csel-code">{{ calcFromCurrency }}</span>
                  <svg class="kurs-csel-chev" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                  <div v-if="calcFromOpen" class="kurs-csel-drop" @click.stop>
                    <div v-for="opt in calcAllOptions" :key="opt.code"
                      class="kurs-csel-opt" :class="{ active: calcFromCurrency === opt.code }"
                      @click="calcFromCurrency = opt.code; calcFromOpen = false">
                      <img :src="flagUrl(opt.code)" :alt="opt.code" />
                      <span>{{ opt.code }}</span>
                    </div>
                  </div>
                </div>
                <input class="kurs-input" type="text" inputmode="numeric" v-model="calcAmountDisplay" placeholder="0" />
              </div>
            </div>

            <button class="kurs-swap-btn" @click="swapCalc" title="Tukar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
            </button>

            <div class="kurs-field-group">
              <label class="kurs-field-label">Ke</label>
              <div class="kurs-field-row">
                <!-- Custom flag select: TO -->
                <div class="kurs-csel" :class="{ open: calcToOpen }"
                  @click.stop="calcToOpen = !calcToOpen; calcFromOpen = false">
                  <img class="kurs-csel-flag" :src="flagUrl(calcToCurrency)" :alt="calcToCurrency" />
                  <span class="kurs-csel-code">{{ calcToCurrency }}</span>
                  <svg class="kurs-csel-chev" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                  <div v-if="calcToOpen" class="kurs-csel-drop" @click.stop>
                    <div v-for="opt in calcAllOptions" :key="opt.code"
                      class="kurs-csel-opt" :class="{ active: calcToCurrency === opt.code }"
                      @click="calcToCurrency = opt.code; calcToOpen = false">
                      <img :src="flagUrl(opt.code)" :alt="opt.code" />
                      <span>{{ opt.code }}</span>
                    </div>
                  </div>
                </div>
                <div class="kurs-result">{{ formatResult(calcResult) }}</div>
              </div>
            </div>
          </div>

          <p class="kurs-disclaimer">Kurs bersifat indikatif dan dapat berubah sewaktu-waktu.</p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const tab  = ref('erate')
const mode = ref('buy')
const calcCurrency     = ref('USD')
const calcFromCurrency = ref('IDR')
const calcToCurrency   = ref('USD')
const calcAmount       = ref(0)

const calcFromOpen = ref(false)
const calcToOpen   = ref(false)

const calcAllOptions = computed(() => [
  { code: 'IDR' },
  ...erateRates.map(r => ({ code: r.code }))
])

function flagUrl(code) {
  const map = { IDR:'id', AUD:'au', EUR:'eu', GBP:'gb', JPY:'jp', SGD:'sg', USD:'us', HKD:'hk', MYR:'my' }
  return `https://flagcdn.com/w40/${map[code] || code.slice(0,2).toLowerCase()}.png`
}

const calcAmountDisplay = computed({
  get() { return calcAmount.value > 0 ? calcAmount.value.toLocaleString('id-ID') : '' },
  set(val) {
    const raw = val.replace(/[^\d]/g, '')
    calcAmount.value = raw ? parseInt(raw) : 0
  }
})

const erateRates = [
  { code: 'AUD', buy: 12622.21, sell: 12803.51 },
  { code: 'EUR', buy: 20586.85, sell: 20857.80 },
  { code: 'GBP', buy: 23764.87, sell: 24095.67 },
  { code: 'JPY', buy: 110.95,   sell: 112.51   },
  { code: 'SGD', buy: 13837.37, sell: 14027.77 },
  { code: 'USD', buy: 17698.00, sell: 17890.00 },
  { code: 'HKD', buy: 2263.45,  sell: 2300.12  },
  { code: 'MYR', buy: 3845.20,  sell: 3920.00  },
]

const ttRates = erateRates.map(r => ({
  ...r,
  buy:  parseFloat((r.buy  * 0.997).toFixed(2)),
  sell: parseFloat((r.sell * 1.003).toFixed(2)),
}))

const currentRates = computed(() => tab.value === 'erate' ? erateRates : ttRates)

const lastUpdated = computed(() => {
  const now = new Date()
  return now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) +
    ', ' + now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
})

function formatRate(val) {
  return val.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
function formatResult(val) {
  if (!val && val !== 0) return '0,00'
  return val.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
function getRateFor(code) { return currentRates.value.find(r => r.code === code) }

const calcResult = computed(() => {
  if (!calcAmount.value) return 0
  const useMode = mode.value
  if (calcFromCurrency.value === 'IDR') {
    const rate = getRateFor(calcToCurrency.value)
    if (!rate) return 0
    return calcAmount.value / (useMode === 'buy' ? rate.buy : rate.sell)
  } else if (calcToCurrency.value === 'IDR') {
    const rate = getRateFor(calcFromCurrency.value)
    if (!rate) return 0
    return calcAmount.value * (useMode === 'buy' ? rate.buy : rate.sell)
  } else {
    const fR = getRateFor(calcFromCurrency.value)
    const tR = getRateFor(calcToCurrency.value)
    if (!fR || !tR) return 0
    const fromRate = useMode === 'buy' ? fR.buy : fR.sell
    const toRate   = useMode === 'buy' ? tR.buy : tR.sell
    return (calcAmount.value * fromRate) / toRate
  }
})

function swapCalc() {
  const tmp = calcFromCurrency.value
  calcFromCurrency.value = calcToCurrency.value
  calcToCurrency.value = tmp
}
</script>

<style scoped>
.kurs-section { padding: 80px 0; background: transparent; }

/* Header */
.kurs-header {
  margin-bottom: 36px;
}
.kurs-note {
  display: flex; align-items: center; gap: 5px;
  font-size: 12px; color: rgba(255,255,255,0.32); margin-top: 6px;
}

/* Tabs */
.kurs-tabs {
  display: flex; gap: 4px; margin-bottom: 32px;
}
.kurs-tab {
  display: flex; align-items: center; gap: 8px;
  padding: 9px 20px; border-radius: 100px;
  font-size: 12.5px; font-weight: 700;
  color: rgba(255,255,255,0.38);
  background: rgba(255,255,255,0.08);
  border: 1.5px solid rgba(255,255,255,0.08);
  cursor: pointer; font-family: inherit;
  transition: color 0.2s, background 0.2s, border-color 0.2s;
}
.kurs-tab.active {
  color: #fff;
  background: rgba(0,87,184,0.18);
  border-color: rgba(0,87,184,0.38);
}
.tab-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: currentColor; opacity: 0.5; flex-shrink: 0;
}
.kurs-tab.active .tab-dot { opacity: 1; background: #60a5fa; }

/* Body: stacked flex layout */
.kurs-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Currency grid — full width */
.kurs-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
.kurs-card {
  background: rgba(255,255,255,0.06);
  border: 1.5px solid rgba(255,255,255,0.09);
  border-radius: 18px;
  padding: 20px 18px 16px;
  cursor: pointer;
  transition: border-color 0.22s, background 0.22s, transform 0.22s, box-shadow 0.22s;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.kurs-card:hover {
  background: rgba(255,255,255,0.09);
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.22);
}
.kurs-card.selected {
  background: rgba(0,87,184,0.15);
  border-color: rgba(0,87,184,0.45);
}
.kurs-card-top {
  display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
}
.kurs-flag-wrap {
  width: 30px; height: 21px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 1px 4px rgba(0,0,0,0.35);
  border: 1px solid rgba(255,255,255,0.10);
}
.kurs-flag-img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
}
.kurs-code {
  font-size: 14px; font-weight: 800;
  color: rgba(255,255,255,0.90);
  flex: 1; letter-spacing: 0.03em;
}
.kurs-check { color: #60a5fa; flex-shrink: 0; }
.kurs-rates { display: flex; align-items: stretch; gap: 0; }
.kurs-rate-item {
  flex: 1;
  display: flex; flex-direction: column; gap: 4px;
}
.kurs-rate-sep {
  width: 1px; background: rgba(255,255,255,0.08);
  margin: 0 12px; flex-shrink: 0;
}
.kurs-rate-lbl {
  font-size: 9px; font-weight: 700;
  color: rgba(255,255,255,0.25); text-transform: uppercase; letter-spacing: 0.07em;
}
.kurs-rate-val {
  font-size: 12.5px; font-weight: 700;
  color: rgba(255,255,255,0.78);
  font-variant-numeric: tabular-nums; white-space: nowrap;
}
.kurs-card.selected .kurs-rate-val { color: #93c5fd; }

/* Calculator — centered horizontal strip */
.kurs-calc {
  background: rgba(255,255,255,0.06);
  border: 1.5px solid rgba(255,255,255,0.10);
  border-radius: 20px;
  padding: 22px 28px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 8px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.16);
}

/* Top row: label + mode toggle */
.kurs-calc-top {
  display: flex; align-items: center;
  justify-content: space-between; gap: 16px;
}
.kurs-calc-header {
  display: flex; align-items: center; gap: 8px;
  font-size: 11px; font-weight: 800;
  color: rgba(255,255,255,0.35);
  letter-spacing: 0.10em; text-transform: uppercase;
}
.kurs-mode-row {
  display: flex;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.11);
  border-radius: 10px; overflow: hidden;
}
.kurs-mode-btn {
  padding: 8px 22px; font-size: 12px; font-weight: 800;
  letter-spacing: 0.04em;
  color: rgba(255,255,255,0.35);
  background: none; border: none; cursor: pointer;
  font-family: inherit;
  transition: background 0.2s, color 0.2s;
}
.kurs-mode-btn.active { background: var(--bri-blue); color: #fff; }

/* Fields row: FROM — swap — TO */
.kurs-calc-fields {
  display: flex;
  align-items: flex-end;
  gap: 12px;
}
.kurs-calc-fields .kurs-field-group { flex: 1; min-width: 0; }

.kurs-field-group { display: flex; flex-direction: column; gap: 6px; }
.kurs-field-label {
  font-size: 10px; font-weight: 700;
  color: rgba(255,255,255,0.28);
  text-transform: uppercase; letter-spacing: 0.08em;
}
.kurs-field-row {
  display: flex;
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 12px; overflow: visible;
  background: rgba(255,255,255,0.07);
  transition: border-color 0.2s;
  position: relative;
}
.kurs-field-row:focus-within { border-color: rgba(0,87,184,0.50); }

/* Custom flag select */
.kurs-csel-backdrop {
  position: fixed; inset: 0; z-index: 98;
}
.kurs-csel {
  position: relative; flex-shrink: 0;
  display: flex; align-items: center; gap: 7px;
  padding: 0 10px 0 12px;
  border-right: 1px solid rgba(255,255,255,0.08);
  cursor: pointer; min-width: 96px;
  user-select: none;
}
.kurs-csel-flag {
  width: 22px; height: 15px;
  border-radius: 3px; object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.30);
  border: 1px solid rgba(255,255,255,0.08);
}
.kurs-csel-code {
  font-size: 12px; font-weight: 700;
  color: rgba(255,255,255,0.85); flex: 1;
}
.kurs-csel-chev {
  color: rgba(255,255,255,0.35);
  transition: transform 0.2s;
  flex-shrink: 0;
}
.kurs-csel.open .kurs-csel-chev { transform: rotate(180deg); }

/* Dropdown list */
.kurs-csel-drop {
  position: absolute;
  top: calc(100% + 6px); left: 0;
  min-width: 130px;
  background: rgba(10,22,40,0.97);
  border: 1.5px solid rgba(255,255,255,0.13);
  border-radius: 12px; overflow: hidden;
  z-index: 99;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.45);
  max-height: 280px; overflow-y: auto;
}
.kurs-csel-opt {
  display: flex; align-items: center; gap: 9px;
  padding: 9px 14px;
  cursor: pointer; font-size: 12.5px; font-weight: 600;
  color: rgba(255,255,255,0.75);
  transition: background 0.15s;
}
.kurs-csel-opt:hover { background: rgba(255,255,255,0.06); }
.kurs-csel-opt.active {
  background: rgba(0,87,184,0.18);
  color: #fff;
}
.kurs-csel-opt img {
  width: 22px; height: 15px; border-radius: 3px;
  object-fit: cover; flex-shrink: 0;
  border: 1px solid rgba(255,255,255,0.08);
}
.kurs-input {
  flex: 1; background: none; border: none;
  color: rgba(255,255,255,0.85); font-family: inherit;
  font-size: 15px; font-weight: 600;
  padding: 13px 14px; outline: none; text-align: right; min-width: 0;
}
.kurs-result {
  flex: 1; display: flex; align-items: center; justify-content: flex-end;
  padding: 13px 14px; font-size: 15px; font-weight: 700;
  color: #60a5fa; font-variant-numeric: tabular-nums;
}

/* Swap button aligned with field rows */
.kurs-swap-btn {
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(0,87,184,0.18);
  border: 1.5px solid rgba(0,87,184,0.32);
  color: #60a5fa; display: flex; align-items: center; justify-content: center;
  cursor: pointer; flex-shrink: 0;
  margin-bottom: 2px;
  transition: background 0.2s, transform 0.3s cubic-bezier(0.22,1,0.36,1);
}
.kurs-swap-btn:hover { background: rgba(0,87,184,0.30); transform: rotate(180deg); }

.kurs-disclaimer {
  font-size: 11px; color: rgba(255,255,255,0.20); line-height: 1.5;
  text-align: center;
}

/* Responsive */
@media (max-width: 700px) {
  .kurs-grid { grid-template-columns: repeat(2, 1fr); }
  .kurs-calc { padding: 20px 16px; }
  .kurs-calc-fields { flex-direction: column; align-items: stretch; }
  .kurs-swap-btn { margin: 0 auto; transform: rotate(90deg); }
  .kurs-swap-btn:hover { transform: rotate(270deg); }
}
@media (max-width: 480px) {
  .kurs-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
