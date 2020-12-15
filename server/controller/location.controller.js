const mongoClient = require("../config/mongoClient");

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
  getLocations,
};
