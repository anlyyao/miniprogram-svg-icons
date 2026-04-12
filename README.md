# Miniprogram SVG Icons

<p align="center">
  <strong>🎨 小程序多色图标解决方案</strong>
</p>

<p align="center">
  支持微信 · QQ · 支付宝 · 快手 · 抖音 · 百度 · 小红书 · 京东 | SVG 多色图标 | 按需裁剪 | Monorepo 架构
</p>

---
## 📱 演示示例
[演示地址](https://github.com/user-attachments/assets/1fed9432-b4c6-4287-aa5b-f90be0dc70ab)

---
## 项目背景

微信、QQ、支付宝、快手、抖音、百度、小红书、京东、等各大平台小程序**普遍不支持或不建议直接内联（inline）`<svg>` 标签**。


### 小程序 SVG 实现方案对比表

| 方案 | 实现方式 | 优点 | 缺点 | 是否支持多色 |
|------|----------|------|------|--------------|
| image 直接引用 SVG | `<image>` 标签引入本地 / 网络 `.svg` 文件 | 原生支持、简单高效、性能好 | 无法动态修改颜色、复杂 SVG 可能渲染异常 | 是（静态多色） |
| SVG 转 Base64 内联 | 把 SVG 转为 base64 写在 image src | 无网络依赖、离线可用、体积小 | 可读性差、无法动态改色 | 是（静态多色） |
| JS 动态拼接 SVG+Base64 | JS 拼接 SVG 字符串并转 base64 赋值 | 可动态改色、改路径、灵活可控 | 代码稍繁琐、复杂 SVG 拼接麻烦 | 是 |
| CSS filter 改色 | 固定 SVG 图标 + CSS filter 变色 | 实现简单、无需改 SVG 源码 | 仅支持单色变色、颜色精度一般 | 否 |
| Canvas 绘制 SVG | - | 支持复杂图形、可交互、可修改 | 性能一般、开发成本高 | 是 |

### SVG Data URI 编码方案对比

将 SVG 嵌入 Data URI 时，编码方式直接影响最终体积。以下是三种常见编码方案的对比：

| 方案 | 原理 | 体积变化 | 兼容性 |
|------|------|----------|--------|
| Base64 | 二进制编码 | 增大 ~36% | ✅ 最好 |
| `encodeURIComponent` | 编码所有非安全字符 | 增大 ~36% | ✅ 好 |
| **最小化编码（本项目采用）** | 仅编码 `< > #` 等必要字符 | **增大 ~4.7%** | ✅ 好 |

以 `ability-open.svg`（1202 字符）为例，各编码方案的实际体积对比：

| 编码方案 | 编码后字符数 | 相比原始 SVG |
|----------|-------------|-------------|
| 原始 SVG | 1202 | — | — |
| **最小化编码** | **1259** | **+4.7%** |
| Base64 | 1630 | +35.6% | — |
| `encodeURIComponent` | 1633 | +35.9% |

> 💡 最小化编码仅比原始 SVG 多 57 个字符，而 Base64 多出 428 个字符。**相比 Base64 方案，最小化编码节省约 22.8% 的体积**。

#### 最小化编码规则

本项目采用最小化 URL 编码方案，仅编码 3 个必要字符：

| 原始字符 | 编码结果 | 说明 |
|----------|----------|------|
| `#` | `%23` | 避免被解析为 URL 片段标识符 |
| `<` | `%3C` | 避免被解析为 HTML 标签 |
| `>` | `%3E` | 避免被解析为 HTML 标签 |

> ⚠️ **平台兼容提示**：在百度、抖音小程序中，`image` 组件的 `src` 内联 SVG Data URI 时，SVG 中的双引号（`"`）会导致解析错误。因此本项目在这两个平台额外增加了 `"` → `'` 的替换处理（SVG 属性值使用单引号同样合法），其余平台保留原始双引号，无需额外处理。

**本项目基于此方案，提供了一套完整的 SVG 多色图标解决方案**：通过 SVG → 最小化编码 Data URI 的转换管道，结合运行时颜色注入机制，实现了在各大平台小程序中以极低的体积开销完美渲染多色 SVG 图标。

---

## ✨ 核心特性

- ✅ **完整色彩支持** — 单色、双色、多色图标完美渲染
- ✅ **运行时颜色控制** — 通过属性动态修改 `fill` / `stroke` 颜色
- ✅ **零依赖运行** — Data URI 方案，无需额外资源加载
- ✅ **7+ 平台适配** — 支持微信 / 支付宝 / 快手 / 抖音 / 百度 / 小红书 / 京东
- ✅ **按需裁剪** — 内置 CLI 工具，移除未使用图标减小包体积
- ✅ **品牌系统** — 支持多品牌图标源（如 TDesign），可自由扩展

---

## 📦 包含产物

本仓库支持生成不同平台小程序图标组件，覆盖 **8 大小程序平台**：

| 包名 | 平台 | 图标类型 | 状态 |
|------|------|----------|------|
| `@mp-svg-icons/wechat` | 微信小程序 | SVG 多色图标 | ✅ 可用 |
| ↑ 同上 | QQ 小程序 | SVG 多色图标 | ✅ 直接复用微信版本 |
| `@mp-svg-icons/alipay` | 支付宝小程序 | SVG 多色图标 | ✅ 可用 |
| `@mp-svg-icons/kuaishou` | 快手小程序 | SVG 多色图标 | ✅ 可用 |
| `@mp-svg-icons/douyin` | 抖音小程序 | SVG 多色图标 | ✅ 可用 |
| `@mp-svg-icons/baidu` | 百度小程序 | SVG 多色图标 | ✅ 可用 |
| `@mp-svg-icons/xiaohongshu` | 小红书小程序 | SVG 多色图标 | ✅ 可用 |
| `@mp-svg-icons/jd` | 京东小程序 | SVG 多色图标 | ✅ 可用 |
| `@mp-svg-icons/utils` | 工具集 | 图标裁剪 CLI | ✅ 可用 |

---

## 🏗️ 整体架构

项目采用 **pnpm Monorepo** 架构，以统一的构建管道将 SVG 图标源文件转换为多平台小程序原生组件。

<img width="800" src="https://github.com/user-attachments/assets/cd5a2eaf-a8ef-4ddb-bb17-9202c7d6044c" />

架构分为四层：

| 层级 | 说明 | 核心模块 |
|------|------|----------|
| **📥 输入层** | SVG 图标源文件 + 平台组件模板 | `resources/{brand}/`、`scripts/template/{platform}/` |
| **⚙️ 构建引擎** | SVG 解析、组件生成、压缩打包 | `svgTotemplate.ts`、`generate.ts`、`build.ts` |
| **📤 输出层** | 开发源码 + npm 发布产物 | `packages/{platform}/`、`dist/{platform}/` |
| **🔧 工具链** | 图标裁剪 CLI + 交互式发布 | `@mp-svg-icons/utils`、`release.ts` |


## 🎯 技术方案

### SVG 多色图标原理

小程序不支持内联 SVG,本方案通过以下技术实现:

1. **SVG → Data URI 转换** — 将 SVG 转为 URL 编码的 Data URI（`data:image/svg+xml;charset=utf-8,...`）
2. **颜色占位符注入** — 解析 SVG, 将颜色属性替换为运行时模板变量
3. **`<image>` 标签渲染** — 小程序原生 image 组件支持 Data URI
4. **特殊图标策略** — 31 个复杂图标(如 `loading`、`play`)使用独立颜色映射

### SVG 处理管道

SVG 源文件经过解析、颜色替换、属性清理，最终生成带模板变量的 Data URI，供 `<image>` 组件渲染。

**处理步骤详解：**
> 移除 svg 中无用属性, 降低 SVG 大小


| 步骤 | 函数 | 说明 |
|------|------|------|
| 1. 读取 SVG | `loadIcons()` | 从 `resources/{brand}/` 读取全部 `.svg` 文件 |
| 2. XML 解析 | `parseSvg()` | 使用 `xmldom` 解析 SVG 为结构化对象 |
| 3. 颜色替换 | `normalizeColor()` | 根据元素 `id` 将颜色属性替换为模板变量 |
| 4. 属性清理 | `buildAttrString()` | 移除 `id`、`width`、`height` 等运行时无用属性 |
| 5. 模板生成 | `generateSvg()` | 拼接为完整的 SVG 模板字符串 |
| 6. 组件写入 | `generateMergedIconsJS()` | 合并为 icons.js 映射表，写入组件文件 |
| 7. 运行时渲染 | `icon/index.js` | HEX→RGB 转换 + URL 编码 → Data URI → `<image>` |

### 颜色映射规则

SVG 源文件中使用语义化 `id` 属性标识颜色区域，解析引擎根据 `id` 映射为对应的运行时变量：

<img width="800" src="https://github.com/user-attachments/assets/1b62b121-8122-402a-90ed-feedbf2b91a0" />


**映射对照表：**

| SVG 属性 | 元素 id | 映射变量 | 默认值 |
|----------|---------|----------|--------|
| `fill` | `fill1` | `{{fillColor1}}` | `currentColor` / `transparent` |
| `fill` | `fill2` | `{{fillColor2}}` | `currentColor` / `transparent` |
| `stroke` | `stroke1` | `{{strokeColor1}}` | `currentColor` |
| `stroke` | `stroke2` | `{{strokeColor2}}` | `currentColor` |
| `stroke-width` | `stroke*` | `{{strokeWidth}}` | `2` |
| `fill`（无 id） | — | `{{fillColor1}}` | 默认绑定 |
| `stroke`（无 id） | — | `{{strokeColor1}}` | 默认绑定 |

> **⚠️ 特殊图标**：31 个图标（如 `loading`、`play`、品牌 Logo 类）的 `fill` 属性会映射到 `{{strokeColor1}}` 而非 `{{fillColor1}}`，以对齐桌面端行为。完整列表见 `scripts/utils/const.ts`。

**默认值判定逻辑（`getFillFallback()`）：**

```
fill = "black" | "#000" | "#000000" → fallback = "currentColor"
fill = 其他值                       → fallback = "transparent"
```

### SVG 源码优化

生成组件时会自动对 SVG 进行精简优化，降低最终产物体积：

| 优化项 | 说明 |
|--------|------|
| 移除 `id` 属性 | 运行时不需要，仅构建时用于颜色映射 |
| 移除 `width="24" height="24"` | 尺寸通过 CSS 控制 |
| 颜色属性 → 模板占位符 | 支持 `fill` / `stroke` 运行时注入 |
| 特殊图标差异化处理 | 31 个图标使用不同的颜色映射策略 |

---


## 📁 项目结构

```
miniprogram-svg-icons/              # Monorepo 根目录
├── resources/                       # SVG 图标资源（按品牌组织）
│   ├── tdesign/                     #   TDesign 图标（~2300+ 个）
│   └── {brand}/                     #   其他品牌图标（自动发现）
├── scripts/                         # 构建 & 发布脚本
│   ├── generate.ts                  # 图标组件生成脚本（→ packages/）
│   ├── build.ts                     # 编译压缩打包脚本（→ dist/）
│   ├── release.ts                   # 交互式发布脚本
│   ├── shared.ts                    # 公共模块（路径、平台配置、工具函数）
│   ├── template/                    # 各平台组件模板
│   │   ├── wechat/                  #   微信小程序模板（.wxml / .wxss）
│   │   ├── alipay/                  #   支付宝小程序模板（.axml / .acss）
│   │   ├── kuaishou/                #   快手小程序模板（.ksml / .css）
│   │   ├── douyin/                  #   抖音小程序模板（.ttml / .ttss）
│   │   ├── baidu/                   #   百度小程序模板（.swan / .css）
│   │   ├── xiaohongshu/             #   小红书小程序模板（.xhsml / .css）
│   │   └── jd/                      #   京东小程序模板（.jxml / .jxss）
│   └── utils/                       # 工具函数
│       ├── const.ts                 #   特殊图标列表（31 个）
│       └── svgTotemplate.ts         #   SVG 解析 & 模板生成引擎
├── packages/                        # 源码产物（由 generate 生成）
│   ├── utils/                       #   @mp-svg-icons/utils 工具集源码
│   │   ├── src/clear/               #     图标裁剪工具源码
│   │   └── package.json
│   ├── wechat/                      #   微信小程序组件包
│   ├── alipay/                      #   支付宝小程序组件包
│   └── ...                          #   其他平台组件包
├── dist/                            # 打包产物（由 build 生成，用于 npm 发布）
│   ├── utils/                       #   @mp-svg-icons/utils 编译产物
│   ├── wechat/                      #   微信小程序压缩产物
│   └── ...                          #   其他平台压缩产物
├── package.json                     # Monorepo 根配置（pnpm workspaces）
├── pnpm-workspace.yaml              # pnpm 工作区配置
└── tsconfig.json                    # TypeScript 配置
```
### 生成产物结构

以微信小程序为例，`packages/wechat/` 目录结构：

```
packages/wechat/
├── icon/                         # 图标组件（Icon）（支持动态切换图标）
│   ├── index.js                 #   组件逻辑（含颜色解析 + Data URI 生成）
│   ├── index.json               #   组件配置
│   ├── index.wxml               #   组件模板
│   └── icons.js                 #   全量图标 SVG 映射表（~1.5MB）
├── package.json
└── README.md
```

---

## 🧩 图标组件（Icon）

项目为每个平台生成图标组件（Icon），通过 `name` 属性动态切换图标。

- 一个组件包含全部图标映射：`icon/icons.js`（~1.5MB）
- 通过 `name` 属性动态切换图标
- 适合图标需要运行时变化的场景
- **建议搭配[图标裁剪工具](#️-图标裁剪)使用**，减小包体积

---

## 🚀 使用方式

### 环境准备

- [Node.js](https://nodejs.org/) >= 20
- [pnpm](https://pnpm.io/)

### 快速开始

```bash
# 克隆项目
git clone https://github.com/anlyyao/miniprogram-svg-icons.git

# 安装依赖
pnpm install

# 生成图标组件库
# 自动扫描 `resources/` 下所有品牌目录，生成完整的图标组件库到 `packages/{platform}/{brand}/` 目录：
pnpm run generate:wechat         # 微信小程序
pnpm run generate:alipay         # 支付宝小程序
pnpm run generate:kuaishou       # 快手小程序
pnpm run generate:douyin         # 抖音小程序
pnpm run generate:baidu          # 百度小程序
pnpm run generate:jd             # 京东小程序
pnpm run generate:xiaohongshu    # 小红书小程序
pnpm run generate                # 全平台生成

# 编译打包（用于 npm 发布）
pnpm run build:wechat            # 微信小程序
pnpm run build                   # 全平台打包

# 交互式发布
# 交互式发布流程:选择子包 → 选择版本号 → 选择 dist-tag → 确认发布。
pnpm run release
```


## 📖 使用方式

### 图标组件（Icon）

通过 `name` 属性指定图标名称，支持**动态切换图标**：

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

> **提示**：图标组件（Icon）包含全量图标映射（~1.5MB），建议配合[图标裁剪工具](#️-图标裁剪)使用。


### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `Number / String` | `24` | 图标尺寸（px） |
| `strokeColor` | `String` | — | 描边颜色，支持 `rgb()` / `rgba()` / HEX 格式 |
| `fillColor` | `String` | — | 填充颜色，支持 `rgb()` / `rgba()` / HEX 格式 |
| `strokeWidth` | `String` | `2` | 描边宽度 |
| `name` | `String` | — | 图标名称 |
| `brand` | `String` | `tdesign` | 品牌名称 |

> **注意**：颜色值内部统一转为 `rgb()` 格式后注入 Data URI，因此 HEX 的 `#` 无需手动转义。

## ⚙️ 图标裁剪

构建产物包含全部 ~2300 个图标，包体积较大。提供独立的裁剪 CLI 工具 `@mp-svg-icons/utils`，可按需移除未使用的图标以减小包体积。

> `@mp-svg-icons/utils` 工具适用于微信、支付宝、抖音、快手、百度、小红书、京东等所有小程序平台。

### 裁剪工作流

<img width="1000" src="https://github.com/user-attachments/assets/c2f6df5b-acc9-4273-a3fc-470baf14eb2d" />


**四阶段流程：**

| 阶段 | 操作 | 说明 |
|------|------|------|
| **📥 输入** | 接收 CLI 参数 | `--pkg-dir`（必须）、`--scan`、`--icons`、`--dry-run` |
| **🔍 分析** | 加载数据 + 扫描源码 | 解析 `icons.js` 映射表 + 扫描 `usingComponents` 引用 |
| **✂️ 裁剪** | 移除未使用图标 | 裁剪 `icons.js` 映射 |
| **📊 输出** | 统计报告 | 输出保留/移除数量，`--dry-run` 仅预览 |

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

### 示例

**扫描项目目录，自动识别已使用的图标并裁剪**：

```bash
npx mp-svg-icons-clear \
  --pkg-dir ./miniprogram_npm/@mp-svg-icons/wechat \
  --scan ./pages ./components
```

**扫描 + 手动补充动态图标**（并集关系，在扫描结果基础上额外保留指定图标）：

```bash
npx mp-svg-icons-clear \
  --pkg-dir ./miniprogram_npm/@mp-svg-icons/wechat \
  --scan ./pages ./components \
  --icons loading,play
```

**仅保留手动指定的图标**：

```bash
npx mp-svg-icons-clear \
  --pkg-dir ./miniprogram_npm/@mp-svg-icons/wechat \
  --icons add,close,check-circle,delete
```

**先预览裁剪结果，确认无误后再执行**：

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
| `--scan` | 否 | 要扫描的项目目录（支持多个，空格分隔） |
| `--icons` | 否 | 逗号分隔的图标名称列表，手动指定要保留的图标 |
| `--dry-run` | 否 | 预览模式，只输出将移除的图标，不实际执行 |

> **说明**：`--scan` 和 `--icons` 至少需要指定一个，两者可同时使用。同时使用时，最终保留的图标为扫描结果与手动指定的**并集**。`--icons` 的典型场景是补充静态分析无法识别的动态图标（如 JS 中动态赋值的图标名）。

### 裁剪原理详解

1. **品牌收集**：扫描图标包目录，识别所有品牌（如 `tdesign/`）
2. **数据加载**：读取 `icon/icons.js` 映射表
3. **源码扫描**（`scanner.ts`）：
   - 解析 JSON 文件中的 `usingComponents` 引用
   - 扫描模板文件中的图标组件标签名
   - 提取图标名称
4. **结果合并**：扫描结果 ∪ `--icons` 手动指定 = 最终保留集
5. **执行裁剪**：
   - 重写 `icons.js`，仅保留使用中的图标 SVG 数据
   - 若图标组件（Icon）未被引用，自动移除 `common/` 目录
6. **输出统计**：报告保留/移除的图标数量

---

## 🌐 平台适配

### 支持平台概览

项目支持 **8 大小程序平台**，分为两类适配模式：

**Behavior 模式**（6 个平台，共用同一套模板逻辑）：
- 微信（`.wxml` / `.wxss`）
- QQ（直接复用 `@mp-svg-icons/wechat`，无需独立包）
- 快手（`.ksml` / `.css`）
- 抖音（`.ttml` / `.ttss`）
- 百度（`.swan` / `.css`）
- 京东（`.jxml` / `.jxss`）

**特殊适配**（2 个平台，需要独立模板）：
- 小红书（`.xhsml` / `.css`）— 不支持 `Behavior`、多字段 `observers`
- 支付宝（`.axml` / `.acss`）— 使用 `Mixin` + `props` + ES5 语法

### 组件 API 差异

| 特性 | 微信 / QQ / 京东 / 快手 / 抖音 / 百度 | 小红书小程序 | 支付宝小程序 |
|------|----------------------------------|--------------|--------------|
| 组件复用机制 | `Behavior` / `behaviors` | 不支持 `Behavior` | `Mixin` / `mixins` |
| 属性定义 | `properties`（`type`/`value`） | `properties`（`type`/`value`） | `props`（直接赋值默认值） |
| 数据访问 | `this.data.xxx` | `this.data.xxx` | `this.props.xxx`（外部）/ `this.data.xxx`（内部） |
| 初始化生命周期 | `lifetimes.attached()` | `lifetimes.attached()` | `didMount()` |
| 销毁生命周期 | `lifetimes.detached()` | `lifetimes.detached()` | `didUnmount()` |
| 属性变化监听 | `observers` 多字段逗号分隔 | 仅支持单字段 `observer` | `didUpdate(prevProps)` 手动 diff |
| 纯数据字段 | 支持 `options.pureDataPattern` | 不支持 | 不支持 |
| JS 语法 | ES6+ 完全支持 | ES6+ 完全支持 | 推荐 ES5，ES6 兼容不稳定 |

### 文件后缀差异

| 文件类型 | 微信 | 支付宝 | 快手 | 抖音 | 百度 | 小红书 | 京东 |
|----------|------|--------|------|------|------|--------|------|
| 模板文件 | `.wxml` | `.axml` | `.ksml` | `.ttml` | `.swan` | `.xhsml` | `.jxml` |
| 样式文件 | `.wxss` | `.acss` | `.css` | `.ttss` | `.css` | `.xhss` | `.jxss` |
| 逻辑文件 | `.js` | `.js` | `.js` | `.js` | `.js` | `.js` | `.js` |
| 配置文件 | `.json` | `.json` | `.json` | `.json` | `.json` | `.json` | `.json` |

### 平台配置定义

每个平台在 `scripts/shared.ts` 的 `PLATFORMS` 中注册配置：

```typescript
export interface PlatformConfig {
  id: string;          // 平台标识
  label: string;       // 平台显示名
  templateExt: string; // 模板文件后缀
  styleExt: string;    // 样式文件后缀
  templateDir: string; // 模板目录名
}
```

> **说明**：
> - 微信、QQ、快手、抖音、百度、京东 6 个平台的组件 API 完全一致，其中 QQ 小程序直接复用微信版本，其余平台共用同一套模板（仅文件后缀不同）。
> - 小红书不支持 `options.pureDataPattern` 和 `observers` 多字段监听，需分开监听 `name` 和 `brand`。
> - 支付宝使用独立 API（`mixins` / `props` / `didMount` / `didUpdate`），且推荐 ES5 语法。

---

## 📤 发布流程

项目使用交互式 CLI 工具进行发布，支持 8 个框架的版本管理和 npm 发布：

<img width="800" src="https://github.com/user-attachments/assets/7bcb460a-5e50-47b7-8c5f-30e7adb591bb" />


**发布步骤：**

| 步骤 | 操作 | 说明 |
|------|------|------|
| 1 | 选择子包 | 微信 / 支付宝 / 快手 / 抖音 / 百度 / 小红书 / 京东 / 工具集 |
| 2 | 选择版本号 | patch / minor / major / 自定义 |
| 3 | 选择 dist-tag | latest / beta / next / alpha |
| 4 | 确认发布信息 | 预览版本号、Tag、包名 |
| 5 | npm publish | 执行发布到 npm registry |
| 6 | Git Tag | 自动创建版本 Tag（如 `v1.2.3`） |

**发布工具特性：**

- **交互式 TUI**：基于 `stdin` 的选择器（`selectOne()`）、确认框（`confirm()`）、文本输入（`textInput()`）
- **版本管理**：支持 semver 规范（patch / minor / major / 自定义）
- **dist-tag 选择**：支持 latest / beta / next / alpha
- **Git 集成**：自动创建版本 Tag，支持分支检查
- **失败回滚**：发布失败时自动恢复 `package.json` 版本号
- **Dry-run 支持**：`--dry-run` 模式预览发布内容

---

## 📋 核心文件说明

| 文件 | 说明 |
|------|------|
| `scripts/shared.ts` | 公共模块：路径常量、7 平台配置（`PLATFORMS`）、品牌扫描（`scanBrands()`）、SVG 加载、模板读取、代码生成函数 |
| `scripts/generate.ts` | 生成入口：扫描品牌 → 加载 SVG → 读取模板 → 生成组件到 `packages/`（未压缩） |
| `scripts/build.ts` | 打包入口：从 SVG 直接生成压缩产物到 `dist/`，生成图标组件（Icon） |
| `scripts/release.ts` | 发布工具：交互式 TUI，支持 8 框架、semver 版本管理、dist-tag、Git Tag、失败回滚 |
| `scripts/utils/svgTotemplate.ts` | SVG 解析引擎：xmldom 解析 → 颜色占位符替换（`normalizeColor()`）→ 模板字符串生成 |
| `scripts/utils/const.ts` | 特殊图标常量：31 个需要特殊颜色映射的图标名列表 |
| `packages/utils/src/clear/cli.ts` | 裁剪工具 CLI 入口：参数解析（`--pkg-dir`/`--scan`/`--icons`/`--dry-run`） |
| `packages/utils/src/clear/index.ts` | 裁剪主逻辑：品牌收集 → 数据加载 → 扫描 → 裁剪 → 统计输出 |
| `packages/utils/src/clear/scanner.ts` | 项目扫描器：扫描 `usingComponents` JSON 引用和模板中的组件标签 |
| `packages/utils/src/clear/icon.ts` | `icons.js` 映射表的读写与裁剪逻辑 |
| `packages/utils/src/clear/single-icon.ts` | 单图标组件目录的枚举与删除逻辑 |

---

## 🛠️ 开发工具链

| 工具 | 版本 | 用途 |
|------|------|------|
| [pnpm](https://pnpm.io/) | 10.27.0 | 包管理 & Monorepo Workspaces |
| [TypeScript](https://www.typescriptlang.org/) | ^5.3.0 | 构建脚本开发语言 |
| [tsx](https://github.com/esbuild-kit/tsx) | ^4.7.0 | 直接运行 TypeScript 脚本（基于 esbuild） |
| [terser](https://terser.org/) | ^5.46.1 | JS 压缩（build 阶段，支持 ES5 / ES2015 双配置） |
| [xmldom](https://github.com/jindw/xmldom) | ^0.6.0 | SVG XML 解析（构建时 SVG → 结构化对象） |
| [fs-extra](https://github.com/jprichardson/node-fs-extra) | ^11.3.0 | 增强文件系统操作（ensureDir、copy、remove 等） |
| [npm-run-all2](https://github.com/mysticatea/npm-run-all) | ^6.2.0 | 串行/并行运行多个 npm scripts |

---

## 📚 扩展指南

### 新增品牌

1. 在 `resources/{brand}/` 下放置 SVG 图标文件（文件名即图标名）
2. 确保 SVG 中使用语义化 `id` 标识颜色区域（`fill1`、`fill2`、`stroke1`、`stroke2`）
3. 运行 `pnpm run generate` 即可自动识别并生成对应品牌的组件

> **品牌自动发现机制**：`scanBrands()` 函数会扫描 `resources/` 目录下所有包含 SVG 文件的子目录，自动作为品牌处理。

### 新增平台

**步骤 1 — 创建模板文件**

在 `scripts/template/{platform}/` 下创建以下文件：

```
scripts/template/{platform}/
└── icon/
    ├── index.{模板后缀}          # 图标组件（Icon）模板
    ├── index.js                 # 图标组件（Icon）逻辑（含颜色解析 + Data URI 生成）
    └── index.json               # 图标组件（Icon）配置
```

**步骤 2 — 注册平台配置**

在 `scripts/shared.ts` 的 `PLATFORMS` 中添加：

```typescript
newplatform: {
  id: 'newplatform',
  label: '新平台小程序',
  templateExt: '.nxml',
  styleExt: '.ncss',
  templateDir: 'newplatform',
},
```

**步骤 3 — 添加构建命令**

在根 `package.json` 的 `scripts` 中添加：

```json
{
  "generate:newplatform": "tsx scripts/generate.ts newplatform",
  "build:newplatform": "tsx scripts/build.ts newplatform"
}
```

**步骤 4 — 创建包配置**

创建 `packages/newplatform/package.json`：

```json
{
  "name": "@mp-svg-icons/newplatform",
  "version": "0.0.1",
  "description": "新平台小程序 SVG 多色图标组件"
}
```

并在 `pnpm-workspace.yaml` 中注册。

**步骤 5 — 添加发布条目**

在 `scripts/release.ts` 的 `FRAMEWORKS` 和 `getPackageConfig` 中添加对应条目。

---

## 🔗 相关链接

- [TDesign 官方图标库](https://github.com/Tencent/tdesign-icons)
- [TDesign 小程序组件库](https://tdesign.tencent.com/miniprogram/overview)
- [演示项目源码](https://github.com/anlyyao/miniprogram-svg-icon-demo)

---

## 📄 License

遵循 [MIT 协议](https://github.com/anlyyao/miniprogram-svg-icons/blob/develop/LICENSE)
