const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');


const transporter = nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      
      user: 'Shivrk3745',
      pass: 'ndqtlcpiizaugzul'
    }
  });



 const renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailer',relativePath),
        data,
        function(err,template){
            if(err){console.log('error in rendering template'); return}
            mailHTML=template;
        }
        
    )
    return mailHTML;
 }

 module.exports={
    transporter: transporter,
    renderTemplate:renderTemplate
 }