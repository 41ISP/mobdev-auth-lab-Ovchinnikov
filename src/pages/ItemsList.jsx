import { useState, useEffect } from 'react'
import { useItemStore} from '../store/useItemStore';
import ItemCard from '../components/ItemCard'
import { api } from '../api/api'


const ItemsList = () => {
    
    const {items, getItems}  = useItemStore() 
 const [loading,setIsLoading] = useState(false)
    const [error, setError] = useState(null)
  const [timerId, setTimerId] = useState(undefined)
  const [stats, setStats] = useState(null)

    useEffect (() => {
        const load = async () => {
            setIsLoading(true)
            try{    
                await getItems()
                setStats(await api.getStats());
            } catch (error) {
                console.error(error)
                setError(error.message || "Что-то пошло не так")
            } finally {
                setIsLoading(false)
            }
        }
        load()
        setTimerId(setInterval(async () => {
            try {
                await getItems()
                setStats(await api.getStats());
            } catch (error) {}
        }, 10000))
        return () => {
            clearInterval(timerId)
        }
    }, [])


    return (
        <div className="container">
            
            <div className="page-header">
                <h1>Все товары</h1>
            </div>
            
       
            {!loading && (
                <div className="stats">
                    <div className="stat-item">
                        <span className="stat-value">{items.length}</span>
                        <span className="stat-label">Товаров</span>
                    </div>
                    {/* Остальные статы можно рассчитать или получить с сервера */}
                    <div className="stat-item">
                        <span className="stat-value">0</span>
                        <span className="stat-label">Ставок</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">0</span>
                        <span className="stat-label">Активных</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">0₽</span>
                        <span className="stat-label">Средняя цена</span>
                    </div>
                </div>
            )}

            <div className="items-grid">
                {loading && <p>Загрузка товаров...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
               
                {!loading && !error && items.map((item, i) => (
                    <ItemCard key={item.id || i} {...item} />
                ))}
            </div>
        </div>
    )
}

export default ItemsList