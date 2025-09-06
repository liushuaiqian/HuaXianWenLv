<template>
  <header :class="['header', isDark ? 'dark' : '']">
    <nav class="nav">
      <router-link to="/" class="brand">文旅展示</router-link>
      <div class="links">
        <router-link to="/culture">大运河文化概况</router-link>
        <router-link to="/customs">风俗节庆</router-link>
        <router-link to="/heritage">非遗名录</router-link>
        <router-link to="/media">图文与视频</router-link>
        <router-link to="/map">地图与路线</router-link>
        <router-link to="/about">关于</router-link>
      </div>
    </nav>
  </header>
  <main class="main"><router-view/></main>
  <footer class="footer">© 2025 文旅展示</footer>
</template>

<script>
export default {
  name: 'AppRoot',
  data() { return { isDark: false } },
  watch: {
    // 当进入 /media 时自动切换为暗色顶栏，以贴合外部项目风格
    $route: {
      immediate: true,
      handler(route) { this.isDark = route.path.startsWith('/media') }
    }
  }
}
</script>

<style>
#app { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; color: #2c3e50; }
.header { position: sticky; top: 0; z-index: 10; background: #fff; }
.header.dark { background: #0b0e12; border-bottom: 1px solid rgba(255,255,255,.08); }
.nav { display: flex; align-items: center; justify-content: space-between; padding: 12px 24px; border-bottom: 1px solid #eee; }
.header.dark .nav { border-bottom-color: rgba(255,255,255,.08); }
.nav .brand { font-weight: 700; color: inherit; margin-right: 16px; }
.nav .links a { margin: 0 8px; color: inherit; font-weight: 600; opacity: .9; }
.nav a.router-link-exact-active { color: #42b983; }
.main { padding: 0; min-height: calc(100vh - 120px); }
.footer { text-align: center; color: #9aa1a6; padding: 16px; border-top: 1px solid #eee; }
</style>
