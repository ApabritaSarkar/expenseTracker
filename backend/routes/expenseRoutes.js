const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");
// Define budget limits for each category
const budgetLimits = {
  Food: 500,
  Transport: 300,
  Books: 200,
  Entertainment: 400,
  Others: 250,
};

// 1. Add a new expense with budget validation
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { amount, category, date } = req.body;
    const expenseAmount = parseFloat(amount);

    if (!budgetLimits.hasOwnProperty(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const totalSpent = await Expense.aggregate([
      { $match: { category, user: req.user.id } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const currentTotal = totalSpent.length > 0 ? totalSpent[0].total : 0;
    const newTotal = currentTotal + expenseAmount;

    if (newTotal > budgetLimits[category]) {
      return res.status(400).json({
        error: `You have spent all the money assigned for ${category}.`,
      });
    }

    const newExpense = new Expense({
      user: req.user.id,
      amount: expenseAmount,
      category,
      date,
    });
    await newExpense.save();

    res
      .status(201)
      .json({ message: "Expense added successfully", expense: newExpense });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Get all expenses
router.get("/", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Get expenses by category
router.get("/category/:category", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({
      category: req.params.category,
      user: req.user.id,
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Delete an expense
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!expense)
      return res
        .status(404)
        .json({ message: "Expense not found or unauthorized" });
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Test protected route
router.get("/protected", authMiddleware, async (req, res) => {
  try {
    // Log the ID received from the middleware
    console.log("--- Accessing /protected route ---");
    console.log("req.user.id:", req.user.id);

    const user = await User.findById(req.user.id).select("-password"); // If findById doesn't return a user, it's 404, not 500

    if (!user) {
      console.log("User not found for ID:", req.user.id);
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    console.error("Error in /protected route handler:");
    console.error("Error Name:", err.name);
    console.error("Error Message:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
