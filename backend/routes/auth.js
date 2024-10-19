const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth'); 

// login route not used yet
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'User not found' });
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
//     const token = jwt.sign({ userId: user._id }, 'jwtSecret', { expiresIn: '1h' });
//     res.json({ token, message: 'Login successful' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

router.post('/registerUserDetails', authController.registerUserDetails);
router.post('/verifyOtp', authController.verifyOtp);

module.exports = router;