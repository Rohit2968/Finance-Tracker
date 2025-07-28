require('dotenv').config();
const express = require('express');
const cors = require('cors');

// ✅ Use your db.js connection
require('./db.js');

const transactionRoutes = require('./src/routes/transaction.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionRoutes);

app.listen(5000, () => console.log('🚀 Server running on port 5000'));
