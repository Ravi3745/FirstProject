const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');


passport.use(new LocalStrategy(

    {
        usernameField:'email'
    },
   async function(email,password,done){

    try{

        const user= await User.findOne({email:email}).exec();
        if(!user || user.password!=password){
            console.log(`invalid user password`);
            return done(null,false);
        }
        return done(null,user);

    }catch(err){
        console.log(`error ing finding user --> passport`);
        return done(err);
    }
   }
     

));

// serialising the user to decide which key send to cookie

passport.serializeUser(function(user,done){
    done(null,user.id);
});



// deserializing the user from the key in cookie

passport.deserializeUser(async function(id,done){
    try{
        const user= await User.findById(id).exec();
        
         return done(null,user);
       
    }catch(error){
        console.log(`error in finding user`);
        return done(err);
        
    }
    
});


passport.checkAuthentication=function(req,res,next){
    // if the user is sign in, then pass on the request to the next function (controllers action);
    if(req.isAuthenticated()){
        return next();
    }
    // if user not signed in
    return res.redirect('/user/sign-in');
}


passport.setAuthenticatedUser=function(req,res,next){
    // req.user conatian the current signed in user form the session cookie and we are just sending this to the locals for the views
    if(req.isAuthenticated()){
       
        res.locals.user=req.user;
    }
    next();
}


module.exports = passport;