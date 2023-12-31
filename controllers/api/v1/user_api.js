const User=require('../../../models/user');
const jwt=require('jsonwebtoken');
const env = require('../../../config/environment');

module.exports.createSession= async function(req,res){

    try{
        let user = await User.findOne({email:req.body.email}).exec();
        
        if(!user || user.password!=req.body.password){
            return res.status(422).json({message:"Invalid Username or Password"});
        }
        return res.status(200).json({
            message:"login successfull here your token",
            data:{
                token:jwt.sign(user.toJSON(),'codial',{expiresIn:'100000'})
            }
        })

    }catch(err){
        console.log('*******errr****',err);
        return res.status(500).json({
            message:"internal server error"
           })
    }
    
}
