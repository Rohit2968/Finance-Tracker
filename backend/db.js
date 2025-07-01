const mongoose = require('mongoose');

const username = process.env.DB_USER || 'rohit2968';
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER || 'finance.neecvko.mongodb.net';
const dbName = process.env.DB_NAME || 'personal-finance-tracker';

const URI = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority&appName=Finance`;

mongoose.connect(URI)
  .then(() => console.log('✅ MongoDB connection successful!'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

module.exports = mongoose.connection;
