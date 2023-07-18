const Post=require('../models/post')
const { post } = require('../routes')

module.exports.home=async function(req,res){
   try{
     let posts= await Post.find({}).populate('user').exec();
      return res.render('home',{
         title:'home',
         posts:posts
      });
   
   }catch(err){
      console.log('cant find post');
      return res.redirect('back');
   }
   
   
}