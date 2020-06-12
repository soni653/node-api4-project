const express = require("express");

const router = express.Router();
const posts = require("../data/db");

//Returns an array of all the post objects contained in
//the database.

router.get("/posts", (req, res) => {
  posts
    .find(req.query)
    .then((posts) => {
      //console.log(posts);
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The posts information could not be retrieved.",
      });
    });
});

//Get Request with Specified ID

router.get("/api/posts/:id", (req, res) => {
  posts
    .findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The post information could not be retrieved.",
      });
    });
});

//Get Request with ID/comments
router.get("/api/posts/:id/comments", (req, res) => {
  posts
    .findCommentById(req.params.id)
    .then((post) => {
      if (req.params.id) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The post information could not be retrieved.",
      });
    });
});

module.exports = router;
