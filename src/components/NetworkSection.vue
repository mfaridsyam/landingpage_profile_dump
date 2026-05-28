<template>
  <section class="network-section" id="jaringan">
    <div class="container">

      <!-- Header -->
      <div class="network-header">
        <div class="network-header-left reveal">
          <div class="section-eyebrow">Jaringan Kami</div>
          <h2 class="section-title" style="margin-bottom:10px">Lokasi Unit Kerja</h2>
          <p class="section-sub">Temukan kantor BRI terdekat di wilayah Polewali Mandar &amp; Mamasa.</p>
        </div>
        <div class="network-stats reveal reveal-delay-1">
          <div class="network-stat">
            <div class="network-stat-val">13</div>
            <div class="network-stat-lbl">Unit Kerja</div>
          </div>
          <div class="network-stat-sep"></div>
          <div class="network-stat">
            <div class="network-stat-val">2</div>
            <div class="network-stat-lbl">KCP</div>
          </div>
          <div class="network-stat-sep"></div>
          <div class="network-stat">
            <div class="network-stat-val">2</div>
            <div class="network-stat-lbl">Kabupaten</div>
          </div>
        </div>
      </div>

      <!-- Main panel -->
      <div class="network-panel">

        <!-- Left: filter + list -->
        <div class="network-list-col">
          <!-- Filter tabs -->
          <div class="unit-filter-tabs">
            <button v-for="f in filters" :key="f.val"
              class="unit-filter-tab" :class="{ active: activeFilter === f.val }"
              @click="activeFilter = f.val">
              {{ f.label }}
              <span class="unit-filter-count">{{ countByType(f.val) }}</span>
            </button>
          </div>

          <!-- Scrollable list -->
          <div class="unit-list" data-lenis-prevent>
            <div v-for="(unit, i) in filteredUnits" :key="unit.originalIdx"
              class="unit-list-item"
              :class="{ active: selectedIdx === unit.originalIdx }"
              @click="selectUnit(unit.originalIdx)">
              <div class="unit-list-item-top">
                <div class="unit-list-icon" :class="`icon-${unit.type.toLowerCase()}`">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </div>
                <div class="unit-list-name">{{ unit.name }}</div>
                <div class="unit-list-badge" :class="`badge-${unit.type.toLowerCase()}`">{{ unit.type }}</div>
              </div>
              <div class="unit-list-addr">{{ unit.addr }}</div>
              <div class="unit-list-footer">
                <span class="unit-list-hours">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
                  Sen–Jum 08.00–15.00
                </span>
                <a :href="gMapsUrl(unit)" target="_blank" rel="noopener" class="unit-list-maps" @click.stop>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  Maps
                </a>
              </div>
            </div>

            <div v-if="filteredUnits.length === 0" class="unit-list-empty">
              Tidak ada unit ditemukan.
            </div>
          </div>
        </div>

        <!-- Right: map -->
        <div class="network-map-col">
          <div class="map-wrap" @mouseenter="lenis.stop()" @mouseleave="lenis.start()">
            <Transition name="map-fade" mode="out-in">
              <iframe
                :key="selectedIdx"
                class="map-iframe"
                :src="units[selectedIdx].mapSrc"
                allowfullscreen loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </Transition>
          </div>
          <div class="map-selected-info">
            <div class="map-selected-dot"></div>
            <div class="map-selected-text">
              <span class="map-selected-name">{{ units[selectedIdx].name }}</span>
              <span class="map-selected-addr">{{ units[selectedIdx].addr }}</span>
            </div>
            <a :href="gMapsUrl(units[selectedIdx])" target="_blank" rel="noopener" class="map-open-btn">
              Buka Maps
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { lenis } from '@/lenis.js'

const selectedIdx = ref(0)
const activeFilter = ref('semua')

const filters = [
  { val: 'semua', label: 'Semua' },
  { val: 'Cabang', label: 'Cabang' },
  { val: 'KCP', label: 'KCP' },
  { val: 'Unit', label: 'Unit' },
]

