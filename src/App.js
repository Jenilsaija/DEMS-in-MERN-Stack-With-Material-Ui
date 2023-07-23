import React, { useState } from "react";
import MyDrawer from "./Components/Drawer";
import { ThemeProvider, createTheme } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import AddExpense from "./Components/AddExpense";
import AddTransaction from "./Components/AddTransaction";
import ShowExpenses from "./Components/ShowExpenses";
import Nopage from "./Components/Nopage";
import ExpenseContext from "./Context/ExpenseContext";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});
const App = () => {
  const [expenseslist,setExpensesList]=useState([]);
  const [snackb, setSneckb] = React.useState({
    type:"success",
    message:"default message"
  });

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setSneckb({
      type:"success",
      message:"default message"
    });
  };
  return (
    <div>
      <ExpenseContext.Provider value={{expenseslist,setExpensesList,setSneckb,setOpen}}>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackb.type} sx={{ width: '100%' }}>
          {snackb.message}
        </Alert>
      </Snackbar>
        <Routes>
        <Route path="/" element={<ThemeProvider theme={darkTheme}>
          <MyDrawer thememode={darkTheme.palette.mode} />
        </ThemeProvider>}>
          <Route path='/' element={<Dashboard/>}></Route>
          <Route path='/addexpense' element={<AddExpense/>}></Route>
          <Route path='/addtransaction' element={<AddTransaction/>}></Route>
          <Route path='/showexpense' element={<ShowExpenses/>}></Route></Route>  
          <Route path="/login" element={<Login />}/>
          <Route path="*" element={<Nopage />} />     
      </Routes>
      </ExpenseContext.Provider>
    </div>  
  );
};

export default App;
