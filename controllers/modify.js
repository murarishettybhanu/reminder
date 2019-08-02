const Post = require('../database/models/Post')

module.exports = async (req, res) => {
  const posts = await Post.findById({_id: req.params.id});

  res.render("modify", {
    posts
  });
}