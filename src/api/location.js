import env from "../config/env";
import axios from "axios";

export const getLocation = (address) => {
  return axios.get(
    env[process.env.NODE_ENV].api + "/location/geo?location=" + address
  );
};

export const getLocations = () => {
  return axios.get(env[process.env.NODE_ENV].api + "/location/all");
};
