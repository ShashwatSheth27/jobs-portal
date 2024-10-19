const nodemailer = require('nodemailer');
const emailTemplate = require('../assets/mail-template');

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendVerificationEmail = (user, otp) => {
  // const verification_link = `http://localhost:5000/api/auth/verify-email/${token}`;
  try {
    const emailContent = `Please verify your email with this OTP: ${otp}`;
    const mailOptions = {
      from: 'Cuvette <shethshashwat26@gmail.com>',
      to: user.companyEmail,
      subject: 'Verify your email',
      text: emailContent,
      html: emailTemplate(emailContent),
    };
    transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  }
  catch(error) {
    console.log('sendVerificationEmail error : ', error);
  }
};

const sendJobAlert = (job, candidateEmail) => {
    const mailOptions = {
      from: 'shethshashwat26@gmail.com',
      to: candidateEmail,
      subject: 'New Job Posting: ' + job.title,
      text: `Details: ${job.description}`
    };
    transporter.sendMail(mailOptions);
};
  

module.exports = { sendVerificationEmail };