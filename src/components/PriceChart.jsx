import ReactECharts from 'echarts-for-react'
import './PriceChart.css'

function PriceChart({ data }) {
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#667eea',
      borderWidth: 1,
      textStyle: {
        color: '#2d3748'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.map(item => item.date),
      axisLine: {
        lineStyle: {
          color: '#e2e8f0'
        }
      },
      axisLabel: {
        color: '#718096'
      }
    },
    yAxis: {
      type: 'value',
      name: '价格 (元/公斤)',
      axisLine: {
        lineStyle: {
          color: '#e2e8f0'
        }
      },
      axisLabel: {
        color: '#718096',
        formatter: '¥{value}'
      },
      splitLine: {
        lineStyle: {
          color: '#f7fafc'
        }
      }
    },
    series: [
      {
        name: '平均价格',
        type: 'line',
        smooth: true,
        data: data.map(item => item.price),
        lineStyle: {
          color: '#667eea',
          width: 3
        },
        itemStyle: {
          color: '#667eea'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(102, 126, 234, 0.3)'
              },
              {
                offset: 1,
                color: 'rgba(102, 126, 234, 0.05)'
              }
            ]
          }
        }
      }
    ]
  }

  return (
    <div className="price-chart">
      <ReactECharts
        option={option}
        style={{ height: '400px', width: '100%' }}
        opts={{ renderer: 'svg' }}
      />
    </div>
  )
}

export default PriceChart
