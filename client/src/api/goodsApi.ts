import axios from "axios";
import { IGood } from "../interfaces/good.interface";

const BASE_URL = process.env.REACT_APP_GOODS_BASE_URL;

export const goodsApi = {
  getGoods: async () => {
    const response = await axios.get(BASE_URL!, {
      validateStatus: () => {
        return true;
      },
    });

    if (response.status === 302) {
      return response.data;
    } else {
      throw new Error(`Error fetching goods. Status: ${response.status}`);
    }
  },

  addGood: async (good: IGood) => {
    try {
      const response = await axios.post(BASE_URL!, good, {
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
