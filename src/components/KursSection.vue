<template>
  <section class="kurs-section" id="kurs">
    <div class="container">
      <div class="kurs-top reveal">
        <div class="kurs-top-left">
          <div class="section-eyebrow">Informasi Valuta</div>
          <h2 class="section-title" style="margin-bottom:4px">Kurs BRI</h2>
          <p class="kurs-update-note">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            * Terakhir diperbarui {{ lastUpdated }}. Untuk transaksi kurang dari eq. USD 3.500
          </p>
        </div>
        <a href="https://www.bri.co.id/kurs" target="_blank" class="kurs-more-link">
          Lihat Selengkapnya
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </a>
      </div>

      <!-- Tabs -->
      <div class="kurs-tabs reveal">
        <button class="kurs-tab" :class="{ active: kursTab === 'erate' }" @click="kursTab = 'erate'">
          E-RATE
          <span class="kurs-tab-info" title="Kurs untuk transaksi online/e-banking">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z"/></svg>
          </span>
        </button>
        <button class="kurs-tab" :class="{ active: kursTab === 'ttcounter' }" @click="kursTab = 'ttcounter'">
          KURS TT COUNTER
          <span class="kurs-tab-info" title="Kurs untuk transaksi di loket/teller bank">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z"/></svg>
          </span>
        </button>
      </div>

      <div class="kurs-body reveal">
        <!-- Left: Rate Table -->
        <div class="kurs-table-wrap">
          <table class="kurs-table">
            <thead>
              <tr>
                <th>KURS</th>
                <th>BELI</th>
                <th>JUAL</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="rate in currentRates" :key="rate.code"
                :class="{ selected: calcCurrency === rate.code }"
                @click="calcCurrency = rate.code">
                <td class="kurs-currency">
                  <span class="kurs-flag">{{ rate.flag }}</span>
                  <span class="kurs-code">{{ rate.code }}</span>
                </td>
                <td class="kurs-buy">{{ formatRate(rate.buy) }}</td>
                <td class="kurs-sell">{{ formatRate(rate.sell) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Right: Calculator -->
        <div class="kurs-calc-wrap">
          <div class="kurs-calc-title">KALKULATOR</div>
          <div class="kurs-calc-divider"></div>

          <div class="calc-mode-tabs">
            <button class="calc-mode-btn" :class="{ active: calcMode === 'buy' }" @click="calcMode = 'buy'">
              BELI
              <span class="kurs-tab-info">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z"/></svg>
              </span>
            </button>
            <button class="calc-mode-btn" :class="{ active: calcMode === 'sell' }" @click="calcMode = 'sell'">
              JUAL
              <span class="kurs-tab-info">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z"/></svg>
              </span>
            </button>
          </div>

          <div class="calc-fields">
            <div class="calc-field-row">
              <div class="calc-select-wrap">
                <select class="calc-select" v-model="calcFromCurrency">
                  <option value="IDR">IDR</option>
                  <option v-for="r in currentRates" :key="r.code" :value="r.code">{{ r.code }}</option>
                </select>
                <svg class="calc-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
              <input class="calc-input" type="text" inputmode="numeric" v-model="calcAmountDisplay" placeholder="0" />
            </div>

            <div class="calc-swap-row">
              <button class="calc-swap-btn" @click="swapCalc" title="Tukar mata uang">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
              </button>
            </div>

            <div class="calc-field-row">
              <div class="calc-select-wrap">
                <select class="calc-select" v-model="calcToCurrency">
                  <option value="IDR">IDR</option>
                  <option v-for="r in currentRates" :key="r.code" :value="r.code">{{ r.code }}</option>
                </select>
                <svg class="calc-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
              <div class="calc-result">{{ formatResult(calcResult) }}</div>
            </div>
          </div>

          <p class="calc-disclaimer">Nilai kurs bersifat indikatif dan dapat berubah sewaktu-waktu.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const kursTab = ref('erate')
const calcMode = ref('buy')
const calcCurrency = ref('USD')
const calcFromCurrency = ref('IDR')
const calcToCurrency = ref('USD')
const calcAmount = ref(0)

const calcAmountDisplay = computed({
  get() {
    return calcAmount.value > 0 ? calcAmount.value.toLocaleString('id-ID') : ''
  },
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

const currentRates = computed(() => kursTab.value === 'erate' ? erateRates : ttRates)

const lastUpdated = computed(() => {
  const now = new Date()
  return now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) +
    ', ' + now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
})

function formatRate(val) {
  return val.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function formatResult(val) {
  if (!val && val !== 0) return '0'
  return val.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function getRateFor(code) {
  return currentRates.value.find(r => r.code === code)
}

const calcResult = computed(() => {
  if (!calcAmount.value || calcAmount.value === 0) return 0
  const rate = getRateFor(calcFromCurrency.value !== 'IDR' ? calcFromCurrency.value : calcToCurrency.value)
  if (!rate) return 0

  const useRate = calcMode.value === 'buy' ? rate.buy : rate.sell

  if (calcFromCurrency.value === 'IDR') {
    return calcAmount.value / useRate
  } else if (calcToCurrency.value === 'IDR') {
    return calcAmount.value * useRate
  } else {
    const fromRate = getRateFor(calcFromCurrency.value)
    const toRate   = getRateFor(calcToCurrency.value)
    if (!fromRate || !toRate) return 0
    const fromR = calcMode.value === 'buy' ? fromRate.buy : fromRate.sell
    const toR   = calcMode.value === 'buy' ? toRate.buy   : toRate.sell
    return (calcAmount.value * fromR) / toR
  }
})

function swapCalc() {
  const tmp = calcFromCurrency.value
  calcFromCurrency.value = calcToCurrency.value
  calcToCurrency.value = tmp
}
</script>

<style scoped>
.kurs-section {
  padding: 72px 0 72px;
  background: transparent;
}

.kurs-top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 32px;
  gap: 16px;
  flex-wrap: wrap;
}
.kurs-update-note {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: rgba(255,255,255,0.35);
  margin-top: 4px;
}
.kurs-more-link {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 700;
  color: #60a5fa;
  text-decoration: none;
  flex-shrink: 0;
  transition: gap 0.2s;
}
.kurs-more-link:hover { gap: 8px; }

/* Tabs */
.kurs-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1.5px solid rgba(255,255,255,0.10);
  margin-bottom: 32px;
}
.kurs-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 24px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: rgba(255,255,255,0.40);
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  position: relative;
  transition: color 0.2s;
}
.kurs-tab.active { color: #60a5fa; }
.kurs-tab.active::after {
  content: '';
  position: absolute;
  bottom: -1.5px;
  left: 0; right: 0;
  height: 2.5px;
  background: #60a5fa;
  border-radius: 2px 2px 0 0;
}
.kurs-tab-info { color: rgba(255,255,255,0.30); display: flex; align-items: center; }

/* Body */
.kurs-body {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 48px;
  align-items: start;
}

/* Table */
.kurs-table-wrap { overflow: hidden; }
.kurs-table { width: 100%; border-collapse: collapse; }
.kurs-table thead tr { border-bottom: 1.5px solid rgba(255,255,255,0.12); }
.kurs-table th {
  padding: 0 0 12px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.10em;
  color: #60a5fa;
  text-align: left;
}
.kurs-table th:not(:first-child) { text-align: right; }
.kurs-table tbody tr {
  border-bottom: 1px solid rgba(255,255,255,0.06);
  transition: background 0.15s;
  cursor: pointer;
}
.kurs-table tbody tr:hover { background: rgba(255,255,255,0.04); }
.kurs-table tbody tr.selected { background: rgba(0,87,184,0.12); }
.kurs-table td { padding: 14px 0; }
.kurs-currency { display: flex; align-items: center; gap: 12px; }
.kurs-flag { font-size: 22px; line-height: 1; }
.kurs-code { font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.85); }
.kurs-buy, .kurs-sell {
  text-align: right;
  font-size: 14px;
  font-weight: 600;
  color: rgba(255,255,255,0.75);
  font-variant-numeric: tabular-nums;
}

/* Calculator */
.kurs-calc-wrap {
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.10);
  border-radius: 16px;
  padding: 28px 24px;
  backdrop-filter: blur(8px);
  position: sticky;
  top: 88px;
}
.kurs-calc-title {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.14em;
  color: #60a5fa;
  margin-bottom: 14px;
}
.kurs-calc-divider {
  height: 1.5px;
  background: rgba(255,255,255,0.10);
  margin-bottom: 20px;
}

.calc-mode-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 22px;
}
.calc-mode-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: rgba(255,255,255,0.40);
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.2s, color 0.2s;
}
.calc-mode-btn.active {
  background: var(--bri-blue);
  color: #fff;
}

