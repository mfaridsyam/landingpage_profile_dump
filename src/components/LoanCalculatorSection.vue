<template>
  <section class="loan-section" id="simulasi">
    <div class="container">

      <div class="loan-header reveal">
        <div class="section-eyebrow">Simulasi Kredit</div>
        <h2 class="section-title" style="margin-bottom:8px">Kalkulator Cicilan</h2>
        <p class="section-sub">Hitung estimasi cicilan kredit Anda dengan mudah dan cepat.</p>
      </div>

      <!-- Tab pills -->
      <div class="loan-tabs reveal">
        <button v-for="t in tabs" :key="t.id"
          class="loan-tab-pill" :class="{ active: activeTab === t.id }"
          @click="activeTab = t.id; resetForm()">
          <div class="loan-tab-icon" v-html="t.icon"></div>
          <span>{{ t.label }}</span>
        </button>
      </div>

      <!-- Calculator card -->
      <div class="loan-card reveal">
        <div class="loan-body">

          <!-- LEFT: form panel -->
          <div class="loan-panel-form">

            <!-- KPR -->
            <div v-if="activeTab === 'kpr'" class="loan-form">
              <div class="loan-form-head">
                <div class="loan-form-title">Cicilan KPR</div>
                <div class="loan-badge">Bunga {{ kprRate }}% p.a.</div>
              </div>
              <div class="loan-grid">
                <div class="loan-field loan-field-wide">
                  <label class="loan-label">Jumlah Pinjaman</label>
                  <div class="loan-input-wrap">
                    <span class="loan-prefix">Rp</span>
                    <input type="text" inputmode="numeric" :value="formatInput(kpr.loan)"
                      @input="e => kpr.loan = parseInputNum(e.target.value)" class="loan-input" placeholder="0" />
                  </div>
                  <input type="range" v-model.number="kpr.loan" min="0" max="5000000000" step="10000000" class="loan-slider" />
                </div>
                <div class="loan-field">
                  <label class="loan-label">Jangka Waktu</label>
                  <div class="loan-input-wrap">
                    <input type="number" v-model.number="kpr.tenor" min="1" max="30" class="loan-input" placeholder="1" />
                    <span class="loan-suffix">Tahun</span>
                  </div>
                  <input type="range" v-model.number="kpr.tenor" min="1" max="30" step="1" class="loan-slider" />
                </div>
                <div class="loan-field">
                  <label class="loan-label">Suku Bunga</label>
                  <div class="loan-input-wrap loan-readonly">
                    <input type="number" :value="kprRate" class="loan-input" readonly />
                    <span class="loan-suffix">%</span>
                  </div>
                </div>
              </div>
              <button class="loan-btn" @click="calcKPR">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="13" y2="14"/></svg>
                Hitung Cicilan
              </button>
            </div>

            <!-- KENDARAAN -->
            <div v-else-if="activeTab === 'kendaraan'" class="loan-form">
              <div class="loan-form-head">
                <div class="loan-form-title">Cicilan Kendaraan</div>
                <div class="loan-badge">Baru {{ kendaraanRate }}% · Bekas 8%</div>
              </div>
              <div class="loan-grid">
                <div class="loan-field">
                  <label class="loan-label">Status Kendaraan</label>
                  <div class="loan-select-wrap">
                    <select v-model="kendaraan.status" class="loan-select">
                      <option value="baru">Baru</option>
                      <option value="bekas">Bekas</option>
                    </select>
                    <svg class="loan-chev" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
                <div class="loan-field">
                  <label class="loan-label">Uang Muka</label>
                  <div class="loan-input-wrap">
                    <input type="number" v-model.number="kendaraan.dpPct" min="0" max="90" class="loan-input" style="max-width:52px" />
                    <span class="loan-suffix">%</span>
                    <span class="loan-eq">≈ Rp {{ formatInput(kendaraanDP) || '0' }}</span>
                  </div>
                </div>
                <div class="loan-field loan-field-wide">
                  <label class="loan-label">Harga OTR</label>
                  <div class="loan-input-wrap">
                    <span class="loan-prefix">Rp</span>
                    <input type="text" inputmode="numeric" :value="formatInput(kendaraan.otr)"
                      @input="e => kendaraan.otr = parseInputNum(e.target.value)" class="loan-input" placeholder="0" />
                  </div>
                  <input type="range" v-model.number="kendaraan.otr" min="0" max="2000000000" step="5000000" class="loan-slider" />
                </div>
                <div class="loan-field">
                  <label class="loan-label">Jangka Waktu</label>
                  <div class="loan-input-wrap">
                    <input type="number" v-model.number="kendaraan.tenor" min="1" max="7" class="loan-input" placeholder="1" />
                    <span class="loan-suffix">Tahun</span>
                  </div>
                  <input type="range" v-model.number="kendaraan.tenor" min="1" max="7" step="1" class="loan-slider" />
                </div>
                <div class="loan-field">
                  <label class="loan-label">Pokok Hutang</label>
                  <div class="loan-input-wrap loan-readonly">
                    <span class="loan-prefix">Rp</span>
                    <input type="text" :value="formatInput(kendaraanPrincipal)" readonly class="loan-input" />
                  </div>
                </div>
              </div>
              <button class="loan-btn" @click="calcKendaraan">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="13" y2="14"/></svg>
                Hitung Cicilan
              </button>
            </div>

            <!-- BRIGUNA -->
            <div v-else class="loan-form">
              <div class="loan-form-head">
                <div class="loan-form-title">Cicilan BRIGuna</div>
                <div class="loan-badge">Kredit Multiguna</div>
              </div>
              <div class="loan-grid">
                <div class="loan-field loan-field-wide">
                  <label class="loan-label">Plafond</label>
                  <div class="loan-input-wrap">
                    <span class="loan-prefix">Rp</span>
                    <input type="text" inputmode="numeric" :value="formatInput(briguna.loan)"
                      @input="e => briguna.loan = parseInputNum(e.target.value)" class="loan-input" placeholder="0" />
                  </div>
                  <input type="range" v-model.number="briguna.loan" min="0" max="500000000" step="1000000" class="loan-slider" />
                </div>
                <div class="loan-field">
                  <label class="loan-label">Jangka Waktu</label>
                  <div class="loan-input-wrap">
                    <input type="number" v-model.number="briguna.tenor" min="1" max="15" class="loan-input" placeholder="1" />
                    <span class="loan-suffix">Tahun</span>
                  </div>
                  <input type="range" v-model.number="briguna.tenor" min="1" max="15" step="1" class="loan-slider" />
                </div>
                <div class="loan-field">
                  <label class="loan-label">Suku Bunga Efektif</label>
                  <div class="loan-input-wrap">
                    <input type="number" v-model.number="briguna.rate" min="0" max="30" step="0.1" class="loan-input" placeholder="0" />
                    <span class="loan-suffix">%</span>
                  </div>
                  <input type="range" v-model.number="briguna.rate" min="0" max="30" step="0.1" class="loan-slider" />
                </div>
              </div>
              <button class="loan-btn" @click="calcBriguna">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="13" y2="14"/></svg>
                Hitung Cicilan
              </button>
            </div>

          </div><!-- /loan-panel-form -->

          <!-- RIGHT: result panel -->
          <div class="loan-panel-result">
            <Transition name="result-fade" mode="out-in">

              <!-- Result -->
              <div v-if="currentResult" key="result" class="loan-result-display">
                <div class="loan-result-eyebrow">Estimasi Angsuran</div>
                <div class="loan-result-monthly">
                  <div class="loan-result-unit">Rp</div>
                  <div class="loan-result-val">{{ formatRp(currentResult.monthly) }}</div>
                </div>
                <div class="loan-result-per">per bulan</div>

                <div class="loan-result-divider"></div>

                <div class="loan-result-rows">
                  <div class="loan-result-row">
                    <span>Total Pembayaran</span>
                    <span class="loan-result-row-val">Rp {{ formatRp(currentResult.total) }}</span>
                  </div>
                  <div v-if="currentResult.interest" class="loan-result-row">
                    <span>Total Bunga</span>
                    <span class="loan-result-row-val">Rp {{ formatRp(currentResult.interest) }}</span>
                  </div>
                </div>

                <p class="loan-result-note">* Nilai bersifat estimasi</p>
              </div>

              <!-- Empty state -->
              <div v-else key="empty" class="loan-empty">
                <div class="loan-empty-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="13" y2="14"/></svg>
                </div>
                <p class="loan-empty-hint">{{ currentTabInfo.hint }}</p>
                <div class="loan-empty-stats">
                  <div v-for="s in currentTabInfo.stats" :key="s.label" class="loan-empty-stat">
                    <div class="loan-empty-stat-val">{{ s.val }}</div>
                    <div class="loan-empty-stat-lbl">{{ s.label }}</div>
                  </div>
                </div>
              </div>

            </Transition>
          </div><!-- /loan-panel-result -->

        </div><!-- /loan-body -->

        <!-- Footer -->
        <div class="loan-footer">
          <p class="loan-disclaimer">* Simulasi bersifat estimasi. Perhitungan aktual mengikuti ketentuan sistem BRI.</p>
          <a href="#jaringan" class="loan-cta-link" @click.prevent="scrollTo('jaringan')">
            Temukan Cabang Terdekat
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
        </div>

      </div><!-- /loan-card -->
    </div>
  </section>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { lenis } from '@/lenis.js'

