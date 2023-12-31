const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');
const env = require('./environment');

passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_call_back_url

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
