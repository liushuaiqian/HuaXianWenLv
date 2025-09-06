<template>
  <section class="page page-customs-detail" v-if="item">
    <header class="header">
      <button class="back" @click="goBack">← 返回</button>
      <h1 class="title">{{ item.title }}</h1>
      <p class="meta">{{ item.dateRule }} · {{ item.location }}</p>
      <div class="tags">
        <span class="tag" v-for="t in item.tags" :key="t">#{{ t }}</span>
      </div>
    </header>

    <section v-if="galleryItems.length" class="gallery">
      <MasonryGallery :items="galleryItems" :column-base="3" @open="openAt" />
    </section>

    <section v-if="item.video" class="video">
      <video :src="item.video" controls preload="metadata" style="max-width:100%;border-radius:8px;outline:none;"></video>
    </section>

    <article class="content" v-html="html"></article>

    <MediaLightbox :items="galleryItems" :index="active" :open="lightboxOpen"
      @update:open="v => (lightboxOpen = v)" @update:index="v => (active = v)" />
  </section>
  <section v-else class="page"><p>正在加载...</p></section>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MasonryGallery from '@/components/media/MasonryGallery.vue'
import MediaLightbox from '@/components/media/Lightbox.vue'
import MarkdownIt from 'markdown-it'

export default {
  name: 'CustomsDetailView',
  components: { MasonryGallery, MediaLightbox },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const item = ref(null)
    const html = ref('')

    const galleryItems = ref([])
    const lightboxOpen = ref(false)
    const active = ref(0)

    const md = new MarkdownIt({ html: true, linkify: true, breaks: true })

    const openAt = (i) => { active.value = i; lightboxOpen.value = true }
    const goBack = () => router.back()

    const load = async () => {
      const res = await fetch('/data/customs.json')
      const list = await res.json()
      const found = list.find(i => i.id === route.params.id)
      item.value = found || null

      // 画廊数据适配
      const imgs = (found?.images || []).map(src => ({ src, alt: found.title }))
      galleryItems.value = imgs

      // 渲染 Markdown
      if (found?.markdown) {
        const mdText = await fetch(found.markdown).then(r => r.text()).catch(() => '')
        html.value = md.render(mdText)
      }
    }

    onMounted(load)

    return { item, html, galleryItems, lightboxOpen, active, openAt, goBack }
  }
}
</script>

<style scoped>
.page { padding: 24px; }
.header .back { appearance: none; background: transparent; border: 0; color: #3b82f6; cursor: pointer; margin-bottom: 8px; }
.title { font-size: 24px; font-weight: 800; margin: 0; }
.meta { color: #64748b; margin-top: 6px; }
.tags { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
.tag { background: #f1f5f9; color: #334155; font-size: 12px; padding: 2px 6px; border-radius: 999px; }
.gallery { margin: 16px 0 8px; }
.content :deep(img) { max-width: 100%; border-radius: 8px; }
.content :deep(h1), .content :deep(h2), .content :deep(h3) { margin-top: 1.2em; }
</style>