import type { Router } from 'vue-router'

/**
 * 路由守卫函数
 * @param router - 路由实例
 */
export function createRouterGuard(router: Router) {
  router.beforeEach(async (_to, _from, next) => {
    if (!window.isLoading) {
      // 加载启动动画
      window.isLoading = true
    }
    // 开始 loadingBar
    window.$loadingBar?.start()
    // 放行
    next()
  })
  router.afterEach(() => {
    // 结束 loadingBar
    window.$loadingBar?.finish()
  })
}
