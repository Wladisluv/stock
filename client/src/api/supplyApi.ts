import axios from "axios";
import { ISupply } from "../interfaces/supply.interface";

const BASE_URL = process.env.REACT_APP_SUPPLIES_BASE_URL;

export const supplyApi = {
  getSupplies: async () => {
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

  addSupply: async (supply: ISupply) => {
    try {
      const response = await axios.post(`${BASE_URL!}/add`, supply, {
        validateStatus: () => true,
      });
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding supply:", error);
      throw error;
    }
  },

  editSupply: async (id: number, updatedSupply: ISupply) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/update/${id}`,
        updatedSupply
      );
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },

  removeSupply: async (id: number) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${id}`);
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error remove category:", error);
      throw error;
    }
  },
};
