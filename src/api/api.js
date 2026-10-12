import axios from "axios"
import { UseUserStore } from "../store/UseStore"

const apiInstance = axios.create({
    baseURL: "https://api.kitek-pg.ru/api/marketplace/",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },  
})

apiInstance.interceptors.request.use((config) => {
    const {session} = UseUserStore.getState()

    if(session?.token){
        config.headers.Authorization = `Bearer ${session.token}`
    }
    return config
})
const registerUser = async (user) => {
const res = await apiInstance.post("/auth/register", user)
return res
}

const loginUser = async (user) => {
    const res = await apiInstance.post("/auth/login",user);
    return res;
}

const getItems= async () => {
    const item = await apiInstance.get("/items");
    return item;
}

const sendItems = async (i) => {
const item = await apiInstance.post("/items", i)
return item;
}

const sendMessage = async (message) => {
const res = await apiInstance.post("/messages", message)
return res
}

const deleteItems = async (id) => {
const res = await apiInstance.delete(`/items/${id}`);
return res
}


export const api = {
    registerUser,
    loginUser,
   getItems,
   sendMessage,
   sendItems,
   deleteItems
}