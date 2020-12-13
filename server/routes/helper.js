const userController = require("../controller/user.controller");
const postsController = require("../controller/posts.controller");

const doesUserExist = (email) => {
  return new Promise((resolve, reject) => {
    userController
      .readUser({ email })
      .then((doc) => {
        if (doc && doc.length && doc.length > 0) {
          reject("User already exists");
        } else {
          resolve(true);
        }
      })
      .catch((err) => {
        reject("Failed to check if user exits", err);
      });
  });
};

const doesPostExist = (id) => {
  return new Promise((resolve, reject) => {
    postsController
      .readPost(id)
      .then((doc) => {
        if (doc && doc.length && doc.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err) => {
        reject("Failed to check if user exits", err);
      });
  });
};

module.exports = {
  doesUserExist,
  doesPostExist
};
