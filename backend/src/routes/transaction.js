const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const User = require('../models/user.model'); 
const authenticateToken = require('../middleware/auth');

// POST /api/transactions
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    const user = await User.findById(req.user.id);

    const transaction = new Transaction({
      amount,
      category,
      description,
      date,
      user: user._id
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Error creating transaction' });
  }
});

// GET /api/transactions/categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Transaction.find().distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

module.exports = router;
