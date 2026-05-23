# example-utils — @mp-svg-icons/utils 功能测试示例

本示例用于完整测试图标裁剪工具（`@mp-svg-icons/utils`）的功能，包括**命令行使用**和 **Node.js API** 两种方式。

## 目录结构

```
example-utils/
├── scripts/
│   ├── test-node-api.js       # Node.js API 完整测试脚本
│   └── test-cli.sh            # CLI 完整测试脚本
├── pages/
│   ├── index/                 # 基础裁剪测试（多图标、多品牌）
│   ├── multi-brand/           # 多品牌 + 自定义标签名测试
│   ├── dynamic-icons/         # 动态图标名测试（需 --icons 手动指定）
│   └── subpackage/             # 分包页面图标引用测试
├── miniprogram_npm/
│   ├── @mp-svg-icons/wechat/  # SVG 图标包（含多品牌 icons.js）
│   ├── tdesign-miniprogram/   # TDesign iconfont 组件库
│   └── @vant/weapp/           # Vant iconfont 组件库
├── package.json               # 包含所有测试脚本命令
└── README.md                  # 本文件
```

## 前置要求

需要先编译 `packages/utils` 源码：

```bash
# 在项目根目录
pnpm build
```

## 运行测试

> 测试示例中使用到了多品牌图标，而安装的 `@mp-svg-icons/wechat` 目前只有 tdesign 品牌，所以需要手动构建符合预期的 icons.js，否则 npm run test 会出现失败用例

