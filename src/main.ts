import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
// 静态资源导入
import './styles/index.css'

async function setupApp() {
  const app = createApp(App)
  await setupRouter(app)
  app.mount('#app')
}

// 异步挂载vue实例
setupApp()
