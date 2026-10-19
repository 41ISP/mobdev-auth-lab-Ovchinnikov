import axios from "axios"
import { UseUserStore } from '../store/useUserStore'

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

const getItems= async () => {
    const item = await apiInstance.get("/items");
    return item;
}

const getStats= async () => {
    const item = await apiInstance.get("/stats");
    return item;
}

const getItemsBids= async (id) => {
    const item = await apiInstance.get(`/items/${id}/bids`);
    return item;
}

const getMyBids= async () => {
    const item = await apiInstance.get(`/bids/my`);
    return item;
}



const sendItems = async (i) => {
const item = await apiInstance.post("/items", i)
return item;
}

const deleteItems = async (id) => {
const res = await apiInstance.delete(`/items/${id}`);
return res
}


const createBid = async ({id, amount}) => {
const res = await apiInstance.post(`/items/${id}/bids`,{ amount });
return res.data
}



const registerUser = async (user) => {
const res = await apiInstance.post("/auth/register", user)
return res
}

const loginUser = async (user) => {
    const res = await apiInstance.post("/auth/login",user);
    return res;
}
const getItemById = async (id) => {
  const res = await apiInstance.get(`/items/${id}`);
  return res.data;
};





export const api = {
    getItems,
     getStats,
     getItemsBids,
     getMyBids,
    registerUser,
    loginUser,
   getItems,
   sendItems,
   deleteItems,
   createBid,
   getItemById
   
}