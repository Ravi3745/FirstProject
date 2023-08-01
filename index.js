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
const passportLocal=require('./config/passport');
const passportJWT=require('./config/passport-jwt');
const MongoStore = require("connect-mongodb-session")(session);
// const MongoStore= require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware');
// for flash messsages
const flash = require('connect-flash');
const customMware = require('./config/middleware');


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

// for flash messages
app.use(flash());
app.use(customMware.setFlash);
  
app.use(express.static('./assets')); 
// make upaoad folder availble to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));

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


