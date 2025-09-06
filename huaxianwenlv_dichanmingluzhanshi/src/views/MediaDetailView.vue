<template>
  <section class="media-detail">
    <article v-if="item">
      <img v-if="item.src" :src="item.src" :alt="item.alt || 'image'" />
      <header>
        <h1>{{ item.title || '媒体详情' }}</h1>
        <p v-if="item.desc" class="desc">{{ item.desc }}</p>
      </header>
    </article>
    <p v-else class="empty">未找到此媒体</p>
  </section>
</template>

<script>
export default {
  name: 'MediaDetailView',
  data() {
    return { item: null }
  },
  mounted() {
    const id = this.$route.params.id
    fetch('/data/media.json').then(r => r.json()).then(list => {
      this.item = (list || []).find(i => i.id === id)
    })
  }
}
</script>

<style scoped>
.media-detail { padding: 24px; color: #e5e7eb; background: #0b0e12; min-height: calc(100vh - 120px); }
.media-detail img { max-width: 100%; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,.2); }
.desc { opacity: .8; }
.empty { opacity: .8; }
</style>