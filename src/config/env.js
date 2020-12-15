const environment = {};

environment["development"] = {
  api: "http://localhost:3001",
  // api: "https://webdev-craigslist-exporer-back.herokuapp.com",
};

environment["production"] = {
  api: "https://webdev-craigslist-exporer-back.herokuapp.com",
};

export default environment;
