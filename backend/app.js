// src/app.js
const express = require('express');
const authenticate = require('./middleware/authMiddleware');
const transactionRoutes = require('./src/routes/transaction');


const app = express();

app.use('/api', transactionRoutes);

// Add this middleware before your protected routes
app.use('/api/protected', authenticate);

// Example route that requires authentication
app.get('/api/protected', (req, res) => {
  res.send({ message: 'Hello, authenticated user!' });
});

app.post('/api/transactions', authenticateToken, (req, res) => {
  const { amount, category, description, date, userId } = req.body;

  const transaction = new Transaction({
    amount,
    category,
    description,
    date,
    userId
  });

  transaction.save((err, savedTransaction) => {
    if (err) {
      return res.status(500).json({ message: 'Error saving transaction' });
    }
    res.status(200).json({ message: 'Transaction saved successfully', transaction: savedTransaction });
  });
});
