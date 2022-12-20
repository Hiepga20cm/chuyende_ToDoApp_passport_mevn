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
  login: async (email, password) => {
    try {
      const url = "/users/signIn";
      return axiosClient.post(url, { email, password });
    } catch (error) {
      console.log(error);
    }
  },
  facebookAuth: async (accessToken) => {
    try {
      const url = "/users/auth/facebook";
      const access_token = accessToken;
      return axiosClient.post(url, { access_token });
    } catch (error) {
      console.log(error);
    }
  },
};

export default authApi;
