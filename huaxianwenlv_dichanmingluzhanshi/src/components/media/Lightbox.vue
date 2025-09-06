<template>
  <div v-if="open" class="overlay" @click.self="close">
    <button class="close" @click="close" aria-label="Close">×</button>
    <button class="prev" @click="prev" aria-label="Previous">‹</button>
    <img :src="current.src" :alt="current.alt || 'image'" />
    <button class="next" @click="next" aria-label="Next">›</button>
  </div>
</template>

<script>
export default {
  name: 'MediaLightbox',
  props: {
    items: { type: Array, required: true },
    index: { type: Number, default: 0 },
    open: { type: Boolean, default: false }
  },
  emits: ['update:open', 'update:index'],
  computed: {
    current() { return this.items[this.index] || {} }
  },
  mounted() {
    window.addEventListener('keydown', this.onKey)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKey)
  },
  methods: {
    close() { this.$emit('update:open', false) },
    prev() { const i = (this.index - 1 + this.items.length) % this.items.length; this.$emit('update:index', i) },
    next() { const i = (this.index + 1) % this.items.length; this.$emit('update:index', i) },
    onKey(e) {
      if (!this.open) return
      if (e.key === 'Escape') this.close()
      if (e.key === 'ArrowLeft') this.prev()
      if (e.key === 'ArrowRight') this.next()
    }
  }
}
</script>

<style scoped>
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,.9); display: grid; grid-template-columns: 60px 1fr 60px; align-items: center; justify-items: center; z-index: 1000; }
.overlay img { max-width: 90vw; max-height: 90vh; object-fit: contain; }
.close { position: fixed; top: 16px; right: 16px; font-size: 28px; background: rgba(0,0,0,.6); color: #fff; border: 0; border-radius: 8px; width: 36px; height: 36px; cursor: pointer; }
.prev,.next { background: rgba(0,0,0,.6); color: #fff; border: 0; width: 48px; height: 48px; border-radius: 50%; cursor: pointer; font-size: 28px; }
.prev { justify-self: start; margin-left: 12px; }
.next { justify-self: end; margin-right: 12px; }
</style>