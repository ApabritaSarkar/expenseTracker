const express = require("express");
const mongoose = require("mongoose");
const { Parser } = require("json2csv");
const ExcelJS = require("exceljs");

const router = express.Router();
const Expense = require("../models/Expense");

// 📌 Export expenses as CSV
router.get("/export/csv", async (req, res) => {
  try {
    const expenses = await Expense.find(); // Fetch all expenses

    const fields = ["amount", "category", "date"];
    const parser = new Parser({ fields });
    const csv = parser.parse(expenses);

    res.header("Content-Type", "text/csv");
    res.attachment("expenses.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).send("Error exporting CSV");
  }
});

// 📌 Export expenses as Excel
router.get("/export/excel", async (req, res) => {
  try {
    const expenses = await Expense.find(); // Fetch all expenses

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Expenses");

    worksheet.columns = [
      { header: "Amount", key: "amount", width: 15 },
      { header: "Category", key: "category", width: 20 },
      { header: "Date", key: "date", width: 20 },
    ];

    expenses.forEach((expense) => {
      worksheet.addRow(expense);
    });

    res.setHeader("Content-Disposition", "attachment; filename=expenses.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).send("Error exporting Excel");
  }
});

module.exports = router;
