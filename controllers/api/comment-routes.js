//Dependencies, express.js connection
const router = require("express").Router();
//comment model
const { Comment } = require("../../models");
// const { User, Post, Comment } = require("../../models");
//authorization helper
const withAuth = require("../../utils/auth");

//Get all comments by running .findAll() method
router.get("/", (req, res) => {
  Comment.findAll()
    // return the data as JSON formatted
    .then((dbCommentData) => res.json(dbCommentData))
    //if server error, return to that error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Create a new comment
router.post("/", withAuth, (req, res) => {
  //check if session exists
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      //user id from session
      user_id: req.session.user_id,
    })
      .then((dbCommentData) => res.json(dbCommentData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});
//Delete a comment
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(dbCommentData => {
          if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
          }
          res.json(dbCommentData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });

module.exports = router;
