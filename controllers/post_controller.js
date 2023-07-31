const Post=require('../models/post');
const { post } = require('../routes');
const Comment=require('../models/comment');
const User=require('../models/user');
module.exports.create= async function(req,res){
    try{
       const post= await Post.create({
            content:req.body.content,
            user:req.user._id
        });
    
        if(req.xhr){
             // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            // post = await post.populate('user', 'name').execPopulate();
            
                const user = await User.findById(req.user._id, 'name');

                // Add the user name to the post object
                post.user = user;
          
          
            return res.status(200).json({
                data:{
                    post:post
                },
                message:'post created'
            });
        }


        req.flash('success','Post Created');
        return res.redirect('back');
    }catch(err){
        req.flash('error',err);
        return;
    }
}

module.exports.destroy=async function(req,res){
    try{
        
        const post = await Post.findById(req.params.id).exec();


       

        // .id means converting the object id into String
        
        if (post && post.user.toString() === req.user.id){
            await post.deleteOne();
            await Comment.deleteMany({post: req.params.id});
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:'post-deleted'
                })
            }
            
            
            req.flash('success','Post Deleted')
            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}