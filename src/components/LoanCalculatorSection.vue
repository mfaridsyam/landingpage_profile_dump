<template>
  <section class="sim-section" id="simulasi">
    <div class="container">

      <!-- HEADER -->
      <div class="sim-head reveal">
        <div class="sim-head-text">
          <div class="section-eyebrow">Simulasi Kredit</div>
          <h2 class="section-title" style="margin-bottom:6px">Kalkulator Cicilan</h2>
          <p class="sim-subtitle">Estimasi cicilan kredit BRI — KPR, kendaraan, hingga kredit multiguna.</p>
        </div>
        <div class="sim-head-chips">
          <div class="sim-chip">
            <span class="sim-chip-val">6%</span>
            <span class="sim-chip-lbl">KUR p.a.</span>
          </div>
          <div class="sim-chip">
            <span class="sim-chip-val">7.25%</span>
            <span class="sim-chip-lbl">KPR p.a.</span>
          </div>
          <div class="sim-chip">
            <span class="sim-chip-val">6.5%</span>
            <span class="sim-chip-lbl">Kendaraan p.a.</span>
          </div>
        </div>
      </div>

      <!-- PRODUCT TABS -->
      <div class="sim-tabs reveal">
        <button v-for="t in tabs" :key="t.id"
          class="sim-tab" :class="{ active: activeTab === t.id }"
          @click="activeTab = t.id; resetForm()">
          <div class="sim-tab-icon" v-html="t.icon"></div>
          <div class="sim-tab-info">
            <span class="sim-tab-name">{{ t.label }}</span>
            <span class="sim-tab-desc">{{ t.desc }}</span>
          </div>
          <svg v-if="activeTab === t.id" class="sim-tab-check" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </button>
      </div>

      <!-- CALCULATOR CARD -->
      <div class="sim-card reveal">
        <div class="sim-card-body">

          <!-- LEFT: FORM -->
          <div class="sim-form-panel">
            <div class="sim-form-topbar">
              <span class="sim-form-name">{{ currentTabInfo.formTitle }}</span>
              <span class="sim-form-badge">{{ currentTabInfo.badge }}</span>
            </div>

            <!-- KPR -->
            <div v-if="activeTab === 'kpr'" class="sim-form">
              <div class="sim-field">
                <div class="sim-fhead">
                  <label class="sim-label">Jumlah Pinjaman</label>
                  <span class="sim-fval">Rp {{ formatInput(kpr.loan) || '—' }}</span>
                </div>
                <input type="range" v-model.number="kpr.loan" min="0" max="5000000000" step="10000000" class="sim-slider" />
                <div class="sim-frange"><span>Rp 0</span><span>Rp 5 M</span></div>
                <div class="sim-input-row">
                  <span class="sim-pfx">Rp</span>
                  <input type="text" inputmode="numeric" :value="formatInput(kpr.loan)"
                    @input="e => kpr.loan = parseInputNum(e.target.value)" class="sim-input" placeholder="Masukkan jumlah" />
                </div>
              </div>

              <div class="sim-twin">
                <div class="sim-field">
                  <div class="sim-fhead">
                    <label class="sim-label">Jangka Waktu</label>
                    <span class="sim-fval">{{ kpr.tenor }} Tahun</span>
                  </div>
                  <input type="range" v-model.number="kpr.tenor" min="1" max="30" step="1" class="sim-slider" />
                  <div class="sim-frange"><span>1 Thn</span><span>30 Thn</span></div>
                </div>
                <div class="sim-field sim-field-rate">
                  <label class="sim-label">Suku Bunga</label>
                  <div class="sim-bigrate">{{ kprRate }}<small>% / thn</small></div>
                </div>
              </div>
            </div>

            <!-- KENDARAAN -->
            <div v-else-if="activeTab === 'kendaraan'" class="sim-form">
              <div class="sim-twin">
                <div class="sim-field">
                  <label class="sim-label">Status Kendaraan</label>
                  <div class="sim-sel-wrap">
                    <select v-model="kendaraan.status" class="sim-sel">
                      <option value="baru">Baru — 6.5%</option>
                      <option value="bekas">Bekas — 8%</option>
                    </select>
                    <svg class="sim-chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
                <div class="sim-field">
                  <label class="sim-label">Uang Muka (DP)</label>
                  <div class="sim-input-row">
                    <input type="number" v-model.number="kendaraan.dpPct" min="0" max="90" class="sim-input" />
                    <span class="sim-sfx">%</span>
                  </div>
                </div>
              </div>

              <div class="sim-field">
                <div class="sim-fhead">
                  <label class="sim-label">Harga OTR Kendaraan</label>
                  <span class="sim-fval">Rp {{ formatInput(kendaraan.otr) || '—' }}</span>
                </div>
                <input type="range" v-model.number="kendaraan.otr" min="0" max="2000000000" step="5000000" class="sim-slider" />
                <div class="sim-frange"><span>Rp 0</span><span>Rp 2 M</span></div>
                <div class="sim-input-row">
                  <span class="sim-pfx">Rp</span>
                  <input type="text" inputmode="numeric" :value="formatInput(kendaraan.otr)"
                    @input="e => kendaraan.otr = parseInputNum(e.target.value)" class="sim-input" placeholder="Harga OTR" />
                </div>
              </div>

              <div class="sim-field">
                <div class="sim-fhead">
                  <label class="sim-label">Jangka Waktu</label>
                  <span class="sim-fval">{{ kendaraan.tenor }} Tahun</span>
                </div>
                <input type="range" v-model.number="kendaraan.tenor" min="1" max="7" step="1" class="sim-slider" />
                <div class="sim-frange"><span>1 Thn</span><span>7 Thn</span></div>
              </div>

              <div class="sim-dp-row">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                DP ≈ <strong>Rp {{ formatInput(kendaraanDP) || '0' }}</strong>
                &nbsp;·&nbsp; Pokok: <strong>Rp {{ formatInput(kendaraanPrincipal) || '0' }}</strong>
              </div>
            </div>

            <!-- BRIGUNA -->
            <div v-else class="sim-form">
              <div class="sim-field">
                <div class="sim-fhead">
                  <label class="sim-label">Plafon Kredit</label>
                  <span class="sim-fval">Rp {{ formatInput(briguna.loan) || '—' }}</span>
                </div>
                <input type="range" v-model.number="briguna.loan" min="0" max="500000000" step="1000000" class="sim-slider" />
                <div class="sim-frange"><span>Rp 0</span><span>Rp 500 Jt</span></div>
                <div class="sim-input-row">
                  <span class="sim-pfx">Rp</span>
                  <input type="text" inputmode="numeric" :value="formatInput(briguna.loan)"
                    @input="e => briguna.loan = parseInputNum(e.target.value)" class="sim-input" placeholder="Masukkan plafon" />
                </div>
              </div>

              <div class="sim-twin">
                <div class="sim-field">
                  <div class="sim-fhead">
                    <label class="sim-label">Jangka Waktu</label>
                    <span class="sim-fval">{{ briguna.tenor }} Thn</span>
                  </div>
                  <input type="range" v-model.number="briguna.tenor" min="1" max="15" step="1" class="sim-slider" />
                  <div class="sim-frange"><span>1 Thn</span><span>15 Thn</span></div>
                </div>
                <div class="sim-field">
                  <div class="sim-fhead">
                    <label class="sim-label">Suku Bunga Efektif</label>
                    <span class="sim-fval">{{ briguna.rate }}%</span>
                  </div>
                  <input type="range" v-model.number="briguna.rate" min="0" max="30" step="0.5" class="sim-slider" />
                  <div class="sim-frange"><span>0%</span><span>30%</span></div>
                </div>
              </div>
            </div>

            <button class="sim-calc-btn" @click="doCalc">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="13" y2="14"/></svg>
              Hitung Cicilan
            </button>
          </div><!-- /form panel -->

          <!-- RIGHT: RESULT -->
          <div class="sim-result-panel" :class="{ active: currentResult }">
            <Transition name="rfade" mode="out-in">

              <!-- HAS RESULT -->
              <div v-if="currentResult" key="res" class="sim-result">
                <div class="sim-result-eye">Estimasi Angsuran</div>
                <div class="sim-result-monthly">
                  <span class="sim-result-cur">Rp</span>
                  <span class="sim-result-num">{{ formatRp(currentResult.monthly) }}</span>
                </div>
                <div class="sim-result-sub">per bulan</div>
                <div class="sim-result-hr"></div>
                <div class="sim-result-rows">
                  <div class="sim-rrow">
                    <span>Total Pembayaran</span>
                    <span>Rp {{ formatRp(currentResult.total) }}</span>
                  </div>
                  <div v-if="currentResult.interest" class="sim-rrow">
                    <span>Total Bunga</span>
                    <span>Rp {{ formatRp(currentResult.interest) }}</span>
                  </div>
                  <div class="sim-rrow">
                    <span>Tenor</span>
                    <span>{{ currentTenor }} bulan</span>
                  </div>
                </div>
                <p class="sim-result-note">* Nilai bersifat estimasi. Perhitungan aktual sesuai ketentuan BRI.</p>
              </div>

              <!-- EMPTY STATE -->
              <div v-else key="empty" class="sim-empty">
                <div class="sim-empty-ico">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="13" y2="14"/></svg>
                </div>
                <p class="sim-empty-hint">{{ currentTabInfo.hint }}</p>
                <div class="sim-empty-stats">
                  <div v-for="s in currentTabInfo.stats" :key="s.label" class="sim-erow">
                    <span class="sim-eval">{{ s.val }}</span>
                    <span class="sim-elbl">{{ s.label }}</span>
                  </div>
                </div>
              </div>

            </Transition>
          </div><!-- /result panel -->

        </div><!-- /card body -->

        <div class="sim-card-foot">
          <p class="sim-disc">* Simulasi bersifat estimasi. Perhitungan aktual mengikuti ketentuan sistem BRI.</p>
          <a href="#jaringan" class="sim-cta" @click.prevent="scrollTo('jaringan')">
            Temukan Cabang Terdekat
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
        </div>

      </div><!-- /card -->
    </div>
  </section>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { lenis } from '@/lenis.js'

