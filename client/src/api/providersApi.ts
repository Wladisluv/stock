import axios from "axios";

const BASE_URL = process.env.REACT_APP_PROVIDERS_BASE_URL;

export const providerApi = {
  getProviders: async () => {
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
};
