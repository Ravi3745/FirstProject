const passport= require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;
const User= require('../models/user');

let opts = {jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codial'
}



passport.use(new JWTStrategy(opts, async function(jwt_payload, done) {
    try {
        let user = await User.findOne({ id: jwt_payload.sub }).exec();
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    } catch (err) {
        return done(err, false);
    }
}));


module.exports=passport;