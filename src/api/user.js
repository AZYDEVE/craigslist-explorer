import env from "../config/env";
import axios from 'axios';
import { postData } from './/fetch'
// Api call to get all users from the database
// mostly used for debugging and admin purposes
// Get env api -> production: deployed database
// development -> localhost database

// Needs withCredentials and timeout as properties in the header for passport to work

export const signInUser = (payload) => {
  return postData(
    env[process.env.NODE_ENV].api + "/auth/signin",
    payload
  );
};

export const signUpUser = (payload) => {
  return postData(
    env[process.env.NODE_ENV].api + "/auth/signup",
    payload
  );
};


export const login = () => {
  return axios(env[process.env.NODE_ENV].api + "/auth/signin", { method: 'get', withCredentials: true, timeout: 10000 });
};

export const logout = () => {
  return postData(env[process.env.NODE_ENV].api + "/auth/signout");
};