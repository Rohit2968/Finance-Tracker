import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TransactionForm.css';

const TransactionForm = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const token = localStorage.getItem('token');

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/transactions/categories');
        setCategories(res.data);
      } catch {
        setError('Could not load categories');
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (!category) {
      setError('Please select a category');
      return;
    }

    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }

    if (!date) {
      setError('Please select a date');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/transactions',
        { amount, category, description, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setAmount('');
      setCategory('');
      setDescription('');
      setDate('');
      setSuccessMsg('Transaction added successfully!');
    } catch {
      setError('Failed to create transaction');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Transaction</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div>
            <label className="form-label">Amount</label>
            <input
              type="number"
              className="form-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">Category</label>
            <select
              className="form-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <div>
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        {error && <div className="error">{error}</div>}
        {successMsg && <div className="success">{successMsg}</div>}

        <button type="submit" className="submit-button">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
