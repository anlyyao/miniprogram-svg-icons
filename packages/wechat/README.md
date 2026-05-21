# @mp-svg-icons/wechat

微信小程序 SVG 多色图标组件库，支持多品牌图标源（如 TDesign）。

## ✨ 特性

- ✅ **完整色彩支持** — 单色、双色、多色图标完美渲染
- ✅ **运行时颜色控制** — 通过属性动态修改 `fill` / `stroke` 颜色
- ✅ **零依赖运行** — Data URI 方案，无需额外资源加载
- ✅ **多品牌支持** — 支持 TDesign 等多种图标品牌

> 💡 **QQ 小程序兼容**：QQ 小程序与微信小程序的组件规范完全一致（`Behavior`、`properties`、`observers` 等 API 相同），可直接安装本包使用，无需额外适配。

## 📥 安装

```bash
npm install @mp-svg-icons/wechat
# 或
pnpm add @mp-svg-icons/wechat
```

安装后在微信开发者工具（或 QQ 小程序开发者工具）中点击「工具」→「构建 npm」。

## 📁 目录结构

```
@mp-svg-icons/wechat/
├── icon/                      # 图标组件（Icon）（全量图标）
│   ├── index.js               #   组件逻辑（含颜色解析 + Data URI 生成）
│   ├── index.json
│   ├── index.wxml
│   └── icons.js               # 全量图标 SVG 映射表（~1MB）
```

## 🚀 使用方式

### 图标组件（Icon）

通过 `name` 属性指定图标名称，支持**动态切换图标**。

#### 1. 注册组件

在页面或组件的 `.json` 文件中引入：

```json
{
  "usingComponents": {
    "t-icon": "@mp-svg-icons/wechat/icon"
  }
}
```

#### 2. 使用组件

在 `.wxml` 文件中使用：

```xml
<t-icon name="add" size="{{48}}" />

<t-icon name="send" size="{{32}}" stroke-color="#0766ff" fill-color="#e70d0d" />

<t-icon name="robot-2" size="{{32}}" stroke-color="{{['#0052D9', '#e40a23']}}" fill-color="{{['#e1e50f', '#632bc9']}}" />
```

> **提示**：图标组件（Icon）包含全量图标映射（~1MB），建议配合 `@mp-svg-icons/utils` 裁剪工具使用。

## ⚙️ 组件属性

| 属性        | 类型              | 默认值  | 说明                                         |
| ----------- | ----------------- | ------- | -------------------------------------------- |
| size        | Number / String   | 24      | 图标尺寸（px）                               |
| strokeColor | String / String[] | —       | 描边颜色，支持 `rgb()` / `rgba()` / HEX 格式 |
| fillColor   | String / String[] | —       | 填充颜色，支持 `rgb()` / `rgba()` / HEX 格式 |
| strokeWidth | Number            | 2       | 描边宽度                                     |
| name        | String            | —       | 图标名称                                     |
| brand       | String            | tdesign | 品牌名称                                     |

> **注意**：颜色值内部统一转为 `rgb()` 格式后注入 Data URI，因此 HEX 的 `#` 无需手动转义。

## 📄 License

MIT © [anlyyao](https://github.com/anlyyao)

<p align="center">
  如果这个项目对你有帮助，请给个 ⭐️ 支持一下！
</p>
