import axios from "axios";
import env from "../config/env";
import { currentUser } from "../service/user.service";

export const getAllThreads = () => {
  return axios.get(env[process.env.NODE_ENV].api + "/thread/all");
};

export const searchAllThreads = (searchTerm) => {
  return axios.get(
    env[process.env.NODE_ENV].api + "/thread/search?searchTerm=" + searchTerm
  );
};

export const getThread = (id) => {
  return axios.get(env[process.env.NODE_ENV].api + "/thread/one?id=" + id);
};

export const addThread = (payload) => {
  payload.userId = currentUser.id;
  return axios.post(env[process.env.NODE_ENV].api + "/thread/add", payload);
};

export const addPost = (payload) => {
  payload.userId = currentUser.id;
  return axios.post(
    env[process.env.NODE_ENV].api + "/thread/add-post",
    payload
  );
};
