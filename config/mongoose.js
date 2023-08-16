const mongoose=require('mongoose');
const env = require('./environment');
mongoose.connect(`mongodb://localhost/${env.db}`);
const db=mongoose.connection;

db.on('error',console.error.bind(console,"error Mongo not connected"));

db.once('open',function(){
    console.log("connected to mongoDb");
})