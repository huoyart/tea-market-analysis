import { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { getCategoryAnalysis } from '../services/dataService'
import './CategoryAnalysis.css'

function CategoryAnalysis() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getCategoryAnalysis()
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

  const pieChartOption = {
    title: {
      text: '茶叶分类占比',
      left: 'center',
      textStyle: {
        color: '#2d3748',
        fontSize: 24,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}吨 ({d}%)'
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
        name: '茶叶分类',
        type: 'pie',
        radius: '60%',
        data: data?.categories || [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          formatter: '{b}: {d}%'
        }
      }
    ]
  }

  const radarChartOption = {
    title: {
      text: '各类茶叶综合指标',
      left: 'center',
      textStyle: {
        color: '#2d3748',
        fontSize: 24,
        fontWeight: 'bold'
      }
    },
    tooltip: {},
    radar: {
      indicator: [
        { name: '价格', max: 1000 },
        { name: '销量', max: 500 },
        { name: '增长率', max: 50 },
        { name: '市场份额', max: 30 },
        { name: '满意度', max: 100 }
      ],
      center: ['50%', '55%'],
      radius: '70%'
    },
    series: [
      {
        name: '茶叶指标',
        type: 'radar',
        data: data?.radarData || []
      }
    ]
  }

  const comparisonChartOption = {
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
        name: '平均价格',
        type: 'bar',
        data: data?.categories?.map(c => c.avgPrice) || [],
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
      },
      {
        name: '最高价',
        type: 'bar',
        data: data?.categories?.map(c => c.maxPrice) || [],
        itemStyle: {
          color: '#48bb78'
        }
      },
      {
        name: '最低价',
        type: 'bar',
        data: data?.categories?.map(c => c.minPrice) || [],
        itemStyle: {
          color: '#f56565'
        }
      }
    ]
  }

  return (
    <div className="category-analysis">
      <div className="page-header">
        <h1>分类分析</h1>
      </div>

      <div className="category-cards">
        {data?.categories?.map((category, index) => (
          <div key={index} className="category-card">
            <div className="category-header">
              <h3>{category.name}</h3>
              <span className="category-icon">{category.icon}</span>
            </div>
            <div className="category-stats">
              <div className="stat-item">
                <span className="stat-label">平均价格</span>
                <span className="stat-value">¥{category.avgPrice}/公斤</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">销量</span>
                <span className="stat-value">{category.volume} 吨</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">增长率</span>
                <span className={`stat-value ${category.growth >= 0 ? 'positive' : 'negative'}`}>
                  {category.growth >= 0 ? '+' : ''}{category.growth}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <ReactECharts
            option={pieChartOption}
            style={{ height: '450px', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </div>

        <div className="chart-card">
          <ReactECharts
            option={radarChartOption}
            style={{ height: '450px', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </div>

        <div className="chart-card">
          <ReactECharts
            option={comparisonChartOption}
            style={{ height: '450px', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </div>
      </div>
    </div>
  )
}

export default CategoryAnalysis
