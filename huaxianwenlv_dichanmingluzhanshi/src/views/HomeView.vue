<template>
  <div class="home-page">
    <!-- Hero Section: Featured + Right List -->
    <section class="container hero">
      <div class="grid">
        <!-- Featured article -->
        <article class="featured" v-if="featured">
          <a class="image-wrap" href="#" @click.prevent>
            <img :src="featured.image" :alt="featured.title" />
          </a>
          <h2 class="title">{{ featured.title }}</h2>
          <p class="excerpt">{{ featured.excerpt }}</p>
          <div class="meta">
            <div class="author">
              <div class="avatar" aria-hidden="true">👩‍🌾</div>
              <span>{{ featured.author }}</span>
            </div>
            <time class="date" :datetime="featured.dateISO">{{ featured.date }}</time>
          </div>
        </article>

        <!-- Right list -->
        <div class="top-list">
          <article class="list-item" v-for="a in topArticles" :key="a.id">
            <a class="thumb" href="#" @click.prevent>
              <img :src="a.image" :alt="a.title" />
            </a>
            <div class="info">
              <h3 class="item-title">{{ a.title }}</h3>
              <p class="item-excerpt">{{ a.excerpt }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Latest News Section -->
    <section class="container latest">
      <h2 class="section-title">Latest news</h2>
      <div class="card-panel">
        <article class="news-card" v-for="n in latestNews" :key="n.id">
          <a class="news-thumb" href="#" @click.prevent>
            <img :src="n.image" :alt="n.title" />
          </a>
          <h3 class="news-title">{{ n.title }}</h3>
          <p class="news-excerpt">{{ n.excerpt }}</p>
          <div class="news-meta">
            <div class="author">
              <div class="avatar" aria-hidden="true">👨‍🌾</div>
              <span>{{ n.author }}</span>
            </div>
            <time class="date" :datetime="n.dateISO">{{ n.date }}</time>
          </div>
        </article>
      </div>
    </section>

    <!-- They trust us Section -->
    <section class="container trust">
      <div class="grid">
        <div class="intro">
          <h2 class="section-title left">They trust us</h2>
          <p class="sub">We are proud to have worked with some of the best companies in the world.</p>
          <a href="#" class="btn" @click.prevent>Our Customer Stories <span aria-hidden="true">→</span></a>
        </div>
        <div class="trust-list">
          <article class="trust-item" v-for="a in topArticles" :key="'trust-'+a.id">
            <a class="thumb" href="#" @click.prevent>
              <img :src="a.image" :alt="a.title" />
            </a>
            <div class="info">
              <h3 class="item-title">{{ a.title }}</h3>
              <p class="item-excerpt">{{ a.excerpt }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Never seen before Section -->
    <section class="container behind">
      <div class="grid">
        <div class="intro">
          <h2 class="section-title left">Never seen before</h2>
          <p class="sub">Discover how we build our products and the technologies we use.</p>
          <a href="#" class="btn" @click.prevent>Behind the Scenes <span aria-hidden="true">→</span></a>
        </div>
        <div class="behind-content" v-if="behindFeatured">
          <article class="behind-featured">
            <a class="news-thumb" href="#" @click.prevent>
              <img :src="behindFeatured.image" :alt="behindFeatured.title" />
            </a>
            <h3 class="news-title">{{ behindFeatured.title }}</h3>
            <p class="news-excerpt">{{ behindFeatured.excerpt }}</p>
            <div class="news-meta">
              <div class="author">
                <div class="avatar" aria-hidden="true">👨‍🔧</div>
                <span>{{ behindFeatured.author }}</span>
              </div>
              <time class="date" :datetime="behindFeatured.dateISO">{{ behindFeatured.date }}</time>
            </div>
          </article>
          <div class="behind-grid">
            <article class="behind-card" v-for="m in behindMore" :key="'behind-'+m.id">
              <a class="news-thumb" href="#" @click.prevent>
                <img :src="m.image" :alt="m.title" />
              </a>
              <h3 class="news-title">{{ m.title }}</h3>
              <div class="news-meta">
                <div class="author">
                  <div class="avatar" aria-hidden="true">👨‍🔧</div>
                  <span>{{ m.author }}</span>
                </div>
                <time class="date" :datetime="m.dateISO">{{ m.date }}</time>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    const articles = [
      {
        id: 'a1',
        title: "Our Customers' Table: Stories of Meals Made with Our Produce",
        excerpt: 'A heartwarming collection of testimonials on how fresh produce enhanced family meals and events.',
        image: '/img/hero-veg.svg',
        author: 'Esteban Soubiran',
        date: 'February 13, 2024',
        dateISO: '2024-02-13'
      },
      {
        id: 'a2',
        title: 'Water Conservation Techniques That Revolutionized Our Farm',
        excerpt: 'Innovations that save water and positively impact the local ecosystem.',
        image: '/img/thumb-1.svg',
        author: 'Esteban Soubiran',
        date: 'March 01, 2024',
        dateISO: '2024-03-01'
      },
      {
        id: 'a3',
        title: 'From Waste to Wealth: Our Composting Success Story',
        excerpt: 'How farm waste became a valuable resource for enriching soil, promoting a circular economy.',
        image: '/img/thumb-1.svg',
        author: 'Esteban Soubiran',
        date: 'March 10, 2024',
        dateISO: '2024-03-10'
      },
      {
        id: 'a4',
        title: 'The Green Revolution: Minimizing Our Carbon Footprint',
        excerpt: 'Initiatives to reduce emissions and successful outcomes of these efforts.',
        image: '/img/thumb-1.svg',
        author: 'Esteban Soubiran',
        date: 'February 27, 2024',
        dateISO: '2024-02-27'
      },
      {
        id: 'n1',
        title: "Our Journey to Zero Waste: The Farm's Sustainability Milestone",
        excerpt: 'Path towards zero waste: recycling initiatives, packaging changes, and reducing plastic use.',
        image: '/img/thumb-1.svg',
        author: 'Esteban Soubiran',
        date: 'April 9, 2024',
        dateISO: '2024-04-09'
      },
      {
        id: 'n2',
        title: 'The Organic Chronicles: Transitioning to Chemical-Free Farming',
        excerpt: 'The shift to organic practices, challenges faced, and benefits for health and environment.',
        image: '/img/thumb-1.svg',
        author: 'Esteban Soubiran',
        date: 'March 26, 2024',
        dateISO: '2024-03-26'
      },
      {
        id: 'n3',
        title: 'Cover Crops: The Unsung Heroes of Soil Health',
        excerpt: 'The role of cover crops in conservation and sustainable farm management.',
        image: '/img/thumb-1.svg',
        author: 'Esteban Soubiran',
        date: 'March 12, 2024',
        dateISO: '2024-03-12'
      },
      {
        id: 'n4',
        title: 'The Pollinator Project: Boosting Biodiversity on the Farm',
        excerpt: 'Creating habitats for bees and other pollinators and the benefits of these actions.',
        image: '/img/thumb-1.svg',
        author: 'Esteban Soubiran',
        date: 'February 27, 2024',
        dateISO: '2024-02-27'
      }
    ]

    return { articles }
  },
  computed: {
    featured() { return this.articles[0] || null },
    topArticles() { return this.articles.slice(1, 4) },
    latestNews() { return this.articles.slice(4, 8) },
    // New helpers for lower sections
    behindFeatured() { return this.latestNews[0] || null },
    behindMore() { return this.latestNews.slice(1, 3) }
  }
}
</script>

