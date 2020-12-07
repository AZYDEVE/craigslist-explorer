const express = require("express");
const postController = require("../controller/posts.controller");
const router = express.Router();
const helper = require("./helper");

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

  // check for filter or sort order
  // const sortOrder = 'price';
  // const filter = [];
  // if (req.query) {
  //   if (req.query.oder) {
  //     sortOrder = req.query.oder;
  //   }
  //   if (req.query.filter) {

  //   }
  // }

  // read entire table
  postController
    .readThreads()
    .then((threads) => {
      res.json(threads);
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