const activeTab = ref('kpr')

const tabs = [
  {
    id: 'kpr', label: 'KPR',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V10.5z"/><path d="M9 21V12h6v9"/></svg>`
  },
  {
    id: 'kendaraan', label: 'Kendaraan',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`
  },
  {
    id: 'briguna', label: 'BRIGuna',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>`
  },
]

const kprRate       = 7.25
const kendaraanRate = computed(() => kendaraan.status === 'baru' ? 6.50 : 8.00)

const kpr       = reactive({ loan: 0, tenor: 1, result: null })
const kendaraan = reactive({ otr: 0, dpPct: 25, tenor: 1, status: 'baru', result: null })
const briguna   = reactive({ loan: 0, tenor: 1, rate: 0, result: null })

const kendaraanDP        = computed(() => Math.round(kendaraan.otr * kendaraan.dpPct / 100))
const kendaraanPrincipal = computed(() => Math.round(kendaraan.otr - kendaraanDP.value))

const currentResult = computed(() => {
  if (activeTab.value === 'kpr') return kpr.result
  if (activeTab.value === 'kendaraan') return kendaraan.result
  return briguna.result
})

const currentTabInfo = computed(() => ({
  kpr: {
    hint: 'Isi formulir untuk melihat estimasi cicilan KPR Anda.',
    stats: [
      { val: '7.25%', label: 'Bunga p.a.' },
      { val: '30 Thn', label: 'Maks. Tenor' },
      { val: 'Rp 5 M', label: 'Maks. Plafon' },
    ]
  },
  kendaraan: {
    hint: 'Hitung cicilan kendaraan baru atau bekas Anda.',
    stats: [
      { val: '6.5%', label: 'Bunga Baru' },
      { val: '8%', label: 'Bunga Bekas' },
      { val: '7 Thn', label: 'Maks. Tenor' },
    ]
  },
  briguna: {
    hint: 'Simulasikan kredit multiguna BRIGuna Anda.',
    stats: [
      { val: 'Rp 500 M', label: 'Maks. Plafon' },
      { val: '15 Thn', label: 'Maks. Tenor' },
      { val: 'Multiguna', label: 'Peruntukan' },
    ]
  },
}[activeTab.value]))

