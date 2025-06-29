const mongoose = require("mongoose");
//Write missing code here
mongoose
  .connect(
   "mongodb+srv://alenmariya102:alen@cluster0.osowb4x.mongodb.net/ict1?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
