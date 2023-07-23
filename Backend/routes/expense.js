const express = require("express");
const router = express.Router();
//Import middleware and post model.
const fetchuser = require("../middlleware/fetchuser");
const Expense = require("../models/Expense");
const { body, validationResult } = require("express-validator");

//ROUTE-1: Get all the Expenses using: GET "/api/Expenses/fetchallExpense"
router.get("/fetchall", fetchuser, async (req, res) => {
  try {
    //this code fetch all Expenses from database.
    const expense = await Expense.find({ user: req.user.id });
    res.json(expense);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//ROUTE-2: Add a new Expenses using: POST "/api/Expenses/addExpense"
router.post(
  "/add",
  fetchuser,
  async (req, res) => {
    try {
      const { amount,note,mode,toaccount,acholdername,date,category } = req.body;
      //If there are errors return bed request and the errors.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //this code will be save Expenses.
      const expense = new Expense({
        amount,
        note,
        mode,
        toaccount,
        acholdername,
        date,
        category,
        user: req.user.id,
      });

      const saveExpense = await expense.save();
      res.json(saveExpense);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE-3: Update an existing Expenses using: put "/api/Expenses/updateExpense"
router.put("/update/:id", fetchuser, async (req, res) => {
  const {amount,note,mode,toaccount,acholdername,date,category} = req.body;
  try {
    //create new Expense object.
    const newExpense = {};
    if (amount) {
      newExpense.amount = amount;
    }
    if (note) {
      newExpense.note = note;
    }
    if (mode) {
      newExpense.mode = mode;
    }
    if (toaccount) {
      newExpense.toaccount = toaccount;
    }
    if (acholdername) {
      newExpense.acholdername = acholdername;
    }
    if (date) {
      newExpense.date = date;
    }
    if(category){
      newExpense.category=category;
    }

    //Find the Expense to be updated and update it
    let expense = await Expense.findById(req.params.id);
    //it will check Expense is available or not.
    if (!expense) {
      return res.status(404).send("Not Found");
    }
    //that will check operation performer is valid user or not.
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    //it will find using id and update it.
    expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { $set: newExpense },
      { new: true }
    );
    res.json({ expense });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//ROUTE-4: delet an existing Expenses using: delete "/api/Expenses/deleteExpense" login require
router.delete("/delete/:id", fetchuser, async (req, res) => {
  try {
    //Find the Expense to be Deleted and Delete it
    let expense = await Expense.findById(req.params.id);
    //it will check Expense is available or not.
    if (!expense) {
      return res.status(404).send("Not Found");
    }
    //that will check operation performer is valid user or not.
    //allow deletion only if user owns this Expense.
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    //it will find using id and update it.
    expense = await Expense.findByIdAndDelete(req.params.id);
    res.json({ Success: "Expense Has Been Deleted", Expense: expense });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
