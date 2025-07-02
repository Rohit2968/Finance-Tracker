const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./src/models/user.model'); // ✅ Correct path to your User model

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.post('/api/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '1h'
      }
    );

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 3600000 // 1 hour
    });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
