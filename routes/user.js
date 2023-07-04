const express=require('express');
const router = require('.');
const route=express.Router();

const userController=require('../controllers/user_controller');
const postContoller=require('../controllers/post_controller');
route.get('/profile',userController.profile);
route.get('/post',postContoller.post);
module.exports=route;