import {
  Typography,
} from "@mui/material";
import React from "react";
import ExpenseForm from "./ExpenseForm";

const AddTransaction = () => {
  return (
    <>
      <Typography fontSize={30}>Add Transaction</Typography>
      <ExpenseForm mode="transaction"/>
    </>
  );
};

export default AddTransaction;