<style scoped>
.home-page { background: #fafafa; }
.container { max-width: 1100px; margin: 0 auto; padding: 28px 20px; }

/* Hero layout */
.hero .grid { display: grid; grid-template-columns: 1fr; gap: 28px; }
@media (min-width: 980px) { .hero .grid { grid-template-columns: minmax(0, 1fr) 380px; } }

.featured { background: #fff; border-radius: 14px; padding: 16px; box-shadow: 0 1px 0 rgba(16,24,40,.04), 0 1px 3px rgba(16,24,40,.08); }
.featured .image-wrap { display: block; border-radius: 12px; overflow: hidden; }
.featured .image-wrap img { display: block; width: 100%; height: 320px; object-fit: cover; }
.featured .title { margin: 16px 0 8px; font-size: 28px; line-height: 1.25; font-weight: 800; color: #1f2937; }
.featured .excerpt { color: #6b7280; font-size: 15px; }
.featured .meta { display: flex; align-items: center; justify-content: space-between; margin-top: 14px; }
.author { display: inline-flex; align-items: center; gap: 8px; color: #374151; font-weight: 600; }
.avatar { width: 28px; height: 28px; border-radius: 50%; display: grid; place-items: center; background: #f3f4f6; font-size: 16px; }
.date { color: #9ca3af; font-size: 14px; }

/* Right list */
.top-list { display: grid; gap: 16px; }
.list-item { display: grid; grid-template-columns: 140px 1fr; gap: 14px; align-items: start; background: #fff; border-radius: 14px; padding: 12px; box-shadow: 0 1px 0 rgba(16,24,40,.04), 0 1px 3px rgba(16,24,40,.08); }
.list-item .thumb { display: block; border-radius: 10px; overflow: hidden; }
.list-item img { width: 100%; height: 92px; object-fit: cover; display: block; }
.item-title { font-size: 16px; line-height: 1.35; font-weight: 800; color: #1f2937; margin: 2px 0 6px; }
.item-excerpt { color: #6b7280; font-size: 14px; }

/* Latest news */
.latest .section-title { text-align: center; font-weight: 800; font-size: 28px; margin: 10px 0 18px; color: #111827; }
.card-panel { background: #fff; border-radius: 16px; padding: 18px; box-shadow: 0 1px 0 rgba(16,24,40,.04), 0 1px 4px rgba(16,24,40,.10); display: grid; grid-template-columns: 1fr; gap: 18px; }
@media (min-width: 800px) { .card-panel { grid-template-columns: repeat(4, 1fr); } }
.news-card { border-radius: 12px; padding: 8px; transition: transform .12s ease, box-shadow .12s ease; }
.news-card:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(0,0,0,.08); }
.news-thumb { display: block; border-radius: 10px; overflow: hidden; }
.news-thumb img { width: 100%; height: 130px; object-fit: cover; display: block; }
.news-title { font-size: 16px; line-height: 1.35; font-weight: 800; color: #1f2937; margin: 10px 0 6px; }
.news-excerpt { color: #6b7280; font-size: 14px; }
.news-meta { display: flex; align-items: center; justify-content: space-between; margin-top: 10px; }

/* They trust us */
.trust .grid { display: grid; grid-template-columns: 1fr; gap: 28px; align-items: start; }
@media (min-width: 980px) { .trust .grid { grid-template-columns: 1fr 1fr; } }
.section-title.left { text-align: left; font-weight: 800; font-size: 28px; margin: 10px 0 12px; color: #111827; }
.trust .intro .sub { color: #6b7280; margin-bottom: 14px; }
.btn { display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; border: 1px solid #e5e7eb; border-radius: 999px; font-weight: 600; color: #374151; background: #fff; box-shadow: 0 1px 0 rgba(16,24,40,.04); }
.btn:hover { background: #f9fafb; }
.trust-list { display: grid; gap: 16px; }
.trust-item { display: grid; grid-template-columns: 140px 1fr; gap: 14px; align-items: start; background: #fff; border-radius: 14px; padding: 12px; box-shadow: 0 1px 0 rgba(16,24,40,.04), 0 1px 3px rgba(16,24,40,.08); }
.trust-item .thumb { display: block; border-radius: 10px; overflow: hidden; }
.trust-item img { width: 100%; height: 92px; object-fit: cover; display: block; }

/* Never seen before */
.behind .grid { display: grid; grid-template-columns: 1fr; gap: 28px; align-items: start; }
@media (min-width: 980px) { .behind .grid { grid-template-columns: 1fr 1fr; } }
.behind-content { display: grid; grid-template-rows: auto auto; gap: 18px; }
.behind-featured { background: #fff; border-radius: 14px; padding: 12px; box-shadow: 0 1px 0 rgba(16,24,40,.04), 0 1px 3px rgba(16,24,40,.08); }
.behind-featured .news-thumb img { height: 220px; }
.behind-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
@media (min-width: 700px) { .behind-grid { grid-template-columns: 1fr 1fr; } }
.behind-card { background: #fff; border-radius: 14px; padding: 12px; box-shadow: 0 1px 0 rgba(16,24,40,.04), 0 1px 3px rgba(16,24,40,.08); }
.behind-card .news-thumb img { height: 160px; }

/* Utilities */
a { color: inherit; text-decoration: none; }
a:hover { opacity: .95; }
</style>
