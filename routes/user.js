const express=require('express');
const router = require('.');
const route=express.Router();

const userController=require('../controllers/user_controller');

route.get('/profile',userController.profile);


route.get('/sign-up',userController.signUp);
route.get('/sign-in',userController.signIn);

// for sign up
route.post('/create',userController.create);
// for sign in
route.post('/create-session',userController.createSession);

module.exports=route;