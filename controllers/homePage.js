const User = require("../database/models/User");
module.exports = async (req, res) => {
const users = User.find({_id:req.session.userId});
const date = new Date;
  res.render("index",{
    users,
    date
  });
}