const nodemailer=require('../config/nodemailer');
const comment=require('../models/comment');

exports.newComment=(comment)=>{
   let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    console.log('inside new comment mailer',comment);
    nodemailer.transporter.sendMail({
        from:'Shivrk3745@gmail.com',
        to:comment.user.email,
        subject:'New Comment Published',
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log('error in sending mail',err);
            return;
        }
        console.log('message send',info);
        return;
    })
}