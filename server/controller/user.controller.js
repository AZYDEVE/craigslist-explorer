const mongoClient = require("../config/mongoClient");
const postController = require("../controller/posts.controller");

// only read active users
// don't return password field
const readUsers = () => {
  return new Promise((resolve, reject) => {
    // Get database
    // Set the table to user
    // Find all users but exclude the following fields: _id (mongoDb generated id), hashed_password
    // Convert the data to array
    // Check if we have a successful response
    // If we have error we will return an error response
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

const getAmountOfUsers = () => {
  return new Promise((resolve, reject) => {
    mongoClient
      .getDatabase()
      .connection.collection("user")
      .countDocuments({})
      .then((count) => {
        resolve({ userCount: count });
      })
      .catch((err) => {
        reject(err);
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

/*
  location: structure to recognize the data to update on for example id
  updateValue: json structure to update
  Example of updateValue: { $set: { test2: 2 } }
*/
const updateUser = (location, updateValue) => {
  return new Promise((resolve, reject) => {
    mongoClient
      .getDatabase()
      .connection.collection("user")
      .updateOne(location, updateValue)
      .then((result, err) => {
        if (err) {
          console.error("error: updateUser", err);
        }
        if (result.result.ok && result.result.ok > 0) {
          resolve(result);
        } else {
          reject();
        }
      });
  });
};

// We will never delete a user/post just set the account to not active
const deleteUser = (location) => {
  return new Promise((resolve, reject) => {
    updateUser(location, { $set: { active: 0 } })
      .then(resolve)
      .catch(reject);
  });
};

// Export all database functions
module.exports = {
  readUsers,
  addUser,
  updateUser,
  readUser,
  deleteUser,
  getAmountOfUsers,
};