function calcMonthly(principal, annualRate, years) {
  if (principal <= 0 || years <= 0 || annualRate <= 0) return principal / (years * 12)
  const r = annualRate / 100 / 12
  const n = years * 12
  return principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
}

function calcKPR() {
  const monthly = calcMonthly(kpr.loan, kprRate, kpr.tenor)
  const total = monthly * kpr.tenor * 12
  kpr.result = { monthly, total, interest: total - kpr.loan }
}

function calcKendaraan() {
  const rate = typeof kendaraanRate.value === 'number' ? kendaraanRate.value : parseFloat(kendaraanRate.value)
  const monthly = calcMonthly(kendaraanPrincipal.value, rate, kendaraan.tenor)
  const total = monthly * kendaraan.tenor * 12
  kendaraan.result = { monthly, total }
}

function calcBriguna() {
  const monthly = calcMonthly(briguna.loan, briguna.rate, briguna.tenor)
  const total = monthly * briguna.tenor * 12
  briguna.result = { monthly, total, interest: total - briguna.loan }
}

function resetForm() {
  kpr.result = null; kendaraan.result = null; briguna.result = null
}

function formatRp(val) { return val ? Math.round(val).toLocaleString('id-ID') : '0' }
function formatInput(val) { return (val && val > 0) ? Math.round(val).toLocaleString('id-ID') : '' }
function parseInputNum(str) {
  const raw = str.replace(/[^\d]/g, '')
  return raw ? parseInt(raw) : 0
}
function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) lenis.scrollTo(el, { offset: -68, duration: 1.2 })
}
</script>

