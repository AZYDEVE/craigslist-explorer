import axios from "axios";
import env from "../config/env";

// Api call to get all users from the database
// mostly used for debugging and admin purposes
// Get env api -> production: deployed database
// development -> localhost database
export const getUserStats = () => {
  return axios.get(env[process.env.NODE_ENV].api + "/accounts/stats");
};

export const signInUser = (payload) => {
  return axios.post(
    env[process.env.NODE_ENV].api + "/accounts/signin",
    payload
  );
};

export const signUpUser = (payload) => {
  return axios.post(
    env[process.env.NODE_ENV].api + "/accounts/signup",
    payload
  );
};
