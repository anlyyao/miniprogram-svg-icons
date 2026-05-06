# 贡献指南 | Contributing Guide

首先，感谢你考虑为 **miniprogram-svg-icons** 做出贡献！🎉

Thank you for considering contributing to **miniprogram-svg-icons**! 🎉

---

## 📋 目录 | Table of Contents

- [行为准则 | Code of Conduct](#行为准则--code-of-conduct)
- [如何贡献 | How to Contribute](#如何贡献--how-to-contribute)
- [开发环境设置 | Development Setup](#开发环境设置--development-setup)
- [项目结构 | Project Structure](#项目结构--project-structure)
- [开发工作流 | Development Workflow](#开发工作流--development-workflow)
- [提交规范 | Commit Convention](#提交规范--commit-convention)
- [Pull Request 流程 | Pull Request Process](#pull-request-流程--pull-request-process)
- [代码风格 | Code Style](#代码风格--code-style)
- [扩展指南 | Extension Guide](#扩展指南--extension-guide)
- [问题反馈 | Reporting Issues](#问题反馈--reporting-issues)

---

## 行为准则 | Code of Conduct

本项目采用 [贡献者公约](https://www.contributor-covenant.org/) 作为行为准则。参与本项目即表示你同意遵守其条款。

This project adopts the [Contributor Covenant](https://www.contributor-covenant.org/) as its code of conduct. By participating, you agree to abide by its terms.

我们致力于为每个人提供一个友好、安全和包容的环境。

We are committed to providing a friendly, safe, and inclusive environment for everyone.

---

## 如何贡献 | How to Contribute

### 🐛 报告 Bug | Report Bugs

如果你发现了 Bug，请通过 [GitHub Issues](https://github.com/anlyyao/miniprogram-svg-icons/issues) 提交问题报告。

If you find a bug, please submit an issue via [GitHub Issues](https://github.com/anlyyao/miniprogram-svg-icons/issues).

在提交 Bug 报告时，请包含以下信息：

When submitting a bug report, please include:

- **环境信息**：Node.js 版本、pnpm 版本、操作系统
- **小程序平台**：微信 / 支付宝 / 抖音等
- **复现步骤**：详细描述如何复现该问题
- **预期行为**：描述你期望的正确行为
- **实际行为**：描述实际发生的情况
- **截图或代码**：如有可能，附上相关截图或代码片段

---

- **Environment**: Node.js version, pnpm version, OS
- **Platform**: WeChat / Alipay / Douyin, etc.
- **Steps to reproduce**: Detailed steps to reproduce the issue
- **Expected behavior**: What you expected to happen
- **Actual behavior**: What actually happened
- **Screenshots or code**: If possible, include relevant screenshots or code snippets

### 💡 提出新功能 | Suggest Features

如果你有新功能的想法，欢迎通过 [GitHub Issues](https://github.com/anlyyao/miniprogram-svg-icons/issues) 提出建议。

If you have ideas for new features, please submit a suggestion via [GitHub Issues](https://github.com/anlyyao/miniprogram-svg-icons/issues).

请描述：

Please describe:

- **功能描述**：详细描述该功能
- **使用场景**：说明该功能的应用场景
- **可能的实现方式**：如有想法，请分享

---

- **Feature description**: Detailed description of the feature
- **Use case**: Explain the application scenario
- **Possible implementation**: Share your ideas if you have any

### 🔀 提交代码 | Submit Code

我们欢迎任何形式的代码贡献，包括但不限于：

We welcome any form of code contribution, including but not limited to:

- 🐛 修复 Bug
- ✨ 新增功能
- 📝 改进文档
- ♻️ 代码重构
- 🎨 优化用户体验
- 🌐 新增平台支持
- 🏷️ 新增品牌图标

---

## 开发环境设置 | Development Setup

### 环境要求 | Requirements

- **Node.js** >= 20
- **pnpm** >= 10

### 安装步骤 | Installation Steps

```bash
# 1. Fork 并克隆仓库
git clone https://github.com/<your-username>/miniprogram-svg-icons.git
cd miniprogram-svg-icons

# 2. 添加上游仓库
git remote add upstream https://github.com/anlyyao/miniprogram-svg-icons.git

# 3. 安装依赖
pnpm install

# 4. 生成组件（验证环境）
pnpm run generate:wechat
```

---

## 项目结构 | Project Structure

```
miniprogram-svg-icons/
├── resources/                    # SVG 图标源文件
│   └── tdesign/                  #   TDesign 品牌图标
├── scripts/                      # 构建脚本
│   ├── generate.ts               #   生成组件
│   ├── build.ts                  #   打包压缩
│   ├── release.ts                #   发布工具
│   ├── shared.ts                 #   公共模块
│   ├── template/                 #   组件模板
│   └── utils/                    #   工具函数
├── packages/                     # 各平台组件包
│   ├── wechat/                   #   微信
│   ├── alipay/                   #   支付宝
│   ├── kuaishou/                 #   快手
│   ├── douyin/                   #   抖音
│   ├── baidu/                    #   百度
│   ├── xiaohongshu/              #   小红书
│   ├── jd/                       #   京东
│   └── utils/                    #   裁剪工具
├── docs/                         # 文档
├── package.json                  # 根配置
└── pnpm-workspace.yaml           # 工作区配置
```

### 核心文件说明 | Core Files

| 文件                             | 说明                        |
| -------------------------------- | --------------------------- |
| `scripts/generate.ts`            | 从 SVG 源文件生成小程序组件 |
| `scripts/build.ts`               | 构建和压缩发布产物          |
| `scripts/shared.ts`              | 平台配置和公共函数          |
| `scripts/utils/svgTotemplate.ts` | SVG 解析和模板转换核心逻辑  |
| `scripts/utils/const.ts`         | 常量定义（特殊图标列表等）  |
| `scripts/template/*.tpl`         | 组件模板文件                |

---

## 开发工作流 | Development Workflow

### 1. 创建分支 | Create Branch

```bash
# 从 main 分支创建新分支
git checkout main
git pull upstream main
git checkout -b <type>/<description>

# 分支命名规范
# feat/add-new-platform      - 新功能
# fix/icon-color-issue       - Bug 修复
# docs/update-readme         - 文档更新
# refactor/optimize-build    - 代码重构
```

### 2. 开发与测试 | Develop and Test

```bash
# 生成组件（开发模式）
pnpm run generate:wechat

# 生成所有平台
pnpm run generate

# 构建发布产物
pnpm run build:wechat

# 代码格式化
pnpm run format
```

### 3. 提交更改 | Commit Changes

```bash
# 添加更改
git add .

# 提交（遵循提交规范）
git commit -m "feat: add support for new platform"

# 或使用交互式提交
npx cz
```

### 4. 推送与 PR | Push and PR

```bash
# 推送到你的 Fork
git push origin <branch-name>

# 在 GitHub 上创建 Pull Request
```

---

## 提交规范 | Commit Convention

本项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

This project uses [Conventional Commits](https://www.conventionalcommits.org/) specification.

### 提交格式 | Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 类型 | Type

| Type       | 说明                   | Description      |
| ---------- | ---------------------- | ---------------- |
| `feat`     | 新功能                 | New feature      |
| `fix`      | Bug 修复               | Bug fix          |
| `docs`     | 文档更新               | Documentation    |
| `style`    | 代码格式（不影响逻辑） | Code style       |
| `refactor` | 代码重构               | Code refactoring |
| `perf`     | 性能优化               | Performance      |
| `test`     | 测试相关               | Tests            |
| `chore`    | 构建/工具更新          | Build/tools      |
| `ci`       | CI 配置                | CI configuration |

### 范围 | Scope

| Scope         | 说明       |
| ------------- | ---------- |
| `wechat`      | 微信平台   |
| `alipay`      | 支付宝平台 |
| `kuaishou`    | 快手平台   |
| `douyin`      | 抖音平台   |
| `baidu`       | 百度平台   |
| `xiaohongshu` | 小红书平台 |
| `jd`          | 京东平台   |
| `utils`       | 工具包     |
| `core`        | 核心逻辑   |
| `docs`        | 文档       |

### 示例 | Examples

```bash
# 新功能
feat(wechat): add new icon component property

# Bug 修复
fix(douyin): fix quote escaping issue in data uri

# 文档更新
docs: update contributing guide

# 代码重构
refactor(core): optimize svg parsing logic

# 依赖更新
chore: update dependencies
```

---

## Pull Request 流程 | Pull Request Process

### PR 检查清单 | PR Checklist

提交 PR 前，请确保：

Before submitting a PR, please ensure:

- [ ] 代码通过 `pnpm run format` 格式化
- [ ] 所有平台构建成功 `pnpm run generate && pnpm run build`
- [ ] 提交信息符合规范
- [ ] 更新了相关文档（如有必要）
- [ ] PR 标题清晰描述了更改内容

---

- [ ] Code is formatted with `pnpm run format`
- [ ] All platforms build successfully
- [ ] Commit messages follow the convention
- [ ] Documentation is updated (if necessary)
- [ ] PR title clearly describes the changes

### PR 模板 | PR Template

```markdown
## 描述 | Description

简要描述这个 PR 做了什么。

## 变更类型 | Type of Change

- [ ] 🐛 Bug 修复
- [ ] ✨ 新功能
- [ ] 📝 文档更新
- [ ] ♻️ 代码重构
- [ ] 🎨 样式/UI 更新

## 测试 | Testing

描述你如何测试了这些更改。

## 相关 Issue | Related Issues

关联的 Issue 编号（如：Closes #123）
```

### 审核流程 | Review Process

1. 提交 PR 后，维护者会尽快审核
2. 如有修改建议，请及时响应
3. 审核通过后，PR 将被合并到 main 分支

---

## 代码风格 | Code Style

本项目使用 [Prettier](https://prettier.io/) 进行代码格式化。

This project uses [Prettier](https://prettier.io/) for code formatting.

### 格式化命令 | Format Command

```bash
pnpm run format
```

### 编辑器配置 | Editor Configuration

推荐使用 VSCode，并安装以下扩展：

Recommended to use VSCode with the following extensions:

- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### 代码规范 | Code Guidelines

- 使用 TypeScript 编写构建脚本
- 使用有意义的变量和函数命名
- 添加必要的注释说明复杂逻辑
- 保持函数简短，单一职责
- 避免硬编码，使用常量或配置

---

## 扩展指南 | Extension Guide

本项目采用配置驱动的设计，支持零代码新增品牌图标、低代码新增小程序平台。

This project uses a configuration-driven design, supporting zero-code addition of brand icons and low-code addition of mini-program platforms.

### 🏷️ 新增品牌图标 | Add Brand Icons

新增品牌图标**无需修改任何代码**，只需 3 步：

Adding brand icons requires **no code changes**, just 3 steps:

**步骤 1** — 创建品牌目录 | Create brand directory

在 `resources/` 下创建品牌目录，放置 SVG 图标文件（文件名即图标名）：

Create a brand directory under `resources/` and place SVG icon files (filename is the icon name):

```
resources/
├── tdesign/           # 已有品牌
│   ├── add.svg
│   └── close.svg
└── mybrand/           # 新品牌
    ├── icon-a.svg
    └── icon-b.svg
```

**步骤 2** — SVG 颜色标识 | Mark SVG colors

确保 SVG 中使用**语义化 `id` 属性**标识颜色区域，以支持运行时动态改色：

Ensure SVG uses **semantic `id` attributes** to mark color regions for runtime dynamic coloring:

```xml
<!-- 填充色区域 -->
<path id="fill1" fill="#000000" d="..."/>
<path id="fill2" fill="#ffffff" d="..."/>

<!-- 描边色区域 -->
<circle id="stroke1" stroke="#333333" d="..."/>
<circle id="stroke2" stroke="#666666" d="..."/>
```

| SVG 元素 id | 映射变量       | 默认值                         |
| ----------- | -------------- | ------------------------------ |
| `fill1`     | `fillColor`    | `currentColor` / `transparent` |
| `fill2`     | `fillColor2`   | `currentColor` / `transparent` |
| `stroke1`   | `strokeColor`  | `currentColor`                 |
| `stroke2`   | `strokeColor2` | `currentColor`                 |

> 💡 若图标无需动态改色，可不添加 `id` 属性，构建时将保留原始颜色。

**步骤 3** — 运行构建 | Run build

```bash
# 生成所有平台组件
pnpm run generate

# 使用时指定品牌
# <t-icon name="icon-a" brand="mybrand" />
```

---

### 🌐 新增小程序平台 | Add Mini-Program Platform

新增小程序平台仅需 **3 步**：

Adding a new mini-program platform requires only **3 steps**:

**步骤 1** — 添加平台配置 | Add platform configuration

在 `scripts/shared.ts` 的 `PLATFORMS` 对象中添加配置：

Add configuration to the `PLATFORMS` object in `scripts/shared.ts`:

```typescript
export const PLATFORMS: Record<string, PlatformConfig> = {
  // ... 已有平台

  newplatform: {
    id: 'newplatform', // 平台标识（用于命令行和包名）
    label: '新平台小程序', // 显示名称
    templateExt: '.nxml', // 模板文件后缀
    styleExt: '.ncss', // 样式文件后缀
    componentStyle: 'wechat', // 组件 API 风格：'wechat' 或 'alipay'
    escapeQuotes: false, // 是否需要转义双引号（百度/抖音需要）
  },
};
```

**平台配置字段说明 | Configuration fields:**

| 字段             | 说明                                                         |
| ---------------- | ------------------------------------------------------------ |
| `id`             | 平台唯一标识，用于命令行参数和包目录名                       |
| `label`          | 平台显示名称，用于日志输出                                   |
| `templateExt`    | 模板文件后缀（如微信 `.wxml`、支付宝 `.axml`）               |
| `styleExt`       | 样式文件后缀（如微信 `.wxss`、支付宝 `.acss`）               |
| `componentStyle` | 组件 API 风格，决定使用哪套 JS 模板                          |
| `escapeQuotes`   | 是否将 SVG 中的 `"` 替换为 `'`（某些平台解析 Data URI 需要） |

**`componentStyle` 差异说明 | Component style differences:**

| 特性         | `wechat` 风格（6 个平台）                 | `alipay` 风格          |
| ------------ | ----------------------------------------- | ---------------------- |
| **属性定义** | `properties: { type: String, value: '' }` | `props: { name: '' }`  |
| **数据访问** | `this.data.xxx`                           | `this.props.xxx`       |
| **初始化**   | `lifetimes.attached()`                    | `didMount()`           |
| **属性监听** | `observers: 'name, brand, ...'`           | `didUpdate(prevProps)` |

**步骤 2** — 添加构建命令 | Add build commands

在根目录 `package.json` 的 `scripts` 中添加：

Add to `scripts` in root `package.json`:

```json
{
  "scripts": {
    "generate:newplatform": "tsx scripts/generate.ts newplatform",
    "build:newplatform": "tsx scripts/build.ts newplatform"
  }
}
```

**步骤 3** — 创建包目录 | Create package directory

```bash
# 创建包目录
mkdir -p packages/newplatform

# 创建 package.json
cat > packages/newplatform/package.json << EOF
{
  "name": "@mp-svg-icons/newplatform",
  "version": "1.0.0",
  "description": "新平台小程序 SVG 图标组件",
  "miniprogram": "dist",
  "files": ["dist"],
  "repository": {
    "type": "git",
    "url": "https://github.com/anlyyao/miniprogram-svg-icons.git",
    "directory": "packages/newplatform"
  },
  "keywords": ["miniprogram", "svg", "icon", "newplatform"],
  "author": "Your Name",
  "license": "MIT"
}
EOF
```

在 `pnpm-workspace.yaml` 中确认已包含该目录（通常 `packages/*` 通配符已覆盖）。

Ensure the directory is included in `pnpm-workspace.yaml` (usually covered by `packages/*` glob).

**验证 | Verify:**

```bash
# 生成组件
pnpm run generate:newplatform

# 构建产物
pnpm run build:newplatform

# 检查产物
ls packages/newplatform/dist/
```

---

## 问题反馈 | Reporting Issues

### Issue 模板 | Issue Templates

#### Bug 报告 | Bug Report

```markdown
**环境信息 | Environment**

- Node.js 版本:
- pnpm 版本:
- 操作系统:
- 小程序平台:

**Bug 描述 | Description**
清晰描述遇到的问题。

**复现步骤 | Steps to Reproduce**

1. ...
2. ...
3. ...

**预期行为 | Expected Behavior**
描述你期望发生的情况。

**实际行为 | Actual Behavior**
描述实际发生的情况。

**截图 | Screenshots**
如有可能，附上相关截图。

**附加信息 | Additional Context**
其他可能有帮助的信息。
```

#### 功能请求 | Feature Request

```markdown
**功能描述 | Description**
清晰描述你希望的功能。

**使用场景 | Use Case**
描述该功能的应用场景。

**可能的实现 | Possible Implementation**
如有想法，请分享可能的实现方式。

**替代方案 | Alternatives**
描述你考虑过的替代方案。
```

---

## 🙏 致谢 | Acknowledgments

感谢所有贡献者的付出！

Thanks to all contributors!

<a href="https://github.com/anlyyao/miniprogram-svg-icons/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=anlyyao/miniprogram-svg-icons" />
</a>

---

## 📬 联系方式 | Contact

如有任何问题，欢迎通过以下方式联系：

If you have any questions, feel free to reach out:

- [GitHub Issues](https://github.com/anlyyao/miniprogram-svg-icons/issues)
- [GitHub Discussions](https://github.com/anlyyao/miniprogram-svg-icons/discussions)

---

再次感谢你的贡献！🎉

Thank you again for your contribution! 🎉
