<template>
  <section class="media-page">
    <header class="hero">
      <div class="hero-inner">
        <h1 class="title">Welcome to image gallery</h1>
        <p class="subtitle">You must be logged in to start uploading images</p>
      </div>
    </header>

    <main class="content">
      <MasonryGallery
        v-if="!loading && items.length"
        :items="items"
        :column-base="4"
        @open="openAt"
      />

      <div v-else-if="loading" class="loading">Loading…</div>
      <div v-else class="empty">暂无图片</div>
    </main>

    <MediaLightbox
      :items="items"
      :index="active"
      :open="lightboxOpen"
      @update:open="v => (lightboxOpen = v)"
      @update:index="v => (active = v)"
    />
  </section>
</template>

<script>
import MasonryGallery from '@/components/media/MasonryGallery.vue'
import MediaLightbox from '@/components/media/Lightbox.vue'

export default {
  name: 'MediaListView',
  components: { MasonryGallery, MediaLightbox },
  data() {
    return {
      items: [],
      loading: true,
      lightboxOpen: false,
      active: 0,
    }
  },
  mounted() {
    fetch('/data/media.json')
      .then(r => r.json())
      .then(list => { this.items = Array.isArray(list) ? list : []; })
      .catch(() => {})
      .finally(() => { this.loading = false })
  },
  methods: {
    openAt(i) { this.active = i; this.lightboxOpen = true }
  }
}
</script>

<style scoped>
.media-page { background: #0b0e12; min-height: calc(100vh - 120px); color: #e5e7eb; }
.hero { position: sticky; top: 0; z-index: 1; background: linear-gradient(180deg, #0b0e12, rgba(11,14,18,.6)); backdrop-filter: blur(4px); border-bottom: 1px solid rgba(255,255,255,.06); }
.hero-inner { max-width: 1200px; margin: 0 auto; padding: 24px 16px; }
.title { font-size: 28px; font-weight: 700; margin: 0 0 4px; }
.subtitle { margin: 0; opacity: .7; }
.content { max-width: 1200px; margin: 16px auto; padding: 0 16px 32px; }
.loading, .empty { text-align: center; padding: 40px 0; opacity: .8; }
</style>