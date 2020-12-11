import axios from "axios";
import env from "../config/env";
// import { currentUser } from "../service/user.service";

export const getPosts = (filter, sorting, page) => {
  const uriFilter = encodeURIComponent(JSON.stringify(filter));
  const uriSorting = encodeURIComponent(JSON.stringify(sorting));
  return axios.get(`${env[process.env.NODE_ENV].api}/posts/all?page=${page}&filter=${uriFilter}&sort=${uriSorting}`);
};

export const searchAllThreads = (searchTerm) => {
  return axios.get(
    env[process.env.NODE_ENV].api + "/thread/search?searchTerm=" + searchTerm
  );
};

export const getPost = (id) => {
  return axios.get(env[process.env.NODE_ENV].api + "/posts/one?id=" + id);
};

// export const addThread = (payload) => {
//   payload.userId = currentUser.id;
//   return axios.post(env[process.env.NODE_ENV].api + "/thread/add", payload);
// };

// export const addPost = (payload) => {
//   payload.userId = currentUser.id;
//   return axios.post(
//     env[process.env.NODE_ENV].api + "/thread/add-post",
//     payload
//   );
// };
