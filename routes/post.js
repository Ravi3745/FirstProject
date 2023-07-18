const express=require('express');
const router = require('.');

const route=express.Router();

const postController=require('../controllers/post_controller');

route.post('/create',postController.create);

module.exports=route;