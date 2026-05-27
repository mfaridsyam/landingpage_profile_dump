<template>
  <section class="loan-section" id="kalkulator">
    <div class="container">
      <div class="loan-header reveal">
        <div class="section-eyebrow">Simulasi Kredit</div>
        <h2 class="section-title" style="margin-bottom:8px">Kalkulator Cicilan</h2>
        <p class="section-sub">Hitung estimasi cicilan kredit Anda dengan mudah dan cepat.</p>
      </div>

      <!-- Main layout -->
      <div class="loan-layout">
        <!-- Left: illustration -->
        <div class="loan-illus reveal">
          <Transition name="illus-fade" mode="out-in">
            <img :key="activeTab" :src="illustrations[activeTab]" :alt="tabLabels[activeTab]" class="loan-illus-img" />
          </Transition>
          <div class="loan-disclaimer">
            <div class="loan-disclaimer-title">Syarat &amp; Ketentuan</div>
            <ul>
              <li v-for="note in disclaimers[activeTab]" :key="note">{{ note }}</li>
            </ul>
          </div>
        </div>

        <!-- Right: calculator -->
        <div class="loan-calc reveal reveal-delay-1">
          <!-- Tabs -->
          <div class="loan-tabs">
            <button v-for="t in tabs" :key="t.id"
              class="loan-tab" :class="{ active: activeTab === t.id }"
              @click="activeTab = t.id; resetForm()">
              {{ t.label }}
            </button>
          </div>
          <div class="loan-tab-indicator" :style="indicatorStyle"></div>

          <!-- KPR -->
          <div v-if="activeTab === 'kpr'" class="loan-form">
            <h3 class="loan-form-title">Cicilan KPR</h3>
            <div class="loan-form-divider"></div>

            <div class="loan-field">
              <label class="loan-label">Jumlah Pinjaman
                <button class="loan-edit-btn" @click="kpr.loanFocus = !kpr.loanFocus">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
              </label>
              <div class="loan-input-wrap">
                <span class="loan-prefix">Rp</span>
                <input type="text" inputmode="numeric" :value="formatInput(kpr.loan)" @input="e => kpr.loan = parseInputNum(e.target.value)" class="loan-input" placeholder="0" />
              </div>
              <input type="range" v-model.number="kpr.loan" min="0" max="5000000000" step="10000000" class="loan-slider" />
            </div>

            <div class="loan-row">
              <div class="loan-field">
                <label class="loan-label">Jangka Waktu
                  <button class="loan-edit-btn" @click="kpr.tenorFocus = !kpr.tenorFocus"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                </label>
                <div class="loan-input-wrap">
                  <input type="number" v-model.number="kpr.tenor" min="1" max="30" class="loan-input" placeholder="1" />
                  <span class="loan-suffix">Tahun</span>
                </div>
                <input type="range" v-model.number="kpr.tenor" min="1" max="30" step="1" class="loan-slider" />
              </div>
              <div class="loan-field">
                <label class="loan-label">Suku Bunga Efektif</label>
                <div class="loan-input-wrap loan-input-readonly">
                  <input type="number" :value="kprRate" class="loan-input" readonly />
                  <span class="loan-suffix">%</span>
                </div>
              </div>
            </div>

            <button class="loan-btn-calc" @click="calcKPR">Hitung</button>

            <Transition name="result-slide">
              <div v-if="kpr.result" class="loan-result-box">
                <div class="loan-result-item">
                  <span class="loan-result-label">Estimasi Angsuran / Bulan</span>
                  <span class="loan-result-val">Rp {{ formatRp(kpr.result.monthly) }}</span>
                </div>
                <div class="loan-result-item">
                  <span class="loan-result-label">Total Pembayaran</span>
                  <span class="loan-result-val secondary">Rp {{ formatRp(kpr.result.total) }}</span>
                </div>
                <div class="loan-result-item">
                  <span class="loan-result-label">Total Bunga</span>
                  <span class="loan-result-val secondary">Rp {{ formatRp(kpr.result.interest) }}</span>
                </div>
              </div>
            </Transition>
          </div>

          <!-- KENDARAAN -->
          <div v-else-if="activeTab === 'kendaraan'" class="loan-form">
            <h3 class="loan-form-title">Cicilan Kendaraan</h3>
            <div class="loan-form-divider"></div>

            <div class="loan-field">
              <label class="loan-label">Status Kendaraan</label>
              <div class="loan-select-wrap">
                <select v-model="kendaraan.status" class="loan-select">
                  <option value="baru">Baru</option>
                  <option value="bekas">Bekas</option>
                </select>
                <svg class="loan-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>

            <div class="loan-field">
              <label class="loan-label">Harga OTR
                <button class="loan-edit-btn" @click="kendaraan.otrFocus = !kendaraan.otrFocus"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
              </label>
              <div class="loan-input-wrap">
                <span class="loan-prefix">Rp</span>
                <input type="text" inputmode="numeric" :value="formatInput(kendaraan.otr)" @input="e => kendaraan.otr = parseInputNum(e.target.value)" class="loan-input" placeholder="0" />
              </div>
              <input type="range" v-model.number="kendaraan.otr" min="0" max="2000000000" step="5000000" class="loan-slider" />
            </div>

            <div class="loan-field">
              <label class="loan-label">Uang Muka</label>
              <div class="loan-input-wrap">
                <input type="number" v-model.number="kendaraan.dpPct" min="0" max="90" class="loan-input" style="max-width:60px" />
                <span class="loan-suffix">%</span>
                <span class="loan-dp-eq">≈</span>
                <span class="loan-prefix">Rp</span>
                <input type="text" :value="formatInput(kendaraanDP)" readonly class="loan-input" />
              </div>
            </div>

            <div class="loan-field">
              <label class="loan-label">Pokok Hutang</label>
              <div class="loan-input-wrap loan-input-readonly">
                <span class="loan-prefix">Rp</span>
                <input type="text" :value="formatInput(kendaraanPrincipal)" readonly class="loan-input" />
              </div>
            </div>

            <div class="loan-row">
              <div class="loan-field">
                <label class="loan-label">Jangka Waktu
                  <button class="loan-edit-btn" @click="kendaraan.tenorFocus = !kendaraan.tenorFocus"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                </label>
                <div class="loan-input-wrap">
                  <input type="number" v-model.number="kendaraan.tenor" min="1" max="7" class="loan-input" placeholder="1" />
                  <span class="loan-suffix">Tahun</span>
                </div>
                <input type="range" v-model.number="kendaraan.tenor" min="1" max="7" step="1" class="loan-slider" />
              </div>
              <div class="loan-field">
                <label class="loan-label">Bunga</label>
                <div class="loan-input-wrap loan-input-readonly">
                  <input type="number" :value="kendaraanRate" readonly class="loan-input" />
                  <span class="loan-suffix">%</span>
                </div>
              </div>
            </div>

            <button class="loan-btn-calc" @click="calcKendaraan">Hitung</button>

            <Transition name="result-slide">
              <div v-if="kendaraan.result" class="loan-result-box">
                <div class="loan-result-item">
                  <span class="loan-result-label">Estimasi Angsuran / Bulan</span>
                  <span class="loan-result-val">Rp {{ formatRp(kendaraan.result.monthly) }}</span>
                </div>
                <div class="loan-result-item">
                  <span class="loan-result-label">Total Pembayaran</span>
                  <span class="loan-result-val secondary">Rp {{ formatRp(kendaraan.result.total) }}</span>
                </div>
              </div>
            </Transition>
          </div>

          <!-- BRIGUNA -->
          <div v-else class="loan-form">
            <h3 class="loan-form-title">Cicilan BRIGuna</h3>
            <div class="loan-form-divider"></div>

            <div class="loan-field">
              <label class="loan-label">Plafond
                <button class="loan-edit-btn" @click="briguna.loanFocus = !briguna.loanFocus"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
              </label>
              <div class="loan-input-wrap">
                <span class="loan-prefix">Rp</span>
                <input type="text" inputmode="numeric" :value="formatInput(briguna.loan)" @input="e => briguna.loan = parseInputNum(e.target.value)" class="loan-input" placeholder="0" />
              </div>
              <input type="range" v-model.number="briguna.loan" min="0" max="500000000" step="1000000" class="loan-slider" />
            </div>

            <div class="loan-row">
              <div class="loan-field">
                <label class="loan-label">Jangka Waktu
                  <button class="loan-edit-btn" @click="briguna.tenorFocus = !briguna.tenorFocus"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                </label>
                <div class="loan-input-wrap">
                  <input type="number" v-model.number="briguna.tenor" min="1" max="15" class="loan-input" placeholder="1" />
                  <span class="loan-suffix">Tahun</span>
                </div>
                <input type="range" v-model.number="briguna.tenor" min="1" max="15" step="1" class="loan-slider" />
              </div>
              <div class="loan-field">
                <label class="loan-label">Suku Bunga Efektif
                  <button class="loan-edit-btn" @click="briguna.rateFocus = !briguna.rateFocus"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                </label>
                <div class="loan-input-wrap">
                  <input type="number" v-model.number="briguna.rate" min="0" max="30" step="0.1" class="loan-input" placeholder="0" />
                  <span class="loan-suffix">%</span>
                </div>
                <input type="range" v-model.number="briguna.rate" min="0" max="30" step="0.1" class="loan-slider" />
              </div>
            </div>

            <button class="loan-btn-calc" @click="calcBriguna">Hitung</button>

            <Transition name="result-slide">
              <div v-if="briguna.result" class="loan-result-box">
                <div class="loan-result-item">
                  <span class="loan-result-label">Estimasi Angsuran / Bulan</span>
                  <span class="loan-result-val">Rp {{ formatRp(briguna.result.monthly) }}</span>
                </div>
                <div class="loan-result-item">
                  <span class="loan-result-label">Total Pembayaran</span>
                  <span class="loan-result-val secondary">Rp {{ formatRp(briguna.result.total) }}</span>
                </div>
                <div class="loan-result-item">
                  <span class="loan-result-label">Total Bunga</span>
                  <span class="loan-result-val secondary">Rp {{ formatRp(briguna.result.interest) }}</span>
                </div>
              </div>
            </Transition>
          </div>

          <!-- CTA row -->
          <div class="loan-cta-row">
            <div class="loan-cta-text">
              <span>Tertarik mengajukan kredit?</span>
              <span class="loan-cta-sub">Kunjungi cabang terdekat kami.</span>
            </div>
            <a href="#jaringan" class="loan-cta-link" @click.prevent="scrollTo('jaringan')">
              Temukan Cabang
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { lenis } from '@/lenis.js'

