<template>
  <section class="loan-section" id="kalkulator">
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

          <button class="loan-btn" @click="calcKPR">Hitung Cicilan</button>

          <Transition name="result-in">
            <div v-if="kpr.result" class="loan-result">
              <div class="loan-result-main">
                <div class="loan-result-lbl">Estimasi Angsuran / Bulan</div>
                <div class="loan-result-val">Rp {{ formatRp(kpr.result.monthly) }}</div>
              </div>
              <div class="loan-result-subs">
                <div class="loan-result-sub">
                  <span>Total Pembayaran</span>
                  <span>Rp {{ formatRp(kpr.result.total) }}</span>
                </div>
                <div class="loan-result-sub">
                  <span>Total Bunga</span>
                  <span>Rp {{ formatRp(kpr.result.interest) }}</span>
                </div>
              </div>
            </div>
          </Transition>
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

          <button class="loan-btn" @click="calcKendaraan">Hitung Cicilan</button>

          <Transition name="result-in">
            <div v-if="kendaraan.result" class="loan-result">
              <div class="loan-result-main">
                <div class="loan-result-lbl">Estimasi Angsuran / Bulan</div>
                <div class="loan-result-val">Rp {{ formatRp(kendaraan.result.monthly) }}</div>
              </div>
              <div class="loan-result-subs">
                <div class="loan-result-sub">
                  <span>Total Pembayaran</span>
                  <span>Rp {{ formatRp(kendaraan.result.total) }}</span>
                </div>
              </div>
            </div>
          </Transition>
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

          <button class="loan-btn" @click="calcBriguna">Hitung Cicilan</button>

          <Transition name="result-in">
            <div v-if="briguna.result" class="loan-result">
              <div class="loan-result-main">
                <div class="loan-result-lbl">Estimasi Angsuran / Bulan</div>
                <div class="loan-result-val">Rp {{ formatRp(briguna.result.monthly) }}</div>
              </div>
              <div class="loan-result-subs">
                <div class="loan-result-sub">
                  <span>Total Pembayaran</span>
                  <span>Rp {{ formatRp(briguna.result.total) }}</span>
                </div>
                <div class="loan-result-sub">
                  <span>Total Bunga</span>
                  <span>Rp {{ formatRp(briguna.result.interest) }}</span>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Disclaimer + CTA -->
        <div class="loan-footer">
          <p class="loan-disclaimer">* Simulasi bersifat estimasi. Perhitungan aktual mengikuti ketentuan sistem BRI.</p>
          <a href="#jaringan" class="loan-cta-link" @click.prevent="scrollTo('jaringan')">
            Temukan Cabang Terdekat
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
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
  margin-bottom: 28px; flex-wrap: wrap;
}
.loan-tab-pill {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 22px; border-radius: 14px;
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.09);
  color: rgba(255,255,255,0.45);
  font-size: 13px; font-weight: 700;
  font-family: inherit; cursor: pointer;
  transition: all 0.22s cubic-bezier(0.22,1,0.36,1);
}
.loan-tab-pill:hover { border-color: rgba(255,255,255,0.18); color: rgba(255,255,255,0.75); }
.loan-tab-pill.active {
  background: rgba(0,87,184,0.18);
  border-color: rgba(0,87,184,0.42);
  color: #fff;
}
.loan-tab-icon { display: flex; }
.loan-tab-pill.active .loan-tab-icon { color: #60a5fa; }

/* Card */
.loan-card {
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.10);
  border-radius: 24px;
  overflow: hidden;
}

/* Form */
.loan-form { padding: 32px 32px 24px; }
.loan-form-head {
  display: flex; align-items: center;
  justify-content: space-between; gap: 12px;
  margin-bottom: 28px; flex-wrap: wrap;
}
.loan-form-title {
  font-size: 20px; font-weight: 800;
  color: rgba(255,255,255,0.92); letter-spacing: -0.02em;
}
.loan-badge {
  font-size: 10.5px; font-weight: 800;
  letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--bri-gold, #F5A623);
  background: rgba(245,166,35,0.10);
  border: 1px solid rgba(245,166,35,0.22);
  padding: 4px 12px; border-radius: 100px;
}

/* Field grid */
.loan-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px 24px;
  margin-bottom: 24px;
}
.loan-field-wide { grid-column: 1 / -1; }
.loan-field { display: flex; flex-direction: column; gap: 8px; }
.loan-label {
  font-size: 12px; font-weight: 700;
  color: rgba(255,255,255,0.45); letter-spacing: 0.01em;
}

.loan-input-wrap {
  display: flex; align-items: center;
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 10px; overflow: hidden;
  background: rgba(255,255,255,0.04);
  transition: border-color 0.2s;
}
.loan-input-wrap:focus-within { border-color: rgba(0,87,184,0.50); }
.loan-input-wrap.loan-readonly { opacity: 0.55; }