const activeTab = ref('kpr')

const tabs = [
  {
    id: 'kpr', label: 'KPR', desc: 'Kredit Pemilikan Rumah',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V10.5z"/><path d="M9 21V12h6v9"/></svg>`
  },
  {
    id: 'kendaraan', label: 'Kendaraan', desc: 'Kredit Motor & Mobil',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`
  },
  {
    id: 'briguna', label: 'BRIGuna', desc: 'Kredit Multiguna',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>`
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

const currentTenor = computed(() => {
  if (activeTab.value === 'kpr') return kpr.tenor * 12
  if (activeTab.value === 'kendaraan') return kendaraan.tenor * 12
  return briguna.tenor * 12
})

const currentTabInfo = computed(() => ({
  kpr: {
    formTitle: 'Cicilan KPR',
    badge: 'Bunga 7.25% p.a.',
    hint: 'Isi formulir untuk melihat estimasi cicilan KPR Anda.',
    stats: [
      { val: '7.25%', label: 'Bunga p.a.' },
      { val: '30 Thn', label: 'Maks. Tenor' },
      { val: 'Rp 5 M', label: 'Maks. Plafon' },
    ]
  },
  kendaraan: {
    formTitle: 'Cicilan Kendaraan',
    badge: `Baru ${kendaraanRate.value}% · Bekas 8%`,
    hint: 'Hitung cicilan kendaraan baru atau bekas Anda.',
    stats: [
      { val: '6.5%', label: 'Bunga Baru' },
      { val: '8%', label: 'Bunga Bekas' },
      { val: '7 Thn', label: 'Maks. Tenor' },
    ]
  },
  briguna: {
    formTitle: 'Cicilan BRIGuna',
    badge: 'Kredit Multiguna',
    hint: 'Simulasikan kredit multiguna BRIGuna Anda.',
    stats: [
      { val: 'Rp 500 Jt', label: 'Maks. Plafon' },
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

function doCalc() {
  if (activeTab.value === 'kpr') calcKPR()
  else if (activeTab.value === 'kendaraan') calcKendaraan()
  else calcBriguna()
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
.sim-section { padding: 96px 0; background: transparent; }

/* ── HEADER ── */
.sim-head {
  display: flex; align-items: flex-start;
  justify-content: space-between;
  gap: 32px; margin-bottom: 40px; flex-wrap: wrap;
}
.sim-subtitle {
  font-size: 15px; color: rgba(10,22,40,0.62);
  line-height: 1.65; margin-top: 8px; max-width: 400px;
}
.sim-head-chips {
  display: flex; gap: 10px; flex-shrink: 0;
  flex-wrap: wrap; align-items: flex-start; padding-top: 6px;
}
.sim-chip {
  display: flex; flex-direction: column; align-items: center;
  padding: 10px 18px;
  background: rgba(255,255,255,0.80);
  border: 1.5px solid rgba(0,63,136,0.12);
  border-radius: 14px; gap: 3px;
}
.sim-chip-val {
  font-size: 15px; font-weight: 800;
  color: #0057b8; letter-spacing: -0.01em; line-height: 1;
}
.sim-chip-lbl {
  font-size: 10px; font-weight: 600;
  color: rgba(10,22,40,0.52); white-space: nowrap;
}

/* ── PRODUCT TABS ── */
.sim-tabs {
  display: flex; gap: 12px; margin-bottom: 20px;
}
.sim-tab {
  flex: 1; display: flex; align-items: center; gap: 14px;
  padding: 17px 20px; border-radius: 18px;
  background: rgba(255,255,255,0.78);
  border: 1.5px solid rgba(0,63,136,0.10);
  cursor: pointer; text-align: left;
  transition: all 0.28s cubic-bezier(0.22,1,0.36,1);
}
.sim-tab:hover {
  border-color: rgba(0,63,136,0.22);
  background: rgba(255,255,255,0.95);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0,63,136,0.07);
}
.sim-tab.active {
  background: rgba(0,87,184,0.07);
  border-color: rgba(0,87,184,0.32);
  box-shadow: 0 4px 24px rgba(0,87,184,0.10);
  transform: translateY(-2px);
}
.sim-tab-icon {
  width: 46px; height: 46px; border-radius: 13px;
  background: rgba(0,87,184,0.08);
  border: 1px solid rgba(0,87,184,0.13);
  display: flex; align-items: center; justify-content: center;
  color: rgba(0,87,184,0.60); flex-shrink: 0;
  transition: all 0.28s;
}
.sim-tab.active .sim-tab-icon {
  background: rgba(0,87,184,0.14);
  border-color: rgba(0,87,184,0.26);
  color: #0057b8;
}
.sim-tab-info { flex: 1; min-width: 0; }
.sim-tab-name {
  display: block; font-size: 14px; font-weight: 800;
  color: rgba(10,22,40,0.70); letter-spacing: -0.01em;
}
.sim-tab-desc {
  display: block; font-size: 11px; margin-top: 3px;
  color: rgba(10,22,40,0.42);
}
.sim-tab.active .sim-tab-name { color: rgba(10,22,40,0.92); }
.sim-tab.active .sim-tab-desc { color: rgba(0,87,184,0.65); }
.sim-tab-check { color: #0057b8; flex-shrink: 0; }

/* ── CARD ── */
.sim-card {
  background: rgba(255,255,255,0.90);
  border: 1.5px solid rgba(0,63,136,0.10);
  border-radius: 24px; overflow: hidden;
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 40px rgba(0,63,136,0.07);
}
.sim-card-body {
  display: grid;
  grid-template-columns: 1fr 300px;
}

/* ── FORM PANEL ── */
.sim-form-panel {
  padding: 28px 32px 24px;
  border-right: 1px solid rgba(0,63,136,0.08);
  display: flex; flex-direction: column;
}
.sim-form-topbar {
  display: flex; align-items: center;
  justify-content: space-between; gap: 12px;
  margin-bottom: 22px; flex-wrap: wrap;
}
.sim-form-name {
  font-size: 17px; font-weight: 800;
  color: rgba(10,22,40,0.90); letter-spacing: -0.02em;
}
.sim-form-badge {
  font-size: 10px; font-weight: 800;
  letter-spacing: 0.06em; text-transform: uppercase;
  color: #0057b8;
  background: rgba(0,87,184,0.09);
  border: 1px solid rgba(0,87,184,0.20);
  padding: 4px 12px; border-radius: 100px;
}

.sim-form { flex: 1; }
.sim-field {
  display: flex; flex-direction: column; gap: 7px;
  margin-bottom: 18px;
}
.sim-fhead {
  display: flex; align-items: center;
  justify-content: space-between; gap: 8px;
}
.sim-label {
  font-size: 11px; font-weight: 700;
  color: rgba(10,22,40,0.55);
  text-transform: uppercase; letter-spacing: 0.06em;
}
.sim-fval {
  font-size: 12.5px; font-weight: 700; color: #0057b8;
}
.sim-frange {
  display: flex; justify-content: space-between;
  font-size: 10px; color: rgba(10,22,40,0.35);
  margin-top: -3px;
}
.sim-twin {
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
}
.sim-field-rate { display: flex; flex-direction: column; }
.sim-bigrate {
  font-size: 26px; font-weight: 800;
  color: rgba(10,22,40,0.88); letter-spacing: -0.02em;
  display: flex; align-items: baseline; gap: 5px; margin-top: 6px;
}
.sim-bigrate small {
  font-size: 12px; font-weight: 600; color: rgba(10,22,40,0.48);
}

/* Slider */
.sim-slider {
  -webkit-appearance: none; appearance: none;
  width: 100%; height: 4px; border-radius: 2px;
  background: rgba(0,63,136,0.14);
  outline: none; cursor: pointer; accent-color: #0057b8;
}
.sim-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px; height: 18px; border-radius: 50%;
  background: #0057b8; cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,87,184,0.38);
  border: 2.5px solid #fff;
}

/* Input row */
.sim-input-row {
  display: flex; align-items: center;
  border: 1.5px solid rgba(0,63,136,0.14);
  border-radius: 10px; overflow: hidden;
  background: rgba(255,255,255,0.88);
  transition: border-color 0.2s;
}
.sim-input-row:focus-within { border-color: rgba(0,87,184,0.46); }
.sim-pfx {
  padding: 0 11px; font-size: 12px; font-weight: 600;
  color: rgba(10,22,40,0.50);
  border-right: 1px solid rgba(0,63,136,0.10); flex-shrink: 0;
}
.sim-sfx {
  padding: 0 11px; font-size: 12px; font-weight: 600;
  color: rgba(10,22,40,0.50);
  border-left: 1px solid rgba(0,63,136,0.10); flex-shrink: 0;
}
.sim-input {
  flex: 1; min-width: 0; background: none; border: none; outline: none;
  color: rgba(10,22,40,0.88); font-family: inherit;
  font-size: 13.5px; font-weight: 600; padding: 11px 12px;
}
.sim-input::-webkit-outer-spin-button,
.sim-input::-webkit-inner-spin-button { -webkit-appearance: none; }

/* Select */
.sim-sel-wrap { position: relative; }
.sim-sel {
  width: 100%; appearance: none;
  background: rgba(255,255,255,0.88);
  border: 1.5px solid rgba(0,63,136,0.14);
  border-radius: 10px;
  color: rgba(10,22,40,0.88);
  font-family: inherit; font-size: 13.5px; font-weight: 600;
  padding: 11px 36px 11px 12px; outline: none; cursor: pointer;
  transition: border-color 0.2s;
}
.sim-sel:focus { border-color: rgba(0,87,184,0.46); }
.sim-chev {
  position: absolute; right: 11px; top: 50%;
  transform: translateY(-50%);
  color: rgba(10,22,40,0.52); pointer-events: none;
}

/* DP info row */
.sim-dp-row {
  display: flex; align-items: center; gap: 5px;
  padding: 9px 12px; border-radius: 10px;
  background: rgba(0,87,184,0.05);
  border: 1px solid rgba(0,87,184,0.12);
  font-size: 11.5px; color: rgba(10,22,40,0.58);
  margin-bottom: 16px; flex-wrap: wrap;
}
.sim-dp-row strong { color: #0057b8; font-weight: 700; }

/* Calc button */
.sim-calc-btn {
  display: flex; align-items: center; justify-content: center; gap: 10px;
  width: 100%; padding: 14px 20px; margin-top: auto;
  background: linear-gradient(135deg, #0057b8 0%, #003f90 100%);
  color: #fff; border: none; border-radius: 12px;
  font-family: inherit; font-size: 14.5px; font-weight: 800;
  cursor: pointer; letter-spacing: 0.01em;
  transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
  box-shadow: 0 4px 16px rgba(0,87,184,0.28);
}
.sim-calc-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(0,87,184,0.42);
}
.sim-calc-btn:active { transform: none; }

/* ── RESULT PANEL ── */
.sim-result-panel {
  display: flex; flex-direction: column; justify-content: center;
  padding: 28px 24px;
  background: rgba(247,249,255,0.65);
  transition: background 0.45s cubic-bezier(0.22,1,0.36,1);
}
.sim-result-panel.active {
  background: linear-gradient(160deg, #0057b8 0%, #002e82 100%);
}

/* Result */
.sim-result { display: flex; flex-direction: column; }
.sim-result-eye {
  font-size: 10px; font-weight: 800; text-transform: uppercase;
  letter-spacing: 0.12em; color: rgba(255,255,255,0.60);
  margin-bottom: 14px;
}
.sim-result-monthly {
  display: flex; align-items: baseline; gap: 6px; line-height: 1;
}
.sim-result-cur {
  font-size: 16px; font-weight: 700; color: rgba(255,255,255,0.70);
}
.sim-result-num {
  font-size: 28px; font-weight: 800;
  color: #fff; letter-spacing: -0.03em; word-break: break-all;
}
.sim-result-sub {
  font-size: 11.5px; color: rgba(255,255,255,0.55);
  margin-top: 6px; margin-bottom: 20px;
}
.sim-result-hr {
  height: 1px; background: rgba(255,255,255,0.14); margin-bottom: 16px;
}
.sim-result-rows { display: flex; flex-direction: column; gap: 11px; }
.sim-rrow {
  display: flex; justify-content: space-between; align-items: flex-start;
  gap: 6px; font-size: 12px;
}
.sim-rrow span:first-child { color: rgba(255,255,255,0.58); }
.sim-rrow span:last-child {
  color: #fff; font-weight: 700; text-align: right;
  font-variant-numeric: tabular-nums;
}
.sim-result-note {
  font-size: 10px; color: rgba(255,255,255,0.34);
  margin-top: 18px; line-height: 1.5;
}

/* Empty state */
.sim-empty {
  display: flex; flex-direction: column;
  align-items: center; text-align: center; gap: 14px;
}
.sim-empty-ico {
  width: 54px; height: 54px; border-radius: 16px;
  background: rgba(0,87,184,0.08);
  border: 1px solid rgba(0,87,184,0.16);
  display: flex; align-items: center; justify-content: center;
  color: rgba(0,87,184,0.55);
}
.sim-empty-hint {
  font-size: 12.5px; color: rgba(10,22,40,0.60);
  line-height: 1.6; margin: 0;
}
.sim-empty-stats {
  width: 100%;
  background: rgba(255,255,255,0.92);
  border: 1px solid rgba(0,63,136,0.10);
  border-radius: 12px; overflow: hidden;
}
.sim-erow {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 14px;
  border-bottom: 1px solid rgba(0,63,136,0.07);
}
.sim-erow:last-child { border-bottom: none; }
.sim-eval {
  font-size: 13px; font-weight: 800; color: #0057b8; letter-spacing: -0.01em;
}
.sim-elbl { font-size: 11px; color: rgba(10,22,40,0.55); }

/* ── FOOTER ── */
.sim-card-foot {
  display: flex; align-items: center;
  justify-content: space-between; gap: 12px;
  padding: 13px 32px;
  border-top: 1px solid rgba(0,63,136,0.09);
  flex-wrap: wrap;
}
.sim-disc { font-size: 11px; color: rgba(10,22,40,0.48); flex: 1; }
.sim-cta {
  display: flex; align-items: center; gap: 5px;
  font-size: 12.5px; font-weight: 700; color: #0057b8;
  text-decoration: none; white-space: nowrap;
  transition: gap 0.22s;
}
.sim-cta:hover { gap: 8px; }

/* Transition */
.rfade-enter-active, .rfade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.22,1,0.36,1);
}
.rfade-enter-from { opacity: 0; transform: translateY(8px); }
.rfade-leave-to   { opacity: 0; transform: translateY(-6px); }

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .sim-head { flex-direction: column; gap: 16px; }
  .sim-head-chips { padding-top: 0; }
}
@media (max-width: 760px) {
  .sim-card-body { grid-template-columns: 1fr; }
  .sim-result-panel {
    border-top: 1px solid rgba(0,63,136,0.10);
    padding: 24px;
  }
  .sim-empty {
    flex-direction: row; text-align: left;
    align-items: flex-start; flex-wrap: wrap;
  }
  .sim-empty-stats { flex: 1; min-width: 200px; }
}
@media (max-width: 600px) {
  .sim-section { padding: 72px 0; }
  .sim-tabs { flex-direction: column; gap: 8px; }
  .sim-twin { grid-template-columns: 1fr; gap: 12px; }
  .sim-form-panel { padding: 22px 20px 18px; }
  .sim-card-foot { padding: 12px 20px; }
  .sim-head-chips { gap: 8px; }
}
@media (max-width: 420px) {
  .sim-chip { padding: 9px 14px; }
  .sim-chip-val { font-size: 13.5px; }
}
</style>
