const express = require("express");
const postController = require("../controller/posts.controller");
const router = express.Router();
// const helper = require("./helper");

// const addThread = async (req, res) => {
//   if (req && req.body) {
//     if (
//       !req.body.userId ||
//       (req.body.userId && req.body.userId.length !== 36)
//     ) {
//       return res.status(400).send("UserId is not valid"); // Invalid ID length
//     } else {
//       const idExists = await helper.doesUserExistByUserId(req.body.userId);
//       if (!idExists) {
//         return res.status(400).send("UserId is not valid"); // ID doesn't exist
//       }
//     }

//     let tags = [];
//     if (req.body.tags) {
//       try {
//         tags = JSON.parse(req.body.tags);
//       } catch (error) {
//         console.error("Failed to parse tags", req.body.tags);
//       }
//     }

//     // Create thread object
//     const thread = new Thread(req.body.subject, req.body.userId, tags);

//     // create first post
//     const post = new Post(thread.id, req.body.message || "", req.body.userId);

//     // push post into thread
//     thread.posts.push(post);

//     // Add user and return the added user
//     threadController
//       .addThread(thread)
//       .then((thread) => {
//         res.json(thread);
//       })
//       .catch((err) => {
//         // Failed to add thread
//         res.status(500); // 500 Internal Server Error
//         res.json({
//           "status-code": 500,
//           message: err || "failed to add thread",
//         });
//       });
//   } else {
//     // No form data found
//     res.status(500); // 500 Internal Server Error
//     res.json({
//       "status-code": 500,
//       message: "No request body found",
//     });
//   }
// };

const getAllPosts = (req, res) => {

  // return axios.get(`${env[process.env.NODE_ENV].api}/posts/all?page=${page}&filter=${uriFilter}&sort=${uriSorting}`);

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

const getOneThread = async (req, res) => {
  const id = req.query.id;

  if (!id || id.length !== 36) {
    return res.status(400).send("id is not valid"); // Invalid ID length
  } else {
    const idExists = await helper.doesThreadExistByThreadId(id);
    if (!idExists) {
      return res.status(400).send("id is not valid"); // ID doesn't exist
    }
  }

  // read entire table
  postController
    .readThread(id)
    .then((thread) => {
      res.json(thread);
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

const searchInThreads = async (req, res) => {
  const searchTerm = req.query.searchTerm;

  if (!searchTerm) {
    return res.status(400).send("id is not valid"); // Invalid ID length
  }

  // read entire table
  postController
    .searchThread(searchTerm)
    .then((thread) => {
      res.json(thread);
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

// example: localhost:3000/posts/all
router.get("/all", getAllPosts);

// example: localhost:3000/thread/one?id=1b29376f-71d3-4c54-875c-cc1898a55819
router.get("/one", getOneThread);

router.get("/search", searchInThreads);

// Export user router
module.exports = router;
