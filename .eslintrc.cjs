module.exports = {
  // 防止向上层查询配置文件
  root: true,
  // 定义规则运行环境
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  // 定义继承的配置文件
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  overrides: [],
  // vue 组件必须使用这个,具体参考vue官方文档
  // https://eslint.vuejs.org/user-guide/
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // 关闭vue组件的名称检测
    'vue/multi-word-component-names': 'off',
    // 关闭未定义报错,typescript自带检测
    'no-undef': 'off',
    // 关闭非空断言符!使用报错
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
}
