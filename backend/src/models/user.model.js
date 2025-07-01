// This file: Define the structure of our user collection in MongoDB

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is Required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be atleast 03 characters'],
        maxlength: [20, 'Username must be atmost 20 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is Required'],
        unique: true,
        trim: true,
        validate: {
            validator: (value) => isEmail(value),
            message: 'Invalid email format'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is Required'],
        trim: true,
        minlength: [8, 'Password must be atleast 8 characters'],
        private: true 
    },
    trasactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    }]
});

// Pre-save hook to hash password
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Static method to check credentials
userSchema.statics.findByCredentials = async function(email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;