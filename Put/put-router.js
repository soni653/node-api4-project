const express = require("express");
const posts = require("../data/db");

const router = express.Router();

//Put or Update
router.put("/api/posts/:id", async (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }

  try {
    const post = await posts.update(req.params.id, req.body);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "The post information could not be modified.",
    });
  }
});

module.exports = router;
