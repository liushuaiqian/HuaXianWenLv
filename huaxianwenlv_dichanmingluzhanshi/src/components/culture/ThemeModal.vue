<template>
  <div v-if="open" class="theme-modal-overlay" @click.self="close">
    <div class="theme-modal">
      <header class="modal-header">
        <h2 class="modal-title">{{ theme.name }}</h2>
        <button class="close-btn" @click="close" aria-label="关闭">×</button>
      </header>
      
      <div class="modal-content">
        <!-- 图片展示模式 -->
        <div v-if="theme.type === 'gallery'" class="gallery-mode">
          <div class="gallery-description">
            <p>{{ theme.description }}</p>
          </div>
          <MasonryGallery
            v-if="theme.images && theme.images.length"
            :items="theme.images"
            :column-base="3"
            @open="openLightbox"
          />
          <div v-else class="empty-gallery">
            <p>暂无图片内容</p>
          </div>
        </div>
        
        <!-- 文章展示模式 -->
        <div v-else-if="theme.type === 'article'" class="article-mode">
          <div class="article-meta" v-if="theme.author || theme.date">
            <span v-if="theme.author" class="author">作者：{{ theme.author }}</span>
            <span v-if="theme.date" class="date">{{ theme.date }}</span>
          </div>
          <div class="article-content" v-html="theme.content"></div>
        </div>
        
        <!-- 默认模式 -->
        <div v-else class="default-mode">
          <p>{{ theme.summary }}</p>
          <div v-if="theme.details" class="theme-details">
            <div v-for="(detail, idx) in theme.details" :key="idx" class="detail-item">
              <h4>{{ detail.title }}</h4>
              <p>{{ detail.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 灯箱组件用于图片模式 -->
    <MediaLightbox
      v-if="theme.type === 'gallery' && theme.images"
      :items="theme.images"
      :index="lightboxIndex"
      :open="lightboxOpen"
      @update:open="v => (lightboxOpen = v)"
      @update:index="v => (lightboxIndex = v)"
    />
  </div>
</template>

<script>
import MasonryGallery from '@/components/media/MasonryGallery.vue'
import MediaLightbox from '@/components/media/Lightbox.vue'

export default {
  name: 'ThemeModal',
  components: {
    MasonryGallery,
    MediaLightbox
  },
  props: {
    theme: {
      type: Object,
      default: () => ({})
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:open'],
  data() {
    return {
      lightboxOpen: false,
      lightboxIndex: 0
    }
  },
  mounted() {
    window.addEventListener('keydown', this.onKeydown)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKeydown)
  },
  methods: {
    close() {
      this.$emit('update:open', false)
    },
    openLightbox(index) {
      this.lightboxIndex = index
      this.lightboxOpen = true
    },
    onKeydown(e) {
      if (this.open && e.key === 'Escape') {
        this.close()
      }
    }
  }
}
</script>

<style scoped>
.theme-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.theme-modal {
  background: #fff;
  border-radius: 16px;
  max-width: 90vw;
  max-height: 90vh;
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: #374151;
}

.modal-content {
  flex: 1;
  overflow-y: auto;
  padding: 32px;
}

/* 图片展示模式 */
.gallery-mode .gallery-description {
  margin-bottom: 24px;
  padding: 16px;
  background: #f3f4f6;
  border-radius: 8px;
}

.gallery-mode .gallery-description p {
  margin: 0;
  color: #374151;
  line-height: 1.6;
}

.empty-gallery {
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
}

/* 文章展示模式 */
.article-mode .article-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.article-meta .author,
.article-meta .date {
  color: #6b7280;
  font-size: 14px;
}

.article-content {
  line-height: 1.8;
  color: #374151;
}

.article-content h1,
.article-content h2,
.article-content h3,
.article-content h4 {
  color: #111827;
  margin: 24px 0 16px;
}

.article-content h1 {
  font-size: 28px;
}

.article-content h2 {
  font-size: 24px;
}

.article-content h3 {
  font-size: 20px;
}

.article-content h4 {
  font-size: 18px;
}

.article-content p {
  margin: 16px 0;
}

.article-content img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 16px 0;
}

/* 图片画廊样式 */
.article-content .image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin: 24px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.article-content .image-gallery img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 0;
}

.article-content .image-gallery img:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .article-content .image-gallery {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
    padding: 16px;
  }
  
  .article-content .image-gallery img {
    height: 120px;
  }
}

/* 默认模式 */
.default-mode p {
  color: #374151;
  line-height: 1.6;
  margin-bottom: 24px;
}

.theme-details {
  display: grid;
  gap: 20px;
}

.detail-item {
  padding: 20px;
  background: #f9fafb;
  border-radius: 12px;
  border-left: 4px solid #10b981;
}

.detail-item h4 {
  margin: 0 0 12px;
  color: #111827;
  font-size: 18px;
  font-weight: 600;
}

.detail-item p {
  margin: 0;
  color: #6b7280;
  line-height: 1.6;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .theme-modal {
    max-width: 95vw;
    max-height: 95vh;
  }
  
  .modal-header {
    padding: 20px 24px;
  }
  
  .modal-title {
    font-size: 20px;
  }
  
  .modal-content {
    padding: 24px;
  }
  
  .article-meta {
    flex-direction: column;
    gap: 8px;
  }
}
</style>