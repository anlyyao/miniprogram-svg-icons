# Miniprogram SVG Icons

<p align="center">
  <strong>小程序多色图标解决方案</strong>
</p>

<p align="center">
  支持微信 · QQ · 支付宝 · 快手 · 抖音 · 百度 · 小红书 · 京东
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@mp-svg-icons/wechat">
    <img src="https://img.shields.io/npm/v/@mp-svg-icons/wechat" alt="npm">
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D20-brightgreen" alt="node">
  <a href="https://github.com/anlyyao/miniprogram-svg-icons/blob/develop/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue" alt="License">
  </a>
</p>

---

## ✨ 特性

- ✅ **完整色彩支持** — 单色、双色、多色图标完美渲染
- ✅ **运行时颜色控制** — 通过属性动态修改 `fill` / `stroke` 颜色
- ✅ **零依赖运行** — Data URI 方案，无需额外资源加载
- ✅ **7+ 平台适配** — 支持微信 / 支付宝 / 快手 / 抖音 / 百度 / 小红书 / 京东
- ✅ **按需裁剪** — 内置 CLI 工具，移除未使用图标减小包体积
- ✅ **多品牌支持** — 支持多品牌图标源（如 TDesign），易扩展

---

## 📦 支持的平台

| 包名 | 平台 | 备注 |
|------|------|------|
| `@mp-svg-icons/wechat` | 微信小程序 | 基准平台 |
| `@mp-svg-icons/alipay` | 支付宝小程序 | 独立 API 风格 |
| `@mp-svg-icons/kuaishou` | 快手小程序 | |
| `@mp-svg-icons/douyin` | 抖音小程序 | 需额外处理双引号 |
| `@mp-svg-icons/baidu` | 百度小程序 | 需额外处理双引号 |
| `@mp-svg-icons/xiaohongshu` | 小红书小程序 | |
| `@mp-svg-icons/jd` | 京东小程序 | |
| `@mp-svg-icons/utils` | 工具集 | 图标裁剪 CLI |

> QQ 小程序可直接复用微信小程序版本。

---

