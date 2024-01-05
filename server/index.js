const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Post = require("./modals/postModal");
const Ask = require("./modals/askModal");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null,uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/uploads',express.static("uploads"));

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

const User = new mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
  const userExist = await User.findOne({ email: req.body.email });

  if (userExist) {
    res.send({ message: "User already exists" });
  } else {
    const newuser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    await newuser.save();
    res.send({ message: "regestered succesfully" });
  }
});

app.post("/login", async (req, res) => {
  const userExist = await User.findOne({ email: req.body.email });

  if (userExist) {
    if (userExist.password == req.body.password) {
      res.send({ message: "Login success", userExist: userExist });
    } else {
      res.send({ message: "Invalid credentials" });
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
