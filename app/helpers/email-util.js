const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'messshop.pgweb@gmail.com',
    pass: '1yGmCmLgT3',
  },
});

module.exports = {
  mail: function(dest, message, isBuyer) {
    let mailOptions = {
      from: 'Messshop',
      to: dest,
      subject: isBuyer
        ?'Purchase confirmation'
        :'An article you proposed got bought',
      text: message,
    };
    transporter.sendMail(mailOptions);
  },
};
