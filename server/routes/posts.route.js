const express = require("express");
const postController = require("../controller/posts.controller");
const router = express.Router();

const getAllPosts = (req, res) => {

  const page = req.query.page;
  let filter = req.query.filter
  try {
    filter = decodeURIComponent(filter);
    filter = JSON.parse(filter);
  } catch (error) {
    console.log('getAllPosts: Failed to parse filter using default values');
    filter = {};
  }

  let sorting = req.query.sort
  try {
    sorting = decodeURIComponent(sorting);
    sorting = JSON.parse(sorting);
  } catch (error) {
    console.log('getAllPosts: Failed to parse sorting using default values');
    sorting = {
      amount: "10",
      sortBy: "date",
      sortOrder: "asc"
    };
  }

  if (!sorting.amount) {
    sorting.amount = 10;
  }

  if (!sorting.sortBy) {
    sorting.sortBy = "date";
  }

  if (!sorting.sortOrder) {
    sorting.sortOrder = "asc";
  }

  const startRange = page * parseInt(sorting.amount);

  // read entire table
  postController
    .readPosts(filter, sorting, startRange, parseInt(sorting.amount))
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      // Database call failed return 500 error
      res.status(500); // 500 Internal Server Error
      res.json({
        "status-code": 500,
        message: err || "failed request",
      });
    });
};

const getOnePost = async (req, res) => {
  const id = req.query.id;

  if (!id || id.length !== 24) {
    return res.status(400).send("id is not valid"); // Invalid ID length
  }

  // read entire table
  postController
    .readPost(id)
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      // Database call failed return 500 error
      res.status(500); // 500 Internal Server Error
      res.json({
        "status-code": 500,
        message: err || "failed request",
      });
    });
};

router.get("/all", getAllPosts);
router.get("/one", getOnePost);

// Export posts router
module.exports = router;
