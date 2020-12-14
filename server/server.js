const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const session = require('express-session')
const { v4: uuidv4 } = require("uuid");
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const cookieParser = require("cookie-parser");
var bodyParser = require('body-parser')
const config = require("./config/config");

// Passport config
const configurePassport = require('./config/authConfig');
configurePassport();

// routes
const authRoute = require("./routes/auth.route");
const postsRoute = require("./routes/posts.route");
const annotationRoute = require("./routes/annotation.route");
const locationRoute = require("./routes/location.route");

// Express app
const app = express();

// enable cors
var whitelist = ['http://localhost:8080', 'https://emile-f.github.io']
app.use(cors({
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }, credentials: true
}));

// init cookie-parser
app.use(cookieParser());

// init Body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// sanitize request data
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// session middelware
const sessionConfig = {
  genid: (req) => {
    return uuidv4() // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: "Hi I'm Emile",
  resave: false,
  saveUninitialized: false
}

if (config.env === 'deploy') {
  sessionConfig.cookie = {
    sameSite: 'none',
    secure: true
  }
}

app.use(session(sessionConfig))

// Enable passport
app.use(passport.initialize());
app.use(passport.session());

// Default route
app.get("/", (req, res) => {
  res.send("Hello from Craigslist-explorer api");
});

// user api requests
app.use("/auth", authRoute);
app.use("/posts", postsRoute);
app.use("/annotation", annotationRoute);
app.use("/location", locationRoute);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND);
  res.send("Not found");
});


// Export Express router
module.exports = app;
