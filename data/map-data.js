const fs = require('fs');
const axios = require("axios");

const readJson = (path) => {
  let jsonString;
  try {
    jsonString = fs.readFileSync(path).toString();
  } catch (err) {
    throw new Error('Failed to read json file', err, { path });
  }
  try {
    return JSON.parse(jsonString);
  } catch (err) {
    throw new Error('Failed to parse json file', err, { path, jsonString });
  }
}

const writeJson = (path, data) => {
  fs.writeFileSync(path, JSON.stringify(data));
}

const getData = async (location) => {
  console.log(location);
  const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}+SF,CA&key=`);
  if (response && response.data) {
    if (response.data.results && response.data.results.length > 0) {
      const data = response.data.results[0];
      if (data && data.geometry) {
        return data.geometry;
      }
    }
  }
}

const cleanData = async () => {
  const original = readJson("data/neighborhood.json");
  const result = {

  };

  const keys = Object.keys(original);

  for (let index = 0; index < keys.length; index++) {
    const element = keys[index];
    result[element] = await getData(element);
  }

  writeJson('data/result-neighborhood.json', result);
  // writeJson('data/neighborhood.json', allUniqueNeighborhood);
}

cleanData();