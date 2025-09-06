import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: () => import(/* webpackChunkName: 'about' */ '../views/AboutView.vue') },
  { path: '/culture', name: 'culture', component: () => import(/* webpackChunkName: 'culture' */ '../views/CultureView.vue') },
  { path: '/customs', name: 'customs-list', component: () => import(/* webpackChunkName: 'customs' */ '../views/CustomsListView.vue') },
  { path: '/customs/:id', name: 'customs-detail', component: () => import(/* webpackChunkName: 'customs-detail' */ '../views/CustomsDetailView.vue') },
  { path: '/heritage', name: 'heritage-list', component: () => import(/* webpackChunkName: 'heritage' */ '../views/HeritageListView.vue') },
  { path: '/heritage/:id', name: 'heritage-detail', component: () => import(/* webpackChunkName: 'heritage-detail' */ '../views/HeritageDetailView.vue') },
  { path: '/media', name: 'media-list', component: () => import(/* webpackChunkName: 'media' */ '../views/MediaListView.vue') },
  { path: '/media/:id', name: 'media-detail', component: () => import(/* webpackChunkName: 'media-detail' */ '../views/MediaDetailView.vue') },
  { path: '/map', name: 'map', component: () => import(/* webpackChunkName: 'map' */ '../views/MapView.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})

export default router
