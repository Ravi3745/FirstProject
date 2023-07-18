const Post=require('../models/post');
const { post } = require('../routes');

// module.exports.create=function(req,res){
//     Post.create({
//         content:req.body.content,
//         user:req.user._id
//     },function(err,post){
//         if(err){
//             console.log('errorin creating post');
//             return;
//         }else{
//             return res.redirect('back');
//         }
//     })
// }

module.exports.create= async function(req,res){
    try{
        Post.create({
            content:req.body.content,
            user:req.user._id
        });
        return res.redirect('back');
    }catch(err){
        console.log("error in creating post");
        return;
    }
}