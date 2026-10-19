import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import Input from "../components/Input"
import Button from "../components/Button"
import { api } from "../api/api"
import { UseUserStore } from "../store/useUserStore"

const ItemDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [item, setItem] = useState(null)
  const [bids, setBids] = useState([])
  const [error, setError] = useState("")

  const session = UseUserStore((s) => s.session)  


  useEffect(() => {
    const load = async () => {
      try {
        setItem(await api.getItemById(id))
      } catch (err) {
        console.error(err)
      }
    }
    load()
  }, [id])

 
  const loadBids = async () => {
    try {
      const res = await api.getItemsBids(id)
      setBids(res.data)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => { loadBids() }, [id])


  const handleBid = async (e) => {
    e.preventDefault()
    setError("")

    const form = e.target
    const amount = Number(form.bidInput.value)

    try {
      await api.createBid({ id, amount })
      form.reset()
     
      setItem(await api.getItemById(id))
      await loadBids()
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Ошибка ставки")
    }
  }

 
  const isOwner = session?.user?.id === item?.userId

  const handleDelete = async () => {
    try {
      await api.deleteItems(id)
      navigate("/")
    } catch (err) {
      setError(err?.response?.data?.message || "Не удалось удалить товар")
    }
  }

  if (!item) return <div className="container">Загрузка...</div>

  return (
    <div className="container">
      <Link to="/">← Вернуться к списку товаров</Link>

      <div className="item-detail">
        <div className="item-header">
          <div>
            <img src={item.imageUrl} className="item-image-large" alt={item.title} />
          </div>

          <div className="item-info">
            <span className="item-status">{item.status}</span>
            <h1 className="item-title-large">{item.title}</h1>

            <div className="item-seller-info">
              <div className="seller-avatar">
                {item.username?.slice(0, 2).toUpperCase()}
              </div>
              <div className="seller-details">
                <div className="seller-name">{item.username}</div>
                <div className="seller-date">
                  {new Date(item.createdAt).toLocaleString("ru-RU")}
                </div>
              </div>
            </div>

            <div className="item-description-full">{item.description}</div>

            <div className="price-section">
              <div className="starting-price">Начальная цена:</div>
              <div className="current-price">{item.price}</div>
              <div className="highest-bid">
                Текущая ставка: {item.highestBid ?? "ставок нет"}
              </div>

              <form className="bid-form" onSubmit={handleBid}>
                <Input
                  type="number"
                  name="bidInput"
                  className="bid-input"
                  placeholder="Введите вашу ставку"
                  min={item.highestBid ?? item.price}
                  step="100"
                />
                <Button type="submit" className="btn-bid">Сделать ставку</Button>
              </form>

              {error && <div className="alert alert-error active">{error}</div>}
            </div>

            {isOwner && (
              <button type="button" className="btn-delete" onClick={handleDelete}>
                Удалить товар
              </button>
            )}
          </div>
        </div>

        {/* 6.3 — история ставок */}
        <div className="bids-section">
          <div className="bids-header">
            <h2 className="bids-title">История ставок</h2>
            <span className="bids-count">{bids.length}</span>
          </div>

          <div className="bids-list">
            {bids.map((bid, i) => (
              <div
                key={bid.id ?? i}
                className={`bid-item ${i === 0 ? "highest-bid-item" : ""}`}
              >
                <div className="bid-user">
                  <div className="bid-avatar">
                    {bid.username.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="bid-details">
                    <span className="bid-username">{bid.username}</span>
                    <span className="bid-time">
                      {new Date(bid.createdAt).toLocaleString("ru-RU")}
                    </span>
                  </div>
                  {i === 0 && <span className="highest-badge">🏆 Лидирует</span>}
                </div>
                <div className="bid-amount">{bid.amount} ₽</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemDetail