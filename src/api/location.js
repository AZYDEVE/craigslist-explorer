import env from "../config/env";
import axios from 'axios';

export const getLocation = (address) => {
  return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}+SF,CA&key=AIzaSyCUt2G6KFrKTpKlUkbUrTIH0SqpgzRX8_0`);
};

export const getLocations = () => {
  return axios.get(env[process.env.NODE_ENV].api + "/location/all");
};