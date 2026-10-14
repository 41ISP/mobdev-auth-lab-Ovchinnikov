import { create } from "zustand";
import { api } from "../api/api";

export const useItemStore = create((set) => ({
    items: [],
    getMessages: async () => {
        try {
            const res = await api.getMessage()
            set({ items: res.data })

        }
        catch (error) {
            console.error(error)
        }

    }
})) 