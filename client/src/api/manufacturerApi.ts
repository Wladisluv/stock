import axios from "axios";
import { IManufacturer } from "../interfaces/manufacturer.interface";

const BASE_URL = process.env.REACT_APP_MANUFACTURERS_BASE_URL;

export const manufacturerApi = {
  getManufacturers: async () => {
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

  addManufacturer: async (manufacturer: IManufacturer) => {
    try {
      const response = await axios.post(`${BASE_URL!}/add`, manufacturer, {
        validateStatus: () => true,
      });
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding supply:", error);
      throw error;
    }
  },

  editManufacturer: async (id: number, updatedManufacturer: IManufacturer) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/update/${id}`,
        updatedManufacturer
      );
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },

  removeManufacturer: async (id: number) => {
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
