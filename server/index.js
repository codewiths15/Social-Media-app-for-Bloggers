import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://nodeproject:nodeproject@cluster1.8flljbk.mongodb.net/Userdata?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected to db"))
  .catch((error) => console.log("error :", error));

const userSchema = new mongoose.Schema({
  name: {
    type : String,
    required: true
  },
  email: {
    type : String,
    required: true
  },
  password: {
    type : String,
    required: true
  }
});

const User = new mongoose.model('User', userSchema);

app.post("/register", async (req, res) => {
    const userExist = await User.findOne({email : req.body.email})

    if (userExist){
        res.send({message:"User already exists"})
    }
    else{
        const newuser= new User ({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })

        await newuser.save()
        res.send({message:"regestered succesfully"})
    }


});

app.post("/login", async(req, res) => {
    const userExist = await User.findOne({email : req.body.email})

    if (userExist){

        if (userExist.password == req.body.password){
            res.send({ message :"Login success" , userExist:userExist})
            
        }
        else{
            res.send({ message :"Invalid credentials"})
        }
    }

    else{
        res.send({message:'User does not exist'})
    }
  
});

app.get("/", (req, res) => {
  res.send("sahil");
});

app.listen(8000, () => {
  console.log("App is listening on port 8000");
});
