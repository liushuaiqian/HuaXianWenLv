<template>
  <section class="page page-heritage">
    <header class="page-header">
      <h1>非遗名录</h1>
      <p class="desc">可按关键词、类别、地区、级别筛选与排序，并支持分页浏览。</p>

      <div class="toolbar">
        <input v-model="q" class="input" type="search" placeholder="搜索标题 / 标签 / 摘要" />
        <select v-model="filters.category" class="select">
          <option value="">全部类别</option>
          <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
        </select>
        <select v-model="filters.region" class="select">
          <option value="">全部地区</option>
          <option v-for="r in regions" :key="r" :value="r">{{ r }}</option>
        </select>
        <select v-model="filters.level" class="select">
          <option value="">全部级别</option>
          <option v-for="l in levels" :key="l" :value="l">{{ l }}</option>
        </select>
        <select v-model="sortBy" class="select">
          <option value="relevance">按相关度</option>
          <option value="title">按标题</option>
          <option value="region">按地区</option>
          <option value="level">按级别</option>
        </select>
      </div>
    </header>

    <div class="grid">
      <article v-for="item in paged" :key="item.id" class="card" @click="goDetail(item.id)">
        <img :src="item.cover" :alt="item.title" class="cover" />
        <div class="meta">
          <h3 class="title">{{ item.title }}</h3>
          <p class="summary">{{ item.summary }}</p>
          <div class="tags">
            <span class="tag" v-for="t in item.tags" :key="t">#{{ t }}</span>
          </div>
          <div class="info">
            <span>{{ item.category }}</span>
            <span>·</span>
            <span>{{ item.region }}</span>
            <span>·</span>
            <span>{{ item.level }}</span>
          </div>
        </div>
      </article>
    </div>

    <div v-if="paged.length === 0" class="empty">暂无结果，试试更换筛选条件或清空关键词。</div>

    <footer class="pager">
      <button class="btn" :disabled="page===1" @click="page--">上一页</button>
      <span>第 {{ page }} / {{ totalPages }} 页</span>
      <button class="btn" :disabled="page===totalPages" @click="page++">下一页</button>
    </footer>
  </section>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'HeritageListView',
  setup() {
    const router = useRouter()

    const data = ref([])
    const q = ref('')
    const filters = reactive({ category: '', region: '', level: '' })
    const sortBy = ref('relevance')

    const categories = ref([])
    const regions = ref([])
    const levels = ref([])

    const page = ref(1)
    const pageSize = 8

    const load = async () => {
      const res = await fetch('/data/heritage.json')
      data.value = await res.json()
      // 生成下拉选项
      const uniq = (arr) => Array.from(new Set(arr.filter(Boolean)))
      categories.value = uniq(data.value.map(i => i.category))
      regions.value = uniq(data.value.map(i => i.region))
      levels.value = uniq(data.value.map(i => i.level))
    }

    const filtered = computed(() => {
      let list = data.value
      // 关键词
      if (q.value) {
        const kw = q.value.trim().toLowerCase()
        list = list.filter(i => {
          const text = `${i.title} ${i.summary} ${(i.tags||[]).join(' ')}`.toLowerCase()
          return text.includes(kw)
        })
      }
      // 筛选
      if (filters.category) list = list.filter(i => i.category === filters.category)
      if (filters.region) list = list.filter(i => i.region === filters.region)
      if (filters.level) list = list.filter(i => i.level === filters.level)

      // 排序
      const sorters = {
        relevance: () => 0,
        title: (a,b) => a.title.localeCompare(b.title, 'zh-Hans-CN'),
        region: (a,b) => a.region.localeCompare(b.region, 'zh-Hans-CN'),
        level: (a,b) => a.level.localeCompare(b.level, 'zh-Hans-CN')
      }
      return [...list].sort(sorters[sortBy.value] || sorters.relevance)
    })

    const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))
    const paged = computed(() => {
      const start = (page.value - 1) * pageSize
      return filtered.value.slice(start, start + pageSize)
    })

    const goDetail = (id) => router.push({ name: 'heritage-detail', params: { id } })

    onMounted(load)

    return {
      q, filters, sortBy,
      categories, regions, levels,
      page, totalPages, paged,
      goDetail
    }
  }
}
</script>

<style scoped>
.page { padding: 24px; }
.page-header { border-bottom: 1px solid #eee; padding-bottom: 12px; margin-bottom: 16px; }
.page-header .desc { color: #64748b; margin-top: 4px; }
.toolbar { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.input, .select { height: 36px; padding: 0 10px; border: 1px solid #d0d7de; border-radius: 6px; background: #fff; }
.grid { display: grid; grid-template-columns: repeat(1, minmax(0,1fr)); gap: 16px; margin-top: 16px; }
@media (min-width: 768px) { .grid { grid-template-columns: repeat(2, minmax(0,1fr)); } }
@media (min-width: 1024px) { .grid { grid-template-columns: repeat(3, minmax(0,1fr)); } }
.card { border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; background: #fff; cursor: pointer; transition: box-shadow .2s ease, transform .2s ease; }
.card:hover { box-shadow: 0 6px 24px rgba(0,0,0,.06); transform: translateY(-2px); }
.cover { width: 100%; height: 160px; object-fit: cover; background: #f8fafc; }
.meta { padding: 12px; }
.title { font-size: 16px; font-weight: 700; margin: 0; }
.summary { color: #6b7280; font-size: 13px; margin: 6px 0 8px; line-height: 1.5; min-height: 38px; }
.tags { display: flex; flex-wrap: wrap; gap: 6px; }
.tag { background: #f1f5f9; color: #334155; font-size: 12px; padding: 2px 6px; border-radius: 999px; }
.info { color: #64748b; font-size: 12px; margin-top: 8px; display: flex; align-items: center; gap: 6px; }
.empty { text-align: center; color: #94a3b8; padding: 24px 0; }
.pager { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 16px 0 8px; }
.btn { height: 32px; padding: 0 12px; border: 1px solid #cbd5e1; background: #fff; border-radius: 6px; cursor: pointer; }
.btn:disabled { opacity: .5; cursor: not-allowed; }
</style>