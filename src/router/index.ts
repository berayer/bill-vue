import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './routes'
import { createRouterGuard } from './guard'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

/** 安装vue-router */
export async function setupRouter(app: App) {
  app.use(router)
  createRouterGuard(router)
  await router.isReady()
}
