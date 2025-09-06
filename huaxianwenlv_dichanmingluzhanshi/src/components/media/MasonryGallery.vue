<template>
  <div class="masonry" :style="masonryStyle">
    <figure v-for="(item, idx) in items" :key="item.id || idx" class="card" @click="onOpen(idx)">
      <img :src="item.src" :alt="item.alt || 'image'" loading="lazy" />
    </figure>
  </div>
</template>

<script>
export default {
  name: 'MasonryGallery',
  props: {
    items: { type: Array, required: true },
    columnBase: { type: Number, default: 3 }
  },
  computed: {
    masonryStyle() {
      return {
        columnCount: this.columnBase,
        columnGap: '20px'
      }
    }
  },
  methods: {
    onOpen(idx) {
      this.$emit('open', idx)
    }
  }
}
</script>

<style scoped>
.masonry { width: 100%; }
.card { break-inside: avoid; margin: 0 0 20px; border-radius: 12px; overflow: hidden; background: rgba(255,255,255,0.06); cursor: zoom-in; border: 1.15px solid rgba(255,255,255,0.1); transition: background-color .2s ease; }
.card:hover { background: transparent; }
.card img { width: 100%; height: auto; display: block; filter: brightness(.8); transition: transform .3s ease, filter .2s ease; }
.card:hover img { transform: scale(1.02); filter: brightness(1); }

@media (max-width: 1280px) {
  .masonry { column-count: 3; }
}
@media (max-width: 960px) {
  .masonry { column-count: 2; }
}
@media (max-width: 600px) {
  .masonry { column-count: 1; }
}
</style>