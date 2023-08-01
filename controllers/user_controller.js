const User=require("../models/user");
const fs=require('fs');
const path=require('path');
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
    if(req.user.id==req.params.id){

        try{
            let user= await  User.findById(req.params.id).exec();
            User.uploadedAvatar(req,res,function(error){
                if(error){
                    console.log('****multer error ***',error);
    
                }
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                    if(user.avatar){
                        fs.unlink(path.join(__dirname, '..', user.avatar), (err) => {
                            if (err) {
                                console.log('Error unlinking avatar:', err);
                            }
                        });
                        // fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                }
                 user.save();
                 return res.redirect('back');
             });
        }catch(err){
            console.log("Error:", err);
            console.log("can't be updated");
            return res.redirect('back');
        }



    }else{
        req.flash('error','Unauthorized');
        return res.status(401).send('unauthorized');
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
    
    req.flash('success',"Logged in successfully")
    return res.redirect('/');
}

// tp log out session
module.exports.destroySession=function(req,res){
    
    req.logout(function(err) {
        if (err) { return next(err); }

        req.flash('success','Successfully logged out')
       return res.redirect('/');
      });
}