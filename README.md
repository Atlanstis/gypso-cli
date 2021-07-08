# gypso-cli

## 安装

```shell
$ npm i gypso-cli -g
```

## 使用

### 创建工程

```shell
$ gypso create <projectName> 
// or
$ gypso-ci create <projectName> 
```

## 链接到 github

```shell
$ gypso link <gitUrl>
// or
$ gypso-ci link <gitUrl>
```

## 依赖

- [commander](https://www.npmjs.com/package/commander)：命令行工具
- [download-git-repo](https://www.npmjs.com/package/download-git-repo)：下载远程模板
- [inquirer](https://www.npmjs.com/package/inquirer)：交互式命令行工具
- [log-symbols](https://www.npmjs.com/package/log-symbols)：显示出 √ 或 × 等的图标（采用4.1版本）
- [chalk](https://www.npmjs.com/package/chalk)：修改控制台输出内容样式
- [ora](https://www.npmjs.com/package/ora)：显示 loading 动画
- [fs-extra](https://www.npmjs.com/package/fs-extra)：系统fs模块的扩展，提供了更多便利的 API，并继承了fs模块的 API

## 参考

[【中高级前端必备】手摸手教你撸一个脚手架](https://juejin.cn/post/6844903896163303438#heading-10)

[《大前端进阶 Node.js》系列 P6 必备脚手架/CI 构建能力（上）](https://juejin.cn/post/6844904101893898248)

[《大前端进阶 Node.js》系列 P6 必备脚手架/CI 构建能力（下）](https://juejin.cn/post/6844904111263973384)

https://www.jianshu.com/p/95bca88285e6

https://github.com/codexu/x-build

[从 0 构建自己的脚手架/CLI 知识体系（万字） 🛠](https://juejin.cn/post/6966119324478079007)
