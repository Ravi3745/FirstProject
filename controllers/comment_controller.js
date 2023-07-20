const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create = async function (req, res) {
    try {
      let post = await Post.findById(req.body.post);
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comment);
      await post.save();
      return res.redirect('/');
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

  module.exports.destroy = async function (req, res) {
    try {
      let comment = await Comment.findById(req.params.id);
      let post = await Post.findById(comment.post);
  
      if (comment.user.toString() === req.user.id || post.user.toString() === req.user.id) {
        await comment.deleteOne();
        await Post.findByIdAndUpdate(post._id, { $pull: { comments: req.params.id } });
        return res.redirect('back');
      }
    } catch (err) {
      console.log('Error in deleting comment:', err);
      return res.redirect('back');
    }
  };
  