.calc-fields { display: flex; flex-direction: column; gap: 0; }
.calc-field-row {
  display: flex;
  gap: 0;
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  overflow: hidden;
  background: rgba(255,255,255,0.05);
}
.calc-select-wrap {
  position: relative;
  flex-shrink: 0;
  border-right: 1px solid rgba(255,255,255,0.10);
}
.calc-select {
  appearance: none;
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.85);
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  padding: 14px 32px 14px 14px;
  cursor: pointer;
  outline: none;
  width: 90px;
}
.calc-select option { background: #0A1628; color: white; }
.calc-chevron {
  position: absolute;
  right: 8px; top: 50%;
  transform: translateY(-50%);
  color: rgba(255,255,255,0.40);
  pointer-events: none;
}
.calc-input {
  flex: 1;
  background: none;
  border: none;
  color: rgba(255,255,255,0.85);
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  padding: 14px 14px;
  outline: none;
  text-align: right;
  min-width: 0;
}
.calc-input::-webkit-outer-spin-button,
.calc-input::-webkit-inner-spin-button { -webkit-appearance: none; }
.calc-result {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 14px 14px;
  font-size: 15px;
  font-weight: 700;
  color: #60a5fa;
  font-variant-numeric: tabular-nums;
}

.calc-swap-row {
  display: flex;
  justify-content: center;
  padding: 8px 0;
}
.calc-swap-btn {
  width: 34px; height: 34px; border-radius: 50%;
  background: rgba(0,87,184,0.20);
  border: 1.5px solid rgba(0,87,184,0.35);
  color: #60a5fa;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.calc-swap-btn:hover { background: rgba(0,87,184,0.35); transform: rotate(180deg); }

.calc-disclaimer {
  font-size: 11px;
  color: rgba(255,255,255,0.28);
  margin-top: 16px;
  line-height: 1.5;
}

/* Responsive */
@media (max-width: 1024px) {
  .kurs-body { grid-template-columns: 1fr; gap: 32px; }
  .kurs-calc-wrap { position: static; }
}
@media (max-width: 600px) {
  .kurs-tab { padding: 10px 14px; font-size: 11px; }
  .kurs-flag { font-size: 18px; }
}
</style>