const units = [
  { name: 'CP Polewali',     addr: 'Jl. H. Andi Depu No.177',  type: 'Cabang', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973!2d119.3377792!3d-3.4308096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d948636df04135f:0x5613e1de2ef4010e!2sBank+Rakyat+Indonesia!5e1!3m2!1sid!2sid!4v1700000000001' },
  { name: 'KCP Wonomulyo',   addr: 'Jl. Poros Majene KM 17',   type: 'KCP',    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d119.206658!3d-3.3997468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d949a964c56c381:0x9d17c23d5755131d!2sBank+BRI+Wonomulyo!5e1!3m2!1sid!2sid!4v1700000000002' },
  { name: 'KCP Mamasa',      addr: 'Mamasa, Sulawesi Barat',    type: 'KCP',    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d119.3752206!3d-2.9428596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d930bfbd6fc535d:0x26f4e4c5b8730187!2sBank+BRI+CRM+KCP+MAMASA!5e1!3m2!1sid!2sid!4v1700000000003' },
  { name: 'Unit Sumarorong', addr: 'Sumarorong, Mamasa',        type: 'Unit',   mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d119.3104408!3d-3.1417745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d93799555555555:0xb75a999062eef84c!2sBRI+Unit+Sumrorong!5e1!3m2!1sid!2sid!4v1700000000004' },
  { name: 'Unit Bumiayu',    addr: 'Bumiayu, Wonomulyo',        type: 'Unit',   mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d119.2103333!3d-3.402874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d949aa306ca8aaf:0x71ea9e518b74791a!2sBANK+BRI+UNIT+BUMIAYU!5e1!3m2!1sid!2sid!4v1700000000005' },
  { name: 'Unit Campalagian',addr: 'Jl. Poros Campalagian',     type: 'Unit',   mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d119.1381298!3d-3.4763892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d94915295cb70d1:0xb36a7f93af7dd675!2sBank+BRI+Unit+Campalagian!5e1!3m2!1sid!2sid!4v1700000000006' },
  { name: 'Unit Darma',      addr: 'Darma, Polewali',           type: 'Unit',   mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d119.3139567!3d-3.4106222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d948f50b249b7e3:0xaaf3e29b9e7c0c2d!2sBank+BRI+UNIT+Darma!5e1!3m2!1sid!2sid!4v1700000000007' },
  { name: 'Unit Luyo',       addr: 'Luyo, Polewali Mandar',     type: 'Unit',   mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d119.1623556!3d-3.4185211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d9491b18c5c398b:0x99266cef699d89fb!2sBank+BRI+UNIT+Luyo!5e1!3m2!1sid!2sid!4v1700000000008' },
  { name: 'Unit Mamasa',     addr: 'Mamasa, Sulawesi Barat',    type: 'Unit',   mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d119.3721071!3d-2.9417265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d930b9180a1d275:0x404088bfe6531899!2sBank+BRI+UNIT+Mamasa!5e1!3m2!1sid!2sid!4v1700000000009' },
  { name: 'Unit Polewali',   addr: 'Wattang, Kec. Polewali',    type: 'Unit',   mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d119.3441713!3d-3.4334342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d9488c2ce6a9e93:0x6b4dd393df934461!2sBRI+Unit+Polewali!5e1!3m2!1sid!2sid!4v1700000000010' },
  { name: 'Unit Sidodadi',   addr: 'Sidodadi, Wonomulyo',       type: 'Unit',   mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d119.2098445!3d-3.398468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d949abc3472135f:0x315b8300617b42eb!2sBRI+UNIT+SIDODADI!5e1!3m2!1sid!2sid!4v1700000000011' },
  { name: 'Unit Pajalele',   addr: 'Pajalele, Polewali Mandar', type: 'Unit',   mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d119.5301967!3d-3.5372676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d94a6000000001:0x000000000001!2sBRI+Unit+Pajalele!5e1!3m2!1sid!2sid!4v1700000000012' },
  { name: 'Unit Mambi',      addr: 'Mambi, Sulawesi Barat',     type: 'Unit',   mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d119.1757233!3d-2.9499586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d931330c1d079ad:0x15c56192db81431!2sBank+BRI+CRM+BRI+UNIT+MAMBI!5e1!3m2!1sid!2sid!4v1700000000013' },
]

const filteredUnits = computed(() => {
  const list = units.map((u, i) => ({ ...u, originalIdx: i }))
  if (activeFilter.value === 'semua') return list
  return list.filter(u => u.type === activeFilter.value)
})

function countByType(type) {
  if (type === 'semua') return units.length
  return units.filter(u => u.type === type).length
}

function selectUnit(idx) {
  selectedIdx.value = idx
}

function gMapsUrl(unit) {
  return `https://maps.google.com/?q=${encodeURIComponent(`BRI ${unit.name} ${unit.addr}`)}`
}
</script>

<style scoped>
.network-section { padding: 88px 0; background: transparent; }

/* ── HEADER ── */
.network-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}
.network-stats {
  display: flex;
  align-items: center;
  gap: 24px;
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.09);
  border-radius: 14px;
  padding: 16px 28px;
  flex-shrink: 0;
}
.network-stat { text-align: center; }
.network-stat-val {
  font-size: 26px; font-weight: 800;
  color: #fff; letter-spacing: -0.03em;
  line-height: 1;
}
.network-stat-lbl {
  font-size: 11px; font-weight: 600;
  color: rgba(255,255,255,0.35);
  margin-top: 4px; letter-spacing: 0.04em;
  text-transform: uppercase;
}
.network-stat-sep {
  width: 1px; height: 36px;
  background: rgba(255,255,255,0.10);
  flex-shrink: 0;
}

/* ── MAIN PANEL ── */
.network-panel {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 20px;
  align-items: start;
}

/* ── LEFT LIST COL ── */
.network-list-col {
  display: flex;
  flex-direction: column;
  gap: 0;
  background: rgba(255,255,255,0.03);
  border: 1.5px solid rgba(255,255,255,0.09);
  border-radius: 18px;
  overflow: hidden;
}

.unit-filter-tabs {
  display: flex;
  padding: 12px 12px 0;
  gap: 4px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  padding-bottom: 12px;
  flex-shrink: 0;
}
.unit-filter-tab {
  flex: 1;
  display: flex; align-items: center; justify-content: center; gap: 5px;
  padding: 7px 6px;
  font-family: inherit; font-size: 11.5px; font-weight: 700;
  color: rgba(255,255,255,0.35);
  background: none; border: none; border-radius: 8px;
  cursor: pointer; transition: background 0.2s, color 0.2s;
  letter-spacing: 0.01em;
}
.unit-filter-tab:hover { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.65); }
.unit-filter-tab.active {
  background: rgba(0,87,184,0.20);
  color: #93c5fd;
}
.unit-filter-count {
  font-size: 10px; font-weight: 700;
  background: rgba(255,255,255,0.10);
  color: rgba(255,255,255,0.40);
  padding: 1px 5px; border-radius: 100px;
}
.unit-filter-tab.active .unit-filter-count {
  background: rgba(0,87,184,0.30);
  color: #93c5fd;
}

.unit-list {
  overflow-y: auto;
  max-height: 500px;
  display: flex;
  flex-direction: column;
}
.unit-list::-webkit-scrollbar { width: 4px; }
.unit-list::-webkit-scrollbar-track { background: transparent; }
.unit-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 4px; }

.unit-list-item {
  padding: 14px 16px;
  cursor: pointer;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  transition: background 0.18s;
}
.unit-list-item:last-child { border-bottom: none; }
.unit-list-item:hover { background: rgba(255,255,255,0.04); }
.unit-list-item.active { background: rgba(0,87,184,0.12); border-left: 3px solid var(--bri-blue, #0057b8); }

.unit-list-item-top {
  display: flex; align-items: center; gap: 8px; margin-bottom: 5px;
}
.unit-list-icon {
  width: 24px; height: 24px; border-radius: 7px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.icon-cabang { background: rgba(245,166,35,0.20); color: #f5a623; }
.icon-kcp    { background: rgba(96,165,250,0.20); color: #60a5fa; }
.icon-unit   { background: rgba(0,87,184,0.20);   color: #93c5fd; }

.unit-list-name {
  font-size: 13px; font-weight: 700;
  color: rgba(255,255,255,0.88);
  flex: 1; min-width: 0;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.unit-list-item.active .unit-list-name { color: #fff; }

.unit-list-badge {
  font-size: 9.5px; font-weight: 800;
  letter-spacing: 0.06em; text-transform: uppercase;
  padding: 2px 7px; border-radius: 100px; flex-shrink: 0;
}
.badge-cabang { background: rgba(245,166,35,0.15); color: #f5a623; }
.badge-kcp    { background: rgba(96,165,250,0.15); color: #60a5fa; }
.badge-unit   { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.45); }

.unit-list-addr {
  font-size: 12px; color: rgba(255,255,255,0.40);
  margin-bottom: 7px; line-height: 1.4;
  padding-left: 32px;
}

.unit-list-footer {
  display: flex; align-items: center; justify-content: space-between;
  padding-left: 32px;
}
.unit-list-hours {
  display: flex; align-items: center; gap: 4px;
  font-size: 11px; color: rgba(255,255,255,0.28); font-weight: 500;
}
.unit-list-maps {
  display: flex; align-items: center; gap: 3px;
  font-size: 11px; font-weight: 700; color: #60a5fa;
  text-decoration: none; opacity: 0.7;
  transition: opacity 0.2s;
}
.unit-list-maps:hover { opacity: 1; }

.unit-list-empty {
  padding: 40px 20px; text-align: center;
  font-size: 13px; color: rgba(255,255,255,0.25);
}

/* ── RIGHT MAP COL ── */
.network-map-col {
  display: flex; flex-direction: column; gap: 0;
  border-radius: 18px; overflow: hidden;
  border: 1.5px solid rgba(255,255,255,0.09);
}
.map-wrap {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
  background: rgba(0,0,0,0.20);
  transform: translateZ(0);
  isolation: isolate;
}
.map-iframe {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  border: none; display: block;
  will-change: transform;
  transform: translateZ(0);
}

.map-selected-info {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 18px;
  background: rgba(10,22,40,0.90);
  border-top: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(8px);
}
.map-selected-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--bri-blue, #0057b8);
  box-shadow: 0 0 0 3px rgba(0,87,184,0.25);
  flex-shrink: 0;
}
.map-selected-text {
  flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px;
}
.map-selected-name {
  font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.90);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.map-selected-addr {
  font-size: 11.5px; color: rgba(255,255,255,0.38);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.map-open-btn {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 7px 14px; border-radius: 8px;
  background: rgba(0,87,184,0.25);
  border: 1px solid rgba(0,87,184,0.40);
  color: #93c5fd; font-size: 12px; font-weight: 700;
  text-decoration: none; flex-shrink: 0;
  transition: background 0.2s;
}
.map-open-btn:hover { background: rgba(0,87,184,0.40); }

/* ── MAP TRANSITION ── */
.map-fade-enter-active, .map-fade-leave-active { transition: opacity 0.2s ease; }
.map-fade-enter-from, .map-fade-leave-to { opacity: 0; }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .network-panel { grid-template-columns: 1fr; }
  .unit-list { max-height: 320px; }
  .network-header { align-items: flex-start; }
}
@media (max-width: 600px) {
  .network-stats { padding: 12px 18px; gap: 16px; }
  .network-stat-val { font-size: 22px; }
  .map-selected-info { flex-wrap: wrap; }
}
</style>