```js
// examples/example-utils/miniprogram_npm/@mp-svg-icons/wechat/icon/icons.js 测试数据
module.exports = {
  tdesign: {
    add: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g><path stroke="{s1 || 'currentColor'}" stroke-linecap="square" stroke-width="{sw}" d="M12 5v14m7-7H5" /></g></svg>`,
    'arrow-left': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g><path stroke="{s1 || 'currentColor'}" stroke-linecap="square" stroke-width="{sw}" d="M11 6.5 5.5 12l5.5 5.5M6.75 12h13" /></g></svg>`,
    'arrow-right': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g><path stroke="{s1 || 'currentColor'}" stroke-linecap="square" stroke-width="{sw}" d="m13 17.5 5.5-5.5L13 6.5m4.25 5.5h-13" /></g></svg>`,
    'check-circle': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g><path fill="{f1 || 'transparent'}" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12" /><path stroke="{s1 || 'currentColor'}" stroke-linecap="square" stroke-width="{sw}" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Z" /><path stroke="{s2 || 'currentColor'}" stroke-linecap="square" stroke-width="{sw}" d="m16.5 9-6 6-3-3" /></g></svg>`,
    close: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g><path stroke="{s1 || 'currentColor'}" stroke-linecap="square" stroke-width="{sw}" d="M16.95 7.05 12 12m0 0-4.95 4.95M12 12l4.95 4.95M12 12 7.05 7.05" /></g></svg>`,
    delete: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g><path fill="{f1 || 'transparent'}" d="M5 5h14l-.5 17h-13z" /><path stroke="{s1 || 'currentColor'}" stroke-linecap="square" stroke-width="{sw}" d="M21 5H3m2 0h14l-.5 17h-13zm3.5-3h7v3h-7z" /><path stroke="{s2 || 'currentColor'}" stroke-linecap="square" stroke-width="{sw}" d="M12 9v9" /></g></svg>`,
    home: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g><path fill="{f1 || 'transparent'}" d="m3 10 9-7.5 9 7.5v11H3z" /><path fill="{f2 || 'transparent'}" d="M9 14h6v7H9z" /><path stroke="{s2 || 'currentColor'}" stroke-linecap="square" stroke-width="{sw}" d="M9 14h6v7H9z" /><path stroke="{s1 || 'currentColor'}" stroke-linecap="square" stroke-width="{sw}" d="m3 10 9-7.5 9 7.5v11H3z" /></g></svg>`,
    loading: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="{s1 || 'currentColor'}" d="M12 2.25c-5.384 0-9.75 4.366-9.75 9.75s4.366 9.75 9.75 9.75v-2.437A7.312 7.312 0 1 1 19.313 12h2.437c0-5.384-4.366-9.75-9.75-9.75" /></svg>`,
    search: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g><path fill="{f1 || 'transparent'}" d="M15.803 15.803A7.5 7.5 0 1 1 5.197 5.197a7.5 7.5 0 0 1 10.606 10.606" /><path stroke="{s2 || 'currentColor'}" stroke-linecap="square" stroke-width="{sw}" d="m15.803 15.804 5.303 5.303" /><path stroke="{s1 || 'currentColor'}" stroke-linecap="square" stroke-width="{sw}" d="M15.803 15.803A7.5 7.5 0 1 1 5.197 5.197a7.5 7.5 0 0 1 10.606 10.606Z" /></g></svg>`,
    setting: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g><path fill="{f1 || 'transparent'}" fill-rule="evenodd" d="M20.66 7 12 2 3.34 7v10L12 22l8.66-5zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8" clip-rule="evenodd" /><path fill="{f2 || 'transparent'}" d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0" /><path stroke="{s1 || 'currentColor'}" stroke-linecap="square" stroke-width="{sw}" d="m12 2 8.66 5v10L12 22l-8.66-5V7z" /><path stroke="{s2 || 'currentColor'}" stroke-linecap="square" stroke-width="{sw}" d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" /></g></svg>`,
  },
  material: {
    add: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g><path stroke="{s1 || 'currentColor'}" stroke-linecap="square" stroke-width="{sw}" d="M12 5v14m7-7H5" /></g></svg>`,
    close: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g><path stroke="{s1 || 'currentColor'}" stroke-linecap="square" stroke-width="{sw}" d="M16.95 7.05 12 12m0 0-4.95 4.95M12 12l4.95 4.95M12 12 7.05 7.05" /></g></svg>`,
    home: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g><path fill="{f1 || 'transparent'}" d="m3 10 9-7.5 9 7.5v11H3z" /><path fill="{f2 || 'transparent'}" d="M9 14h6v7H9z" /><path stroke="{s2 || 'currentColor'}" stroke-linecap="square" stroke-width="{sw}" d="M9 14h6v7H9z" /><path stroke="{s1 || 'currentColor'}" stroke-linecap="square" stroke-width="{sw}" d="m3 10 9-7.5 9 7.5v11H3z" /></g></svg>`,
    star: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g><path fill="{f1 || 'transparent'}" d="m12 3.676 2.187 6.29 6.658.136-5.307 4.024 1.928 6.374L12 16.696 6.534 20.5l1.928-6.374-5.307-4.024 6.659-.136z" /><path stroke="{s1 || 'currentColor'}" stroke-linecap="square" stroke-width="{sw}" d="m12 3.676 2.187 6.29 6.658.136-5.307 4.024 1.928 6.374L12 16.696 6.534 20.5l1.928-6.374-5.307-4.024 6.659-.136z" /></g></svg>`,
    search: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g><path fill="{f1 || 'transparent'}" d="M15.803 15.803A7.5 7.5 0 1 1 5.197 5.197a7.5 7.5 0 0 1 10.606 10.606" /><path stroke="{s2 || 'currentColor'}" stroke-linecap="square" stroke-width="{sw}" d="m15.803 15.804 5.303 5.303" /><path stroke="{s1 || 'currentColor'}" stroke-linecap="square" stroke-width="{sw}" d="M15.803 15.803A7.5 7.5 0 1 1 5.197 5.197a7.5 7.5 0 0 1 10.606 10.606Z" /></g></svg>`,
  },
};
```

### 一键运行所有测试

```bash
cd examples/example-utils
npm run test
```

### 分别运行

```bash
# Node.js API 测试
npm run test:node

