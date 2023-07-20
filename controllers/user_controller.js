const User=require("../models/user");

module.exports.profile=async function(req,res){
    try{
      let user= await  User.findById(req.params.id).exec();
         return res.render('profile.ejs',{
            title:`${user.name} profile`,
            profile_user:user
         });
    }catch(err){
        console.log("error in finding profile");
    }
    
}

module.exports.update=async function(req,res){
    try{
        if(req.user.id==req.params.id){
         
            let user= await User.findByIdAndUpdate(req.params.id,{ $set: { name:req.body.name,email:req.body.email }}).exec();
         console.log('updated');
          return res.redirect('back'); 
        }else{
            return res.status(401).send('unauthorized');
        }
    }catch(err){
        console.log("Error:", err);
        console.log("can't be updated");
        return res.redirect('back');
    }
}

// render the sign up page
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
  
    return res.render('user_sign_up.ejs',{
    title:"Codeial | SignUp"
   });
}
//render the sign in page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
  
    return res.render('user_sign_in.ejs',{
        title:"Codeial | SignIn"
    });
}


// getting sign-up data

module.exports.create= async function(req,res){
    if(req.body.password!=req.body.confirm_password){
       
        return res.redirect('back');
    }
    try{   
    const user= await User.findOne({email:req.body.email}).exec();
    
    if(!user){
        const newUser= await User.create(req.body);
        return res.redirect('/user/sign-in');
    }else{
        res.redirect('back');
    }

    }catch(error){
        console.log("Error in finding or creating user:", error);
        return res.redirect('back');
    }
}


// creating session for user while login

module.exports.createSession=function(req,res){
    return res.redirect('/');
}

// tp log out session
module.exports.destroySession=function(req,res){
    
    req.logout(function(err) {
        if (err) { return next(err); }
       return res.redirect('/');
      });
}