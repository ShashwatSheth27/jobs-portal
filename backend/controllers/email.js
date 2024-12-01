require('dotenv').config();
const nodemailer = require('nodemailer');
const emailTemplate = require('../assets/mail-template');

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER_EMAIL,
    pass: process.env.SMTP_USER_PASS,
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

const sendJobAlert = (job, candidateEmails) => {
  if (!Array.isArray(candidateEmails) || candidateEmails.length === 0) return false;
  let jobEmailContent = `Details: ${job.description} <br>`;
  let jobExperience = ['Junior','Mid','Senior'];
  if (job.experienceLevel) jobEmailContent += 'Experience Required : ' + jobExperience[parseInt(job.experienceLevel) - 1] + ' level <br>';
  if (job.endDate) {
    const formattedEndDate = new Date(job.endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    jobEmailContent += 'Last Date to apply: ' + formattedEndDate + '<br>';
  }
  const mailOptions = {
    from: 'shethshashwat26@gmail.com',
    subject: 'New Job Posting: ' + job.title,
    text: jobEmailContent,
    html: emailTemplate(jobEmailContent)
  };
  candidateEmails.forEach((email) => {
    mailOptions.to = email;
    transporter.sendMail(mailOptions);
  });
};
  

module.exports = { sendVerificationEmail, sendJobAlert };