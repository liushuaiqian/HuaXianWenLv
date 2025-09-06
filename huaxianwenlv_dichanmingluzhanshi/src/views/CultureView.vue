<template>
  <div class="culture-page">
    <section class="container page-header">
      <h1 class="title">{{ data?.intro?.title || '文化概况' }}</h1>
      <p class="summary">{{ data?.intro?.summary }}</p>
      <nav class="anchor-nav" aria-label="页面分节导航" v-if="anchors.length">
        <a v-for="a in anchors" :key="a.id" class="anchor-link" :href="`#${a.id}`" @click.prevent="scrollTo(a.id)">{{ a.label }}</a>
      </nav>
    </section>

    <section class="container timeline" :id="'timeline'">
      <h2 class="section-title">历史沿革</h2>
      <div v-if="loading" class="skeleton-list">
        <div class="skeleton-item" v-for="i in 4" :key="i"></div>
      </div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <ol v-else class="tl">
        <li v-for="(t, idx) in data.timeline" :key="idx" class="tl-item">
          <div class="tl-dot" aria-hidden="true"></div>
          <div class="tl-content">
            <div class="tl-header">
              <span class="tl-date">{{ t.date }}</span>
              <strong class="tl-title">{{ t.title }}</strong>
            </div>
            <p class="tl-desc">{{ t.description }}</p>
          </div>
        </li>
      </ol>
    </section>

    <section class="container themes" :id="'themes'">
      <h2 class="section-title">主题分区</h2>
      <div v-if="!loading" class="theme-grid">
        <article class="theme-card" v-for="s in data.themes" :key="s.id" @click="openThemeModal(s)">
          <a class="thumb" href="#" @click.prevent>
            <img :src="s.cover" :alt="s.name" />
          </a>
          <h3 class="card-title">{{ s.name }}</h3>
          <p class="card-desc">{{ s.summary }}</p>
        </article>
      </div>
      <div v-else class="skeleton-cards">
        <div class="skeleton-card" v-for="i in 3" :key="i"></div>
      </div>
    </section>

    <section class="container elements" :id="'elements'">
      <div class="elements-header">
        <h2 class="section-title">代表元素</h2>
        <div class="filters" role="group" aria-label="类别筛选">
          <button class="chip" :class="{ active: filterCategory === '全部' }" @click="setFilter('全部')">全部</button>
          <button class="chip" v-for="c in categories" :key="c" :class="{ active: filterCategory === c }" @click="setFilter(c)">{{ c }}</button>
        </div>
      </div>
      <div v-if="!loading" class="elem-grid">
        <article class="elem-card" v-for="e in filteredElements" :key="e.id">
          <a class="thumb" href="#" @click.prevent>
            <img :src="e.image" :alt="e.name" />
          </a>
          <h3 class="card-title">{{ e.name }}</h3>
          <p class="card-desc">{{ e.summary }}</p>
          <div class="badge">{{ e.category }}</div>
        </article>
      </div>
      <div v-else class="skeleton-cards">
        <div class="skeleton-card" v-for="i in 4" :key="i"></div>
      </div>
      <div v-if="!loading && filteredElements.length === 0" class="empty">暂无符合筛选条件的内容</div>
    </section>

    <section class="container faq" :id="'faq'">
      <h2 class="section-title">常见问答</h2>
      <div class="accordion">
        <details v-for="(f, idx) in data.faq" :key="idx" class="qa">
          <summary class="q">{{ f.q }}</summary>
          <div class="a">{{ f.a }}</div>
        </details>
      </div>
    </section>

    <section class="container refs" :id="'refs'" v-if="data.refs && data.refs.length">
      <h2 class="section-title">资料与参考</h2>
      <ul class="ref-list">
        <li v-for="(r, idx) in data.refs" :key="idx">
          <a :href="r.url" target="_blank" rel="noopener">{{ r.title }}</a>
        </li>
      </ul>
    </section>
    
    <!-- 主题详情弹窗 -->
    <ThemeModal
      :theme="selectedTheme"
      :open="themeModalOpen"
      @update:open="v => (themeModalOpen = v)"
    />
  </div>
</template>

<script>
import ThemeModal from '@/components/culture/ThemeModal.vue'

export default {
  name: 'CultureView',
  components: {
    ThemeModal
  },
  data() {
    return {
      data: { anchors: [], intro: {}, timeline: [], themes: [], elementCategories: [], elements: [], faq: [], refs: [] },
      anchors: [],
      loading: true,
      error: '',
      filterCategory: this.$route.query.cat || '全部',
      selectedTheme: {},
      themeModalOpen: false
    }
  },
  computed: {
    categories() { return this.data.elementCategories || [] },
    filteredElements() {
      if (this.filterCategory === '全部') return this.data.elements
      return (this.data.elements || []).filter(e => e.category === this.filterCategory)
    }
  },
  watch: {
    '$route.query.cat'(v) { this.filterCategory = v || '全部' }
  },
  created() { this.fetchData() },
  methods: {
    async fetchData() {
      try {
        this.loading = true
        const res = await fetch('/data/culture.json')
        if (!res.ok) throw new Error('数据加载失败')
        const json = await res.json()
        this.data = json
        this.anchors = json.anchors || []
        this.loading = false
      } catch (e) {
        this.error = e.message || '加载失败'
        this.loading = false
      }
    },
    setFilter(cat) {
      this.filterCategory = cat
      const q = new URLSearchParams(this.$route.query)
      if (cat === '全部') q.delete('cat'); else q.set('cat', cat)
      this.$router.replace({ query: Object.fromEntries(q.entries()) })
    },
    scrollTo(id) {
      const el = document.getElementById(id)
      if (!el) return
      const top = el.getBoundingClientRect().top + window.pageYOffset - 72
      window.scrollTo({ top, behavior: 'smooth' })
    },
    openThemeModal(theme) {
      this.selectedTheme = theme
      this.themeModalOpen = true
    }
  }
}
</script>

