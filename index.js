const express= require('express');
const app=express();
const port=5000;
app.set('view engine','ejs');
app.set('views','./views')



app.use('/',require('./routes'));

app.listen(port,function(error){
    if(error){
        console.log(`There is an error found in running the server that is : ${error}`);
    }else{
        console.log(`your server is runing perfectly on port: ${port}`);
    }
});


