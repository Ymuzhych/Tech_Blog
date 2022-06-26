//dependencies, express.js connection
const router = require("express").Router();
// User Model, Post Model, and Comment Model
const { User, Post, Comment } = require("../../models");
// Sequelize database connection
const sequelize = require('../../config/connection');
// Authorization Helper
const withAuth = require("../../utils/auth");


//Routs
// Get all posts
router.get("/", (req, res) => {
  Post.findAll({
    // Query configuration, the Post table, include the post ID, URL, title, and the timestamp from post creation
    attributes: ["id", "content", "title", "created_at"],
    // Order the posts from most recent to least
    order: [["created_at", "DESC"]],
    // From the User table, include the post creator's user name, the Comment table, include all comments
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    //return the posts
    .then((dbPostData) => res.json(dbPostData))
    // if there was a server error, return the error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get a single post
router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      // specify the post id parameter in the query
      id: req.params.id,
    },
    // Query configuration, as with the get all posts route
    attributes: ["id", "content", "title", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbPostData) => {
      // if no post by that id exists, return an error
      if (!dbPostData) {
        res.status(404).json({
          message: "No post found with this id",
        });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a post
router.post("/", withAuth, (req, res) => {
  console.log("creating");
  Post.create({
    title: req.body.title,
    content: req.body.post_content,
    user_id: req.session.user_id
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT api/Update a post
router.put("/:id", withAuth, (req, res) => {
  Post.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    // Post.update(
    //   {
    //     title: req.body.title,
    //     content: req.body.post_content,
    //   },
    //   {
    //     where: {
    //       id: req.params.id,
    //     },
    //   }
    // )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({
          message: "No post found with this id",
        });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Delete a post
router.delete("/:id", withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({
          message: "No post found with this id",
        });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
