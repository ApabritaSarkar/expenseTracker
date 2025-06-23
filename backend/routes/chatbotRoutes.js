const express = require('express');
const router = express.Router();

// Define default budget allocation percentages
const budgetAllocation = {
    Food: 0.3, // 30%
    Transport: 0.15, // 15%
    Books: 0.1, // 10%
    Entertainment: 0.2, // 20%
    Others: 0.25 // 25%
};

// AI Chatbot API - Suggest Budget Allocation
router.post('/suggest-budget', (req, res) => {
    try {
        const { salary } = req.body;
        const monthlySalary = parseFloat(salary);

        if (isNaN(monthlySalary) || monthlySalary <= 0) {
            return res.status(400).json({ error: "Invalid salary amount." });
        }

        // Calculate budget allocation
        const suggestedBudget = {};
        Object.keys(budgetAllocation).forEach(category => {
            suggestedBudget[category] = (monthlySalary * budgetAllocation[category]).toFixed(2);
        });

        res.status(200).json({ message: "Budget suggestion generated.", budget: suggestedBudget });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
