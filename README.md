<h1 align="center">Miniprogram SVG Icons</h1>

<p align="center">
  <strong>🎨 小程序多色 SVG 图标解决方案</strong>
</p>

<p align="center">
  支持 微信 · QQ · 支付宝 · 快手 · 抖音 · 百度 · 小红书 · 京东 等 8 大小程序平台
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@mp-svg-icons/wechat">
    <img src="https://img.shields.io/npm/v/@mp-svg-icons/wechat?color=blue&label=npm" alt="npm version">
  </a>
  <a href="https://github.com/anlyyao/miniprogram-svg-icons/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D20-brightgreen" alt="Node.js">
  <img src="https://img.shields.io/badge/platforms-8-orange" alt="Platforms">
  <img src="https://img.shields.io/badge/icons-2347+-purple" alt="Icons">
</p>

<p align="center">
  <a href="./README.md">简体中文</a> | <a href="./README_EN.md">English</a>
</p>

## ✨ 特性

- 🎨 **完整色彩支持** — 单色、双色、多色图标完美渲染
- 🔄 **运行时颜色控制** — 通过属性动态修改 `fill` / `stroke` 颜色
- 📦 **零依赖运行** — Data URI 方案，无需额外资源加载
- 🌐 **8 大平台适配** — 微信 / QQ / 支付宝 / 快手 / 抖音 / 百度 / 小红书 / 京东
- 🏷️ **多品牌支持** — 支持多品牌图标源（如 TDesign），易扩展
- ✂️ **按需裁剪** — 内置 CLI 工具，移除未使用图标，体积减少 **99%+**

## 📦 支持的平台

| 包名                        | 平台         | 备注             |
| --------------------------- | ------------ | ---------------- |
| `@mp-svg-icons/wechat`      | 微信小程序   | 基准平台         |
| `@mp-svg-icons/alipay`      | 支付宝小程序 | 独立 API 风格    |
| `@mp-svg-icons/kuaishou`    | 快手小程序   |                  |
| `@mp-svg-icons/douyin`      | 抖音小程序   | 需额外处理双引号 |
| `@mp-svg-icons/baidu`       | 百度小程序   | 需额外处理双引号 |
| `@mp-svg-icons/xiaohongshu` | 小红书小程序 |                  |
| `@mp-svg-icons/jd`          | 京东小程序   |                  |
| `@mp-svg-icons/utils`       | 工具集       | 图标裁剪 CLI     |

> 💡 QQ 小程序可直接使用微信小程序版本。

## 🚀 快速开始

### 安装

```bash
# 微信小程序
npm install @mp-svg-icons/wechat

# 支付宝小程序
npm install @mp-svg-icons/alipay

# 其他平台类似...
```

### 注册组件

在页面或组件的 `*.json` 文件中注册：

```json
{
  "usingComponents": {
    "t-icon": "@mp-svg-icons/wechat/icon"
  }
}
```

### 使用图标

```xml
<!-- 基础用法 -->
<t-icon name="add" size="{{48}}" />

<!-- 自定义颜色 -->
<t-icon name="close" size="{{32}}" stroke-color="#0052D9" fill-color="#E7EFFF" />

<!-- 指定品牌 -->
<t-icon name="logo" size="{{64}}" brand="tdesign" />
```

### 组件属性

| 属性          | 类型              | 默认值    | 说明                                |
| ------------- | ----------------- | --------- | ----------------------------------- |
| `name`        | `String`          | —         | 图标名称（必填）                    |
| `size`        | `Number / String` | `24`      | 图标尺寸（px）                      |
| `strokeColor` | `String`          | -         | 描边颜色，支持 HEX / rgb() / rgba() |
| `fillColor`   | `String`          | -         | 填充颜色，支持 HEX / rgb() / rgba() |
| `strokeWidth` | `String`          | `2`       | 描边宽度                            |
| `brand`       | `String`          | `tdesign` | 品牌名称                            |

> 💡 颜色值内部统一转为 `rgb()` 格式后注入 Data URI，HEX 的 `#` 无需手动转义。

## ✂️ 图标裁剪

图标组件包含全量图标映射（~1MB），建议使用裁剪工具按需引入，**最高可节省 99% 体积**。

### 安装裁剪工具

```bash
npm install @mp-svg-icons/utils -D
```

### 使用方式

```bash
npx mp-svg-icons-clear --pkg-dir <path> [--scan <dirs...>] [--icons <names>] [--dry-run]
```

| 参数        | 必填 | 说明                         |
| ----------- | :--: | ---------------------------- |
| `--pkg-dir` |  ✅  | 图标 npm 包目录路径          |
| `--scan`    |  -   | 要扫描的项目目录（支持多个） |
| `--icons`   |  -   | 逗号分隔的图标名称列表       |
| `--dry-run` |  -   | 预览模式，不实际执行         |

### 使用示例

```bash
# 扫描项目，自动识别已使用的图标
npx mp-svg-icons-clear \
  --pkg-dir ./miniprogram_npm/@mp-svg-icons/wechat \
  --scan ./pages ./components

# 扫描 + 补充动态图标
npx mp-svg-icons-clear \
  --pkg-dir ./miniprogram_npm/@mp-svg-icons/wechat \
  --scan ./pages ./components \
  --icons loading,play

# 仅保留指定图标
npx mp-svg-icons-clear \
  --pkg-dir ./miniprogram_npm/@mp-svg-icons/wechat \
  --icons add,close,check-circle

# 预览模式
npx mp-svg-icons-clear \
  --pkg-dir ./miniprogram_npm/@mp-svg-icons/wechat \
  --scan ./pages ./components \
  --dry-run
```

