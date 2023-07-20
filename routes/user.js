const express=require('express');
const passport = require('passport');
const router = require('.');
const route=express.Router();

const userController=require('../controllers/user_controller');

route.get('/profile/:id',passport.checkAuthentication,userController.profile);
route.post('/update/:id',passport.checkAuthentication,userController.update);
route.get('/sign-up',userController.signUp);
route.get('/sign-in',userController.signIn);

route.post('/create',userController.create);


// use passport as a middleware to authenticate
route.post('/create-session',passport.authenticate(
    'local',{failureRedirect:'/user/sign-in'}
),userController.createSession);




route.get('/sign-out',userController.destroySession);
module.exports=route;