const mongoClient = require("../config/mongoClient");

const addLocation = (long, lat) => {
  return new Promise((resolve, reject) => {
    mongoClient
      .getDatabase()
      .connection.collection("location")
      .updateOne(
        {
          long,
          lat,
        },
        { $set: { long, lat } },
        { upsert: true }
      )
      .then((result, err) => {
        if (err) {
          console.error("error: addLocation", err);
          reject("Failed to add location to database");
        } else {
          // The mongo success result is on the following data structure
          // result.ops: this is an array
          if (result.ops && result.result && result.result.ok > 0) {
            resolve();
          } else {
            resolve(undefined);
          }
        }
      });
  });
};

const getLocations = () => {
  return new Promise((resolve, reject) => {
    mongoClient
      .getDatabase()
      .connection.collection("location")
      .find({}, { projection: { _id: 0 } })
      .toArray((err, docs) => {
        if (err) {
          console.error("error: getLocations", err);
          reject("Failed to get all locations from database");
        } else {
          resolve(docs);
        }
      });
  });
};

module.exports = {
  addLocation,
  getLocations,
};
