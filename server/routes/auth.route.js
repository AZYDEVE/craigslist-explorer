const express = require("express");
const router = express.Router();
const passport = require('passport');
const helper = require('./helper');
const userController = require('./../controller/user.controller');

const signInPost = (req, res, next) => {
  if (req && req.body) {
    // Check if all fields are set
    // if (!req.body.email || !req.body.password) {
    //   return res.status(400).send("One of the required fields is not set");
    // }

    // const email = req.body.email;
    // const hashed_password = req.body.password;

    console.log('Inside POST /login callback function')
    console.log(req.body)

    passport.authenticate('local', (err, user) => {

      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(204).send("Failed to validate user!");
      }

      console.log('Inside passport.authenticate() callback');
      console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
      console.log(`req.user: ${JSON.stringify(req.user)}`)

      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        console.log('Inside req.login() callback')
        console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
        console.log(`req.user: ${JSON.stringify(req.user)}`)
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
    console.log('Inside GET /login callback')
    console.log(req.user)
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

    // Create user object from the POST body
    // const newUser = User.from(req.body);
    console.log("newUser", { email: req.body.email, password: req.body.password });
    // Check if the email is used already

    helper
      .doesUserExist(req.body.email)
      .then((result) => {
        // Add user and return the added user
        userController
          .addUser({ email: req.body.email, password: req.body.password })
          .then((users) => {
            passport.authenticate('local', (err, user) => {

              if (err) {
                return next(err);
              }

              if (!user) {
                return res.status(204).send("Failed to validate user!");
              }

              console.log('Inside passport.authenticate() callback');
              console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
              console.log(`req.user: ${JSON.stringify(req.user)}`)

              req.login(user, (err) => {
                if (err) {
                  return next(err);
                }
                console.log('Inside req.login() callback')
                console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
                console.log(`req.user: ${JSON.stringify(req.user)}`)
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
        console.log('error');
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
  if (req) {
    req.logout();
    res.send(true);
  } else {
    // No form data found
    res.status(500); // 500 Internal Server Error
    res.json({
      "status-code": 500,
      message: "No request body found",
    });
  }
};
router.post("/signup", signUp);
router.get("/signin", signInGet);
router.post("/signin", signInPost);
router.post("/signout", signOut);

module.exports = router;
