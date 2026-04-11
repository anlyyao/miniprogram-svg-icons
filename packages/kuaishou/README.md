# @mp-svg-icons/kuaishou

快手小程序 SVG 多色图标组件库，支持多品牌图标源（如 TDesign）。

## 特性

- ✅ **完整色彩支持** — 单色、双色、多色图标完美渲染
- ✅ **运行时颜色控制** — 通过属性动态修改 `fill` / `stroke` 颜色
- ✅ **零依赖运行** — Data URI 方案，无需额外资源加载
- ✅ **多品牌支持** — 支持 TDesign 等多种图标品牌
- ✅ **双组件模式** — 单图标组件（tree-shaking）+ 通用 icon 组件（动态切换）

## 安装

```bash
npm install @mp-svg-icons/kuaishou
# 或
pnpm add @mp-svg-icons/kuaishou
```

## 目录结构

```
@mp-svg-icons/kuaishou/
├── common/                    # 公共 Behavior（颜色解析 + Data URI 生成）
│   └── use-icon.js
├── icon/                      # 通用 icon 组件（全量图标）
│   ├── index.js
│   ├── index.json
│   ├── index.ksml
│   └── icons.js               # 全量图标 SVG 映射表（~1.5MB）
└── tdesign/                   # TDesign 品牌图标
    ├── {name}-icon/           # 单图标组件目录
    │   ├── index.js
    │   ├── index.json
    │   └── index.ksml
    └── ...
```

## 使用方式

### 方式一：单图标组件（推荐）

每个图标生成一个独立组件目录，按需引入，**tree-shaking 友好**，体积极小（每个组件仅 ~1KB）：

```json
// 页面或组件的 JSON 配置
{
  "usingComponents": {
    "add-icon": "@mp-svg-icons/kuaishou/tdesign/add-icon",
    "close-icon": "@mp-svg-icons/kuaishou/tdesign/close-icon"
  }
}
```

```xml
<!-- 模板中使用 -->
<add-icon size="{{48}}" />
<close-icon size="{{32}}" stroke-color="#0052D9" fill-color="#E7EFFF" />
```

### 方式二：通用 icon 组件

通过 `name` 属性指定图标名称，适合需要**动态切换图标**的场景：

```json
{
  "usingComponents": {
    "t-icon": "@mp-svg-icons/kuaishou/icon"
  }
}
```

```xml
<t-icon name="add" size="{{48}}" />
<t-icon name="close" size="{{32}}" stroke-color="#0052D9" fill-color="#E7EFFF" />
```

## 组件属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `Number / String` | `24` | 图标尺寸（px） |
| `strokeColor` | `String` | — | 描边颜色，支持 `rgb()` / `rgba()` / HEX 格式 |
| `fillColor` | `String` | — | 填充颜色，支持 `rgb()` / `rgba()` / HEX 格式 |
| `strokeWidth` | `String` | `2` | 描边宽度 |
| `name` | `String` | — | 图标名称（仅通用 icon 组件支持） |
| `brand` | `String` | `tdesign` | 品牌名称（仅通用 icon 组件支持） |

> **注意**：颜色值内部统一转为 `rgb()` 格式后注入 Data URI，因此 HEX 的 `#` 无需手动转义。

## License

MIT