<style scoped>
.culture-page { background: #fafafa; }
.container { max-width: 1100px; margin: 0 auto; padding: 28px 20px; }
.title { font-size: 32px; font-weight: 800; color: #111827; margin: 2px 0 6px; }
.summary { color: #6b7280; }
.anchor-nav { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 14px; }
.anchor-link { display: inline-flex; padding: 8px 12px; border: 1px solid #e5e7eb; border-radius: 999px; background: #fff; font-weight: 600; color: #374151; }
.anchor-link:hover { background: #f9fafb; }
.section-title { font-weight: 800; font-size: 24px; margin: 10px 0 14px; color: #111827; }

/* 时间轴 */
.tl { position: relative; list-style: none; padding: 0; margin: 0; }
.tl:before { content: ''; position: absolute; left: 10px; top: 0; bottom: 0; width: 2px; background: #e5e7eb; }
.tl-item { position: relative; display: grid; grid-template-columns: 24px 1fr; gap: 12px; padding: 10px 0; }
.tl-dot { width: 20px; height: 20px; border-radius: 50%; background: #fff; border: 3px solid #10b981; box-shadow: 0 1px 2px rgba(0,0,0,.06); margin-left: 1px; }
.tl-header { display: flex; align-items: baseline; gap: 12px; }
.tl-date { color: #059669; font-weight: 700; }
.tl-title { color: #1f2937; }
.tl-desc { color: #6b7280; margin: 6px 0 0; }

/* 主题分区卡片 */
.theme-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
@media (min-width: 760px) { .theme-grid { grid-template-columns: repeat(3, 1fr); } }
.theme-card { background: #fff; border-radius: 14px; padding: 12px; box-shadow: 0 1px 0 rgba(16,24,40,.04), 0 1px 3px rgba(16,24,40,.08); cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease; }
.theme-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(16,24,40,.12), 0 2px 6px rgba(16,24,40,.08); }
.theme-card .thumb { display: block; overflow: hidden; border-radius: 10px; }
.theme-card img { width: 100%; height: 160px; object-fit: cover; display: block; }
.card-title { font-size: 16px; font-weight: 800; color: #1f2937; margin: 10px 0 6px; }
.card-desc { color: #6b7280; font-size: 14px; }

/* 代表元素 */
.elements-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.filters { display: flex; flex-wrap: wrap; gap: 8px; }
.chip { padding: 6px 12px; border-radius: 999px; border: 1px solid #e5e7eb; background: #fff; color: #374151; font-weight: 600; }
.chip.active { background: #10b981; border-color: #10b981; color: #fff; }
.elem-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
@media (min-width: 760px) { .elem-grid { grid-template-columns: repeat(4, 1fr); } }
.elem-card { background: #fff; border-radius: 14px; padding: 12px; box-shadow: 0 1px 0 rgba(16,24,40,.04), 0 1px 3px rgba(16,24,40,.08); position: relative; }
.elem-card .thumb { display: block; overflow: hidden; border-radius: 10px; }
.elem-card img { width: 100%; height: 130px; object-fit: cover; display: block; }
.badge { position: absolute; top: 12px; left: 12px; background: rgba(16,185,129,.95); color: #fff; padding: 2px 8px; border-radius: 999px; font-size: 12px; font-weight: 700; }

/* FAQ */
.accordion .q { font-weight: 700; cursor: pointer; }
.accordion .qa { background: #fff; border-radius: 12px; padding: 12px 14px; box-shadow: 0 1px 0 rgba(16,24,40,.04), 0 1px 3px rgba(16,24,40,.08); margin-bottom: 10px; }
.a { color: #6b7280; margin-top: 6px; }

/* 参考资料 */
.ref-list { padding-left: 18px; }
.ref-list a { color: #0ea5e9; }

/* 骨架屏与状态 */
.skeleton-list { display: grid; gap: 12px; }
.skeleton-item { height: 64px; border-radius: 12px; background: linear-gradient(90deg, #eee, #f6f6f6, #eee); background-size: 200% 100%; animation: pulse 1.2s ease-in-out infinite; }
.skeleton-cards { display: grid; grid-template-columns: 1fr; gap: 14px; }
@media (min-width: 760px) { .skeleton-cards { grid-template-columns: repeat(3, 1fr); } }
.skeleton-card { height: 220px; border-radius: 14px; background: linear-gradient(90deg, #eee, #f6f6f6, #eee); background-size: 200% 100%; animation: pulse 1.2s ease-in-out infinite; }
@keyframes pulse { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
.error { color: #ef4444; background: #fee2e2; padding: 10px 12px; border-radius: 8px; }
.empty { color: #6b7280; text-align: center; margin-top: 10px; }

/* Utilities */
.anchor-link, a { text-decoration: none; color: inherit; }
</style>