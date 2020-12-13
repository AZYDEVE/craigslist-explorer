const mongoClient = require("../config/mongoClient");

// only read active users
// don't return password field
const readUsers = () => {
  return new Promise((resolve, reject) => {
    mongoClient
      .getDatabase()
      .connection.collection("user")
      .find({}, { projection: { _id: 0, hashed_password: 0 } })
      .toArray((err, docs) => {
        if (err) {
          console.error("error: readUsers", err);
          reject("Failed to get all users from database");
        } else {
          resolve(docs);
        }
      });
  });
};

// only read active users
// don't return password field
const readUser = (doc) => {
  return new Promise((resolve, reject) => {
    mongoClient
      .getDatabase()
      .connection.collection("user")
      .find(Object.assign({}, doc), {
        projection: { password: 0 },
      })
      .toArray((err, docs) => {
        if (err) {
          console.error("error: readUser", err);
          reject(err);
        } else {
          resolve(docs);
        }
      });
  });
};

const addUser = (doc) => {
  return new Promise((resolve, reject) => {
    mongoClient
      .getDatabase()
      .connection.collection("user")
      .insertOne(Object.assign({}, doc))
      .then((result, err) => {
        if (err) {
          console.error("error: addUser", err);
          reject("Failed to add user to database");
        } else {
          // The mongo success result is on the following data structure
          // result.ops: this is an array
          if (result.ops && result.ops.length && result.ops.length > 0) {
            // Return inserted user
            resolve(result.ops[0]);
          } else {
            resolve(undefined);
          }
        }
      });
  });
};

// Export all database functions
module.exports = {
  readUsers,
  addUser,
  readUser,
};
