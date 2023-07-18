const express=require('express');
const router = require('.');
const passport=require('passport');
const route=express.Router();

const commentController=require('../controllers/comment_controller');

route.post('/create',passport.checkAuthentication,commentController.create);
module.exports=route;