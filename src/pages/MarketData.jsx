import { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { getMarketData } from '../services/dataService'
import './MarketData.css'

function MarketData() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getMarketData()
        setData(result)
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

  const volumeChartOption = {
    title: {
      text: '市场交易量趋势',
      left: 'center',
      textStyle: {
        color: '#2d3748',
        fontSize: 24,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#667eea',
      borderWidth: 1
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: 60,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data?.volumeData?.dates || [],
      axisLine: {
        lineStyle: { color: '#e2e8f0' }
      },
      axisLabel: {
        color: '#718096'
      }
    },
    yAxis: {
      type: 'value',
      name: '交易量 (吨)',
      axisLine: {
        lineStyle: { color: '#e2e8f0' }
      },
      axisLabel: {
        color: '#718096'
      }
    },
    series: [
      {
        name: '交易量',
        type: 'bar',
        data: data?.volumeData?.values || [],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#48bb78' },
              { offset: 1, color: '#38a169' }
            ]
          }
        }
      }
    ]
  }

  const regionChartOption = {
    title: {
      text: '各地区交易额占比',
      left: 'center',
      textStyle: {
        color: '#2d3748',
        fontSize: 24,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: ¥{c}万 ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 60,
      textStyle: {
        color: '#4a5568'
      }
    },
    series: [
      {
        name: '交易额',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{b}: {d}%'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        data: data?.regions || []
      }
    ]
  }

  return (
    <div className="market-data">
      <div className="page-header">
        <h1>市场数据</h1>
      </div>

      <div className="data-summary">
        <div className="summary-card">
          <div className="summary-icon" style={{ backgroundColor: '#48bb7820' }}>
            📊
          </div>
          <div className="summary-content">
            <div className="summary-label">总交易量</div>
            <div className="summary-value">{data?.totalVolume || 0} 吨</div>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon" style={{ backgroundColor: '#667eea20' }}>
            💰
          </div>
          <div className="summary-content">
            <div className="summary-label">总交易额</div>
            <div className="summary-value">¥{data?.totalValue || 0} 万</div>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon" style={{ backgroundColor: '#ed893620' }}>
            🏪
          </div>
          <div className="summary-content">
            <div className="summary-label">活跃商家</div>
            <div className="summary-value">{data?.activeMerchants || 0} 家</div>
          </div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <ReactECharts
            option={volumeChartOption}
            style={{ height: '450px', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </div>

        <div className="chart-card">
          <ReactECharts
            option={regionChartOption}
            style={{ height: '450px', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </div>
      </div>

      <div className="data-table-section">
        <h2>最新交易数据</h2>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>日期</th>
                <th>茶叶类型</th>
                <th>价格 (元/公斤)</th>
                <th>交易量 (吨)</th>
                <th>交易额 (万元)</th>
                <th>地区</th>
              </tr>
            </thead>
            <tbody>
              {data?.recentTransactions?.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.type}</td>
                  <td>¥{item.price}</td>
                  <td>{item.volume}</td>
                  <td>¥{item.value}</td>
                  <td>{item.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MarketData
