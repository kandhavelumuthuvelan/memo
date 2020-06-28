var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host:'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '9590b21bb54881',
      pass: 'b8cd311fa4d376'
    }
  });


  exports.sentmail=(emails)=>{


  var mailrecipients = {
    from: 'kandhavelu7@gmail.com',
    to: emails,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  

  transporter.sendMail(mailrecipients, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};