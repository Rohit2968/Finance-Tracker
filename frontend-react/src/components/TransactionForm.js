import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const TransactionForm = () => {
  const { token } = useAuth(); // ✅ Get token from context
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  // ✅ Form Validation
  const formValidation = () => {
    let isValid = true;
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount');
      isValid = false;
    }
    if (!category) {
      alert('Please select a category');
      isValid = false;
    }
    if (!description) {
      alert('Please enter a description');
      isValid = false;
    }
    if (!date) {
      alert('Please select a date');
      isValid = false;
    }
    return isValid;
  };

  // ✅ Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValidation()) return;

    const transactionData = {
      amount,
      category,
      description,
      date
    };

    try {
      const response = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transactionData)
      });

      if (!response.ok) throw new Error('Network error');

      const data = await response.json();
      console.log('Transaction added successfully:', data);

      setAmount('');
      setCategory('');
      setDescription('');
      setDate('');
    } catch (error) {
      console.error('Error adding transaction:', error.message);
      alert('Something went wrong!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <h2>Add a Transaction</h2>

      <div className="form-group">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0"
          step="0.01"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          <option value="food">Food</option>
          <option value="rent">Rent</option>
          <option value="utilities">Utilities</option>
          <option value="travel">Travel</option>
          <option value="shopping">Shopping</option>
          <option value="entertainment">Entertainment</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          maxLength="100"
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="submit-button">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
