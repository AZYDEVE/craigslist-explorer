const fs = require("fs");
const cheerio = require("cheerio");

const readJson = (path) => {
  let jsonString;
  try {
    jsonString = fs.readFileSync(path).toString();
  } catch (err) {
    throw new Error("Failed to read json file", err, { path });
  }
  try {
    return JSON.parse(jsonString);
  } catch (err) {
    throw new Error("Failed to parse json file", err, { path, jsonString });
  }
};

const writeJson = (path, data) => {
  fs.writeFileSync(path, JSON.stringify(data));
};

const stringToNumber = (str) => {
  let returnValue = str;

  try {
    const tmp = parseInt(str);
    if (!Number.isNaN(tmp)) {
      returnValue = tmp;
    }
  } catch (error) {
    console.error("bedrooms: Failed to parse to number");
  }
  if (returnValue === "") {
    returnValue = null;
  }
  return returnValue;
};

const allUniqueNeighborhood = {};

const clean = (obj) => {
  const returnObj = {};

  returnObj.images = [];
  for (let index = 0; index < obj.images.length; index++) {
    const img = obj.images[index];
    returnObj.images.push(
      img
        .replace("_50x50c.jpg", "")
        .replace("https://images.craigslist.org/", "")
    );
  }

  returnObj.title = obj["result-title"];

  // remove the dollar sign and comma
  let price = obj["result-price"].replace("$", "").replace(",", "");
  returnObj.price = stringToNumber(price); // in dollar

  // split housing in bedroom and area (in feet)
  // "housing": "/ 2br - 1100ft",
  let housing = obj.housing;
  if (housing) {
    housing = housing.replace("/ ", "");
    housing = housing.split("-");
    if (housing[0]) {
      returnObj.bedrooms = stringToNumber(housing[0].trim());
    }
    if (housing[1]) {
      returnObj.area = stringToNumber(housing[1].trim());
    }
  }

  if (!returnObj.area) {
    returnObj.area = "";
  }

  if (!returnObj.bedrooms) {
    returnObj.bedrooms = "";
  }

  // neighborhood split by /
  returnObj.neighborhood = [];
  let neighborhood = obj["result-hood"];
  if (neighborhood) {
    neighborhood = neighborhood.split("/");
    for (let index = 0; index < neighborhood.length; index++) {
      let element = neighborhood[index];
      element = element.replace("(", "").replace(")", "").trim();
      returnObj.neighborhood.push(element);
    }
  }

  if (allUniqueNeighborhood[returnObj.neighborhood.join(" ")]) {
    allUniqueNeighborhood[returnObj.neighborhood.join(" ")] += 1;
  } else {
    allUniqueNeighborhood[returnObj.neighborhood.join(" ")] = 0;
  }

  returnObj.date = Date.parse(obj["result-date"]);

  // get body from html
  try {
    const $ = cheerio.load(obj.postingbody);
    returnObj.url = $(".print-qrcode").attr("data-location");
    $("section").children().remove("div").remove("a"); // Remove qr-code text and contact me text
    returnObj.body = $("section").text();
  } catch (error) {
    returnObj.url = "";
    returnObj.body = "";
  }

  returnObj.address = obj["mapaddress"]
    ? obj["mapaddress"].replace("\n", "").trim()
    : "";

  return returnObj;
};

const cleanData = () => {
  const original = readJson("data/apts.json");
  const result = [];
  original.forEach((obj) => {
    result.push(clean(obj));
  });

  writeJson("data/result.json", result);
  writeJson("data/neighborhood.json", allUniqueNeighborhood);
};

cleanData();
