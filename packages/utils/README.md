# @mp-svg-icons/utils

小程序 SVG 图标工具集 - 支持微信、支付宝、快手等多平台小程序。

## 包含工具

- **mp-svg-icons-clear** - 图标裁剪工具，按需移除未使用的图标以减小包体积

## 安装

```bash
npm install @mp-svg-icons/utils -D
# 或
pnpm add @mp-svg-icons/utils -D
```

## 使用方式

### CLI 命令

```bash
npx mp-svg-icons-clear --pkg-dir <path> [--scan <dirs...>] [--icons <names>] [--dry-run]
```

### 参数说明

| 参数 | 必填 | 说明 |
|------|------|------|
| `--pkg-dir` | 是 | 图标 npm 包目录路径 |
| `--scan` | 否 | 要扫描的项目目录（支持多个，空格分隔） |
| `--icons` | 否 | 逗号分隔的图标名称列表，手动指定要保留的图标。**注意：仅保护通用组件（`icons.js` 映射表），不保护单图标组件目录** |
| `--dry-run` | 否 | 预览模式，只输出将移除的图标，不实际执行 |

> **说明**: `--scan` 和 `--icons` 至少需要指定一个，两者可同时使用。同时使用时，最终保留的图标为扫描结果与手动指定的**并集**。

### 示例

扫描项目目录，自动识别已使用的图标并裁剪：

```bash
npx mp-svg-icons-clear \
  --pkg-dir ./miniprogram_npm/tdesign-icon-wechat \
  --scan ./pages ./components
```

扫描 + 手动补充动态图标：

```bash
npx mp-svg-icons-clear \
  --pkg-dir ./miniprogram_npm/tdesign-icon-wechat \
  --scan ./pages ./components \
  --icons loading,play
```

仅保留手动指定的图标：

```bash
npx mp-svg-icons-clear \
  --pkg-dir ./miniprogram_npm/tdesign-icon-wechat \
  --icons add,close,check-circle,delete
```

先预览裁剪结果，确认无误后再执行：

```bash
npx mp-svg-icons-clear \
  --pkg-dir ./miniprogram_npm/tdesign-icon-wechat \
  --scan ./pages ./components \
  --dry-run
```

## 编程方式调用

```typescript
import { clear } from '@mp-svg-icons/utils';
// 或者
import { clear } from '@mp-svg-icons/utils/clear';

const result = clear({
  scanDirs: ['./pages', './components'],
  includeIcons: ['loading'],
  pkgDir: './miniprogram_npm/tdesign-icons-wechat',
  dryRun: false,
});

console.log(`保留 ${result.usedCount} 个图标，移除 ${result.removedCount} 个`);
console.log(`节省 ${result.totalSavedBytes} 字节`);
```

## 裁剪原理

1. 加载图标包中的全量图标数据（`icon/icons.js` 映射表 + 单图标组件目录）
2. 通过 `--scan` 扫描项目源码中 `usingComponents` 的引用和模板中的图标名
3. 通过 `--icons` 手动补充需要保留的图标（两者取并集）
4. 裁剪 `icons.js` 映射表，只保留使用中的图标 SVG 数据
5. 移除未使用的 `{name}-icon/` 单图标组件目录
6. 若通用 icon 组件和所有单图标组件均未被项目引用，自动移除 `common/` 公共目录

## 支持的小程序平台

- 微信 (.wxml/.wxss)
- 支付宝 (.axml/.acss)
- 百度 (.swan/.css)
- 抖音 (.ttml/.ttss)
- 快手 (.ksml/.css)
- 小红书 (.xhsml/.css)
- 京东 (.jxml/.jxss)

## License

MIT
