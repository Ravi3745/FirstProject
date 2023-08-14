const Comment=require('../models/comment');
const Post=require('../models/post');
const User=require('../models/user');
const commentMailer=require('../mailer/comments_mailer')
const Like = require('../models/like');

module.exports.create = async function (req, res) {
    try {
      let post = await Post.findById(req.body.post);
      
      if(post){
 
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      
      post.comments.push(comment);
      await post.save();
        comment = await comment.populate('user', 'name email');
      // const user = await User.findById(req.user._id, 'name email');
      commentMailer.newComment(comment);
      if (req.xhr){
        // Similar for comments to fetch the user's id!
        // comment = await comment.populate('user', 'name').execPopulate();
       

        // Add the user name to the post object
        // comment.user = user;
        return res.status(200).json({
            data: {
                comment: comment
            },
            message: "comment created!"
        });
        }
        req.flash('success', 'Comment published!');


        return res.redirect('/');
      }
    } catch (err) {
      console.log('Error in creating comment:', err);
      return;
    }
  };

  // module.exports.destroy=async function(req,res){
  //   try{
  //     let comment= await  Comment.findById(req.params.id);
  //     if(comment.user==req.user.id){
  //       let postid=comment.post._id;
  //        await comment.deleteOne();
  //        await Post.findOneAndUpdate({ _id: postid }, { $pull: { comments: req.params.id } });

  //        return res.redirect('back');
  //     }
  //   }catch(err){
  //       return res.redirect('back');
  //   }
  // }

  // module.exports.destroy = async function (req, res) {
  //   try {
  //     let comment = await Comment.findById(req.params.id);
  //     let post = await Post.findById(comment.post);
  
  //     if (comment.user.toString() === req.user.id || post.user.toString() === req.user.id) {
  //       await comment.deleteOne();
  //       await Post.findByIdAndUpdate(post._id, { $pull: { comments: req.params.id } });
       
  //       if(req.xhr){
  //         return res.status(200).json({
  //             data:{
  //                 comment_id:req.params.id
  //             },
  //             message:'comment-deleted'
  //         })
  //     }
       
  //       return res.redirect('back');
  //     }
  //   } catch (err) {
  //     console.log('Error in deleting comment:', err);
  //     return res.redirect('back');
  //   }
  // };
  module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id ){

            let postId = comment.post;
            await comment.deleteOne();
            // comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            // destroy the associated likes for this comment
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

           
           
            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }


            req.flash('success', 'Comment deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}
  
