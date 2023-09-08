import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'

export default function unplugin() {
  return [
    // api自动导入
    AutoImport({
      imports: ['vue'],
      dts: 'src/types/auto-imports.d.ts',
      // 解决eslintrc报错
      eslintrc: {
        enabled: true
      }
    }),
    // 组件自动导入
    Components({
      resolvers: [NaiveUiResolver()],
      dts: 'src/types/components.d.ts'
    }),
    // 图标插件
    Icons({
      autoInstall: true,
      compiler: 'vue3'
    })
  ]
}
