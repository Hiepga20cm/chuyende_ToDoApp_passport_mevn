import axiosClient from "../index";
const userApi = {
  getAllUser: async () => {
    try {
      const url = "/users/getAllUser";
      return axiosClient.get(url);
    } catch (error) {
      console.log(error);
    }
  },
  getUserCurrent: async () => {
    try {
      const url = "/users/userCurrent";
      return axiosClient.get(url);
    } catch (error) {
      console.log(error);
    }
  },
  getUserById: async (userID) => {
    try {
      const url = `/users/${userID}`;
      return axiosClient.get(url);
    } catch (error) {
      console.log(error);
    }
  },
};
export default userApi;
