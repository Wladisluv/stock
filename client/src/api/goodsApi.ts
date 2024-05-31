import axios from "axios";
import { IGood } from "../interfaces/good.interface";

const BASE_URL = process.env.REACT_APP_GOODS_BASE_URL;

export const goodsApi = {
  getGoods: async () => {
    try {
      const response = await axios.get(`${BASE_URL!}/`, {
        validateStatus: () => true,
      });
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error getting categories:", error);
      throw error;
    }
  },

  addGood: async (good: IGood) => {
    try {
      const response = await axios.post(`${BASE_URL!}/add`, good, {
        validateStatus: () => true,
      });
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding good:", error);
      throw error;
    }
  },

  editGood: async (id: number, updatedGood: IGood) => {
    try {
      const response = await axios.put(`${BASE_URL}/update/${id}`, updatedGood);
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating good:", error);
      throw error;
    }
  },

  removeGood: async (id: number) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${id}`);
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding good:", error);
      throw error;
    }
  },
};
