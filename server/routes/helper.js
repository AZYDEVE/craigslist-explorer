const userController = require("../controller/user.controller");
const threadController = require("../controller/thread.controller");

const doesUserExist = (email) => {
  return new Promise((resolve, reject) => {
    userController
      .readUser({ email })
      .then((doc) => {
        if (doc && doc.length && doc.length > 0) {
          reject("User already exists");
        } else {
          resolve();
        }
      })
      .catch(() => {
        reject("Failed to check if user exits");
      });
  });
};

const doesUserExistByUserId = (id) => {
  return new Promise((resolve, reject) => {
    userController
      .readUser({ id })
      .then((doc) => {
        if (doc && doc.length && doc.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(() => {
        reject("Failed to check if user exits");
      });
  });
};

const doesThreadExistByThreadId = (id) => {
  return new Promise((resolve, reject) => {
    threadController
      .checkThreadID({ id })
      .then((doc) => {
        if (doc && doc.length && doc.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(() => {
        reject("Failed to check if thread exists");
      });
  });
};

module.exports = {
  doesUserExist,
  doesUserExistByUserId,
  doesThreadExistByThreadId,
};
