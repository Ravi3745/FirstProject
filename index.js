// require express
const express= require('express');
const app=express();
const port=5000;
const path=require('path');
const mime=require('mime');
// data base
const db=require('./config/mongoose');
// cookies 
const cookie=require('cookie-parser');
// passport library
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport')
const MongoStore = require("connect-mongodb-session")(session);
// const MongoStore= require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware');

app.use(
    sassMiddleware({
      src: path.join(__dirname, 'assets', 'scss'), // Path to your SCSS files
      dest: path.join(__dirname, 'assets', 'css'), // Output directory for compiled CSS
      debug: true, // Enable debugging if needed
      outputStyle: 'expanded', // Specify the desired output style
      prefix:  '/assets/css', // URL prefix for the generated CSS file
    })
  );

// middleware
app.use(express.urlencoded());
app.use(cookie());


// this one is for setting up view engine 
app.set('view engine','ejs');
app.set('views','./views')


// mangoo strore isuse to set the cookie in db
app.use(session({
    name:'codeial',
    // change secret before deplyoment
    secret:'something',
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:(1000*60*60)
    },
    store:new MongoStore({
        mongooseConnection: db,
        autoRemove:'disable'
    }),
    fucntion(err){
        console.log(err || "connect mongo db")
    }
   
}));

app.use(passport.initialize());
app.use(passport.session());
// app.use(passport.checkAuthentication());
app.use(passport.setAuthenticatedUser);
// for using static files css images js 
app.use(express.static(path.join(__dirname, 'assets'), {
    setHeaders: (res, filePath) => {
      if (mime.getType(filePath) === 'text/css') {
        res.setHeader('Content-Type', 'text/css');
      }
    },
  }));
  // app.get('/assets/css/*', function (req, res) {
  //   res.setHeader('Content-Type', 'text/css');
  //   res.sendFile(path.join(__dirname, req.path));
  // });
  
  
app.use(express.static('./assets')); 
// this is not working in my case due to mime type so have to use use other way of routing

// app.get('/assets/css/layout.css',function(req,res){
//     res.set('Content-type','text/css');
//     res.sendFile(path.join(__dirname,'assets','css','layout.css'));
// });
// app.get('/assets/css/_header.css',function(req,res){
//     res.set('Content-type','text/css');
//     res.sendFile(path.join(__dirname,'assets','css','_header.css'));
// });

// app.get('/assets/css/_footer.css',function(req,res){
//     res.set('Content-type','text/css');
//     res.sendFile(path.join(__dirname,'assets','css','_footer.css'));
// });
// app.get('/assets/css/profile.css',function(req,res){
//     res.set('Content-type','text/css');
//     res.sendFile(path.join(__dirname,'assets','css','profile.css'));
// });




// similarily i have to do the same for js file and image file

// app.get('/assets/js/layout.js',function(req,res){
//     res.set('Content-type','text/javascript');
//     res.sendFile(path.join(__dirname,'assets','js','layout.js'));

// })
// // i dont know what is going on this mim type issue because of this i have to include every thing here
// app.get('/assets/css/home.css', function(req, res) {
//     res.type('text/css');
//     res.sendFile(path.join(__dirname, 'assets', 'css', 'home.css'));
//   });


// this one is for setting up layouts
const expressLayouts=require('express-ejs-layouts');
const { urlencoded } = require('express');
const { debug } = require('console');

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


