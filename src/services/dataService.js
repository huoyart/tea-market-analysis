import dayjs from 'dayjs'

// 模拟数据生成函数
function generateDates(days) {
  const dates = []
  for (let i = days - 1; i >= 0; i--) {
    dates.push(dayjs().subtract(i, 'day').format('MM-DD'))
  }
  return dates
}

function generatePriceData(days, basePrice = 200) {
  const data = []
  let currentPrice = basePrice
  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.5) * 20
    currentPrice = Math.max(100, currentPrice + change)
    data.push(Math.round(currentPrice * 100) / 100)
  }
  return data
}

// 获取市场概览数据
export async function getMarketOverview() {
  // 模拟 API 延迟
  await new Promise(resolve => setTimeout(resolve, 500))

  const dates = generateDates(30)
  const prices = generatePriceData(30, 250)

  return {
    averagePrice: 268.5,
    priceChange: 5.2,
    totalVolume: 1250,
    volumeChange: 8.3,
    totalValue: 3356,
    valueChange: 12.5,
    activeMerchants: 156,
    merchantChange: 3.8,
    priceHistory: dates.map((date, index) => ({
      date,
      price: prices[index]
    }))
  }
}

// 获取价格趋势数据
export async function getPriceTrendData(timeRange = '30d') {
  await new Promise(resolve => setTimeout(resolve, 500))

  const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
  const dates = generateDates(days)
  const average = generatePriceData(days, 250)
  const high = average.map(p => p + Math.random() * 30 + 10)
  const low = average.map(p => p - Math.random() * 30 - 10)

  const categories = [
    { name: '绿茶', price: 280 },
    { name: '红茶', price: 320 },
    { name: '乌龙茶', price: 350 },
    { name: '白茶', price: 420 },
    { name: '黑茶', price: 380 },
    { name: '黄茶', price: 400 }
  ]

  return {
    dates,
    average,
    high,
    low,
    categories
  }
}

// 获取市场数据
export async function getMarketData() {
  await new Promise(resolve => setTimeout(resolve, 500))

  const dates = generateDates(30)
  const volumeValues = dates.map(() => Math.floor(Math.random() * 100 + 50))

  const regions = [
    { value: 850, name: '华东地区' },
    { value: 620, name: '华南地区' },
    { value: 480, name: '西南地区' },
    { value: 360, name: '华北地区' },
    { value: 280, name: '华中地区' },
    { value: 200, name: '其他地区' }
  ]

  const recentTransactions = [
    { date: '2024-01-15', type: '龙井茶', price: 320, volume: 15, value: 48, region: '浙江' },
    { date: '2024-01-15', type: '铁观音', price: 280, volume: 22, value: 61.6, region: '福建' },
    { date: '2024-01-14', type: '普洱茶', price: 450, volume: 18, value: 81, region: '云南' },
    { date: '2024-01-14', type: '碧螺春', price: 380, volume: 12, value: 45.6, region: '江苏' },
    { date: '2024-01-13', type: '大红袍', price: 520, volume: 8, value: 41.6, region: '福建' },
    { date: '2024-01-13', type: '毛峰', price: 260, volume: 25, value: 65, region: '安徽' },
    { date: '2024-01-12', type: '白毫银针', price: 680, volume: 6, value: 40.8, region: '福建' },
    { date: '2024-01-12', type: '六安瓜片', price: 290, volume: 20, value: 58, region: '安徽' }
  ]

  return {
    totalVolume: 2790,
    totalValue: 3356,
    activeMerchants: 156,
    volumeData: {
      dates,
      values: volumeValues
    },
    regions,
    recentTransactions
  }
}

// 获取分类分析数据
export async function getCategoryAnalysis() {
  await new Promise(resolve => setTimeout(resolve, 500))

  const categories = [
    {
      name: '绿茶',
      icon: '🍃',
      avgPrice: 280,
      maxPrice: 350,
      minPrice: 200,
      volume: 450,
      growth: 8.5,
      value: 126
    },
    {
      name: '红茶',
      icon: '☕',
      avgPrice: 320,
      maxPrice: 400,
      minPrice: 250,
      volume: 380,
      growth: 12.3,
      value: 121.6
    },
    {
      name: '乌龙茶',
      icon: '🌿',
      avgPrice: 350,
      maxPrice: 450,
      minPrice: 280,
      volume: 320,
      growth: 6.8,
      value: 112
    },
    {
      name: '白茶',
      icon: '🌱',
      avgPrice: 420,
      maxPrice: 550,
      minPrice: 350,
      volume: 280,
      growth: 15.2,
      value: 117.6
    },
    {
      name: '黑茶',
      icon: '🍵',
      avgPrice: 380,
      maxPrice: 480,
      minPrice: 300,
      volume: 350,
      growth: 9.6,
      value: 133
    },
    {
      name: '黄茶',
      icon: '🌾',
      avgPrice: 400,
      maxPrice: 500,
      minPrice: 320,
      volume: 180,
      growth: 4.2,
      value: 72
    }
  ]

  const radarData = [
    {
      value: [280, 450, 8.5, 16.1, 85],
      name: '绿茶'
    },
    {
      value: [320, 380, 12.3, 13.6, 88],
      name: '红茶'
    },
    {
      value: [350, 320, 6.8, 11.5, 82],
      name: '乌龙茶'
    },
    {
      value: [420, 280, 15.2, 10.0, 90],
      name: '白茶'
    },
    {
      value: [380, 350, 9.6, 12.5, 87],
      name: '黑茶'
    },
    {
      value: [400, 180, 4.2, 6.5, 80],
      name: '黄茶'
    }
  ]

  return {
    categories,
    radarData
  }
}
