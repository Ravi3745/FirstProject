const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');

console.log("router loaded");



router.get('/',homeController.home);
router.use('/user',require('./user'));
// for any other router use router.use('/routerName',require('./routerFile'));
router.use('/posts',require('./post'));
router.use('/comment',require('./comment'));
router.use('/likes',require('./likes'));
router.use('/api',require('./api'));
module.exports=router;