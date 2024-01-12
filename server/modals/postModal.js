const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
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
  createdAt: {
    type: Date,
    default: Date.now, // Set default value to the current timestamp when a post is created
  },
  day: {
    type: Number, // Assuming day is stored as a number (0 for Sunday, 1 for Monday, etc.)
  },
  time: {
    type: String, // You can store time as a string or adjust the type as per your requirements
  },
  likes: [
    {
      type: String,
    },
  ],
  comments: [
    {
      text: {
        type: String,
        required: true,
      },
      user: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      replies: [
        {
          text: {
            type: String,
          },
          user: {
            type: String, // Assuming this is the user ID of the replier
          },
          name: {
            type: String,
          },
        },
      ],
    },
  ],
});

postSchema.pre("save", function (next) {
  const currentDate = new Date();
  this.createdAt = currentDate;

  // Set day and time fields based on currentDate
  this.day = currentDate.getDay(); // Get numerical day (0 for Sunday, 1 for Monday, etc.)
  this.time = `${currentDate.getHours()}:${currentDate.getMinutes()}`; // Get time in HH:mm format

  next();
});
const Post = new mongoose.model("Post", postSchema);
module.exports = Post;
