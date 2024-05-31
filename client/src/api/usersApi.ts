import axios from "axios";

const BASE_URL = process.env.REACT_APP_USERS_BASE_URL;

export const usersApi = {
  getUsers: async () => {
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

  addUser: async (user: any) => {
    try {
      const response = await axios.post(BASE_URL!, user, {
        validateStatus: () => true,
      });
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  },
};
