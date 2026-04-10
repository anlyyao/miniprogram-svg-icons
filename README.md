# Miniprogram SVG Icons

<p align="center">
  <strong>小程序多色图标解决方案</strong>
</p>

<p align="center">
  支持微信、支付宝、快手等多平台小程序 | SVG 多色图标 | 按需裁剪 | Monorepo 架构
</p>

---
## 📱 演示示例
[源码地址](https://github.com/anlyyao/miniprogram-svg-icon-demo)

[演示地址](https://github.com/user-attachments/assets/1fed9432-b4c6-4287-aa5b-f90be0dc70ab)

## 项目背景

微信、支付宝、快手、抖音、百度、小红书、京东、等个大平台小程序普遍不支持或不建议直接内联（inline）`<svg>` 标签。主流做法是将 SVG 作为背景图、通过 base64 编码使用，转换为 PNG 图片或者通过 <iamge> 组件 的 src 使用。

> 直接使用 `<svg>` 标签可能导致显示异常、样式失效或在低版本环境中渲染失败


## 📦 包含产物

本仓库支持生成不同平台小程序图标组件, 覆盖不同小程序平台:

| 包名 | 平台 | 图标类型 | 状态 |
|------|------|----------|------|
| `@mp-svg-icons/wechat` | 微信小程序 | SVG 多色图标 | ✅ 可用 |
| `@mp-svg-icons/alipay` | 支付宝小程序 | SVG 多色图标 | ❌ 未发布|
| - | - | - | - |

## ✨ 核心特性

- ✅ **完整色彩支持** — 单色、双色、多色图标完美渲染
- ✅ **运行时颜色控制** — 通过属性动态修改 `fill` / `stroke` 颜色
- ✅ **零依赖运行** — Data URI 方案, 无需额外资源加载
- ✅ **多平台适配** — 支持微信/支付宝/快手等多平台小程序
- ✅ **按需裁剪** — 内置 CLI 工具, 移除未使用图标减小包体积

## 🎯 技术方案

### SVG 多色图标原理

小程序不支持内联 SVG,本方案通过以下技术实现:

1. **SVG → Data URI 转换** — 将 SVG 转为 URL 编码的 Data URI（`data:image/svg+xml;charset=utf-8,...`）
2. **颜色占位符注入** — 解析 SVG, 将颜色属性替换为运行时模板变量
3. **`<image>` 标签渲染** — 小程序原生 image 组件支持 Data URI
4. **特殊图标策略** — 31 个复杂图标(如 `loading`、`play`)使用独立颜色映射

**SVG 源码处理:**
> 移除 svg 中无用属性, 降低 SVG 大小

- 移除 `id` 属性 — 运行时不需要
- 移除 SVG 根元素的 `width="24" height="24"` — 尺寸通过 CSS 控制
- 颜色属性替换为模板占位符 — 支持 `fill` / `stroke` 自定义颜色注入
- 特殊图标针对性处理 — 31 个特殊图标使用不同的颜色映射策略

## 📁 项目结构

```
miniprogram-svg-icons/          # Monorepo 根目录
├── resources/                     # SVG 图标资源（按品牌组织）
│   ├── tdesign/                  #   TDesign 图标（~2300+ 个）
│   └── {brand}/                  #   其他品牌图标（如 ant-design 等）
├── scripts/                       # 构建 & 发布脚本
│   ├── generate.ts                # 图标组件生成脚本
│   ├── build.ts                   # 编译压缩打包脚本
│   ├── release.ts                 # 交互式发布脚本
│   ├── template/                  # 各平台组件模板
│   │   ├── wechat/               #   微信小程序模板(.wxml / .wxss)
│   │   │   ├── common/use-icon.js  # 公共 Behavior
│   │   │   ├── single-icon/      #     单图标组件模板
│   │   │   └── icon/             #     通用 icon 组件模板
│   │   ├── alipay/               #   支付宝小程序模板(.axml / .acss)
│   │   └── kuaishou/             #   快手小程序模板(.ksml / .css)
│   └── utils/                     # 工具函数
│       ├── const.ts              #   特殊图标列表
│       └── svgTotemplate.ts      #   SVG 解析 & 模板生成
├── packages/
│   ├── utils/                     # 工具集源码（独立 npm 包 @mp-svg-icons/utils）
│   │   ├── src/
│   │   │   └── clear/            #   图标裁剪工具
│   │   │       ├── cli.ts        #     CLI 入口
│   │   │       ├── index.ts      #     主逻辑入口（可编程调用）
│   │   │       ├── constants.ts  #     常量定义
│   │   │       ├── icon.ts       #     icons.js 读写与裁剪
│   │   │       ├── path-utils.ts #     路径工具函数
│   │   │       ├── scanner.ts    #     项目文件扫描器
│   │   │       ├── single-icon.ts#     单图标组件目录清理
│   │   │       ├── types.ts      #     类型定义
│   │   │       └── utils.ts      #     通用工具函数
│   │   └── package.json
│   ├── wechat/                   # 微信小程序组件包(源码,由 generate 生成)
│   │   ├── tdesign/              #   TDesign 品牌图标组件
│   │   └── {brand}/              #   其他品牌图标组件
│   ├── alipay/                   # 支付宝小程序组件包(源码,由 generate 生成)
│   └── kuaishou/                 # 快手小程序组件包(源码,由 generate 生成)
├── dist/                         # 打包产物(压缩后,由 build 生成,用于 npm 发布)
│   ├── utils/                    #   工具集编译产物（@mp-svg-icons/utils）
│   │   └── clear/                #     图标裁剪工具
│   ├── wechat/                   #   微信小程序压缩产物
│   │   ├── tdesign/              #     TDesign 品牌压缩产物
│   │   └── {brand}/              #     其他品牌压缩产物
│   ├── alipay/                   #   支付宝小程序压缩产物
│   └── kuaishou/                 #   快手小程序压缩产物
├── package.json                  # Monorepo 根配置(pnpm workspaces)
├── tsconfig.json                 # TypeScript 配置
└── tsconfig.utils.json           # utils 包专用编译配置
```

## 🚀 快速开始

### 环境准备

- [Node.js](https://nodejs.org/) >= 20
- [pnpm](https://pnpm.io/)

### 克隆项目

```bash
git clone https://github.com/anlyyao/miniprogram-svg-icons.git
```

### 安装依赖

```bash
pnpm install
```

### 构建

#### 1. 生成图标组件库

自动扫描 `resources/` 下所有品牌目录，生成完整的图标组件库到 `packages/{platform}/{brand}/` 目录：

```bash
pnpm run generate:wechat         # 微信小程序
pnpm run generate:alipay         # 支付宝小程序
pnpm run generate:kuaishou       # 快手小程序
pnpm run generate                # 全平台生成
```

#### 2. 编译打包

将源码编译压缩到 `dist/{platform}/{brand}/` 目录, 用于 npm 发布：

```bash
pnpm run build:wechat            # 微信小程序
pnpm run build:alipay            # 支付宝小程序
pnpm run build:kuaishou          # 快手小程序
pnpm run build                   # 全平台打包
```

> **注意**: `build` 命令需要先运行 `generate` 命令生成源码

### 发布

```bash
pnpm run release
```

交互式发布流程:选择子包 → 选择版本号 → 选择 dist-tag → 确认发布。

## 📖 使用方式

### 方式一:SVG 多色图标

#### 单图标组件

每个图标生成一个独立组件目录,按需引入:

```json
// 页面或组件的 JSON 配置
{
  "usingComponents": {
    "add-icon": "@mp-svg-icons/wechat/tdesign/add-icon",
    "close-icon": "@mp-svg-icons/wechat/tdesign/close-icon"
  }
}
```

```xml
<!-- 模板中使用 -->
<add-icon size="{{48}}" />
<close-icon size="{{32}}" stroke-color="#0052D9" fill-color="#E7EFFF" />
```

#### 通用 icon 组件

通过 `name` 属性指定图标名称,适合需要动态切换图标的场景:

```json
{
  "usingComponents": {
    "t-icon": "@mp-svg-icons/wechat/icon"
  }
}
```

```xml
<t-icon name="add" size="{{48}}" />
<t-icon name="close" size="{{32}}" stroke-color="#0052D9" fill-color="#E7EFFF" />
```

#### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `Number / String` | `24` | 图标尺寸(px) |
| `strokeColor` | `String` | - | 描边颜色,支持 `rgb()` / `rgba()` / HEX 格式 |
| `fillColor` | `String` | - | 填充颜色,支持 `rgb()` / `rgba()` / HEX 格式 |
| `strokeWidth` | `String` | `2` | 描边宽度 |
| `name` | `String` | - | 图标名称(仅通用 icon 组件支持) |

> **注意**:颜色值内部统一转为 `rgb()` 格式后注入 Data URI, 因此 HEX 的 `#` 无需手动转义。

## ⚙️ 图标裁剪

构建产物包含全部 ~2300 个图标,包体积较大。提供独立的裁剪 CLI 工具 `@mp-svg-icons/utils`,可按需移除未使用的图标以减小包体积。

> `@mp-svg-icons/utils` 工具适用于抖音、快手、百度、小红书、京东等所有小程序平台。

### 安装 CLI 工具

```bash
npm install @mp-svg-icons/utils -D
# 或
pnpm add @mp-svg-icons/utils -D
```

### 使用方式

```bash
npx mp-svg-icons-clear --pkg-dir <path> [--scan <dirs...>] [--icons <names>] [--dry-run]
```

#### 示例

扫描项目目录,自动识别已使用的图标并裁剪:

```bash
npx mp-svg-icons-clear \
  --pkg-dir ./miniprogram_npm/@mp-svg-icons/wechat \
  --scan ./pages ./components
```

扫描 + 手动补充动态图标（并集关系,在扫描结果基础上额外保留指定图标）:

```bash
npx mp-svg-icons-clear \
  --pkg-dir ./miniprogram_npm/@mp-svg-icons/wechat \
  --scan ./pages ./components \
  --icons loading,play
```

仅保留手动指定的图标:

```bash
npx mp-svg-icons-clear \
  --pkg-dir ./miniprogram_npm/@mp-svg-icons/wechat \
  --icons add,close,check-circle,delete
```

先预览裁剪结果,确认无误后再执行:

```bash
npx mp-svg-icons-clear \
  --pkg-dir ./miniprogram_npm/@mp-svg-icons/wechat \
  --scan ./pages ./components \
  --dry-run
```

### 参数说明

| 参数 | 必填 | 说明 |
|------|------|------|
| `--pkg-dir` | 是 | 图标 npm 包目录路径 |
| `--scan` | 否 | 要扫描的项目目录（支持多个,空格分隔） |
| `--icons` | 否 | 逗号分隔的图标名称列表,手动指定要保留的图标。**注意:仅保护通用组件（`icons.js` 映射表）,不保护单图标组件目录** |
| `--dry-run` | 否 | 预览模式,只输出将移除的图标,不实际执行 |

> **说明**: `--scan` 和 `--icons` 至少需要指定一个,两者可同时使用。同时使用时,最终保留的图标为扫描结果与手动指定的**并集**。`--icons` 的典型场景是补充静态分析无法识别的动态图标（如 JS 中动态赋值的图标名）。

### 裁剪原理

1. 加载图标包中的全量图标数据（`icon/icons.js` 映射表 + 单图标组件目录）
2. 通过 `--scan` 扫描项目源码中 `usingComponents` 的引用和模板中的图标名
3. 通过 `--icons` 手动补充需要保留的图标（两者取并集）
4. 裁剪 `icons.js` 映射表,只保留使用中的图标 SVG 数据
5. 移除未使用的 `{name}-icon/` 单图标组件目录
6. 若通用 icon 组件和所有单图标组件均未被项目引用,自动移除 `common/` 公共目录

### 开发工具

| 工具 | 用途 |
|------|------|
| [pnpm](https://pnpm.io/) | 包管理 & Monorepo Workspaces |
| [TypeScript](https://www.typescriptlang.org/) | 构建脚本开发语言 |
| [tsx](https://github.com/esbuild-kit/tsx) | 直接运行 TypeScript 脚本 |
| [terser](https://terser.org/) | JS 压缩(build 阶段) |
| [xmldom](https://github.com/jindw/xmldom) | SVG XML 解析 |
| [fs-extra](https://github.com/jpm-org/fs-extra) | 文件系统操作 |

### 构建工具链

项目构建分为两个阶段:`generate`(生成源码) 和 `build`(编译打包)。

| 文件类型 | generate(生成) | build(编译打包) |
|----------|----------------|-----------------|
| **JS** (`use-icon.js`) | 直接复制模板到输出目录 | terser API 压缩 |
| **JS** (图标 `index.js`) | 生成源码直接写入 | terser API 压缩 |
| **JS** (`icons.js`) | 生成源码直接写入 | terser 压缩(保留模板字面量) |
| **JSON** | 保留原始格式 | `JSON.stringify(JSON.parse(...))` 去空白 |
| **模板** (wxml/axml/ksml 等) | 保留原始格式 | 去 HTML 注释、折叠空白 |

### 核心文件说明

| 文件 | 说明 |
|------|------|
| `resources/{brand}/` | SVG 图标源文件目录（按品牌组织），作为 generate 脚本的输入源 |
| `scripts/generate.ts` | 图标组件生成入口,自动扫描 `resources/` 下所有品牌,生成组件库到 `packages/{platform}/{brand}/` |
| `scripts/build.ts` | 编译打包入口,将 `packages/{platform}/{brand}/` 源码压缩到 `dist/{platform}/{brand}/` |
| `scripts/release.ts` | （本地发包）交互式发布工具,支持版本管理、dist-tag 选择、Git 分支 & Tag 管理 |
| `packages/utils/` | 工具集源码 (`@mp-svg-icons/utils`)，包含 svg-icons-clear 图标裁剪工具 |
| `dist/utils/` | 工具集编译产物 (`@mp-svg-icons/utils`)，用于 npm 发布 |
| `scripts/utils/svgTotemplate.ts` | SVG 解析引擎,将 SVG 转为带颜色占位符的模板字符串 |

### 构建产物结构

以微信小程序为例,`dist/wechat/` 目录结构:

```
dist/
├── utils/                           # @mp-svg-icons/utils 工具集编译产物
│   └── clear/
│       ├── cli.js                   # CLI 入口
│       ├── index.js                 # 主逻辑入口
│       └── ...                      # 其他模块
├── wechat/
│   ├── tdesign/                     # TDesign 品牌图标
│   │   ├── common/
│   │   │   └── use-icon.js          # 公共 Behavior(已压缩)
│   │   ├── icon/
│   │   │   ├── index.js             # 通用 icon 组件
│   │   │   ├── index.json           # 组件配置
│   │   │   ├── index.wxml           # 组件模板
│   │   │   └── icons.js             # 全量图标 SVG 映射表(~1.5MB)
│   │   └── {name}-icon/             # 每个图标一个独立组件目录
│   │       ├── index.js             # 单图标组件(含 SVG Data URI)
│   │       ├── index.json           # 组件配置
│   │       └── index.wxml           # 组件模板
│   ├── {brand}/                     # 其他品牌图标（结构同上）
│   ├── README.md
│   └── package.json
├── alipay/                          # 支付宝小程序压缩产物（结构同上）
└── kuaishou/                        # 快手小程序压缩产物（结构同上）
```

### 新增品牌指南

1. 在 `resources/{brand}/` 下放置 SVG 图标文件
2. 运行 `pnpm run generate` 即可自动识别并生成对应品牌的组件

### 新增平台指南

1. 在 `scripts/template/{platform}/` 下创建模板文件:
   - `common/use-icon.js` — 公共 Behavior / Mixin
   - `single-icon/index.{模板后缀}` — 单图标组件模板
   - `single-icon/index.json` — 单图标组件配置
   - `single-icon/index.{样式后缀}` — 单图标组件样式
   - `icon/index.{模板后缀}` — 通用 icon 组件模板
   - `icon/index.js` — 通用 icon 组件逻辑
   - `icon/index.json` — 通用 icon 组件配置
   - `icon/index.{样式后缀}` — 通用 icon 组件样式
2. 在 `scripts/generate.ts` 和 `scripts/build.ts` 的 `PLATFORMS` 中注册平台配置
3. 在根 `package.json` 的 `scripts` 中添加构建命令
4. 创建 `packages/{platform}/package.json` 并注册到 `workspaces`
5. 在 `scripts/release.ts` 的 `FRAMEWORKS` 和 `getPackageConfig` 中添加发布条目

### 平台差异

不同小程序平台的组件 API 存在差异,模板文件中需要做相应适配:

#### 组件 API 差异

| 特性 | 微信 / 快手 / 抖音 / 百度 / 小红书 / 京东 | 支付宝 |
|------|-------------------------------------------|--------|
| 组件复用 | `Behavior` / `behaviors` | `Mixin` / `mixins` |
| 属性定义 | `properties` (带 `type` / `value`) | `props` (直接赋默认值) |
| 数据访问 | `this.data.xxx` | `this.props.xxx` (外部属性) / `this.data.xxx` (内部数据) |
| 初始化生命周期 | `lifetimes.attached()` | `didMount()` |
| 属性变化监听 | `observers` (声明式响应) | `didUpdate(prevProps)` (手动 diff) |
| 纯数据字段 | `options.pureDataPattern` | 不支持 |
| JS 语法风格 | ES6 (箭头函数、模板字符串、解构) | ES5 (var、字符串拼接、function) |

#### 文件后缀差异

| 文件类型 | 微信 | 支付宝 | 快手 | 抖音 | 百度 | 小红书 | 京东 |
|----------|------|--------|------|------|------|--------|------|
| 模板文件 | `.wxml` | `.axml` | `.ksml` | `.ttml` | `.swan` | `.xhsml` | `.jxml` |
| 样式文件 | `.wxss` | `.acss` | `.css` | `.ttss` | `.css` | `.xhss` | `.jxss` |
| 逻辑文件 | `.js` | `.js` | `.js` | `.js` | `.js` | `.js` | `.js` |
| 配置文件 | `.json` | `.json` | `.json` | `.json` | `.json` | `.json` | `.json` |

> **说明**: 除支付宝外,其余平台（微信、快手、抖音、百度、小红书、京东）的自定义组件 API 基本一致,均支持 `Behavior` / `properties` / `observers` / `lifetimes` 等特性,主要差异仅在文件后缀。

## 🔗 相关链接

- [TDesign 官方图标库](https://github.com/Tencent/tdesign-icons)
- [TDesign 小程序组件库](https://tdesign.tencent.com/miniprogram/overview)

## 📄 License

遵循 [MIT 协议](https://github.com/anlyyao/miniprogram-svg-icons/blob/develop/LICENSE)
