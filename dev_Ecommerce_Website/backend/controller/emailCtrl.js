import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";


export const sendEmail = asyncHandler(async(data,req,res)=> {

  

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'abhijithp1221@gmail.com',
        pass: 'xnamfesyxgafhmrj'
      }
    });
    
    var mailOptions = {
      from: ' Hai from amazon <amazon.com>',
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.htm,
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

})