import { useState, useEffect } from 'react'

import ItemCard from '../components/ItemCard'
import { api } from '../api/api'


const ItemsList = () => {
    
    const [items, setItems] = useState([])
 const [loading,setLoadings] = useState(false)
    const [error, setError] = useState(null)


    useEffect(() => {
        const fetchItems = async () => {
            try {
    
                setError(null)
                
                const response = await api.getItems()
                setItems(response.data)
            } catch (err) {
                setError(err.message || 'Не удалось загрузить товары')
           
        }
    }
        fetchItems()
    }, [] ) 

    return (
        <div className="container">
            {/* В JSX для атрибутов используется className, а не class */}
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
                
                {/* Проверка на наличие массива перед map */}
                {!loading && !error && items.map((item, i) => (
                    <ItemCard key={item.id || i} {...item} />
                ))}
            </div>
        </div>
    )
}

export default ItemsList