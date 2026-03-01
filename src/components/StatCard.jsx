import './StatCard.css'

function StatCard({ title, value, change, icon, color }) {
  const isPositive = change >= 0

  return (
    <div className="stat-card" style={{ '--card-color': color }}>
      <div className="stat-card-header">
        <div className="stat-icon" style={{ backgroundColor: `${color}20` }}>
          {icon}
        </div>
        <div className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(change)}%
        </div>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-title">{title}</div>
    </div>
  )
}

export default StatCard
