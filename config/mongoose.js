const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/codeial_db');
const db=mongoose.connection;

db.on('error',console.error.bind(console,"error Mongo not connected"));

db.once('open',function(){
    console.log("connected to mongoDb");
})