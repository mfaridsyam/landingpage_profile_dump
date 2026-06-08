<template>
  <section class="kurs-section" id="kurs">
    <div class="container">

      <div class="kurs-header reveal">
        <div class="section-eyebrow">Kurs &amp; Valas</div>
        <h2 class="section-title">Kurs Hari Ini</h2>
        <p class="kurs-desc">Pergerakan nilai tukar mata uang asing terhadap Rupiah. Data bersumber dari TradingView.</p>
      </div>

      <div class="kurs-body reveal">

        <!-- Currency pills -->
        <div class="kurs-pills">
          <button
            v-for="code in CODES" :key="code"
            class="kurs-pill" :class="{ active: currency === code }"
            @click="currency = code"
          >
            <img class="kurs-pill-flag" :src="flagUrl(code)" :alt="code" loading="lazy" />
            <span>{{ code }}</span>
          </button>
        </div>

        <!-- TradingView Chart -->
        <div class="kurs-chart-wrap">
          <div class="kurs-chart-head">
            <div class="kurs-chart-pair">
              <img class="kurs-chart-flag" :src="flagUrl(currency)" :alt="currency" />
              <span>{{ currency }}/IDR</span>
            </div>
            <div class="kurs-chart-actions">
              <span v-if="lastUpdate" class="kurs-last-update">Diperbarui: {{ lastUpdate }}</span>
              <a :href="`https://www.tradingview.com/symbols/${TV_SYMBOLS[currency]}/`"
                target="_blank" rel="noopener" class="kurs-chart-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Buka TradingView
              </a>
              <span class="kurs-chart-src">Powered by TradingView</span>
            </div>
          </div>
          <div :key="currency" ref="tvContainer" class="kurs-chart-body"></div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'

const currency = ref('USD')
const lastUpdate = ref('')

function formatUpdate() {
  const now = new Date()
  return now.toLocaleString('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
    timeZone: 'Asia/Makassar', hour12: false
  }) + ' WITA'
}

const CODES = ['AUD', 'EUR', 'GBP', 'JPY', 'SGD', 'USD', 'HKD', 'MYR', 'CHF', 'CNY']
const FLAG_MAP = { IDR:'id', AUD:'au', EUR:'eu', GBP:'gb', JPY:'jp', SGD:'sg', USD:'us', HKD:'hk', MYR:'my', CHF:'ch', CNY:'cn' }

function flagUrl(code) {
  return `https://flagcdn.com/w40/${FLAG_MAP[code] || code.slice(0,2).toLowerCase()}.png`
}

const tvContainer = ref(null)

const TV_SYMBOLS = {
  AUD: 'AUDIDR', EUR: 'EURIDR', GBP: 'GBPIDR', JPY: 'JPYIDR',
  SGD: 'SGDIDR', USD: 'USDIDR', HKD: 'HKDIDR', MYR: 'MYRIDR',
  CHF: 'CHFIDR', CNY: 'CNYIDR',
}

function initChart(code) {
  lastUpdate.value = formatUpdate()
  nextTick(() => {
    if (!tvContainer.value) return
    tvContainer.value.innerHTML = ''
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js'
    script.async = true
    script.textContent = JSON.stringify({
      symbols: [[`${TV_SYMBOLS[code]}|5D`]],
      chartOnly: false,
      width: '100%',
      height: 400,
      locale: 'id',
      colorTheme: 'light',
      autosize: false,
      showVolume: false,
      hideDateRanges: false,
      hideMarketStatus: true,
      scalePosition: 'right',
      scaleMode: 'Normal',
      valuesTracking: '1',
      changeMode: 'price-and-percent',
      chartType: 'area',
      lineWidth: 2,
      lineType: 0,
      dateRanges: ['1d|60', '5d|15', '1m|30', '6m|120', '12m|1D', '60m|1W', 'all|1M'],
      lineColor: 'rgba(0,87,184,1)',
      topColor: 'rgba(0,87,184,0.18)',
      bottomColor: 'rgba(0,87,184,0)',
      gridLineColor: 'rgba(0,63,136,0.06)',
      scaleFontColor: 'rgba(10,22,40,0.42)',
      backgroundColor: 'rgba(255,255,255,0)',
      isTransparent: true,
      largeChartUrl: `https://www.tradingview.com/symbols/${TV_SYMBOLS[code]}/`,
    })
    tvContainer.value.appendChild(script)
  })
}

watch(currency, initChart)
onMounted(() => initChart(currency.value))
</script>

<style scoped>
.kurs-section { padding: 80px 0; background: transparent; }

.kurs-header { margin-bottom: 32px; }
.kurs-desc {
  font-size: 15px;
  color: rgba(10,22,40,0.58);
  margin-top: 8px;
  line-height: 1.6;
}

/* Body */
.kurs-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Pills */
.kurs-pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.kurs-pill {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 15px; border-radius: 100px;
  background: rgba(255,255,255,0.85);
  border: 1.5px solid rgba(0,63,136,0.14);
  font-size: 12.5px; font-weight: 800;
  color: rgba(10,22,40,0.78);
  cursor: pointer; font-family: inherit;
  letter-spacing: 0.04em;
  transition: background 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.kurs-pill:hover {
  border-color: rgba(0,87,184,0.35);
  background: #fff;
  box-shadow: 0 3px 12px rgba(0,63,136,0.10);
}
.kurs-pill.active {
  background: #0057b8;
  border-color: #0057b8;
  color: #fff;
  box-shadow: 0 4px 16px rgba(0,87,184,0.28);
}
.kurs-pill-flag {
  width: 20px; height: 14px;
  border-radius: 3px; object-fit: cover;
  flex-shrink: 0;
  border: 1px solid rgba(0,0,0,0.08);
}

/* Chart */
.kurs-chart-wrap {
  background: rgba(255,255,255,0.82);
  border: 1.5px solid rgba(0,63,136,0.12);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.kurs-chart-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 20px 10px;
  border-bottom: 1px solid rgba(0,63,136,0.08);
}
.kurs-chart-pair {
  display: flex; align-items: center; gap: 8px;
  font-size: 14px; font-weight: 800;
  color: rgba(10,22,40,0.88); letter-spacing: -0.01em;
}
.kurs-chart-flag {
  width: 22px; height: 15px; border-radius: 3px;
  object-fit: cover; border: 1px solid rgba(0,63,136,0.10);
  box-shadow: 0 1px 3px rgba(0,0,0,0.14);
}
.kurs-chart-actions {
  display: flex; align-items: center; gap: 12px;
}
.kurs-chart-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 12px; border-radius: 8px;
  font-size: 12px; font-weight: 600;
  color: #0057b8;
  background: rgba(0,87,184,0.08);
  border: 1px solid rgba(0,87,184,0.18);
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s;
}
.kurs-chart-btn:hover {
  background: rgba(0,87,184,0.14);
  border-color: rgba(0,87,184,0.32);
}

.kurs-chart-src {
  font-size: 10.5px; color: rgba(10,22,40,0.38); font-weight: 500;
}
.kurs-last-update {
  font-size: 10.5px; color: rgba(10,22,40,0.46); font-weight: 500;
  white-space: nowrap;
}
.kurs-chart-body { min-height: 400px; }

@media (max-width: 480px) {
  .kurs-pill { padding: 7px 13px; font-size: 12px; }
}
</style>
