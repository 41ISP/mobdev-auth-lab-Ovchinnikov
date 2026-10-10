import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UseUserStore } from "../store/UseStore"
const Logout = () => {
    const navigate = useNavigate()
    const {clearSession} = UseUserStore()

    useEffect(() => {
        navigate('/')
        clearSession()
    }, [])
    return <></>
}

export default Logout
