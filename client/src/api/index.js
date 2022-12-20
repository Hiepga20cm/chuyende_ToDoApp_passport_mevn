import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

//const accessToken = localStorage.getItem("token") || null;
const axiosClient = axios.create({
  baseURL: "https://localhost:3000",
  timeout: 3000,
  headers: { authorization: "Bearer " + localStorage.getItem("token") || null },
});
export const axiosPrivate = axios.create({
  baseURL: "https://localhost:3000",
  timeout: 3000,
  headers: {
    authorization: `Bearer ` + localStorage.getItem("token") || null,
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(async (config) => {
  if (config.headers.authorization) {
   
    const authorization = config.headers.authorization.split(" ");
    if (authorization[0] === "Bearer") {
      
      const token = VueJwtDecode.decode(authorization[1]);
      if (token) {
        console.log(token.exp);
        const currentDate = new Date().getTime();
        console.log(currentDate + "ss");
        if (token.exp * 1000 < currentDate) {
          console.log("111");
          await axiosPrivate
            .post("/users/refreshToken", {
              refreshToken: localStorage.getItem("refreshToken"),
            })
            .then((res) => {
              console.log("aaaw");
              console.log(res.data);
              config.headers.authorization = `Bearer ${res.data.access_token}`;
              localStorage.setItem("token", res.data.access_token);
              //localStorage.setItem("refreshToken", res.data.refreshToken);
              localStorage.setItem("user", res.data.data);
              axiosClient.defaults.headers.authorization = `Bearer ${res.data.access_token}`;
              return config;
            });
        }
      }
    }
  } else {
    const accessToken = localStorage.getItem("token");
    config.headers.authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default axiosClient;
