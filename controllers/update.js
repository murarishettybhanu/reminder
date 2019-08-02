const Post = require('../database/models/Post')

module.exports = (req, res) => {
    Post.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        date:req.body.date,
        subject:req.body.subject,
        description:req.body.description,
        email:req.body.email,
        contact:req.body.contact,
        sms:req.body.sms,
        rec:req.body.rec
    }, (error, post) => {
        if(post){
            res.redirect("/modifypage")
        }
        else{
            console.log(error)
        }
    });
}