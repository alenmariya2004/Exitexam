const express = require("express");
const cors = require("cors");

const app = express();
require("./connection")
var Blog= require("./model")
var PORT = 3001;
app.use(express.json());
app.use(cors());
//Write missing code here
//Write your POST API here
app.post("/add", async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.status(201).json({message:"Blog added successfully"});
  } catch (error) {
    console.error("Error adding blog:", error);
    res.status(500).send("Error adding blog");
  }
});

app.get("/get", async (req, res) => {
  try {
    let data = await Blog.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.delete('/:id',async(req,res)=>{
    console.log(req.params.id)
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.send("Blog deleted")
    } catch (error) {
        res.send(error)
    }
})

app.put('/:id',async(req,res)=>{
    try {
        await Blog.findByIdAndUpdate(req.params.id,req.body);
        res.send("Blog data updated")
    } catch (error) {
        res.send(error)
    }
})

app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