### 裁剪效果

| 场景                 | icons.js 大小 | 图标数量 | 节省比例  |
| -------------------- | :-----------: | :------: | :-------: |
| 裁剪前               |     ~1 MB     | 2347 个  |     —     |
| 裁剪后（10 个图标）  |    ~4.3 KB    |  10 个   | **99.6%** |
| 裁剪后（50 个图标）  |   ~21.3 KB    |  50 个   | **97.9%** |
| 裁剪后（100 个图标） |   ~42.6 KB    |  100 个  | **95.7%** |

## ⚙️ 技术方案

<p align="center">
  <img src="./docs/images/01-core-technical-pipeline.png" alt="核心技术路线" width="800" />
</p>

<p align="center"><em>核心技术路线 — 从 SVG 源文件到小程序 image 组件渲染的完整链路</em></p>

## 📁 项目结构

```
miniprogram-svg-icons/
├── resources/                    # SVG 图标源文件（按品牌组织）
│   └── tdesign/                  #   TDesign 图标（2347 个）
├── scripts/                      # 构建脚本
│   ├── generate.ts               #   生成组件到 packages/
│   ├── build.ts                  #   打包压缩到 dist/
│   ├── release.ts                #   交互式发布工具
│   ├── shared.ts                 #   公共模块（平台配置、模板生成）
│   ├── template/                 #   组件模板
│   │   ├── wechat.js.tpl         #     微信风格 JS 模板
│   │   ├── alipay.js.tpl         #     支付宝风格 JS 模板
│   │   ├── icon.tpl              #     视图模板
│   │   └── icon.json.tpl         #     组件配置模板
│   └── utils/
│       ├── svgTotemplate.ts      #   SVG 解析引擎
│       └── const.ts              #   特殊图标列表
├── packages/                     # 源码产物（开发用）
│   ├── wechat/                   #   微信小程序组件
│   ├── alipay/                   #   支付宝小程序组件
│   ├── kuaishou/                 #   快手小程序组件
│   ├── douyin/                   #   抖音小程序组件
│   ├── baidu/                    #   百度小程序组件
│   ├── xiaohongshu/              #   小红书小程序组件
│   ├── jd/                       #   京东小程序组件
│   └── utils/                    #   工具集（含裁剪 CLI）
├── dist/                         # 发布产物（压缩）
├── package.json                  # Monorepo 根配置
└── pnpm-workspace.yaml           # pnpm 工作区配置
```

## 🛠️ 本地开发

### 环境要求

- [Node.js](https://nodejs.org/) >= 20
- [pnpm](https://pnpm.io/) >= 10

### 开发构建

```bash
# 克隆项目
git clone https://github.com/anlyyao/miniprogram-svg-icons.git
cd miniprogram-svg-icons

# 安装依赖
pnpm install

# 生成单个平台
pnpm run generate:wechat

# 生成所有平台
pnpm run generate

# 构建发布产物（单个平台）
pnpm run build:wechat

# 构建所有平台
pnpm run build
```

## 🔌 扩展指南

### 新增品牌图标

- 在 `resources/{brand}/` 下放置 SVG 图标文件（文件名为图标名）
- 确保 SVG 中使用语义化 `id` 标识颜色区域（`fill1`、`fill2`、`stroke1`、`stroke2`）
- 运行 `pnpm run generate` 即可自动识别并生成

### 新增小程序平台

- **步骤 1** — 在 `scripts/shared.ts` 的 `PLATFORMS` 中添加配置：

```typescript
newplatform: {
  id: 'newplatform',
  label: '新平台小程序',
  templateExt: '.nxml',
  styleExt: '.ncss',
  componentStyle: 'wechat',  // 或 'alipay'
  escapeQuotes: false,
},
```

- **步骤 2** — 在根 `package.json` 添加构建命令：

```json
{
  "generate:newplatform": "tsx scripts/generate.ts newplatform",
  "build:newplatform": "tsx scripts/build.ts newplatform"
}
```

- **步骤 3** — 创建包目录 `packages/newplatform/`，添加 `package.json` 并在 `pnpm-workspace.yaml` 中注册。

## 🤝 贡献

欢迎贡献代码！请阅读 [贡献指南](./CONTRIBUTING.md) 了解如何参与项目开发。

- 🐛 [报告 Bug](https://github.com/anlyyao/miniprogram-svg-icons/issues)
- 💡 [提交建议](https://github.com/anlyyao/miniprogram-svg-icons/issues)
- 🔀 [提交 PR](https://github.com/anlyyao/miniprogram-svg-icons/pulls)

## 🔗 相关链接

- [TDesign 官方图标库](https://tdesign.tencent.com/icons)
- [演示项目源码](https://github.com/anlyyao/miniprogram-svg-icon-demo)
- [技术分享](./docs/TECH_SHARING.md)

## 📄 License

[MIT](./LICENSE) © [anlyyao](https://github.com/anlyyao)

<p align="center">
  如果这个项目对你有帮助，请给个 ⭐️ 支持一下！
</p>
