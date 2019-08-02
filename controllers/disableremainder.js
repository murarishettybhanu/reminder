const Post = require('../database/models/Post')

module.exports = (req, res) => {
    Post.findByIdAndUpdate(req.params.id,{
        status:"Disabled"
    }, (error, post) => {
        if(post){
            res.redirect("/disablepage")
        }
        else{
            console.log(error)
        }
    });
}