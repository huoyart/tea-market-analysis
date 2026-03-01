import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import PriceTrend from './pages/PriceTrend'
import MarketData from './pages/MarketData'
import CategoryAnalysis from './pages/CategoryAnalysis'
import './App.css'

function Navigation() {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: '首页', icon: '🏠' },
    { path: '/price-trend', label: '价格趋势', icon: '📈' },
    { path: '/market-data', label: '市场数据', icon: '📊' },
    { path: '/category', label: '分类分析', icon: '🍃' },
  ]

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-icon">🍵</span>
          <span className="logo-text">茶叶市场分析</span>
        </div>
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? 'nav-link active' : 'nav-link'}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/price-trend" element={<PriceTrend />} />
            <Route path="/market-data" element={<MarketData />} />
            <Route path="/category" element={<CategoryAnalysis />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>© 2024 茶叶市场行情分析系统 | 数据仅供参考</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
