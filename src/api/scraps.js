// scraps.js
import { api } from "../lib/api"; 

// 전체 scrap 가져오기
export const getScraps = async () => {
  const res = await api.get("/scraps");
  return res.data;
};

export const getCategoryScraps = async (categoryId) =>  {
  const res = await api.get(`/categories/${categoryId}/scraps`);
  return res.data;
};

export const getScrapsReminder = async () => {
  const res = await api.get("/scraps/reminders");
  return res.data;
};