const activeTab = ref('kpr')
const tabs = [
  { id: 'kpr',       label: 'CICILAN KPR' },
  { id: 'kendaraan', label: 'CICILAN KENDARAAN' },
  { id: 'briguna',   label: 'CICILAN BRIGUNA' },
]
const tabLabels = { kpr: 'Cicilan KPR', kendaraan: 'Cicilan Kendaraan', briguna: 'Cicilan BRIGuna' }

const kprRate      = 7.25  // % p.a. fixed for demo
const kendaraanRate = computed(() => kendaraan.status === 'baru' ? 6.50 : 8.00)

const illustrations = {
  kpr:       'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=640&q=80',
  kendaraan: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=640&q=80',
  briguna:   'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=640&q=80',
}

const disclaimers = {
  kpr: [
    'Setelah jangka waktu fixed rate berakhir, suku bunga yang berlaku adalah suku bunga floating rate.',
    'Perincian Kredit di atas hanya merupakan simulasi / estimasi biaya.',
    'Perhitungan tersebut masih belum termasuk biaya lain-lain.',
  ],
  kendaraan: [
    'Perhitungan di atas belum termasuk pajak bunga.',
    'Suku bunga dapat berubah sewaktu-waktu mengikuti ketentuan yang berlaku.',
    'Simulasi ini merupakan ilustrasi perhitungan Tahapan Berjangka, perhitungan sebenarnya mengikuti perhitungan di sistem BRI.',
  ],
  briguna: [
    'Perincian Kredit di atas hanya merupakan simulasi / estimasi biaya.',
    'Perhitungan tersebut masih belum termasuk biaya lain-lain.',
  ],
}

