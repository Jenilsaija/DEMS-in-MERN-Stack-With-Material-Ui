import {
  Typography,
} from "@mui/material";
import React from "react";
import ExpenseForm from "./ExpenseForm";

const AddExpense = () => {
  
  return (
    <>
      <Typography fontSize={30} >Add Expense</Typography>
      <ExpenseForm mode="cash"/>
    </>
  );
};

export default AddExpense;
