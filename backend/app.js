// src/app.js
const express = require('express');
const authenticate = require('./middleware/authMiddleware');

const app = express();

// Add this middleware before your protected routes
app.use('/api/protected', authenticate);

// Example route that requires authentication
app.get('/api/protected', (req, res) => {
  res.send({ message: 'Hello, authenticated user!' });
});