const kpr = reactive({ loan: 0, tenor: 1, result: null, loanFocus: false, tenorFocus: false })
const kendaraan = reactive({ otr: 0, dpPct: 25, tenor: 1, status: 'baru', result: null, otrFocus: false, tenorFocus: false })
const briguna   = reactive({ loan: 0, tenor: 1, rate: 0, result: null, loanFocus: false, tenorFocus: false, rateFocus: false })

const kendaraanDP        = computed(() => Math.round(kendaraan.otr * kendaraan.dpPct / 100))
const kendaraanPrincipal = computed(() => Math.round(kendaraan.otr - kendaraanDP.value))

const indicatorStyle = computed(() => {
  const idx = tabs.findIndex(t => t.id === activeTab.value)
  return { transform: `translateX(${idx * 100}%)`, width: `${100 / tabs.length}%` }
})

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
  kpr.result = null
  kendaraan.result = null
  briguna.result = null
}

function formatRp(val) {
  if (!val) return '0'
  return Math.round(val).toLocaleString('id-ID')
}

function formatInput(val) {
  if (!val || val === 0) return ''
  return Math.round(val).toLocaleString('id-ID')
}
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
.loan-section { padding: 72px 0; background: transparent; }
.loan-header { margin-bottom: 48px; }

.loan-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
}

