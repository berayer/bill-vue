import { defineConfig, loadEnv } from 'vite'
import { setupVitePlugins, getSrcPath } from './build'

export default defineConfig(({ mode }) => {
  // 获取vite 环境变量
  const viteEnv = loadEnv(mode, process.cwd()) as unknown as ImportMetaEnv

  return {
    // 安装插件
    plugins: setupVitePlugins(viteEnv),
    // 测试服务配置
    server: {
      host: '0.0.0.0',
      port: Number(viteEnv.VITE_PORT),
      // 后台代理配置
      proxy: {
        '/v2': {
          target: viteEnv.VITE_PROXY_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/v2/, '')
        }
      }
    },
    resolve: {
      // 路径别名配置
      alias: {
        '@': getSrcPath()
      }
    }
  }
})
