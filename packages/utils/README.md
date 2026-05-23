# @mp-svg-icons/utils

小程序 SVG 图标工具集 - 支持微信、支付宝、快手、抖音、百度、小红书、京东等多平台小程序。

## 📦 包含工具

- **mp-svg-icons-clear** - SVG 图标裁剪工具，按需移除未使用的 SVG 图标以减小包体积
- **mp-iconfont-clear** - iconfont 图标裁剪工具，移除 iconfont 组件库中未使用的图标 CSS 规则

## 📥 安装

```bash
npm install @mp-svg-icons/utils -D
# 或
pnpm add @mp-svg-icons/utils -D
```

## 🚀 使用方式

### CLI 命令

```bash
# SVG 图标裁剪
npx mp-svg-icons-clear --pkg-dir <path> [--scan <dirs...>] [--icons <names>] [--dry-run]

# iconfont 图标裁剪
npx mp-iconfont-clear --pkg-dir <path> [--scan <dirs...>] [--icons <names>] [--dry-run]
```

### 📋 参数说明

| 参数        | 必填 | 说明                                         |
| ----------- | ---- | -------------------------------------------- |
| `--pkg-dir` | 是   | 图标 npm 包目录路径                          |
| `--scan`    | 否   | 要扫描的项目目录（支持多个，空格分隔）       |
| `--icons`   | 否   | 逗号分隔的图标名称列表，手动指定要保留的图标 |
| `--dry-run` | 否   | 预览模式，只输出将移除的图标，不实际执行     |

> **说明**：`--scan` 和 `--icons` 至少需要指定一个，两者可同时使用。同时使用时，最终保留的图标为扫描结果与手动指定的**并集**。`--icons` 的典型场景是补充静态分析无法识别的动态图标（如 JS 中动态赋值的图标名）。

### 💡 示例

#### mp-svg-icons-clear

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

**按品牌精确指定要保留的图标**（仅保留 tdesign 品牌的 add，material 品牌的 home）：

```bash
npx mp-svg-icons-clear \
  --pkg-dir ./miniprogram_npm/@mp-svg-icons/wechat \
  --icons '{ tdesign: ['add'], material: ['home'] }'
```

**先预览裁剪结果，确认无误后再执行**：

```bash
npx mp-svg-icons-clear \
  --pkg-dir ./miniprogram_npm/@mp-svg-icons/wechat \
  --scan ./pages ./components \
  --dry-run
```

#### mp-iconfont-clear

**裁剪 tdesign-miniprogram 的图标**：

```bash
npx mp-iconfont-clear \
  --pkg-dir ./miniprogram_npm/tdesign-miniprogram \
  --scan ./pages ./components
```

**裁剪 @vant/weapp 的图标**：

```bash
npx mp-iconfont-clear \
  --pkg-dir ./miniprogram_npm/@vant/weapp \
  --scan ./pages ./components
```

**仅保留手动指定的图标**：

```bash
npx mp-iconfont-clear \
  --pkg-dir ./miniprogram_npm/tdesign-miniprogram \
  --icons home,close,check-circle
```

**预览模式**：

```bash
npx mp-iconfont-clear \
  --pkg-dir ./miniprogram_npm/tdesign-miniprogram \
  --scan ./pages \
  --dry-run
```

## 🔧 编程方式调用

```typescript
// SVG 图标裁剪
import { clear } from '@mp-svg-icons/utils';
// 或者
import { clear } from '@mp-svg-icons/utils/clear';

// 方式一：icons 为数组。图标会被保留在**实际拥有该图标的品牌**中（如果多个品牌都有同名图标，则都保留）。
const result = clear({
  scanDirs: ['./pages', './components'],
  icons: ['loading'],
  pkgDir: './miniprogram_npm/@mp-svg-icons/wechat',
  dryRun: false,
});

// 方式二：icons 为对象（按品牌精确指定保留的图标）
const result2 = clear({
  scanDirs: ['./pages', './components'],
  icons: { tdesign: ['add', 'close'], material: ['home'] },
  pkgDir: './miniprogram_npm/@mp-svg-icons/wechat',
  dryRun: false,
});

console.log(`保留 ${result.usedCount} 个图标，移除 ${result.removedCount} 个`);
console.log(`节省 ${result.totalSavedBytes} 字节`);
```

```typescript
// iconfont 图标裁剪
import { iconfontClear } from '@mp-svg-icons/utils';
// 或者
import { iconfontClear } from '@mp-svg-icons/utils/iconfont-clear';

const result = iconfontClear({
  scanDirs: ['./pages', './components'],
  icons: [],
  pkgDir: './miniprogram_npm/tdesign-miniprogram',
  dryRun: false,
});

console.log(`保留 ${result.usedIcons.length} 个图标，移除 ${result.removedIcons.length} 个`);
console.log(`节省 ${result.savedBytes} 字节`);
```

## ✂️ 裁剪原理

### mp-svg-icons-clear

1. **品牌收集**：扫描图标包目录，识别所有品牌（如 `tdesign/`）
2. **数据加载**：读取 `icon/icons.js` 映射表，获取所有可用图标数据
3. **源码扫描**：
   - 解析 JSON 文件中的 `usingComponents` 引用
   - 扫描模板文件中的图标组件标签名
   - 提取图标名称
4. **结果合并**：扫描结果 ∪ `--icons` 手动指定 = 最终保留集
5. **执行裁剪**：重写 `icons.js`，仅保留使用中的图标 SVG 数据
6. **输出统计**：报告保留/移除的图标数量

### mp-iconfont-clear

1. **icon 目录检测**：自动检测 npm 包目录下的 icon 子目录及其样式文件（`.wxss`/`.acss`/`.css`/`.ttss`）
2. **前缀识别**：自动识别 iconfont CSS 前缀（如 `t-icon`、`van-icon`）
3. **规则解析**：提取所有 `.prefix-iconName:before{content:...}` 格式的图标规则
4. **源码扫描**：
   - 解析 JSON 文件中的 `usingComponents` 引用
   - 扫描模板文件中图标组件标签的 `name` 属性值
5. **执行裁剪**：重写样式文件，仅保留使用中的图标 CSS 规则
6. **输出统计**：报告保留/移除的图标数量和节省的字节数

### 🎯 支持的 iconfont 组件库

任何使用 `.prefix-iconName:before{content:"\\eXXX"}` 模式的 iconfont 组件库，包括但不限于：

- `tdesign-miniprogram`（前缀 `t-icon`，约 2350 个图标）
- `@vant/weapp`（前缀 `van-icon`，约 260 个图标）
- 其他自定义 iconfont 组件

## 📱 支持的小程序平台

- 微信（`.wxml` / `.wxss`）
- 支付宝（`.axml` / `.acss`）
- 百度（`.swan` / `.css`）
- 抖音（`.ttml` / `.ttss`）
- 快手（`.ksml` / `.css`）
- 小红书（`.xhsml` / `.css`）
- 京东（`.jxml` / `.jxss`）

## 📄 License

MIT © [anlyyao](https://github.com/anlyyao)

<p align="center">
  如果这个项目对你有帮助，请给个 ⭐️ 支持一下！
</p>
