const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const User = require('../models/user.model');
const authenticateToken = require('../middleware/auth');

// Create a new transaction
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;

    const transaction = new Transaction({
      amount,
      category,
      description,
      date,
      userId: req.user.id
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Error creating transaction' });
  }
});

// Get all transactions for a user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id })
      .populate('userId', 'username');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single transaction
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.user.id
    }).populate('userId', 'username');

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a transaction
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    ).populate('userId', 'username');

    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found or unauthorized' });
    }

    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a transaction
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    }).populate('userId', 'username');

    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found or unauthorized' });
    }

    res.json(deletedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get distinct categories for the authenticated user
router.get('/categories', authenticateToken, async (req, res) => {
  try {
    const categories = await Transaction.find({ userId: req.user.id }).distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

module.exports = router;
