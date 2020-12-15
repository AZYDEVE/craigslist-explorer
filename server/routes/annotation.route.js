const express = require("express");
const annotationController = require("../controller/annotation.controller");
const router = express.Router();
const helper = require("./helper");

const addAnnotation = async (req, res) => {
  if (req && req.body) {
    if (req.isAuthenticated()) {
      helper
        .doesPostExist(req.body.postId)
        .then(() => {
          const annotation = {
            postId: req.body.postId,
            message: req.body.message,
            userId: req.user._id.toString(),
            created: Date.now(),
          };

          annotationController
            .addAnnotation(annotation)
            .then((result) => {
              res.json(result);
            })
            .catch((err) => {
              // Failed to add annotation
              res.status(500); // 500 Internal Server Error
              res.json({
                "status-code": 500,
                message: err || "failed to add annotation",
              });
            });
        })
        .catch((err) => {
          res.status(202);
          res.json(err);
        });
    } else {
      console.error("Failed to authenticate");
      return res.status(400).json({ message: "Failed to authenticate" });
    }
  } else {
    // No form data found
    res.status(500); // 500 Internal Server Error
    res.json({
      "status-code": 500,
      message: "No request body found",
    });
  }
};

const getAnnotations = async (req, res) => {
  if (req && req.isAuthenticated()) {
    const id = req.query.id;

    if (!id || id.length !== 24) {
      return res.status(400).json({ message: "id is not valid" }); // Invalid ID length
    }

    // read annotation table
    annotationController
      .readAnnotations(id, req.user._id.toString())
      .then((post) => {
        return res.json(post);
      })
      .catch((err) => {
        // Database call failed return 500 error
        res.status(500); // 500 Internal Server Error
        res.json({
          "status-code": 500,
          message: err || "failed request",
        });
      });
  } else {
    return res.status(400).json({ message: "Failed to authenticate" });
  }
};

router.post("/add", addAnnotation);
router.get("/all", getAnnotations);

// Export annotation router
module.exports = router;