# CLI 测试
npm run test:cli
```

## 测试覆盖场景

### 1. SVG 图标裁剪（`clear` / `mp-svg-icons-clear`）

| 场景                   | 命令                          | 说明                          |
| ---------------------- | ----------------------------- | ----------------------------- |
| 扫描模式 (dry-run)     | `npm run svgicon-clear:scan`  | 扫描 pages 目录，预览裁剪结果 |
| 手动指定模式 (dry-run) | `npm run svgicon-clear:icons` | 只保留 add,close,home         |
| 混合模式 (dry-run)     | `npm run svgicon-clear:mix`   | 扫描 + 手动补充动态图标       |
| 实际执行               | `npm run svgicon-clear:run`   | 真正裁剪（会修改文件）        |

### 2. iconfont 图标裁剪（`iconfontClear` / `mp-iconfont-clear`）

| 场景                   | 命令                                   | 说明                          |
| ---------------------- | -------------------------------------- | ----------------------------- |
| TDesign 扫描 (dry-run) | `npm run iconfont-clear:tdesign:scan`  | 扫描 pages，预览 TDesign 裁剪 |
| TDesign 手动 (dry-run) | `npm run iconfont-clear:tdesign:icons` | 只保留 home,search,close      |
| TDesign 执行           | `npm run iconfont-clear:tdesign:run`   | 真正裁剪 TDesign CSS          |
| Vant 扫描 (dry-run)    | `npm run iconfont-clear:vant:scan`     | 扫描 pages，预览 Vant 裁剪    |
| Vant 手动 (dry-run)    | `npm run iconfont-clear:vant:icons`    | 只保留 close,search,wechat    |
| Vant 执行              | `npm run iconfont-clear:vant:run`      | 真正裁剪 Vant CSS             |

### 3. 测试覆盖的功能点

#### CLI 功能

- [x] `--help` 帮助信息输出
- [x] `--pkg-dir` 必填参数校验
- [x] `--scan` / `--icons` 至少指定一个的校验
- [x] `--pkg-dir` 路径不存在时的错误处理
- [x] `--scan` 支持多个目录（空格分隔）
- [x] `--icons` 逗号分隔的图标名列表
- [x] `--dry-run` 预览模式（不修改文件）
- [x] 无效图标名的警告提示
- [x] 实际裁剪执行

#### Node.js API 功能

- [x] `clear()` 基础调用与返回值结构
- [x] `clear()` 多品牌数据处理（tdesign + material）
- [x] `clear()` 扫描目录识别图标使用
- [x] `clear()` 手动指定图标名列表
- [x] `clear()` 混合模式（扫描 + 手动指定取并集）
- [x] `clear()` 部分目录扫描
- [x] `clear()` 实际裁剪验证
- [x] `clear()` 参数校验与错误抛出
- [x] `clear()` 所有图标都在使用中的边界场景
- [x] `iconfontClear()` TDesign CSS 裁剪
- [x] `iconfontClear()` Vant CSS 裁剪
- [x] `iconfontClear()` 扫描模式
- [x] `iconfontClear()` 手动指定图标
- [x] `iconfontClear()` 混合模式
- [x] `iconfontClear()` 实际裁剪验证
- [x] `iconfontClear()` 参数校验与错误抛出
- [x] `iconfontClear()` 只保留一个图标的边界场景

#### 场景覆盖

- [x] 默认品牌（tdesign）图标扫描
- [x] `brand` 属性指定非默认品牌
- [x] 自定义标签名识别（如 `my-icon` 替代 `svg-icon`）
- [x] 动态图标名（JS 变量绑定，需 `--icons` 补充）
- [x] 分包页面中的图标引用
- [x] 多目录同时扫描
- [x] 不存在的图标名警告
- [x] 文件裁剪后恢复验证

## 页面图标使用汇总

| 页面          | SVG 图标（tdesign）              | SVG 图标（material） | TDesign iconfont      | Vant iconfont         |
| ------------- | -------------------------------- | -------------------- | --------------------- | --------------------- |
| index         | add, close, search               | home, star           | home, search, add     | close, search, home-o |
| multi-brand   | arrow-left, arrow-right, loading | add, close           | —                     | —                     |
| dynamic-icons | delete + {{dynamicIcon}}         | —                    | close + {{tIconName}} | —                     |
| subpackage    | check-circle, home               | —                    | —                     | star-o, like, cart-o  |
