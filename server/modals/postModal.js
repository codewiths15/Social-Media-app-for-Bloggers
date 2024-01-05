const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userid: {
    type: String,
  },
  caption: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
});

const Post = new mongoose.model("Post", postSchema);
module.exports = Post;
