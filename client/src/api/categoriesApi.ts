import axios from "axios";
import { ICategory } from "../interfaces/category.interface";

const BASE_URL = process.env.REACT_APP_CATEGORIES_BASE_URL;

export const categoriesApi = {
  getCategories: async () => {
    try {
      const response = await axios.get(BASE_URL!, {
        validateStatus: () => true,
      });
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error getting categories:", error);
      throw error;
    }
  },

  addCategory: async (category: ICategory) => {
    try {
      const response = await axios.post(BASE_URL!, category, {
        validateStatus: () => true,
      });
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding category:", error);
      throw error;
    }
  },

  editCategory: async (id: number, updatedCategory: ICategory) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/update/${id}`,
        updatedCategory
      );
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },

  removeCategory: async (id: number) => {
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