/* Illustration */
.loan-illus { display: flex; flex-direction: column; gap: 32px; }
.loan-illus-img {
  width: 100%; max-width: 460px;
  object-fit: contain; display: block;
  filter: drop-shadow(0 16px 40px rgba(0,87,184,0.20));
}
.loan-disclaimer {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 16px 18px;
}
.loan-disclaimer-title {
  font-size: 11px; font-weight: 800;
  color: rgba(255,255,255,0.45);
  letter-spacing: 0.06em;
  margin-bottom: 10px;
}
.loan-disclaimer ul {
  list-style: disc;
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.loan-disclaimer li {
  font-size: 12px;
  color: rgba(255,255,255,0.38);
  line-height: 1.55;
}

/* Calculator panel */
.loan-calc {
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.10);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(8px);
}

/* Tab row */
.loan-tabs {
  display: flex;
  background: rgba(255,255,255,0.04);
  border-bottom: 1px solid rgba(255,255,255,0.10);
}
.loan-tab {
  flex: 1;
  padding: 14px 8px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: rgba(255,255,255,0.35);
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: color 0.2s;
  text-align: center;
  line-height: 1.3;
}
.loan-tab.active { color: #fff; }
.loan-tab-indicator {
  height: 2.5px;
  background: var(--bri-blue);
  transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
  position: relative;
  top: -1px;
  border-radius: 0 0 2px 2px;
}

/* Form */
.loan-form { padding: 24px 24px 16px; }
.loan-form-title {
  font-size: 20px;
  font-weight: 800;
  color: rgba(255,255,255,0.92);
  letter-spacing: -0.02em;
  margin-bottom: 10px;
}
.loan-form-divider {
  height: 1.5px;
  background: rgba(255,255,255,0.08);
  margin-bottom: 20px;
  border-radius: 1px;
  border: none;
  border-top: 1px dashed rgba(255,255,255,0.12);
}
.loan-field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; }
.loan-label {
  font-size: 12.5px; font-weight: 700;
  color: rgba(255,255,255,0.60);
  display: flex; align-items: center; gap: 6px;
}
.loan-edit-btn {
  width: 22px; height: 22px; border-radius: 6px;
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.45); display: flex; align-items: center;
  justify-content: center; cursor: pointer; transition: background 0.2s;
  padding: 0;
}
.loan-edit-btn:hover { background: rgba(255,255,255,0.14); }
.loan-input-wrap {
  display: flex; align-items: center;
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  background: rgba(255,255,255,0.05);
  overflow: hidden;
  transition: border-color 0.2s;
}
.loan-input-wrap:focus-within { border-color: rgba(0,87,184,0.55); }
.loan-input-wrap.loan-input-readonly { opacity: 0.6; }
.loan-prefix {
  padding: 0 10px; font-size: 13px;
  color: rgba(255,255,255,0.45); font-weight: 600;
  border-right: 1px solid rgba(255,255,255,0.08);
  flex-shrink: 0;
}
.loan-suffix {
  padding: 0 12px; font-size: 13px;
  color: rgba(255,255,255,0.45); font-weight: 600;
  border-left: 1px solid rgba(255,255,255,0.08);
  flex-shrink: 0;
}
.loan-input-sep {
  padding: 0 6px; color: rgba(255,255,255,0.15); font-size: 12px;
}
.loan-dp-eq {
  padding: 0 6px; color: rgba(255,255,255,0.30); font-size: 13px; flex-shrink: 0;
}
.loan-input {
  flex: 1; min-width: 0;
  background: none; border: none;
  color: rgba(255,255,255,0.85); font-family: inherit;
  font-size: 14px; font-weight: 600;
  padding: 11px 12px; outline: none;
}
.loan-input::-webkit-outer-spin-button,
.loan-input::-webkit-inner-spin-button { -webkit-appearance: none; }
.loan-input[readonly] { cursor: default; color: rgba(255,255,255,0.60); }

