# 茶叶市场行情分析系统

一个基于 React + Vite 构建的现代化茶叶市场行情数据可视化分析平台，提供实时价格趋势、市场数据统计和分类分析等功能。

## ✨ 功能特性

- 📊 **数据可视化**：使用 ECharts 提供丰富的图表展示
- 📈 **价格趋势分析**：多维度价格走势图表分析
- 📋 **市场数据统计**：实时市场数据展示和统计
- 🍃 **分类分析**：不同茶叶类别的详细分析
- 🎨 **现代化 UI**：响应式设计，支持多设备访问
- ⚡ **高性能**：基于 Vite 构建，快速开发与构建

## 🛠️ 技术栈

- **前端框架**：React 18.2
- **构建工具**：Vite 5.0
- **路由管理**：React Router 6.20
- **图表库**：ECharts 5.4 + echarts-for-react
- **HTTP 客户端**：Axios 1.6
- **日期处理**：Day.js 1.11

## 📦 项目结构

```
华为云/
├── src/
│   ├── components/          # 公共组件
│   │   ├── PriceChart.jsx   # 价格图表组件
│   │   └── StatCard.jsx     # 统计卡片组件
│   ├── pages/               # 页面组件
│   │   ├── Home.jsx         # 首页
│   │   ├── PriceTrend.jsx   # 价格趋势页
│   │   ├── MarketData.jsx   # 市场数据页
│   │   └── CategoryAnalysis.jsx  # 分类分析页
│   ├── services/            # 服务层
│   │   └── dataService.js   # 数据服务
│   ├── App.jsx              # 主应用组件
│   ├── App.css              # 应用样式
│   ├── main.jsx             # 入口文件
│   └── index.css            # 全局样式
├── index.html               # HTML 模板
├── vite.config.js           # Vite 配置
├── package.json             # 项目配置
└── README.md                # 项目说明
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

开发服务器将在 `http://localhost:3000` 启动，并自动在浏览器中打开。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产构建

```bash
npm run preview
```

## 📝 使用说明

### Windows 快速启动

项目提供了便捷的启动脚本：

- **`start.bat`**：快速启动开发服务器（需要先安装依赖）
- **`install-and-start.bat`**：自动安装依赖并启动服务器
- **`check-server.bat`**：检查环境并启动服务器

双击运行对应的 `.bat` 文件即可。

### 页面说明

- **首页** (`/`)：系统概览和主要数据展示
- **价格趋势** (`/price-trend`)：茶叶价格走势图表分析
- **市场数据** (`/market-data`)：详细的市场数据统计
- **分类分析** (`/category`)：不同茶叶类别的分析报告

## 🔧 配置说明

### 修改端口

编辑 `vite.config.js` 文件中的 `server.port` 配置：

```javascript
export default defineConfig({
  server: {
    port: 3000,  // 修改为你想要的端口号
  }
})
```

### 代理配置

如需配置 API 代理，可在 `vite.config.js` 中添加：

```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://your-api-server.com',
        changeOrigin: true,
      }
    }
  }
})
```

## 📄 许可证

本项目为私有项目，仅供内部使用。

## 👥 贡献

欢迎提交 Issue 和 Pull Request。

## 📞 联系方式

如有问题或建议，请联系项目维护者。

---

**注意**：本项目数据仅供参考，实际使用时请确保数据来源的准确性。
