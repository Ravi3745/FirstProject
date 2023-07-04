const express=require('express');
const router=express.Router();
module.exports=router;
const homeController=require('../controllers/home_controller');
console.log("router loaded");



router.get('/',homeController.home);
