import axiosClient from "../index";

const authApi = {
  googleAuth: async (access_token) => {
    try {
      const url = "/users/auth/google";
      return axiosClient.post(url, { access_token });
    } catch (error) {
      console.log(error);
    }
  },
};

export default authApi;
