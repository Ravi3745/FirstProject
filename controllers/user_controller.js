const User=require("../models/user");

module.exports.profile= async function(req,res){
   if(req.cookies.user_id){
    
    try{
        const user= await User.findById(req.cookies.user_id).exec();
        if(user){
            return res.render('profile',{
                name:user.name,
                email:user.email
            });
        }else{
            return res.redirect('/user/sign-in');
        }
    }catch(error){
         return res.redirect('/user/sign-in');
    }


   }else{
    return res.redirect('/user/sign-in');
   }
}

// render the sign up page
module.exports.signUp=function(req,res){
   return res.render('user_sign_up.ejs',{
    title:"Codeial | SignUp"
   });
}
//render the sign in page
module.exports.signIn=function(req,res){
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
    
    

    // User.findOne({email:req.body.email},function(error,user){
    //     if(error){console.log("error in finding user for sign up"); return}

    //     if(!user){
    //         User.create(req.body,function(err,user){
    //             if(err){console.log("error while signinh up user"); return}

    //         return res.redirect('/user/sign-in');
    //         })
    //     }else{
    //         return res.redirect('back');
    //     }

    // });
}


// creating session for user while login

module.exports.createSession= async function(req,res){



try{
    const user= await User.findOne({email:req.body.email}).exec();

    if(user){
        if(user.password!=req.body.password){
            return res.redirect('back');
        }

        res.cookie('user_id',user.id);
        return res.redirect('/user/profile');

    }else{
        res.redirect('back');
    }

    }catch(erro){
        console.log("error in sign in user")
    }
}