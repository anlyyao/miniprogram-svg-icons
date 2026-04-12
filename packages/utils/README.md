# @mp-svg-icons/utils

小程序 SVG 图标工具集 - 支持微信、支付宝、快手、抖音、百度、小红书、京东等多平台小程序。

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
| `--icons` | 否 | 逗号分隔的图标名称列表，手动指定要保留的图标（保留 `icons.js` 映射表中对应的图标数据） |
| `--dry-run` | 否 | 预览模式，只输出将移除的图标，不实际执行 |

> **说明**：`--scan` 和 `--icons` 至少需要指定一个，两者可同时使用。同时使用时，最终保留的图标为扫描结果与手动指定的**并集**。`--icons` 的典型场景是补充静态分析无法识别的动态图标（如 JS 中动态赋值的图标名）。

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

## 编程方式调用

```typescript
import { clear } from '@mp-svg-icons/utils';
// 或者
import { clear } from '@mp-svg-icons/utils/clear';

const result = clear({
  scanDirs: ['./pages', './components'],
  includeIcons: ['loading'],
  pkgDir: './miniprogram_npm/@mp-svg-icons/wechat',
  dryRun: false,
});

console.log(`保留 ${result.usedCount} 个图标，移除 ${result.removedCount} 个`);
console.log(`节省 ${result.totalSavedBytes} 字节`);
```

## 裁剪原理

1. **品牌收集**：扫描图标包目录，识别所有品牌（如 `tdesign/`）
2. **数据加载**：读取 `icon/icons.js` 映射表，获取所有可用图标数据
3. **源码扫描**（`scanner.ts`）：
   - 解析 JSON 文件中的 `usingComponents` 引用
   - 扫描模板文件中的图标组件标签名
   - 提取图标名称
4. **结果合并**：扫描结果 ∪ `--icons` 手动指定 = 最终保留集
5. **执行裁剪**：
   - 重写 `icons.js`，仅保留使用中的图标 SVG 数据
   - 若图标组件（Icon）未被引用，自动移除 `common/` 目录
6. **输出统计**：报告保留/移除的图标数量

## 支持的小程序平台

- 微信（`.wxml` / `.wxss`）
- 支付宝（`.axml` / `.acss`）
- 百度（`.swan` / `.css`）
- 抖音（`.ttml` / `.ttss`）
- 快手（`.ksml` / `.css`）
- 小红书（`.xhsml` / `.css`）
- 京东（`.jxml` / `.jxss`）

## License

MIT
