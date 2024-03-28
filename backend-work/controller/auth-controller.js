const Users = require('../models/user-model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// Sign up a user
const signup = async (req, res) => {
  const userExists = await Users.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  req.body.password = hashedPassword;
  const user = new Users(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Login a user
const login = async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  if (user == null) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  res.status(201).json(user);
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const crypto = require('crypto');

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Find user by email
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate password reset token
    // const resetToken = crypto.randomBytes(20).toString('hex');
    // user.resetPasswordToken = resetToken;
    // user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Send email with password reset link
    // This step depends on your email sending implementation
    
    // For demonstration purposes, let's assume you have a function called sendResetEmail
    await sendResetEmail(user.email);

    res.json({ message: 'Password reset instructions sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    // Find user by reset token and check expiry
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Update user's password
    user.password = await bcrypt.hash(newPassword, 10);
    // user.resetPasswordToken = undefined;
    // user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Assume sendResetEmail is a function to send reset instructions to the user's email
// You need to implement this function separately
async function sendResetEmail(email, token) {
  // Implement your email sending logic here
}



module.exports = { signup,login, getAllUsers, forgotPassword, resetPassword };