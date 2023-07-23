import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import * as React from 'react';
import ExpenseContext from "../Context/ExpenseContext";

const ExpenseForm = (props) => {
  const {setSneckb,setOpen}=React.useContext(ExpenseContext);
  const Categories = ["Food", "Entertainment", "Transport"];
  const {expenseslist,setExpensesList}=React.useContext(ExpenseContext);
  const [expense, setExpense] = useState(props.exp?props.exp:{
    amount: "",
    note: "",
    mode: props.mode,
    toaccount: "",
    acholdername: "",
    date: "",
    category: "",
  });
  
  const resetexpense=()=>{
    setExpense({
      amount: "",
      note: "",
      mode: props.mode,
      toaccount: "",
      acholdername: "",
      date: "",
      category: "",
    });
  }

  const handleonchange = (e) => {
    let ID = e.target.name;
    let value = e.target.value;
    setExpense({ ...expense, [ID]: value });
    
  };

  const onSubmitclick = async () => {
    if(localStorage.getItem("auth-token")){
    await axios
      .post("http://localhost:5000/api/expense/add", expense, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((res) => {
        setSneckb({"type":"success",message:"Expense Added SuccessFully"});
        setOpen(true);
      });
    resetexpense();
    }
  };

  const UpdateClick=async()=>{
    const updated = expenseslist.map((exm, index) => {
      if (exm._id===expense._id){
        return expense
      }else{
        return exm
      }
    })
    setExpensesList(updated);
    const obj={
      "amount":expense.amount,
      "note":expense.note,
      "mode":expense.mode,
      "toaccount":expense.toaccount,
      "acholdername":expense.acholdername,
      "date":expense.date,
      "category":expense.category
    }
    
    await axios.put("http://localhost:5000/api/expense/update/"+expense._id,obj,{
      "headers":{
        "Content-Type":"application/json",
        "auth-token": localStorage.getItem("auth-token")
      }
    }).then(()=>{setSneckb({"type":"success",message:"Expense Updated SuccessFully"});
    setOpen(true);})
  }

  const modeCheck=()=>{
    if (props.mode==="transaction") {
      return(<><FormControl
        fullWidth
        sx={{ marginTop: "10px", marginBottom: "10px" }}
      >
        <InputLabel htmlFor="ToAccount">To Account</InputLabel>
        <OutlinedInput
          id="ToAccount"
          name="toaccount"
          placeholder="Enter a UPI/Acoount No."
          label="To Account"
          value={expense.toaccount}
          onChange={handleonchange}
        />
      </FormControl>
      <FormControl
        fullWidth
        sx={{ marginTop: "10px", marginBottom: "10px" }}
      >
        <InputLabel htmlFor="acname">Account Holder Name</InputLabel>
        <OutlinedInput
          id="acname"
          name="acholdername"
          placeholder="Enter a Account Holder Name"
          label="acname"
          value={expense.acholdername}
          onChange={handleonchange}
        />
      </FormControl></>);
    }
  }

  return (
    <>
      <Card variant="outlined" sx={{ maxWidth: "100%", marginTop: "10px" }}>
        <CardContent>
          <FormControl
            fullWidth
            sx={{ marginTop: "10px", marginBottom: "10px" }}
          >
            <InputLabel htmlFor="Note">Note</InputLabel>
            <OutlinedInput
              id="note"
              name="note"
              placeholder="Enter a Note"
              label="Note"
              onChange={handleonchange}
              value={expense.note}
            />
          </FormControl>
          <FormControl
            fullWidth
            sx={{ marginTop: "10px", marginBottom: "10px" }}
          >
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              name="amount"
              placeholder="Enter Amount"
              startAdornment={
                <InputAdornment position="start">Rs.</InputAdornment>
              }
              label="Amount"
              value={expense.amount}
              onChange={handleonchange}
            />
          </FormControl>
            {modeCheck()}

          <FormControl
            fullWidth
            sx={{ marginTop: "10px", marginBottom: "10px" }}
          >
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                name="date"
                slotProps={{
                  textField: {  },
                }}
              />
            </LocalizationProvider> */}
            <InputLabel htmlFor="outlined-adornment-amount">Date</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              name="date"
              placeholder="DD/MM/YYYY"
              label="Date"
              value={expense.date}
              onChange={handleonchange}
            />
          </FormControl>
          <FormControl
            fullWidth
            sx={{ marginTop: "10px", marginBottom: "20px" }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={Categories}
              name="category"
              value={expense.category}
              onChangeCapture={handleonchange}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  {...params}
                  label="Category"
                  name="category"
                />
              )}
            />
          </FormControl>

          <Button variant="contained" size="large" onClick={()=>{props.status==="Update"?UpdateClick():onSubmitclick()}}>
            Submit
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default ExpenseForm;
