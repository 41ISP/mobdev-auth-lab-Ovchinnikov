import { create } from "zustand";
import { api } from "../api/api";

export const useMessageStore = create((set) => ({
    messages: [],
    getMessages: async () => {
        try {
            const res = await api.getMessage()
            set({ messages: res.data })

        }
        catch (error) {
            console.error(error)
        }

    }
})) 