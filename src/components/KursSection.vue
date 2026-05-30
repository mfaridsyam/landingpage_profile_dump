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
        <a href="https://www.bri.co.id/kurs" target="_blank" class="kurs-link">
          Lihat Selengkapnya
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </a>
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
              <span class="kurs-flag">{{ rate.flag }}</span>
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
          <div class="kurs-calc-header">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="13" y2="14"/></svg>
            Kalkulator Kurs
          </div>

          <div class="kurs-mode-row">
            <button class="kurs-mode-btn" :class="{ active: mode === 'buy' }" @click="mode = 'buy'">Beli</button>
            <button class="kurs-mode-btn" :class="{ active: mode === 'sell' }" @click="mode = 'sell'">Jual</button>
          </div>

          <div class="kurs-field-group">
            <label class="kurs-field-label">Dari</label>
            <div class="kurs-field-row">
              <div class="kurs-select-wrap">
                <select v-model="calcFromCurrency" class="kurs-select">
                  <option value="IDR">IDR</option>
                  <option v-for="r in currentRates" :key="r.code" :value="r.code">{{ r.code }}</option>
                </select>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="kurs-chev"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
              <input class="kurs-input" type="text" inputmode="numeric" v-model="calcAmountDisplay" placeholder="0" />
            </div>
          </div>

          <div class="kurs-swap-row">
            <div class="kurs-swap-line"></div>
            <button class="kurs-swap-btn" @click="swapCalc" title="Tukar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
            </button>
            <div class="kurs-swap-line"></div>
          </div>

          <div class="kurs-field-group">
            <label class="kurs-field-label">Ke</label>
            <div class="kurs-field-row">
              <div class="kurs-select-wrap">
                <select v-model="calcToCurrency" class="kurs-select">
                  <option value="IDR">IDR</option>
                  <option v-for="r in currentRates" :key="r.code" :value="r.code">{{ r.code }}</option>
                </select>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="kurs-chev"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
              <div class="kurs-result">{{ formatResult(calcResult) }}</div>
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

const calcAmountDisplay = computed({
  get() { return calcAmount.value > 0 ? calcAmount.value.toLocaleString('id-ID') : '' },
  set(val) {
    const raw = val.replace(/[^\d]/g, '')
    calcAmount.value = raw ? parseInt(raw) : 0
  }
})

const erateRates = [
  { code: 'AUD', flag: '🇦🇺', buy: 12622.21, sell: 12803.51 },
  { code: 'EUR', flag: '🇪🇺', buy: 20586.85, sell: 20857.80 },
  { code: 'GBP', flag: '🇬🇧', buy: 23764.87, sell: 24095.67 },
  { code: 'JPY', flag: '🇯🇵', buy: 110.95,   sell: 112.51   },
  { code: 'SGD', flag: '🇸🇬', buy: 13837.37, sell: 14027.77 },
  { code: 'USD', flag: '🇺🇸', buy: 17698.00, sell: 17890.00 },
  { code: 'HKD', flag: '🇭🇰', buy: 2263.45,  sell: 2300.12  },
  { code: 'MYR', flag: '🇲🇾', buy: 3845.20,  sell: 3920.00  },
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
  display: flex; align-items: flex-end;
  justify-content: space-between; gap: 20px;
  margin-bottom: 36px; flex-wrap: wrap;
}
.kurs-note {
  display: flex; align-items: center; gap: 5px;
  font-size: 12px; color: rgba(255,255,255,0.32); margin-top: 6px;
}
.kurs-link {
  display: flex; align-items: center; gap: 5px;
  font-size: 13px; font-weight: 700; color: #60a5fa;
  text-decoration: none; flex-shrink: 0; white-space: nowrap;
  transition: gap 0.2s;
}
.kurs-link:hover { gap: 8px; }

