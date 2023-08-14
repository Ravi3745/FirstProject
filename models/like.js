const mongoose =require('mongoose');
const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId
    },
    // this defines the object id of liked object
    likeable:{
        type:mongoose.Schema.ObjectId,
        require:true,
        refPath:'onModel'
    },
    // define the type of like object since this is a dyanamic reference
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }
},{
    timestamps:true
})

let Like=mongoose.model('Like',likeSchema);
module.exports=Like;