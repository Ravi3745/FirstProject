const Post=require('../../../models/post');
const Comment=require('../../../models/comment');
module.exports.index= async function(req,res){
    
    
    
    let posts= await Post.find({})
     .sort('-createdAt')
     .populate('user')
     .populate({
         path:'comments',
         populate:{
            path:'user'
         }
     })
     .exec();
    
    
    
    
    return res.json(200,{
        message:"list of posts",
        posts:posts
    })
}

module.exports.destroy=async function(req,res){
    try{
        
        const post = await Post.findById(req.params.id).exec();


       
        if (post && post.user.toString() === req.user.id){
        
        
       
            await post.deleteOne();
            await Comment.deleteMany({post: req.params.id});
           
            
            
           
           return res.status(200).json({
            message:"post and associated comment deleted"
           })
        }else{
            return res.status(401).json({
                message:'you can not delete this post'
            })
        }
    }
    catch(err){
        console.log('*******errr****',err);
        return res.status(500).json({
            message:"internal server error"
           });
    }
}