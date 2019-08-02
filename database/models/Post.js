const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  name:String,
  date: String,
  subject: String,
  description: String,
  email:String,
  contact:String,
  sms:String,
  rec:String,
  id:String,
  status:String
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
