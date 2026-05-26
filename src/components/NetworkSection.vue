<template>
  <section class="network-section" id="jaringan">
    <div class="container">
      <div class="section-eyebrow reveal">Jaringan Kami</div>
      <h2 class="section-title reveal">Lokasi Unit Kerja</h2>
      <p class="section-sub reveal" style="margin-bottom:40px">Temukan kantor BRI terdekat di wilayah Polewali Mandar.</p>

      <div class="map-row reveal">
        <div class="map-dropdown-wrap">
          <label class="map-dropdown-label">Pilih Kantor</label>
          <div class="map-select-wrap">
            <select class="map-select" v-model="selectedIdx" @change="onSelectChange">
              <option v-for="(unit, i) in units" :key="i" :value="i">{{ unit.name }}</option>
            </select>
            <svg class="map-select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
        <div class="map-embed-container">
          <iframe class="map-iframe" :src="units[selectedIdx].mapSrc" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>

      <div class="unit-grid reveal">
        <div
          v-for="(unit, i) in visibleUnits"
          :key="i"
          class="unit-card"
          :class="{ active: selectedIdx === unit.originalIdx }"
          @click="selectUnit(unit.originalIdx)"
        >
          <div class="unit-card-header">
            <div class="unit-card-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            </div>
            <div class="unit-card-name">{{ unit.name }}</div>
            <div class="unit-card-badge">{{ unit.type }}</div>
          </div>
          <div class="unit-card-addr">{{ unit.addr }}</div>
          <div class="unit-card-hours">Sen–Jum 08.00–15.00</div>
          <a :href="gMapsUrl(unit)" target="_blank" rel="noopener" class="unit-maps-btn" @click.stop>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Buka di Google Maps
          </a>
        </div>
      </div>

      <div class="unit-more-wrap">
        <button v-if="!showAll" class="btn-show-more" @click="showAll = true">
          Tampilkan yang Lainnya ({{ units.length - 4 }})
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <button v-else class="btn-show-more" @click="showAll = false">
          Tutup
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedIdx = ref(0)
const showAll = ref(false)

const units = [
  { name: 'CP Polewali', addr: 'Jl. H. Andi Depu No.177', type: 'Cabang', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973!2d119.3377792!3d-3.4308096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d948636df04135f:0x5613e1de2ef4010e!2sBank+Rakyat+Indonesia!5e1!3m2!1sid!2sid!4v1700000000001' },
  { name: 'KCP Wonomulyo', addr: 'Jl. Poros Majene KM 17', type: 'KCP', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d119.206658!3d-3.3997468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d949a964c56c381:0x9d17c23d5755131d!2sBank+BRI+Wonomulyo!5e1!3m2!1sid!2sid!4v1700000000002' },
  { name: 'KCP Mamasa', addr: 'Mamasa, Sulawesi Barat', type: 'KCP', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d119.3752206!3d-2.9428596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d930bfbd6fc535d:0x26f4e4c5b8730187!2sBank+BRI+CRM+KCP+MAMASA!5e1!3m2!1sid!2sid!4v1700000000003' },
  { name: 'Unit Sumarorong', addr: 'Sumarorong, Mamasa', type: 'Unit', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d119.3104408!3d-3.1417745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d93799555555555:0xb75a999062eef84c!2sBRI+Unit+Sumrorong!5e1!3m2!1sid!2sid!4v1700000000004' },
  { name: 'Unit Bumiayu', addr: 'Bumiayu, Wonomulyo', type: 'Unit', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d119.2103333!3d-3.402874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d949aa306ca8aaf:0x71ea9e518b74791a!2sBANK+BRI+UNIT+BUMIAYU!5e1!3m2!1sid!2sid!4v1700000000005' },
  { name: 'Unit Campalagian', addr: 'Jl. Poros Campalagian', type: 'Unit', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d119.1381298!3d-3.4763892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d94915295cb70d1:0xb36a7f93af7dd675!2sBank+BRI+Unit+Campalagian!5e1!3m2!1sid!2sid!4v1700000000006' },
  { name: 'Unit Darma', addr: 'Darma, Polewali', type: 'Unit', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d119.3139567!3d-3.4106222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d948f50b249b7e3:0xaaf3e29b9e7c0c2d!2sBank+BRI+UNIT+Darma!5e1!3m2!1sid!2sid!4v1700000000007' },
  { name: 'Unit Luyo', addr: 'Luyo, Polewali Mandar', type: 'Unit', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d119.1623556!3d-3.4185211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d9491b18c5c398b:0x99266cef699d89fb!2sBank+BRI+UNIT+Luyo!5e1!3m2!1sid!2sid!4v1700000000008' },
  { name: 'Unit Mamasa', addr: 'Mamasa, Sulawesi Barat', type: 'Unit', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d119.3721071!3d-2.9417265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d930b9180a1d275:0x404088bfe6531899!2sBank+BRI+UNIT+Mamasa!5e1!3m2!1sid!2sid!4v1700000000009' },
  { name: 'Unit Polewali', addr: 'Wattang, Kec. Polewali', type: 'Unit', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d119.3441713!3d-3.4334342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d9488c2ce6a9e93:0x6b4dd393df934461!2sBRI+Unit+Polewali!5e1!3m2!1sid!2sid!4v1700000000010' },
  { name: 'Unit Sidodadi', addr: 'Sidodadi, Wonomulyo', type: 'Unit', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d119.2098445!3d-3.398468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d949abc3472135f:0x315b8300617b42eb!2sBRI+UNIT+SIDODADI!5e1!3m2!1sid!2sid!4v1700000000011' },
  { name: 'Unit Pajalele', addr: 'Pajalele, Polewali Mandar', type: 'Unit', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d119.5301967!3d-3.5372676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d94a6000000001:0x000000000001!2sBRI+Unit+Pajalele!5e1!3m2!1sid!2sid!4v1700000000012' },
  { name: 'Unit Mambi', addr: 'Mambi, Sulawesi Barat', type: 'Unit', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d119.1757233!3d-2.9499586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d931330c1d079ad:0x15c56192db81431!2sBank+BRI+CRM+BRI+UNIT+MAMBI!5e1!3m2!1sid!2sid!4v1700000000013' },
]

const visibleUnits = computed(() => {
  const list = units.map((u, i) => ({ ...u, originalIdx: i }))
  return showAll.value ? list : list.slice(0, 4)
})

function selectUnit(idx) {
  selectedIdx.value = idx
}

function onSelectChange() {}

function gMapsUrl(unit) {
  return `https://maps.google.com/?q=${encodeURIComponent(`BRI ${unit.name} ${unit.addr}`)}`
}
</script>

<style scoped>
.unit-card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.unit-maps-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 6px;
  font-size: 10.5px;
  font-weight: 600;
  color: #60a5fa;
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.2s, color 0.2s;
  width: fit-content;
}
.unit-maps-btn:hover { opacity: 1; color: #93c5fd; }
</style>