import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
// 静态资源导入
import './styles/index.css'
import '@/fonts/SimSun-normal.js'
import '@/fonts/SimSun-bold.js'

async function setupApp() {
  const app = createApp(App)
  await setupRouter(app)
  app.mount('#app')
}

// 异步挂载vue实例
setupApp()
