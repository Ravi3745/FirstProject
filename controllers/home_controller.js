const Post=require('../models/post')
const { post } = require('../routes')
const User=require('../models/user');
module.exports.home=async function(req,res){
   try{
     let posts= await Post.find({}).populate('user')
     .populate({
         path:'comments',
         populate:{
            path:'user'
         }
     })
     .exec();
     let user=await User.find({});

      return res.render('home',{
         title:'home',
         posts:posts,
         all_user:user
      });
   
   }catch(err){
      console.log('cant find post');
      return res.redirect('back');
   }
   
   
}