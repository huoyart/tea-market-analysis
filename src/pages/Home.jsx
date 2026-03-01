import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMarketOverview } from '../services/dataService'
import StatCard from '../components/StatCard'
import PriceChart from '../components/PriceChart'
import './Home.css'

function Home() {
  const [overview, setOverview] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getMarketOverview()
        setOverview(data)
      } catch (error) {
        console.error('加载数据失败:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>加载中...</p>
      </div>
    )
  }

  return (
    <div className="home">
      <div className="home-header">
        <h1 className="home-title">茶叶市场行情分析</h1>
        <p className="home-subtitle">实时掌握茶叶市场动态，洞察价格趋势</p>
      </div>

      <div className="stats-grid">
        <StatCard
          title="平均价格"
          value={`¥${overview?.averagePrice || 0}`}
          change={overview?.priceChange || 0}
          icon="💰"
          color="#667eea"
        />
        <StatCard
          title="市场总量"
          value={`${overview?.totalVolume || 0}吨`}
          change={overview?.volumeChange || 0}
          icon="📦"
          color="#48bb78"
        />
        <StatCard
          title="交易额"
          value={`¥${overview?.totalValue || 0}万`}
          change={overview?.valueChange || 0}
          icon="💵"
          color="#ed8936"
        />
        <StatCard
          title="活跃商家"
          value={overview?.activeMerchants || 0}
          change={overview?.merchantChange || 0}
          icon="🏪"
          color="#9f7aea"
        />
      </div>

      <div className="home-content">
        <div className="chart-section">
          <div className="section-header">
            <h2>价格趋势</h2>
            <Link to="/price-trend" className="view-more-link">
              查看更多 →
            </Link>
          </div>
          <PriceChart data={overview?.priceHistory || []} />
        </div>

        <div className="quick-links">
          <Link to="/price-trend" className="quick-link-card">
            <div className="quick-link-icon">📈</div>
            <h3>价格趋势分析</h3>
            <p>查看详细的价格走势图表和预测</p>
          </Link>
          <Link to="/market-data" className="quick-link-card">
            <div className="quick-link-icon">📊</div>
            <h3>市场数据</h3>
            <p>浏览完整的市场交易数据</p>
          </Link>
          <Link to="/category" className="quick-link-card">
            <div className="quick-link-icon">🍃</div>
            <h3>分类分析</h3>
            <p>不同茶叶类别的详细分析</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
