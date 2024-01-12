const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const Post = require("./modals/postModal");
const Ask = require("./modals/askModal");
const postComment = require("./modals/postCommentModal");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(
    "mongodb+srv://admin:root@cluster0.bgvmbtt.mongodb.net/manage?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected to db"))
  .catch((error) => console.log("error :", error));

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 8);
    this.password = hash;
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compareSync(password, this.password);
  return result;
};
const User = new mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.send({ message: "User already exists" });
  } else {
    const newuser = new User({
      name,
      email,
      password,
    });

    await newuser.save();
    res.send({ message: "regestered succesfully" });
  }
});

app.post("/login", async (req, res) => {
  const userExist = await User.findOne({ email: req.body.email });

  if (userExist) {
    const isMatched = await userExist.comparePassword(req.body.password);
    if (!isMatched) {
      res.send({ message: "Invalid credentials" });
    } else {
      const token = jwt.sign(
        { userId: userExist._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      res.send({ message: "Login success", userExist: userExist, token });
    }
  } else {
    res.send({ message: "User does not exist" });
  }
});

app.post("/post", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file.path;

    // Create a new post with imageUrl included in the request body
    const newPostData = {
      userid: req.body.userid,
      caption: req.body.caption,
      name: req.body.name,
      imageUrl: imageUrl, // Assign the imageUrl to the field in the Post model
    };

    const newPost = await Post.create(newPostData);

    res.status(201).json({
      status: "success",
      data: {
        post: newPost,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

app.get("/post", async (req, res) => {
  try {
    const Posts = await Post.find();

    res.status(200).send(Posts);
  } catch (err) {}
});

app.put("/likes", async (req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $addToSet: { likes: req.body.userid }, // Using $addToSet to avoid adding duplicates
      },
      {
        new: true,
      }
    );

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: "Error liking the post" });
  }
});

app.put("/unlikes", async (req, res) => {
  try {
    console.log(req.body.postId, req.body.userid);
    const result = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.body.userid },
      },
      {
        new: true,
      }
    );
    res.status(200).send(result);
  } catch (err) {}
});

app.put("/comment", async (req, res) => {
  try {
    if (req.body.comment.trim() !== "") { // Trim whitespaces and check if not empty
      const result = await Post.findByIdAndUpdate(
        req.body.postId,
        {
          $push: {
            comments: {
              text: req.body.comment,
              user: req.body.userid,
              name: req.body.username,
            },
          },
        },
        {
          new: true,
        }
      );

      if (!result) {
        return res.status(404).send({ message: "Post not found" });
      }

      return res.status(200).send(result); // Send success response
    } else {
      return res.status(400).send({ message: "Comment cannot be blank" }); // Send error response
    }
  } catch (err) {
    return res.status(500).send({ message: "Error adding comment to the post" });
  }
});

app.post("/ask", async (req, res) => {
  try {
    const newAsk = await Ask.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        query: newAsk,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
});

app.get("/ask", async (req, res) => {
  try {
    const Asks = await Ask.find();

    res.status(200).json({
      status: "success",
      data: {
        query: Asks,
      },
    });
  } catch (err) {}
});

app.listen(8000, () => {
  console.log("App is listening on port 8000");
});
