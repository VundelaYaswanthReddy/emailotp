const express=require('express');
const bodyparser=require('body-parser');
const nodemailer=require('nodemailer');
const path=require('path');
const exphbs=require('express-handlebars');
const app = express();

port=9000;
var email;
var otp;
otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
otp=JSON.stringify(otp)
//If we need to see Otp remove comment for this below line
//console.log(otp);

// body parser middleware
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

let transporter = nodemailer.createTransport({
    host: "vundelayaswanthreddy@gmail.com",
    port: 9000,
    secure: true,
    service : 'gmail',
    auth: {
      user: 'vundelayaswanthreddy@gmail.com',
      pass: 'tqswggxfqxwvfqzq',
    }  
});

app.post('/sendmail',(req,res)=>{
    email=req.body.email;

     // send mail with defined transport object
    var mailOptions={
        to: req.body.email,
       subject: "Otp for registration is: ",
       html: "<h3> OTP for verification of your mail--Don't Share to anyone </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
     };
     
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.send('OTP sent successfully')
        console.log('Message sent: %s', info.messageId);   
        //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
    res.send(201);
});

app.post('/verify',(req,res)=>{
    user_otp=req.body.otp
    if(user_otp==otp){
        res.send("OTP verified__Login success");
    }
    else{
        res.send('Entered OTP is Incorrect');
    }
    res.send(201);
}); 

app.post('/resend',(req,res)=>{
    resend_otp=Math.random();
    resend_otp=resend_otp*1000000;
    resend_otp=parseInt(resend_otp)
    resend_otp=JSON.stringify(resend_otp)
    //If we need to see Otp remove comment for this below line
    //console.log(resend_otp)
    email=req.body.email;

    var mailOptions={
        to: req.body.email,
        subject: "Otp for registration is: ",
        html: "<h3>OTP for account verification is : </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
     };
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.send('OTP sent successfully')
        console.log('Message sent: %s', info.messageId);   
        //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)); 
    });
    res.send(201);
});

app.post('/verify_resend',(req,res)=>{
    user_otp=req.body.otp
    if(user_otp==resend_otp){
        res.send("OTP verified__Login success");
    }
    else{
        res.send('Entered OTP is Incorrect');
    }
    res.send(201);
});

app.listen(port,()=>{
    console.log('app is running in the port : ',port);
})
