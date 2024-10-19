const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: String,
  phone: String,
  companyName: String,
  companyEmail: String,
  employeeSize: String,
  password: String,
  otp: String,
  otpExpires: String,
  email_verified: { type: Boolean, default: false },
  phone_verified: { type: Boolean, default: false }
});
module.exports = mongoose.model('User', UserSchema);