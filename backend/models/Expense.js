const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['Food', 'Transport', 'Books', 'Entertainment','Medicine', 'Others'],
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Expense', ExpenseSchema);
