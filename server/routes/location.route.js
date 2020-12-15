const express = require("express");
const router = express.Router();
const locationController = require("../controller/location.controller");
const axios = require("axios");
const config = require("../config/config");

const getAllLocations = (req, res) => {
  // read entire table
  locationController
    .getLocations()
    .then((locations) => {
      res.json(locations);
    })
    .catch((err) => {
      // Database call failed return 500 error
      res.status(500); // 500 Internal Server Error
      res.json({
        "status-code": 500,
        message: err || "failed request",
      });
    });
};

const getGeoLocations = (req, res) => {

  const location = req.query.location;

  if (!location) {
    return res.status(400).json({ message: "location is not valid" }); // Invalid location
  }

  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}+SF,CA&key=${config.google}`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      res.json({
        message: "Failed to get geo-location from google api"
      });
    });
};

router.get("/geo", getGeoLocations);

router.get("/all", getAllLocations);

// Export annotation router
module.exports = router;