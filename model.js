//Write missing codes here
var mongoose =  require('mongoose')
const schema = mongoose.Schema({
  title: String,
  content: String,
  img_url: String,
});
var Model = mongoose.model("Blog",schema);

module.exports= Model;
