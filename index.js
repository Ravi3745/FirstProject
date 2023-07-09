// require express
const express= require('express');
const app=express();
const port=5000;
const path=require('path');
const db=require('./config/mongoose');
const cookie=require('cookie-parser');


app.use(express.urlencoded());
app.use(cookie());


// this one is for setting up view engine 
app.set('view engine','ejs');
app.set('views','./views')

// for using static files css images js 
// app.use(express.static(path.join(__dirname,'assets')));
// app.use(express.static(path.join(__dirname,'assets'))); this is not working in my case due to mime type so have to use use other way of routing

app.get('/assets/css/layout.css',function(req,res){
    res.set('Content-type','text/css');
    res.sendFile(path.join(__dirname,'assets','css','layout.css'));
})

// similarily i have to do the same for js file and image file

app.get('/assets/js/layout.js',function(req,res){
    res.set('Content-type','text/javascript');
    res.sendFile(path.join(__dirname,'assets','js','layout.js'));

})
// i dont know what is going on this mim type issue because of this i have to include every thing here
app.get('/assets/css/home.css', function(req, res) {
    res.type('text/css');
    res.sendFile(path.join(__dirname, 'assets', 'css', 'home.css'));
  });


// this one is for setting up layouts
const expressLayouts=require('express-ejs-layouts');
const { urlencoded } = require('express');
app.use(expressLayouts);

// this one is for including style and script of individual pages

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// controllers
app.use('/',require('./routes'));




// firing server
app.listen(port,function(error){
    if(error){
        console.log(`There is an error found in running the server that is : ${error}`);
    }else{
        console.log(`your server is runing perfectly on port: ${port}`);
    }
});


