import axios from "axios";
import env from "../config/env";

export const getLocations = () => {
  return axios.get(env[process.env.NODE_ENV].api + "/location/all");
};
