const express = require("express");
const router = express.Router();
const passport = require('passport');
const helper = require('./helper');
const userController = require('./../controller/user.controller');

const signInPost = (req, res, next) => {
  if (req && req.body) {

    // Check if all fields are set
    if (!req.body.email || !req.body.password) {
      return res.status(400).send("One of the required fields is not set");
    }

    passport.authenticate('local', { session: false }, (err, user) => {

      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(202).send("Failed to validate user!");
      }

      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.json(req.user);
      })
    })(req, res, next);
  } else {
    // No form data found
    res.status(500); // 500 Internal Server Error
    res.json({
      "status-code": 500,
      message: "No request body found",
    });
  }
};

const signInGet = (req, res) => {
  if (req) {
    res.send(req.user ? req.user : null);
  } else {
    // No form data found
    res.status(500); // 500 Internal Server Error
    res.json({
      "status-code": 500,
      message: "No request body found",
    });
  }
};

const signUp = (req, res, next) => {
  if (req) {

    // Check if all fields are set
    if (!req.body || !req.body.email || !req.body.password) {
      return res.status(400).send("One of the required fields is not set");
    }

    helper
      .doesUserExist(req.body.email)
      .then((result) => {
        // Add user and return the added user
        userController
          .addUser({ email: req.body.email, password: req.body.password })
          .then((users) => {
            passport.authenticate('local', { session: false }, (err, user) => {

              if (err) {
                return next(err);
              }

              if (!user) {
                return res.status(202).send("Failed to validate user!");
              }

              req.login(user, (err) => {
                if (err) {
                  return next(err);
                }
                return res.json(req.user);
              })
            })(req, res, next);
          })
          .catch((err) => {
            // Failed to add user
            res.status(500); // 500 Internal Server Error
            res.json({
              "status-code": 500,
              message: err || "failed to signup",
            });
          });
      })
      .catch((err) => {
        res.status(202);
        res.send(err);
      });

  } else {
    // No form data found
    res.status(500); // 500 Internal Server Error
    res.json({
      "status-code": 500,
      message: "No request body found",
    });
  }
};

const signOut = (req, res) => {
  req.logout();
  res.send(true);
};


router.post("/signup", signUp);
router.get("/signin", signInGet);
router.post("/signin", signInPost);
router.post("/signout", signOut);

module.exports = router;
