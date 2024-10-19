const emailController = require('./email');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const registerUserDetails = async (req, res) => {
    const { name, phone, companyName, companyEmail, employeeSize } = req.body;
    const password = '123456789'; // default password for all the users currently
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpires = Math.floor(new Date(Date.now() + 10 * 60 * 1000).getTime() / 1000); // OTP expires in 10 minutes
    const user = new User({ name, phone, companyName, companyEmail, employeeSize, password: hashedPassword, otp, otpExpires });
    await user.save();
    emailController.sendVerificationEmail(user, otp);
    res.json({ success: 1, data : { userId : user._id }});
}

const verifyOtp = async (req, res) => {
    const { verificationId, emailOtp } = req.body;
    const user = await User.findOne({ _id: verificationId });
    if (!user) {
        return res.json({ success: 0, message: 'User not found' });
    }
    if (user.email_verified) {
        return res.json({ success: 0, message: 'Email already verified' });
    }
    if (user.otp !== emailOtp || user.otpExpires < Math.floor(new Date().getTime() / 1000)) {
        return res.json({ success: 0, message: 'Invalid or expired OTP' });
    }
    user.email_verified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    const token = jwt.sign({ userId: user._id }, 'jwtSecret', { expiresIn: '1h' });
    res.json({ success: 1, message: 'Email verified successfully', 'token':token, 'user':user.name });
}

module.exports = { registerUserDetails, verifyOtp };