import axios from 'axios';
import env from "../config/env";

export const getPosts = (filter, sorting, page, filterNeighborhood) => {
  const uriFilter = encodeURIComponent(JSON.stringify(filter));
  const uriSorting = encodeURIComponent(JSON.stringify(sorting));
  return axios.get(`${env[process.env.NODE_ENV].api}/posts/all?page=${page}&filter=${uriFilter}&sort=${uriSorting}&neighborhood=${filterNeighborhood}`);
};

export const getPost = (id) => {
  return axios.get(env[process.env.NODE_ENV].api + "/posts/one?id=" + id);
};

export const addAnnotation = (payload) => {
  return axios.post(env[process.env.NODE_ENV].api + "/annotation/add",
    payload, {
    withCredentials: true,
    timeout: 10000
  });
};

export const getAnnotations = (id) => {
  return axios.get(env[process.env.NODE_ENV].api + "/annotation/all?id=" + id, {
    withCredentials: true,
    timeout: 10000
  });
};