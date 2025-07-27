import React, { useState, useContext } from 'react';

// Replace with your actual AuthContext if you’re using context for auth
// import { AuthContext } from '../context/AuthProvider';

const TransactionForm = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  
  // Dummy token/userId for now — replace with actual context or props
  const token = 'your-auth-token';
  const userId = 'your-user-id';

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formValidation()) return;

    const transactionData = {
      amount,
      category,
      description,
      date,
      userId,
    };

    fetch('http://localhost:5000/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(transactionData),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to save transaction');
        return response.json();
      })
      .then((data) => {
        console.log('Transaction added:', data);
        setAmount('');
        setCategory('');
        setDescription('');
        setDate('');
      })
      .catch((error) => {
        console.error('Error adding transaction:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <h2>Add New Transaction</h2>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button type="submit" className="submit-button">
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
