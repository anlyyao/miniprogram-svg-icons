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

### 一键运行所有测试

```bash
cd examples/example-utils
npm test
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
