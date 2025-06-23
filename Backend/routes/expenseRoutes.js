const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Define budget limits for each category
const budgetLimits = {
    Food: 500,
    Transport: 300,
    Books: 200,
    Entertainment: 400,
    Others: 250
};

// 1. Add a new expense with budget validation
router.post('/', async (req, res) => {
    try {
        const { amount, category, date } = req.body;
        const expenseAmount = parseFloat(amount);

        // Validate category
        if (!budgetLimits.hasOwnProperty(category)) {
            return res.status(400).json({ error: "Invalid category" });
        }

        // Get total spent in this category
        const totalSpent = await Expense.aggregate([
            { $match: { category } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const currentTotal = totalSpent.length > 0 ? totalSpent[0].total : 0;
        const newTotal = currentTotal + expenseAmount;

        if (newTotal > budgetLimits[category]) {
            return res.status(400).json({ error: `You have spent all the money assigned for ${category}.` });
        }

        // Save the expense
        const newExpense = new Expense({ amount: expenseAmount, category, date });
        await newExpense.save();

        res.status(201).json({ message: "Expense added successfully", expense: newExpense });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Get all expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Get expenses by category
router.get('/category/:category', async (req, res) => {
    try {
        const expenses = await Expense.find({ category: req.params.category });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Delete an expense
router.delete('/:id', async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
