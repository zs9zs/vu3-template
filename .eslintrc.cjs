module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended' // 添加 prettier 插件
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'vue'],
  rules: {
    // 关闭名称校验 'vue/multi-word-component-names': 'off', 全部都关闭
    // 添加组件命名忽略规则
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['home', 'demo', 'login', 'layout'] //在这个数组中加入需要忽略的组件名
      }
    ],
    'no-unused-vars': 'off'
  }
}
