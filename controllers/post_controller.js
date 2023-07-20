const Post=require('../models/post');
const { post } = require('../routes');
const Comment=require('../models/comment');
module.exports.create= async function(req,res){
    try{
        await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        return res.redirect('back');
    }catch(err){
        console.log("error in creating post");
        return;
    }
}

module.exports.destroy=async function(req,res){
    try{
        
        const post = await Post.findById(req.params.id).exec();

        // .id means converting the object id into String
        console.log(typeof post);
        if (post && post.user.toString() === req.user.id){
            await post.deleteOne();
            await Comment.deleteMany({post: req.params.id});
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}