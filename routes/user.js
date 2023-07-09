const express=require('express');
const router = require('.');
const route=express.Router();

const userController=require('../controllers/user_controller');

route.get('/profile',userController.profile);


route.get('/sign-up',userController.signUp);
route.get('/sign-in',userController.signIn);

route.post('/create',userController.create);


module.exports=route;