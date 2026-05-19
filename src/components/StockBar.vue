<template>
  <div class="stock-bar">
    <div class="stock-inner">
      <div class="stock-left">
        <div class="stock-ticker">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          BBRI
        </div>
        <div class="stock-price">3.070</div>
        <div class="stock-change up">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          10 (0,33%)
        </div>
      </div>
      <div class="stock-sep"></div>
      <div class="stock-meta">
        <div class="stock-meta-item"><span class="meta-lbl">Volume</span><span class="meta-val">132.095.600</span></div>
        <div class="stock-meta-item"><span class="meta-lbl">Day's Range</span><span class="meta-val">3.040 – 3.140</span></div>
        <div class="stock-meta-item"><span class="meta-lbl">52wk Range</span><span class="meta-val">2.980 – 4.450</span></div>
        <div class="stock-meta-item"><span class="meta-lbl">Update</span><span class="meta-val">19/05/2026 13:01 WIB</span></div>
      </div>
      <a href="https://www.ir-bri.com/" target="_blank" class="stock-ir-btn">
        Investor Relations
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>
</template>

<style scoped>
.stock-bar {
  background: rgba(10, 20, 40, 0.92);
  border-top: 1px solid rgba(255,255,255,0.07);
  border-bottom: 1px solid rgba(255,255,255,0.07);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
</style>
