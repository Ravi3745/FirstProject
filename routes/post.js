const express=require('express');
const router = require('.');
const passport=require('passport');
const route=express.Router();

const postController=require('../controllers/post_controller');

route.post('/create',passport.checkAuthentication,postController.create);
route.get('/delete/:id',passport.checkAuthentication,postController.destroy);
module.exports=route;