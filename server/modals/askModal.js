const mongoose = require("mongoose");


const askSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  
});

const Ask = new mongoose.model("Ask", askSchema);
module.exports=Ask
