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
module.exports = { signup,login, getAllUsers };