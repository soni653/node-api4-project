const express = require("express");
const posts = require("../data/db");

const router = express.Router();

//Creates a post using the information sent inside the request body
router.post("/api/posts", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }

  posts
    .insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});

//POST with CommentsID OR CREATE
router.post("/api/posts/:id/comments", (req, res) => {
  const { text } = req.body;
  const post_id = req.params.id;
  !text
    ? res.status(400).json({
        errorMessage: "Please provide text for the comment.",
      })
    : posts.findById(post_id).then((post) => {
        if (!post) {
          res.status.json(404)({
            message: "The post with the specified ID does not exist.",
          });
        } else {
          let newComment = {
            text,
            post_id,
          };
          posts
            .insertComment(newComment)
            .then(({ id }) => {
              posts.findCommentById(id).then((comment) => {
                res.status(201).json(comment);
              });
            })
            .catch((error) => {
              res.status(500).json({
                error:
                  "There was an error while saving the post to the database",
              });
            });
        }
      });
});

module.exports = router;
