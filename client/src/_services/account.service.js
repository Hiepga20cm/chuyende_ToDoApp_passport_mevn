import { BehaviorSubject } from "rxjs";
import axios from "axios";
import authApi from "../api/modules/auth";

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
    if (!authResponse) return;

    const accessToken = authResponse.accessToken;
    const response = await authApi.facebookAuth(accessToken);
    localStorage.setItem("token", response.token);
    localStorage.setItem("refreshToken", response.refreshToken);
    console.log(response);
    localStorage.setItem("user", response.User._id);

    // get return url from query parameters or default to home page
  } catch (error) {
    console.log(error);
  }
}
