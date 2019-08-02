const Post = require('../database/models/Post')

module.exports = (req, res) => {
    Post.findByIdAndUpdate(req.params.id,{
        status:"Enabled"
    }, (error, post) => {
        if(post){
            res.redirect("/enablepage")
        }
        else{
            console.log(error)
        }
    });
}