const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

passport.use(new googleStrategy({
        clientID:'1030323171628-re7bms9vbvta6ulvco0l39lqa4smot79.apps.googleusercontent.com',
        clientSecret:'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',
        callbackURL:'http://localhost:5000/user/auth/google/callback'
    },
   async function(accessToken, refreshToken, profile, done){
        try{
            let user=await User.findOne({email:profile.emails[0].value}).exec();
            console.log(profile);
            if(user){
                return done(null,user);
            }else{
               let creatingUser=await User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                });
                if(creatingUser){
                    return done(null,creatingUser);
                }else{
                    console.log('error in creating user');
                    return done(null, false);
                }
            }
        }catch(err){
            console.log('error in google strategy****',err);
            return;
        }
    

    }
));

module.exports=passport;
