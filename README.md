# llm-system

## 框架

| 框架                                                                 | 说明                  | 版本   |
| -------------------------------------------------------------------- | --------------------- | ------ |
| [Vue](https://staging-cn.vuejs.org/)                                 | Vue 框架              | 3.3.7  |
| [Vite](https://cn.vitejs.dev//)                                      | 开发与构建工具        | 4.5.0  |
| [ant-design-vue](https://antdv.com/)                                 | ant-design-vue        | 4.0.6  |
| [TypeScript](https://www.typescriptlang.org/docs/)                   | JavaScript 的超集     | 5.1.6  |
| [pinia](https://pinia.vuejs.org/)                                    | Vue 存储库 替代 vuex5 | 2.1.7  |
| [vueuse](https://vueuse.org/)                                        | 常用工具集            | 10.5.0 |
| [vue-i18n](https://kazupon.github.io/vue-i18n/zh/introduction.html/) | 国际化                | 9.5.0  |
| [vue-router](https://router.vuejs.org/)                              | Vue 路由              | 4.2.5  |
| [unocss](https://uno.antfu.me/)                                      | 原子 css              | 0.57.1 |
| [iconify](https://icon-sets.iconify.design/)                         | 在线图标库            | 3.1.1  |

- 安装依赖

```bash
pnpm i

如提示 Expected version: >=8.9.0

使用 cmd 等升级 pnpm 版本
npm add -g pnpm

```

- 运行

```bash
pnpm dev

```

- 打包

```bash
pnpm build
```

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

## 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE

| ![alt IE](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png) | ![alt Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png) | ![alt Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png) | ![alt Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png) | ![alt Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png) |
| :---------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: |
|                     [IE](http://godban.github.io/browsers-support-badges/)                      |                     [Edge](http://godban.github.io/browsers-support-badgess/)                     |                        [Firefox](http://godban.github.io/browsers-support-badges/)                         |                       [Chrome](http://godban.github.io/browsers-support-badges/)                        |                       [Safari](http://godban.github.io/browsers-support-badges/)                        |
|                                           not support                                           |                                          last 2 versions                                          |                                              last 2 versions                                               |                                             last 2 versions                                             |                                             last 2 versions                                             |
