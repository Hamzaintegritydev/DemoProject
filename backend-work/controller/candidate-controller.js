const Candidate = require("../models/candidate-model")
const bcrypt = require('bcrypt');
const saltRounds = 10;
// Sign up a user
const Candidatesignup = async (req, res) => {
  const userExists = await Candidate.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  req.body.password = hashedPassword;
  const user = new Candidate(req.body);
  try {
    const newCandidate = await user.save();
    res.status(201).json(newCandidate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Login a user
const Candidatelogin = async (req, res) => {
  const user = await Candidate.findOne({ email: req.body.email });
  if (user == null) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  res.status(201).json(user);
};
module.exports = { Candidatesignup,Candidatelogin };