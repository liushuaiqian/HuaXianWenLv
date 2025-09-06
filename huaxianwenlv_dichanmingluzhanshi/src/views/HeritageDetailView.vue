<template>
  <section class="page page-heritage-detail" v-if="item">
    <header class="header">
      <button class="back" @click="goBack">← 返回</button>
      <h1 class="title">{{ item.title }}</h1>
      <p class="meta">{{ item.level }} · {{ item.region }} · {{ item.category }}</p>
      <div class="tags">
        <span class="tag" v-for="t in item.tags" :key="t">#{{ t }}</span>
      </div>
    </header>

    <section class="gallery">
      <img v-for="img in item.images" :key="img.src" :src="img.src" :alt="img.alt || item.title" />
    </section>

    <article class="content">
      <p>{{ item.description }}</p>
    </article>
  </section>
  <section v-else class="page"><p>正在加载...</p></section>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'HeritageDetailView',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const item = ref(null)

    const load = async () => {
      const res = await fetch('/data/heritage.json')
      const list = await res.json()
      item.value = list.find(i => i.id === route.params.id)
    }

    const goBack = () => router.back()

    onMounted(load)

    return { item, goBack }
  }
}
</script>

<style scoped>
.page { padding: 24px; }
.header .back { appearance: none; background: transparent; border: 0; color: #3b82f6; cursor: pointer; margin-bottom: 8px; }
.header .title { font-size: 24px; font-weight: 800; margin: 4px 0; }
.header .meta { color: #64748b; }
.tags { display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap; }
.tag { background: #eef2f7; color: #334155; font-size: 12px; padding: 2px 6px; border-radius: 999px; }
.gallery { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-top: 16px; }
.gallery img { width: 100%; height: 200px; object-fit: cover; background: #f8fafc; border-radius: 10px; }
@media (min-width: 768px) { .gallery { grid-template-columns: repeat(3, minmax(0, 1fr)); } .gallery img { height: 240px; } }
.content { margin-top: 16px; line-height: 1.8; color: #334155; }
</style>