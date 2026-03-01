import { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { getPriceTrendData } from '../services/dataService'
import './PriceTrend.css'

function PriceTrend() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const result = await getPriceTrendData(timeRange)
        setData(result)
      } catch (error) {
        console.error('加载数据失败:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [timeRange])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>加载中...</p>
      </div>
    )
  }

  const lineChartOption = {
    title: {
      text: '茶叶价格趋势',
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
    legend: {
      data: ['平均价格', '最高价', '最低价'],
      top: 40,
      textStyle: {
        color: '#4a5568'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: 80,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data?.dates || [],
      axisLine: {
        lineStyle: { color: '#e2e8f0' }
      },
      axisLabel: {
        color: '#718096'
      }
    },
    yAxis: {
      type: 'value',
      name: '价格 (元/公斤)',
      axisLine: {
        lineStyle: { color: '#e2e8f0' }
      },
      axisLabel: {
        color: '#718096',
        formatter: '¥{value}'
      },
      splitLine: {
        lineStyle: { color: '#f7fafc' }
      }
    },
    series: [
      {
        name: '平均价格',
        type: 'line',
        smooth: true,
        data: data?.average || [],
        lineStyle: { color: '#667eea', width: 3 },
        itemStyle: { color: '#667eea' }
      },
      {
        name: '最高价',
        type: 'line',
        smooth: true,
        data: data?.high || [],
        lineStyle: { color: '#48bb78', width: 2 },
        itemStyle: { color: '#48bb78' }
      },
      {
        name: '最低价',
        type: 'line',
        smooth: true,
        data: data?.low || [],
        lineStyle: { color: '#f56565', width: 2 },
        itemStyle: { color: '#f56565' }
      }
    ]
  }

  const categoryChartOption = {
    title: {
      text: '各类茶叶价格对比',
      left: 'center',
      textStyle: {
        color: '#2d3748',
        fontSize: 24,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
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
      data: data?.categories?.map(c => c.name) || [],
      axisLine: {
        lineStyle: { color: '#e2e8f0' }
      },
      axisLabel: {
        color: '#718096',
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      name: '价格 (元/公斤)',
      axisLine: {
        lineStyle: { color: '#e2e8f0' }
      },
      axisLabel: {
        color: '#718096',
        formatter: '¥{value}'
      }
    },
    series: [
      {
        name: '价格',
        type: 'bar',
        data: data?.categories?.map(c => c.price) || [],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#667eea' },
              { offset: 1, color: '#764ba2' }
            ]
          }
        }
      }
    ]
  }

  return (
    <div className="price-trend">
      <div className="page-header">
        <h1>价格趋势分析</h1>
        <div className="time-range-selector">
          <button
            className={timeRange === '7d' ? 'active' : ''}
            onClick={() => setTimeRange('7d')}
          >
            7天
          </button>
          <button
            className={timeRange === '30d' ? 'active' : ''}
            onClick={() => setTimeRange('30d')}
          >
            30天
          </button>
          <button
            className={timeRange === '90d' ? 'active' : ''}
            onClick={() => setTimeRange('90d')}
          >
            90天
          </button>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <ReactECharts
            option={lineChartOption}
            style={{ height: '450px', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </div>

        <div className="chart-card">
          <ReactECharts
            option={categoryChartOption}
            style={{ height: '450px', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </div>
      </div>
    </div>
  )
}

export default PriceTrend
