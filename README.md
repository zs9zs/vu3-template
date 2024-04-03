# Vue 3 + TypeScript + Vite

# 安装

1. 安装支持Vue3的路由工具 vue-router@4
   npm i vue-router@4
2. 安装支持Vue3的状态管理工具 vuex@next
   npm i vuex@next
3. 安装支持 Vue3 的 UI 框架 Element Plus
   npm i element-plus
4. 集成 HTTP 工具 Axios
   npm i axios
5. 集成 CSS 预编译器 Stylus/Sass/Less
   npm i stylus -D
   npm i sass -D
   npm i less -D

# typeScript + Vite + Vue3 + Vue Router + Vuex + Element Plus + Axios + Stylus/Sass/Less

代码规范约束、提交规范约束、单元测试、自动部署

# EditorConfig + Prettier + ESLint 代码规范化

解决团队之间代码不规范导致的可读性差和可维护性差的问题
解决团队成员不同编辑器导致的编码规范不统一问题
提前发现代码风格问题，给出对应规范提示，及时修复
减少代码审查过程中反反复复的修改过程，节约时间
自动格式化，统一编码风格，从此和脏乱差的代码说再见

1. vscode 下载插件 EditorConfig for VS Code
   根目录下增加 .editorconfig 文件
   官网：http://editorconfig.org
2. 集成Prettier配置
   npm i prettier -D
   根目录下创建 .prettierrc 文件
   官网：https://prettier.io/docs/en/options.html
   配置好后 执行 npx prettier --write . 格式化所有文件 （注：后面的点也要带上）
   VSCode 编辑器使用 Prettier 配置需要下载插件 Prettier - Code formatter
3. 集成ESLint
   npm i eslint -D
   配置好后 执行 npx eslint --init
   执行后 选择功能
   1、How would you like to use ESLint? （你想如何使用 ESLint?）
   To check syntax, find problems, and enforce code style(检查语法、发现问题并强制执行代码风格)
   2、What type of modules does your project use?（你的项目使用哪种类型的模块?）
   JavaScript modules (import/export)
   3、Which framework does your project use? （你的项目使用哪种框架?）
   vue.js
   4、Does your project use TypeScript?（你的项目是否使用 TypeScript？）
   yes
   5、Where does your code run?（你的代码在哪里运行?）
   我们这里选择 Browser 和 Node（按空格键进行选择，选完按回车键确定）
   6、How would you like to define a style for your project?（你想怎样为你的项目定义风格？）
   Use a popular style guide（使用一种流行的风格指南）
   7、Which style guide do you want to follow?（你想遵循哪一种风格指南?）
   Standard是开源社区的编码规范，它最大的特点是不用在语句的末尾添加分号
   8、What format do you want your config file to be in?（你希望你的配置文件是什么格式?）
   JavaScript
   9、Would you like to install them now with npm?（你想现在就用 NPM 安装它们吗?
   yes
   注意：如果自动安装依赖失败，那么需要手动安装
   npm i @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-base eslint-plugin-import eslint-plugin-vue -D
4. 解决 Prettier 和 ESLint 冲突
    eslint-plugin-prettier 将 Prettier 的规则设置到 ESLint 的规则中
    eslint-config-prettier 关闭 ESLint 中与 Prettier 中会发生冲突的规则
    最后形成优先级：Prettier 配置规则 > ESLint 配置规则
    npm i eslint-plugin-prettier eslint-config-prettier -D

# 集成 husky 和 lint-staged
  让没通过 ESLint 检测和修复的代码禁止提交，从而保证仓库代码都是符合规范的
1. husky
  Git Hook 工具，可以设置在 git 各个阶段（pre-commit、commit-msg、pre-push 等）触发我们的命令
  使用 husky-init 命令快速在项目初始化一个 husky 配置（自动配置）
  npx husky-init && npm install
  要做到只用 ESLint 修复自己此次写的代码，而不去影响其他的代码。还需借助 lint-staged 