/* Tabs */
.kurs-tabs {
  display: flex; gap: 4px; margin-bottom: 32px;
}
.kurs-tab {
  display: flex; align-items: center; gap: 8px;
  padding: 9px 20px; border-radius: 100px;
  font-size: 12.5px; font-weight: 700;
  color: rgba(255,255,255,0.38);
  background: rgba(255,255,255,0.04);
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

/* Body: grid + calc */
.kurs-body {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 32px;
  align-items: start;
}

/* Currency grid */
.kurs-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.kurs-card {
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 16px;
  cursor: pointer;
  transition: border-color 0.22s, background 0.22s, transform 0.22s;
}
.kurs-card:hover { background: rgba(255,255,255,0.07); transform: translateY(-2px); }
.kurs-card.selected {
  background: rgba(0,87,184,0.14);
  border-color: rgba(0,87,184,0.40);
}
.kurs-card-top {
  display: flex; align-items: center; gap: 8px; margin-bottom: 12px;
}
.kurs-flag { font-size: 20px; line-height: 1; }
.kurs-code {
  font-size: 13px; font-weight: 800;
  color: rgba(255,255,255,0.88);
  flex: 1; letter-spacing: 0.02em;
}
.kurs-check { color: #60a5fa; flex-shrink: 0; }
.kurs-rates { display: flex; align-items: stretch; gap: 0; }
.kurs-rate-item {
  flex: 1;
  display: flex; flex-direction: column; gap: 3px;
}
.kurs-rate-sep {
  width: 1px; background: rgba(255,255,255,0.08);
  margin: 0 10px; flex-shrink: 0;
}
.kurs-rate-lbl {
  font-size: 9.5px; font-weight: 700;
  color: rgba(255,255,255,0.28); text-transform: uppercase; letter-spacing: 0.06em;
}
.kurs-rate-val {
  font-size: 12px; font-weight: 700;
  color: rgba(255,255,255,0.75);
  font-variant-numeric: tabular-nums; white-space: nowrap;
}
.kurs-card.selected .kurs-rate-val { color: #93c5fd; }

/* Calculator */
.kurs-calc {
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.10);
  border-radius: 20px;
  padding: 24px 20px;

  display: flex; flex-direction: column; gap: 18px;
  position: sticky; top: 88px;
}
.kurs-calc-header {
  display: flex; align-items: center; gap: 8px;
  font-size: 11px; font-weight: 800;
  color: rgba(255,255,255,0.35);
  letter-spacing: 0.10em; text-transform: uppercase;
}
.kurs-mode-row {
  display: grid; grid-template-columns: 1fr 1fr; gap: 0;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 10px; overflow: hidden;
}
.kurs-mode-btn {
  padding: 9px; font-size: 12px; font-weight: 800;
  letter-spacing: 0.04em;
  color: rgba(255,255,255,0.35);
  background: none; border: none; cursor: pointer;
  font-family: inherit;
  transition: background 0.2s, color 0.2s;
}
.kurs-mode-btn.active { background: var(--bri-blue); color: #fff; }

.kurs-field-group { display: flex; flex-direction: column; gap: 6px; }
.kurs-field-label {
  font-size: 10.5px; font-weight: 700;
  color: rgba(255,255,255,0.30);
  text-transform: uppercase; letter-spacing: 0.08em;
}
.kurs-field-row {
  display: flex;
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 10px; overflow: hidden;
  background: rgba(255,255,255,0.04);
  transition: border-color 0.2s;
}
.kurs-field-row:focus-within { border-color: rgba(0,87,184,0.50); }
.kurs-select-wrap {
  position: relative; flex-shrink: 0;
  border-right: 1px solid rgba(255,255,255,0.08);
}
.kurs-select {
  appearance: none; background: transparent; border: none;
  color: rgba(255,255,255,0.85); font-family: inherit;
  font-size: 12px; font-weight: 700;
  padding: 12px 28px 12px 12px; cursor: pointer; outline: none; width: 80px;
}
.kurs-select option { background: #0A1628; color: white; }
.kurs-chev {
  position: absolute; right: 6px; top: 50%;
  transform: translateY(-50%);
  color: rgba(255,255,255,0.35); pointer-events: none;
}
.kurs-input {
  flex: 1; background: none; border: none;
  color: rgba(255,255,255,0.85); font-family: inherit;
  font-size: 14px; font-weight: 600;
  padding: 12px; outline: none; text-align: right; min-width: 0;
}
.kurs-result {
  flex: 1; display: flex; align-items: center; justify-content: flex-end;
  padding: 12px; font-size: 14px; font-weight: 700;
  color: #60a5fa; font-variant-numeric: tabular-nums;
}

.kurs-swap-row {
  display: flex; align-items: center; gap: 10px;
}
.kurs-swap-line { flex: 1; height: 1px; background: rgba(255,255,255,0.08); }
.kurs-swap-btn {
  width: 32px; height: 32px; border-radius: 50%;
  background: rgba(0,87,184,0.18);
  border: 1.5px solid rgba(0,87,184,0.32);
  color: #60a5fa; display: flex; align-items: center; justify-content: center;
  cursor: pointer; flex-shrink: 0;
  transition: background 0.2s, transform 0.25s;
}
.kurs-swap-btn:hover { background: rgba(0,87,184,0.30); transform: rotate(180deg); }

.kurs-disclaimer {
  font-size: 11px; color: rgba(255,255,255,0.22); line-height: 1.5;
}

/* Responsive */
@media (max-width: 1100px) {
  .kurs-grid { grid-template-columns: repeat(4, 1fr); }
  .kurs-body { grid-template-columns: 1fr 290px; }
}
@media (max-width: 900px) {
  .kurs-body { grid-template-columns: 1fr; }
  .kurs-grid { grid-template-columns: repeat(4, 1fr); }
  .kurs-calc { position: static; }
}
@media (max-width: 600px) {
  .kurs-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
