import { create } from "zustand";
import { api } from "../api/api";

export const useItemStore = create((set) => ({
  items: [],
  loading: false,
  error: null,

  getItems: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.getItems();   // ✅ правильное имя функции
      set({ items: res.data });           // ✅ res — ответ axios, данные в .data
    } catch (error) {
      console.error(error);
      set({ error: error.message || "Не удалось загрузить товары" });
    } finally {
      set({ loading: false });
    }
  },
}));