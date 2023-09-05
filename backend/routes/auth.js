const express = require('express');
const router = express.Router();

const { body, validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const auth = require('../middleware/auth');
// @route   GET    api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user)
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message)
  }
});

// @route   POST    api/auth
// @desc    Auth user & get token
// @access  Private
router.post(
  '/',
  [
    check('email', 'Please input a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credential' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credential' });
      }

      const payload = {
        user: {
          id: user.id,
          role: user.role
        },
      };
      jwt.sign(
        payload,
        config.get('jwtsecret'),
        {
          expiresIn: 360000, // in seconds
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  }
);

module.exports = router;
