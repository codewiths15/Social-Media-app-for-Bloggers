const mongoose = require("mongoose");

const postCommentSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  comment: {
    type: String,
    required: true,
  },
});

const postComment = new mongoose.model("postComment", postCommentSchema);
module.exports = postComment;
