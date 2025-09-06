<template>
  <section class="page page-customs">
    <header class="page-header">
      <h1>风俗节庆</h1>
      <p class="desc">按关键词、月份/季节筛选与排序，支持分页浏览。</p>

      <div class="toolbar">
        <input v-model="q" class="input" type="search" placeholder="搜索标题 / 标签 / 摘要" />
        <select v-model.number="filters.month" class="select">
          <option :value="0">全部月份</option>
          <option v-for="m in months" :key="m.value" :value="m.value">{{ m.label }}</option>
        </select>
        <select v-model="filters.season" class="select">
          <option value="">全部季节</option>
          <option v-for="s in seasons" :key="s" :value="s">{{ s }}</option>
        </select>
        <select v-model="sortBy" class="select">
          <option value="relevance">按相关度</option>
          <option value="title">按标题</option>
          <option value="month">按月份</option>
          <option value="season">按季节</option>
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
            <span>{{ formatDateRule(item.dateRule) }}</span>
            <span>·</span>
            <span>{{ item.location }}</span>
          </div>
        </div>
      </article>
    </div>

    <div v-if="!loading && paged.length === 0" class="empty">暂无结果，试试更换筛选条件或清空关键词。</div>
    <div v-if="loading" class="empty">正在加载…</div>

    <footer v-if="!loading" class="pager">
      <button class="btn" :disabled="page===1" @click="page--">上一页</button>
      <span>第 {{ page }} / {{ totalPages }} 页</span>
      <button class="btn" :disabled="page===totalPages" @click="page++">下一页</button>
    </footer>
  </section>
</template>

<script>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'CustomsListView',
  setup() {
    const router = useRouter()

    const data = ref([])
    const loading = ref(true)
    const q = ref('')
    const filters = reactive({ month: 0, season: '' })
    const sortBy = ref('relevance')

    const months = [
      { value: 1, label: '1月' },
      { value: 2, label: '2月' },
      { value: 3, label: '3月' },
      { value: 4, label: '4月' },
      { value: 5, label: '5月' },
      { value: 6, label: '6月' },
      { value: 7, label: '7月' },
      { value: 8, label: '8月' },
      { value: 9, label: '9月' },
      { value: 10, label: '10月' },
      { value: 11, label: '11月' },
      { value: 12, label: '12月' },
    ]
    const seasons = ['春', '夏', '秋', '冬']

    const page = ref(1)
    const pageSize = 8

    const load = async () => {
      try {
        const res = await fetch('/data/customs.json')
        data.value = await res.json()
      } catch (e) {
        data.value = []
      } finally {
        loading.value = false
      }
    }

    const filtered = computed(() => {
      let list = data.value
      if (q.value) {
        const kw = q.value.trim().toLowerCase()
        list = list.filter(i => {
          const text = `${i.title} ${i.summary} ${(i.tags||[]).join(' ')}`.toLowerCase()
          return text.includes(kw)
        })
      }
      if (filters.month) list = list.filter(i => Number(i.month) === Number(filters.month))
      if (filters.season) list = list.filter(i => i.season === filters.season)

      const monthOrder = (v) => {
        const n = Number(v)
        return Number.isFinite(n) ? n : 13
      }
      const sorters = {
        relevance: () => 0,
        title: (a,b) => a.title.localeCompare(b.title, 'zh-Hans-CN'),
        month: (a,b) => monthOrder(a.month) - monthOrder(b.month),
        season: (a,b) => seasons.indexOf(a.season) - seasons.indexOf(b.season)
      }
      return [...list].sort(sorters[sortBy.value] || sorters.relevance)
    })

    const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))
    const paged = computed(() => {
      const start = (page.value - 1) * pageSize
      return filtered.value.slice(start, start + pageSize)
    })

    const goDetail = (id) => router.push({ name: 'customs-detail', params: { id } })

    watch([q, () => filters.month, () => filters.season, sortBy], () => { page.value = 1 })

    const formatDateRule = (s) => s

    onMounted(load)

    return {
      q, filters, sortBy,
      months, seasons,
      page, totalPages, paged,
      loading,
      goDetail,
      formatDateRule
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