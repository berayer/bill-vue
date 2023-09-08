import type { RouteRecordRaw } from 'vue-router'

/**
 * 静态路由菜单
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/Test.vue')
  }
  // {
  //   path: '/:path(.*)*',
  //   name: 'NotFound',
  //   redirect: (to) => {
  //     return {
  //       name: 'HomeLayout',
  //       /** @url https://github.com/vuejs/router/issues/1617 解决警告报错 */
  //       params: {},
  //       query: { url: to.path, query: JSON.stringify(to.query) }
  //     }
  //   }
  // }
]