## 🚀 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) >= 20
- [pnpm](https://pnpm.io/)

### 安装依赖

```bash
git clone https://github.com/anlyyao/miniprogram-svg-icons.git

pnpm install
```

### 生成图标组件

```bash
# 生成单个平台
pnpm run generate:wechat

# 生成所有平台
pnpm run generate
```

### 构建发布产物

```bash
# 构建单个平台（生成压缩产物）
pnpm run build:wechat

# 构建所有平台
pnpm run build
```

---

## 📖 使用方式

以微信小程序为例，其他平台用法相同。

### 安装组件库

```bash
npm install @mp-svg-icons/wechat
```

### 注册组件

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

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `Number / String` | `24` | 图标尺寸（px） |
| `strokeColor` | `String` | -| 描边颜色，支持 HEX / rgb() / rgba() |
| `fillColor` | `String` | - | 填充颜色，支持 HEX / rgb() / rgba() |
| `strokeWidth` | `String` | `2` | 描边宽度 |
| `name` | `String` | — | 图标名称 |
| `brand` | `String` | `tdesign` | 品牌名称 |

> [!NOTE]
> 颜色值内部统一转为 `rgb()` 格式后注入 Data URI，HEX 的 `#` 无需手动转义。

---

## ⚙️ 技术方案

### 问题背景

各大平台小程序**不支持直接内联 `<svg>` 标签**，可选方案对比如下：

| 方案 | 动态改色 | 多色支持 | 性能 | 结论 |
|------|:--------:|:--------:|:----:|:----:|
| `image` 引用 SVG | ❌ | ❌ | 好 | 不满足 |
| SVG 转 Base64 | ❌ | ❌ | 好 | 不满足 |
| CSS filter 改色 | ⚠️ | ❌ | 好 | 不满足 |
| Canvas 绘制 | ✅ | ✅ | 差 | 成本高 |
| **Data URI（本项目）** | ✅ | ✅ | 好 | ✅ 采用 |

### 核心技术：最小化编码

将 SVG 嵌入 Data URI 时，编码方式直接影响体积：

| 方案 | 体积变化 | 兼容性 |
|------|----------|--------|
| Base64 | +35.6% | 最好 |
| `encodeURIComponent` | +35.9% | 好 |
| **最小化编码（本项目）** | **+4.7%** | 好 |

最小化编码仅编码 3 个必要字符：

| 字符 | 编码 | 说明 |
|------|------|------|
| `#` | `%23` | 避免 URL 片段解析 |
| `<` | `%3C` | 避免 HTML 标签解析 |
| `>` | `%3E` | 避免 HTML 标签解析 |

> [!WARNING]
> 百度、抖音小程序的 `image` 组件在解析 Data URI 时，SVG 中的双引号会导致错误。因此这两个平台额外进行 `"` → `'` 替换处理。

### 实现原理

小程序不支持内联 SVG，本方案通过以下技术实现多色图标：

1. **SVG → Data URI 转换** — 将 SVG 转为 URL 编码的 Data URI
2. **颜色占位符** — 解析 SVG，将颜色属性替换为运行时模板变量
3. **`<image>` 标签渲染** — 小程序原生 image 组件支持 Data URI

### SVG 处理管道

| 步骤 | 函数 | 说明 |
|------|------|------|
| 读取 SVG | `loadIcons()` | 从 `resources/{brand}/` 读取 SVG 文件 |
| XML 解析 | `parseSvg()` | 使用 xmldom 解析为结构化对象 |
| 颜色替换 | `normalizeColor()` | 根据元素 `id` 替换为模板变量 |
| 属性清理 | `buildAttrString()` | 移除 `id`、`width`、`height` 等 |
| 模板生成 | `generateSvg()` | 拼接完整的 SVG 模板字符串 |
| 组件写入 | `generateIconsJS()` | 生成 `icons.js` 映射表 |
| 运行时渲染 | `icon/index.js` | HEX→RGB + URL 编码 → Data URI |

### 颜色映射规则

SVG 中使用语义化 `id` 标识颜色区域，构建时自动映射为运行时变量：

| SVG 属性 | 元素 id | 映射变量 | 默认值 |
|----------|---------|----------|--------|
| `fill` | `fill1` | `{{fillColor1}}` | `currentColor` |
| `fill` | `fill2` | `{{fillColor2}}` | `transparent` |
| `stroke` | `stroke1` | `{{strokeColor1}}` | `currentColor` |
| `stroke` | `stroke2` | `{{strokeColor2}}` | `currentColor` |
| `stroke-width` | `stroke*` | `{{strokeWidth}}` | `2` |

默认值判定逻辑：

```
fill = "black" | "#000" | "#000000" → "currentColor"
fill = 其他值                       → "transparent"
```

> [!NOTE]
> 31 个特殊图标（如 `loading`、`play`）的 `fill` 属性映射到 `{{strokeColor1}}`，以对齐桌面端行为。详见 `scripts/utils/const.ts`。

---

## ✂️ 图标裁剪

图标组件包含全量图标映射（~1.5MB），建议使用裁剪工具按需引入。

### 安装

```bash
npm install @mp-svg-icons/utils -D
```

### 📖 使用方式

```bash
npx mp-svg-icons-clear --pkg-dir <path> [--scan <dirs...>] [--icons <names>] [--dry-run]
```

| 参数 | 必填 | 说明 |
|------|------|------|
| `--pkg-dir` | 是 | 图标 npm 包目录路径 |
| `--scan` | 否 | 要扫描的项目目录（支持多个） |
| `--icons` | 否 | 逗号分隔的图标名称列表 |
| `--dry-run` | 否 | 预览模式，不实际执行 |

### 示例

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

---

## 📁 项目结构

```
miniprogram-svg-icons/
├── resources/                    # SVG 图标源文件（按品牌组织）
│   └── tdesign/                  #   TDesign 图标（~1000+ 个）
├── scripts/                      # 构建脚本
│   ├── generate.ts               #   生成组件到 packages/
│   ├── build.ts                  #   打包压缩到 dist/
│   ├── release.ts                #   交互式发布工具
│   ├── shared.ts                 #   公共模块（平台配置、模板生成）
│   ├── template/                 #   组件模板
│   │   ├── wechat.js.tpl        #     微信风格 JS 模板
│   │   ├── alipay.js.tpl        #     支付宝风格 JS 模板
│   │   ├── icon.tpl             #     视图模板
│   │   └── icon.json.tpl        #     组件配置模板
│   └── utils/
│       ├── svgTotemplate.ts     #   SVG 解析引擎
│       └── const.ts             #   特殊图标列表（31 个）
├── packages/                     # 源码产物（开发用）
│   ├── wechat/                  #   微信小程序组件
│   ├── alipay/                  #   支付宝小程序组件
│   ├── kuaishou/                #   快手小程序组件
│   ├── douyin/                  #   抖音小程序组件
│   ├── baidu/                   #   百度小程序组件
│   ├── xiaohongshu/             #   小红书小程序组件
│   ├── jd/                      #   京东小程序组件
│   └── utils/                   #   工具集（含裁剪 CLI）
├── dist/                         # 发布产物（压缩）
├── web/                          # 图标预览 Web 应用
├── package.json                  # Monorepo 根配置
└── pnpm-workspace.yaml           # pnpm 工作区配置
```

### 组件结构

以微信小程序为例，`packages/wechat/` 结构：

```
packages/wechat/
├── icon/
│   ├── index.js                 #   组件逻辑（颜色解析 + Data URI 生成）
│   ├── index.json               #   组件配置
│   ├── index.wxml               #   组件模板
│   └── icons.js                 #   全量图标映射表（~1.5MB）
├── package.json
└── README.md
```

---

## 🌐 多平台适配

### 平台配置

| 平台 | 模板后缀 | 样式后缀 | 组件风格 | 双引号处理 |
|------|----------|----------|----------|------------|
| 微信 | `.wxml` | `.wxss` | wechat | — |
| 支付宝 | `.axml` | `.acss` | alipay | — |
| 快手 | `.ksml` | `.css` | wechat | — |
| 小红书 | `.xhsml` | `.css` | wechat | — |
| 京东 | `.jxml` | `.jxss` | wechat | — |
| 百度 | `.swan` | `.css` | wechat | 转义 |
| 抖音 | `.ttml` | `.ttss` | wechat | 转义 |

### 组件 API 差异

| 特性 | 微信 / 快手 / 百度 / 抖音 / 小红书 / 京东 | 支付宝 |
|------|------------------------------------------|--------|
| 属性定义 | `properties` | `props` |
| 初始化生命周期 | `lifetimes.attached()` | `didMount()` |
| 属性监听 | `observers` | `didUpdate(prevProps)` |

> [!TIP]
> 7 个平台仅需维护 **2 套 JS 模板** + **1 个视图模板** + **1 个 JSON 配置**。新增平台只需在 `PLATFORMS` 中注册一行配置。

---

## 🛠️ 扩展指南

### 新增品牌图标

1. 在 `resources/{brand}/` 下放置 SVG 图标文件（文件名为图标名）
2. 确保 SVG 中使用语义化 `id` 标识颜色区域（`fill1`、`fill2`、`stroke1`、`stroke2`）
3. 运行 `pnpm run generate` 即可自动识别并生成

### 新增小程序平台
每个平台通过 5 个维度的配置描述，构建引擎根据配置**自动生成**对应平台的组件代码：

```typescript
interface PlatformConfig {
  id: string;              // 平台标识
  label: string;           // 显示名称
  templateExt: string;     // 模板文件后缀
  styleExt: string;        // 样式文件后缀
  componentStyle: 'wechat' | 'alipay';  // 组件 API 风格
  escapeQuotes: boolean;   // 是否需要额外转义双引号
}
```

**步骤 1** — 在 `scripts/shared.ts` 的 `PLATFORMS` 中添加配置：

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

**步骤 2** — 在根 `package.json` 添加构建命令：

```json
{
  "generate:newplatform": "tsx scripts/generate.ts newplatform",
  "build:newplatform": "tsx scripts/build.ts newplatform"
}
```

**步骤 3** — 创建包配置：

```json
{
  "name": "@mp-svg-icons/newplatform",
  "version": "0.0.1",
  "description": "新平台小程序 SVG 多色图标组件"
}
```

并在 `pnpm-workspace.yaml` 中注册。

---

## 🔧 开发工具链

| 工具 | 版本 | 用途 |
|------|------|------|
| [pnpm](https://pnpm.io/) | 10.27.0 | 包管理 & Monorepo |
| [TypeScript](https://www.typescriptlang.org/) | ^5.3.0 | 构建脚本语言 |
| [tsx](https://github.com/esbuild-kit/tsx) | ^4.7.0 | 直接运行 TS 脚本 |
| [terser](https://terser.org/) | ^5.46.1 | JS 压缩 |
| [xmldom](https://github.com/jindw/xmldom) | ^0.6.0 | SVG XML 解析 |

---

## 🔗 相关链接

- [TDesign 官方图标库](https://github.com/Tencent/tdesign-icons)
- [TDesign 小程序组件库](https://tdesign.tencent.com/miniprogram/overview)
- [演示项目源码](https://github.com/anlyyao/miniprogram-svg-icon-demo)

---

## 📄 License

[MIT](https://github.com/anlyyao/miniprogram-svg-icons/blob/develop/LICENSE)