.loan-slider {
  -webkit-appearance: none;
  width: 100%; height: 4px;
  border-radius: 2px;
  background: rgba(255,255,255,0.12);
  outline: none;
  cursor: pointer;
  accent-color: var(--bri-red);
}
.loan-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px; height: 18px;
  border-radius: 50%;
  background: var(--bri-red);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(227,30,36,0.40);
}

.loan-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.loan-select-wrap { position: relative; }
.loan-select {
  width: 100%; appearance: none;
  background: rgba(255,255,255,0.05);
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  color: rgba(255,255,255,0.85);
  font-family: inherit; font-size: 14px; font-weight: 600;
  padding: 11px 36px 11px 14px;
  outline: none; cursor: pointer;
  transition: border-color 0.2s;
}
.loan-select:focus { border-color: rgba(0,87,184,0.55); }
.loan-select option { background: #0A1628; }
.loan-chevron {
  position: absolute; right: 12px; top: 50%;
  transform: translateY(-50%);
  color: rgba(255,255,255,0.40); pointer-events: none;
}

.loan-btn-calc {
  display: flex; align-items: center; justify-content: center;
  width: 100%; padding: 13px;
  background: #f5a623; color: #0A1628;
  border: none; border-radius: 10px;
  font-family: inherit; font-size: 14px; font-weight: 800;
  cursor: pointer; margin-top: 4px; margin-bottom: 16px;
  transition: background 0.2s, transform 0.2s;
}
.loan-btn-calc:hover { background: #f8b83c; transform: translateY(-1px); }

/* Result box */
.loan-result-box {
  background: rgba(0,87,184,0.10);
  border: 1.5px solid rgba(0,87,184,0.30);
  border-radius: 12px;
  padding: 16px 18px;
  display: flex; flex-direction: column; gap: 10px;
  margin-bottom: 0;
}
.loan-result-item { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.loan-result-label { font-size: 12.5px; color: rgba(255,255,255,0.50); font-weight: 500; }
.loan-result-val { font-size: 14.5px; font-weight: 800; color: #fff; font-variant-numeric: tabular-nums; }
.loan-result-val.secondary { font-size: 13.5px; font-weight: 600; color: rgba(255,255,255,0.65); }

/* CTA */
.loan-cta-row {
  display: flex; align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-top: 1px solid rgba(255,255,255,0.08);
  gap: 12px; flex-wrap: wrap;
}
.loan-cta-text {
  display: flex; flex-direction: column; gap: 2px;
  font-size: 13px; color: rgba(255,255,255,0.55);
}
.loan-cta-sub { font-size: 12px; color: rgba(255,255,255,0.35); }
.loan-cta-link {
  display: flex; align-items: center; gap: 5px;
  font-size: 13px; font-weight: 700; color: #60a5fa;
  text-decoration: none; transition: gap 0.2s; flex-shrink: 0;
}
.loan-cta-link:hover { gap: 8px; }

/* Transitions */
.illus-fade-enter-active, .illus-fade-leave-active { transition: opacity 0.25s ease; }
.illus-fade-enter-from, .illus-fade-leave-to { opacity: 0; }
.result-slide-enter-active { transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1); }
.result-slide-leave-active { transition: opacity 0.2s ease; }
.result-slide-enter-from { opacity: 0; transform: translateY(-8px); }
.result-slide-leave-to { opacity: 0; }

/* Responsive */
@media (max-width: 1024px) {
  .loan-layout { grid-template-columns: 1fr; gap: 40px; }
  .loan-illus { flex-direction: row; flex-wrap: wrap; align-items: flex-start; gap: 24px; }
  .loan-illus-img { max-width: 280px; }
  .loan-disclaimer { flex: 1; min-width: 240px; }
}
@media (max-width: 700px) {
  .loan-tabs { flex-direction: column; }
  .loan-tab-indicator { display: none; }
  .loan-row { grid-template-columns: 1fr; }
  .loan-illus { flex-direction: column; }
  .loan-illus-img { max-width: 100%; }
  .loan-form { padding: 18px 16px 16px; }
  .loan-cta-row { flex-direction: column; align-items: flex-start; }
}
</style>
