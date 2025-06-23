const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['Food', 'Transport', 'Books', 'Entertainment', 'Others'],
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Expense', ExpenseSchema);
