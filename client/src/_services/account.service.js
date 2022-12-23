import { BehaviorSubject } from "rxjs";
import axios from "axios";
import authApi from "../api/modules/auth";
import router from "../router/index";
const accountSubject = new BehaviorSubject(null);

export const accountService = {
  login,
  account: accountSubject.asObservable(),
  get accountValue() {
    return accountSubject.value;
  },
};

async function login() {
  // login with facebook then authenticate with the API to get a JWT auth token
  try {
    const { authResponse } = await new Promise(FB.login);
    if (!authResponse) return router.push({ path: "/" });

    const accessToken = authResponse.accessToken;
    const response = await authApi.facebookAuth(accessToken);
    localStorage.setItem("token", response.token);
    localStorage.setItem("refreshToken", response.refreshToken);
    localStorage.setItem("user", response.User._id);
    router.push({ path: "/layout" }).then(() => {
      location.reload(true);
    });
    // get return url from query parameters or default to home page
  } catch (error) {
    router.push({ path: "/" });
    console.log(error);
  }
}