.loan-prefix {
  padding: 0 10px; font-size: 12.5px; font-weight: 600;
  color: rgba(255,255,255,0.40);
  border-right: 1px solid rgba(255,255,255,0.08); flex-shrink: 0;
}
.loan-suffix {
  padding: 0 12px; font-size: 12.5px; font-weight: 600;
  color: rgba(255,255,255,0.40);
  border-left: 1px solid rgba(255,255,255,0.08); flex-shrink: 0;
}
.loan-eq {
  padding: 0 10px; font-size: 11.5px;
  color: rgba(255,255,255,0.28); flex-shrink: 0; white-space: nowrap;
}
.loan-input {
  flex: 1; min-width: 0;
  background: none; border: none;
  color: rgba(255,255,255,0.88); font-family: inherit;
  font-size: 14px; font-weight: 600;
  padding: 11px 12px; outline: none;
}
.loan-input::-webkit-outer-spin-button,
.loan-input::-webkit-inner-spin-button { -webkit-appearance: none; }
.loan-input[readonly] { cursor: default; }

.loan-slider {
  -webkit-appearance: none;
  width: 100%; height: 3px;
  border-radius: 2px;
  background: rgba(255,255,255,0.12);
  outline: none; cursor: pointer;
  accent-color: var(--bri-blue);
}
.loan-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px; height: 16px; border-radius: 50%;
  background: var(--bri-blue);
  cursor: pointer; box-shadow: 0 2px 8px rgba(0,87,184,0.40);
}

.loan-select-wrap { position: relative; }
.loan-select {
  width: 100%; appearance: none;
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  color: rgba(255,255,255,0.85);
  font-family: inherit; font-size: 14px; font-weight: 600;
  padding: 11px 36px 11px 14px; outline: none; cursor: pointer;
  transition: border-color 0.2s;
}
.loan-select:focus { border-color: rgba(0,87,184,0.50); }
.loan-select option { background: #0A1628; }
.loan-chev {
  position: absolute; right: 12px; top: 50%;
  transform: translateY(-50%);
  color: rgba(255,255,255,0.35); pointer-events: none;
}

/* Hitung button */
.loan-btn {
  display: flex; align-items: center; justify-content: center;
  width: 100%; padding: 13px;
  background: var(--bri-gold, #F5A623); color: #0A1628;
  border: none; border-radius: 12px;
  font-family: inherit; font-size: 14px; font-weight: 800;
  cursor: pointer; letter-spacing: 0.02em;
  transition: background 0.2s, transform 0.2s;
}
.loan-btn:hover { background: #f8b83c; transform: translateY(-1px); }

/* Result */
.loan-result {
  margin-top: 20px;
  background: rgba(0,87,184,0.10);
  border: 1.5px solid rgba(0,87,184,0.28);
  border-radius: 14px; overflow: hidden;
}
.loan-result-main {
  padding: 18px 20px;
  border-bottom: 1px solid rgba(0,87,184,0.18);
}
.loan-result-lbl {
  font-size: 11.5px; font-weight: 600;
  color: rgba(255,255,255,0.45); margin-bottom: 4px;
}
.loan-result-val {
  font-size: 24px; font-weight: 800;
  color: #fff; letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
}
.loan-result-subs { padding: 12px 20px; display: flex; flex-direction: column; gap: 6px; }
.loan-result-sub {
  display: flex; justify-content: space-between;
  font-size: 12.5px; color: rgba(255,255,255,0.48);
}
.loan-result-sub span:last-child { font-weight: 600; color: rgba(255,255,255,0.65); }

/* Footer */
.loan-footer {
  display: flex; align-items: center;
  justify-content: space-between; gap: 12px;
  padding: 16px 32px;
  border-top: 1px solid rgba(255,255,255,0.08);
  flex-wrap: wrap;
}
.loan-disclaimer {
  font-size: 11px; color: rgba(255,255,255,0.22); flex: 1;
}
.loan-cta-link {
  display: flex; align-items: center; gap: 5px;
  font-size: 12.5px; font-weight: 700; color: #60a5fa;
  text-decoration: none; white-space: nowrap;
  transition: gap 0.2s;
}
.loan-cta-link:hover { gap: 8px; }

/* Transition */
.result-in-enter-active { transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1); }
.result-in-leave-active { transition: opacity 0.2s ease; }
.result-in-enter-from { opacity: 0; transform: translateY(-8px); }
.result-in-leave-to { opacity: 0; }

/* Responsive */
@media (max-width: 860px) {
  .loan-grid { grid-template-columns: repeat(2, 1fr); }
  .loan-field-wide { grid-column: 1 / -1; }
  .loan-form { padding: 24px 22px 18px; }
  .loan-footer { padding: 14px 22px; }
}
@media (max-width: 560px) {
  .loan-grid { grid-template-columns: 1fr; }
  .loan-tabs { flex-direction: column; }
  .loan-tab-pill { justify-content: center; }
}
</style>