<style scoped>
.loan-section { padding: 80px 0; background: transparent; }
.loan-header { margin-bottom: 40px; }

/* Tab pills */
.loan-tabs {
  display: flex; gap: 10px;
  margin-bottom: 24px; flex-wrap: wrap;
}
.loan-tab-pill {
  display: flex; align-items: center; gap: 10px;
  padding: 11px 20px; border-radius: 14px;
  background: rgba(255,255,255,0.75);
  border: 1.5px solid rgba(0,63,136,0.12);
  color: rgba(10,22,40,0.72);
  font-size: 13px; font-weight: 700;
  font-family: inherit; cursor: pointer;
  transition: all 0.22s cubic-bezier(0.22,1,0.36,1);
}
.loan-tab-pill:hover { border-color: rgba(0,63,136,0.24); color: rgba(10,22,40,0.80); }
.loan-tab-pill.active {
  background: rgba(0,87,184,0.12);
  border-color: rgba(0,87,184,0.38);
  color: var(--ink, #0A1628);
}
.loan-tab-icon { display: flex; }
.loan-tab-pill.active .loan-tab-icon { color: #0057b8; }

/* Card — full container width */
.loan-card {
  background: rgba(255,255,255,0.82);
  border: 1.5px solid rgba(0,63,136,0.12);
  border-radius: 24px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
 
}

/* 2-column body */
.loan-body {
  display: grid;
  grid-template-columns: 1fr 300px;
}

/* Left: form */
.loan-panel-form {
  padding: 0;
  border-right: 1px solid rgba(0,63,136,0.10);
}
.loan-form { padding: 28px 28px 24px; }
.loan-form-head {
  display: flex; align-items: center;
  justify-content: space-between; gap: 12px;
  margin-bottom: 24px; flex-wrap: wrap;
}
.loan-form-title {
  font-size: 18px; font-weight: 800;
  color: rgba(10,22,40,0.92); letter-spacing: -0.02em;
}
.loan-badge {
  font-size: 10px; font-weight: 800;
  letter-spacing: 0.06em; text-transform: uppercase;
  color: #0057b8;
  background: rgba(0,87,184,0.10);
  border: 1px solid rgba(0,87,184,0.22);
  padding: 4px 12px; border-radius: 100px;
}

/* Field grid — 2 columns */
.loan-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px 20px;
  margin-bottom: 20px;
}
.loan-field-wide { grid-column: 1 / -1; }
.loan-field { display: flex; flex-direction: column; gap: 7px; }
.loan-label {
  font-size: 11.5px; font-weight: 700;
  color: rgba(10,22,40,0.68); letter-spacing: 0.01em;
}

.loan-input-wrap {
  display: flex; align-items: center;
  border: 1.5px solid rgba(0,63,136,0.14);
  border-radius: 10px; overflow: hidden;
  background: rgba(255,255,255,0.85);
  transition: border-color 0.2s;
}
.loan-input-wrap:focus-within { border-color: rgba(0,87,184,0.48); }
.loan-input-wrap.loan-readonly { opacity: 0.60; }

.loan-prefix {
  padding: 0 10px; font-size: 12px; font-weight: 600;
  color: rgba(10,22,40,0.65);
  border-right: 1px solid rgba(0,63,136,0.10); flex-shrink: 0;
}
.loan-suffix {
  padding: 0 11px; font-size: 12px; font-weight: 600;
  color: rgba(10,22,40,0.65);
  border-left: 1px solid rgba(0,63,136,0.10); flex-shrink: 0;
}
.loan-eq {
  padding: 0 9px; font-size: 11px;
  color: rgba(10,22,40,0.75); flex-shrink: 0; white-space: nowrap;
}
.loan-input {
  flex: 1; min-width: 0;
  background: none; border: none;
  color: rgba(10,22,40,0.88); font-family: inherit;
  font-size: 13.5px; font-weight: 600;
  padding: 11px 12px; outline: none;
}
.loan-input::-webkit-outer-spin-button,
.loan-input::-webkit-inner-spin-button { -webkit-appearance: none; }
.loan-input[readonly] { cursor: default; }

.loan-slider {
  -webkit-appearance: none;
  width: 100%; height: 3px;
  border-radius: 2px;
  background: rgba(0,63,136,0.14);
  outline: none; cursor: pointer;
  accent-color: var(--bri-blue);
}
.loan-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 15px; height: 15px; border-radius: 50%;
  background: var(--bri-blue, #0057B8);
  cursor: pointer; box-shadow: 0 2px 8px rgba(0,87,184,0.40);
}

.loan-select-wrap { position: relative; }
.loan-select {
  width: 100%; appearance: none;
  background: rgba(255,255,255,0.85);
  border: 1.5px solid rgba(0,63,136,0.14);
  border-radius: 10px;
  color: rgba(10,22,40,0.88);
  font-family: inherit; font-size: 13.5px; font-weight: 600;
  padding: 11px 36px 11px 12px; outline: none; cursor: pointer;
  transition: border-color 0.2s;
}
.loan-select:focus { border-color: rgba(0,87,184,0.48); }
.loan-select option { background: #f0f4fc; color: #0A1628; }
.loan-chev {
  position: absolute; right: 11px; top: 50%;
  transform: translateY(-50%);
  color: rgba(10,22,40,0.60); pointer-events: none;
}

/* Hitung button — blue */
.loan-btn {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%; padding: 13px;
  background: var(--bri-blue, #0057B8);
  color: #fff;
  border: none; border-radius: 12px;
  font-family: inherit; font-size: 14px; font-weight: 800;
  cursor: pointer; letter-spacing: 0.02em;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}
.loan-btn:hover {
  background: #0066d6;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0,87,184,0.35);
}

/* Right: result panel */
.loan-panel-result {
  padding: 28px 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Result display */
.loan-result-display {
  display: flex;
  flex-direction: column;
}
.loan-result-eyebrow {
  font-size: 10px; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.10em;
  color: rgba(10,22,40,0.58); margin-bottom: 12px;
}
.loan-result-monthly {
  display: flex; align-items: baseline; gap: 6px;
  line-height: 1;
}
.loan-result-unit {
  font-size: 16px; font-weight: 700;
  color: rgba(10,22,40,0.72);
}
.loan-result-val {
  font-size: 28px; font-weight: 800;
  color: var(--ink, #0A1628); letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
  word-break: break-all;
}
.loan-result-per {
  font-size: 11.5px; color: rgba(10,22,40,0.62);
  margin-top: 4px; margin-bottom: 20px;
}
.loan-result-divider {
  height: 1px; background: rgba(0,63,136,0.10); margin-bottom: 16px;
}
.loan-result-rows {
  display: flex; flex-direction: column; gap: 10px;
}
.loan-result-row {
  display: flex; justify-content: space-between; align-items: flex-start;
  gap: 8px;
  font-size: 12px; color: rgba(10,22,40,0.65);
}
.loan-result-row-val {
  font-weight: 700; color: rgba(10,22,40,0.68);
  text-align: right; font-variant-numeric: tabular-nums;
}
.loan-result-note {
  font-size: 10.5px; color: rgba(10,22,40,0.72);
  margin-top: 16px;
}

/* Empty state */
.loan-empty {
  display: flex; flex-direction: column;
  align-items: center; text-align: center;
  gap: 12px;
}
.loan-empty-icon {
  width: 52px; height: 52px; border-radius: 16px;
  background: rgba(0,87,184,0.10);
  border: 1px solid rgba(0,87,184,0.20);
  display: flex; align-items: center; justify-content: center;
  color: rgba(0,87,184,0.55);
}
.loan-empty-hint {
  font-size: 12.5px; color: rgba(10,22,40,0.65);
  line-height: 1.55; margin: 0;
}
.loan-empty-stats {
  display: flex; flex-direction: column; gap: 0;
  width: 100%; margin-top: 4px;
  background: rgba(0,63,136,0.04);
  border: 1px solid rgba(0,63,136,0.10);
  border-radius: 12px; overflow: hidden;
}
.loan-empty-stat {
  display: flex; justify-content: space-between; align-items: center;
  padding: 9px 14px;
  border-bottom: 1px solid rgba(0,63,136,0.07);
}
.loan-empty-stat:last-child { border-bottom: none; }
.loan-empty-stat-val {
  font-size: 12.5px; font-weight: 800;
  color: #0057b8; letter-spacing: -0.01em;
}
.loan-empty-stat-lbl {
  font-size: 11px; color: rgba(10,22,40,0.60);
}

/* Footer */
.loan-footer {
  display: flex; align-items: center;
  justify-content: space-between; gap: 12px;
  padding: 14px 28px;
  border-top: 1px solid rgba(0,63,136,0.10);
  flex-wrap: wrap;
}
.loan-disclaimer { font-size: 11px; color: rgba(10,22,40,0.72); flex: 1; }
.loan-cta-link {
  display: flex; align-items: center; gap: 5px;
  font-size: 12.5px; font-weight: 700; color: #0057b8;
  text-decoration: none; white-space: nowrap;
  transition: gap 0.2s;
}
.loan-cta-link:hover { gap: 8px; }

/* Transition */
.result-fade-enter-active,
.result-fade-leave-active { transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.22,1,0.36,1); }
.result-fade-enter-from { opacity: 0; transform: translateY(8px); }
.result-fade-leave-to   { opacity: 0; transform: translateY(-6px); }

/* Responsive */
@media (max-width: 720px) {
  .loan-body { grid-template-columns: 1fr; }
  .loan-panel-result {
    border-top: 1px solid rgba(0,63,136,0.10);
    border-left: none;
    padding: 20px 22px;
  }
  .loan-empty { flex-direction: row; text-align: left; align-items: flex-start; flex-wrap: wrap; }
  .loan-empty-stats { flex-direction: row; }
  .loan-empty-stat { flex: 1; flex-direction: column; align-items: flex-start; gap: 2px; }
}
@media (max-width: 560px) {
  .loan-grid { grid-template-columns: 1fr; }
  .loan-tabs { flex-direction: column; }
  .loan-tab-pill { justify-content: center; }
  .loan-form { padding: 20px 18px 16px; }
  .loan-footer { padding: 12px 18px; }
}
</style>
