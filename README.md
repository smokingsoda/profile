# 王俊儒个人网站

一个优雅的个人网站，展示诗歌作品与个人简历，灵感来源于 [Ichiko Aoba 官网](https://ichikoaoba.com/)。

## 特点

- 🎨 现代优雅的深色主题设计
- 📱 完全响应式，适配所有设备
- ✨ 流畅的动画和过渡效果
- 🖋️ 专为中文古典诗词优化的排版
- 📄 清晰的简历展示
- 🎯 简洁直观的用户体验

## 文件结构

```
profile/
├── index.html      # 首页
├── poetry.html     # 诗集页面
├── resume.html     # 简历页面
├── style.css       # 样式表
├── script.js       # JavaScript 交互
└── README.md       # 说明文档
```

## 页面介绍

- **首页** (`index.html`) - 简洁的欢迎页面，展示基本信息
- **诗集** (`poetry.html`) - 展示七首诗歌，涵盖长沙、都匀、伦敦三地创作
- **简历** (`resume.html`) - 完整的教育经历和个人技能

## 使用方法

### 本地预览

1. 直接在浏览器中打开 `index.html` 文件
2. 或使用本地服务器（推荐）：

```bash
# 使用 Python 3
python3 -m http.server 8000

# 使用 Node.js (需要先安装 http-server)
npx http-server
```

然后在浏览器中访问 `http://localhost:8000`

### 部署到网站

您可以将这些文件部署到任何静态网站托管服务：

- **GitHub Pages**: 免费，适合个人项目
- **Netlify**: 免费，自动部署
- **Vercel**: 免费，性能优秀
- **Cloudflare Pages**: 免费，全球 CDN

## 自定义修改

### 修改颜色主题

在 `style.css` 的 `:root` 部分修改 CSS 变量：

```css
:root {
    --primary-bg: #0a0a0a;        /* 主背景色 */
    --secondary-bg: #1a1a1a;      /* 次要背景色 */
    --accent: #d4af37;            /* 强调色（金色） */
    --text-primary: #e8e8e8;      /* 主文字颜色 */
}
```

### 添加新诗歌

在 `poetry.html` 的 `.poetry-grid` 部分添加新的诗歌卡片：

```html
<article class="poem-card">
    <div class="poem-header">
        <span class="poem-location">地点</span>
        <span class="poem-date">日期</span>
    </div>
    <div class="poem-content">
        <p>诗句第一行</p>
        <p>诗句第二行</p>
        <!-- 更多诗句 -->
    </div>
</article>
```

### 修改简历信息

在 `resume.html` 中修改教育经历、技能等内容。

### 修改联系方式

在 `resume.html` 的 `.contact-info` 部分修改邮箱和电话。

## 浏览器支持

- Chrome/Edge (推荐)
- Firefox
- Safari
- 需要支持现代 CSS 特性 (CSS Grid, CSS Variables, etc.)

## 技术栈

- HTML5
- CSS3 (Grid, Flexbox, CSS Variables, Animations)
- Vanilla JavaScript (无框架依赖)
- Google Fonts (Noto Serif SC - 思源宋体)

## 许可

本项目为个人使用创建。

---

© 2025 王俊儒

