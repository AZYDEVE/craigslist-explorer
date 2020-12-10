const environment = {};

environment["development"] = {
  api: "http://localhost:3001",
};

environment["production"] = {
  api: "https://webdev-forum-backend.herokuapp.com",
};

export default environment;
