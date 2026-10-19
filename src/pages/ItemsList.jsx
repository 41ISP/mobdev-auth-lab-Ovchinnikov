import { useState, useEffect } from 'react'
import { useItemStore } from '../store/useItemStore'
import ItemCard from '../components/ItemCard'
import { api } from '../api/api'

const ItemsList = () => {
  const { items, getItems } = useItemStore()
  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState(null)     // ✅ начальное null

  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      try {
        await getItems()
        const statsData = await api.getStats()   // ✅ тот же useEffect
        setStats(statsData.data)                       // ✅ сохранили
      } catch (err) {
        console.error(err)                        // ✅ ошибка в консоль
        setError(err.message || 'Что-то пошло не так')
      } finally {
        setIsLoading(false)
      }
    }

    load()
    const id = setInterval(load, 10000000)
    return () => clearInterval(id)
  }, [getItems])

  return (
    <div className="container">
      <div className="page-header">
        <h1>Все товары</h1>
      </div>

      {!loading && (
        <div className="stats">
          <div className="stat-item">
            <span className="stat-value">{stats?.totalItems ?? 0}</span>
            <span className="stat-label">Товаров</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats?.totalBids ?? 0}</span>
            <span className="stat-label">Ставок</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats?.activeItems ?? 0}</span>
            <span className="stat-label">Активных</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats?.averageItemPrice ?? 0}₽</span>
            <span className="stat-label">Средняя цена</span>
          </div>
        </div>
      )}

      <div className="items-grid">
        {loading && <p>Загрузка товаров...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && items.map((item, i) => (
          <ItemCard key={item.id ?? i} {...item} />
        ))}
      </div>
    </div>
  )
}

export default ItemsList