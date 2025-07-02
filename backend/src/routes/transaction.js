const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const Transaction = require('../models/transaction.model');

router.post('/transactions', authenticateToken, async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;

    const transaction = new Transaction({
      amount,
      category,
      description,
      date,
      userId: req.user.userId, // added by the middleware
    });

    const savedTransaction = await transaction.save();
    res.status(200).json({ message: 'Transaction saved successfully', transaction: savedTransaction });
  } catch (error) {
    console.error('Error saving transaction:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
