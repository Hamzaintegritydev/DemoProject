const express = require('express');
const authcontroller = require('../controller/auth-controller');
const router = express.Router();
// Sign up a user
router.post('/signup', authcontroller.signup);
// Login a user
router.post('/login', authcontroller.login);

router.get('/allUsers', authcontroller.getAllUsers);


module.exports = router;