2. lint-staged
  在 git 暂存的文件上运行 linters
  让 husky 的 hook 触发的命令只作用于 git add那些文件（即 git 暂存区的文件），而不会影响到其他文件
  npm i lint-staged -D
  package.json文件中增加配置项lint-staged: { "*.{vue,js,ts}": "eslint --fix"} 
    (当我们执行 git commit -m "xxx" 时，会先对 src 目录下所有的 .vue、.js、.ts 文件执行 eslint --fix 命令，如果 ESLint 通过，成功 commit，否则终止 commit)
  修改 .husky/pre-commit hook 的触发命令为：npx lint-staged

# 集成单元测试
  使用 Vue 官方提供的 vue-test-utils 和社区流行的测试工具 jest 来进行 Vue 组件的单元测试

# 项目功能

1、动态布局

## 适配各种屏幕的基础容器组件

1. 自动监听浏览器窗口变化，动态计算出高宽比，无视页面放大缩小
2. 适用于各种屏幕，常用作项目最外层基础容器
3. 突破浏览器中font-size最小12px限制

## 安装

npm i vue-router --s
npm i element-plus --s
npm i @vueuse/core
npm i eslint -D
npm i prettier -D
npm i -D unplugin-icons // svg图标库
https://www.tailwindcss.cn/
https://windicss.org/

## 文件夹

toolsdog
├─.vscode # vscode配置文件
| └─extensions.json # 项目推荐插件列表（可把项目中用到的vscode插件ID写进去，跑项目时没有安装这些插件会推荐安装）
├─public/ # 公共资源目录
├─src/ # 核心开发目录
| ├─App.vue # 项目根组件
| ├─main.js # 项目入口文件
| ├─views/ # 项目视图目录
| | └─Home/index.vue
| ├─stores/ # 统一状态管理目录-pinia
| ├─router/ # 项目路由目录
| | └─index.js
| ├─components/ # 项目公共组件目录
| ├─assets/ # 项目静态资源目录
├─.eslintrc.cjs # eslint 配置文件
├─.gitignore # git忽略文件
├─.prettierrc.json # prettier 配置文件
├─README.md # 项目说明文件
├─index.html # html入口文件
├─package.json # 项目配置和包管理文件
├─vite.config.js # vite 配置文件

---

├── publish/
└── src/
├── assets/ // 静态资源目录
├── common/ // 通用类库目录
├── components/ // 公共组件目录
├── router/ // 路由配置目录
├── stores/ // 状态管理目录
├── style/ // 通用 CSS 目录
├── utils/ // 工具函数目录
├── views/ // 页面组件目录
├── App.vue
├── main.ts
├── shims-vue.d.ts
├── tests/ // 单元测试目录
├── index.html
├── tsconfig.json // TypeScript 配置文件
├── vite.config.ts // Vite 配置文件
└── package.json

## 文档

pinia https://pinia.web3doc.top/introduction.html
acoDesign https://arco.design/vue/docs/start

## 其他


## vite.config

1、位于根目录下，项目启动时会自动获取
配置：如 设置@指向src目录、服务端启动端口、打包路径、代理等
vite官网：https://vitejs.dev/config/

# 报错记录 及 解决

1. 无法找到模块“vuex”的声明文件
   问题：npm 下载vuex后，import { createStore } from "vuex" 引入vuex 报错
   解决：tsconfig.json文件中，添加如下配置
   {
    "compilerOptions": {
      "paths": {
        "vuex": ["./node_modules/vuex/types"]
      }
    }
   }
   使用 “paths” 映射,在找不到模块的默认路径时,将其映射到类型定义文件

2. 找不到模块“vue-router”或其相应的类型声明。
  问题：import { RouterView } from "vue-router"; 提示”找不到模块“vue-router”或其相应的类型声明。“
  解决：和ts有关系，在vite-env.d.ts 加 declare module "vue-router"

3. vue eslint 报错 error “Component name “*****“ should always be multi-word”
  解决：.eslintrc.cjs 配置 vue/multi-word-component-names
