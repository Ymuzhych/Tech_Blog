const { Comment } = require("../models");

const commentData = [
  {
    comment_text: "Wow!",
    post_id: 3,
    user_id: 1,
  },
  {
    comment_text:
      "Hello",
    post_id: 1,
    user_id: 4,
  },
  {
    comment_text:
      "I'm here",
    post_id: 4,
    user_id: 2,
  },
  {
    comment_text: "I will tell you my story.",
    post_id: 4,
    user_id: 3,
  },
  {
    comment_text: "Did you know about salting?",
    post_id: 5,
    user_id: 5,
  },
  {
    comment_text:
      "Yeah! I did it ",
    post_id: 5,
    user_id: 4,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
