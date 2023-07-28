import React, { useContext, useEffect } from 'react';
import {
  List,
  ListSubheader,
  Divider,
} from '@mui/material';
import AccordionItem from './AccordionItem';
import ExpenseContext from '../Context/ExpenseContext';
import axios from 'axios';
const AccordionList = () => {
  const {expenseslist,setExpensesList}=useContext(ExpenseContext);
  const getExpenses=async()=>{
    if(localStorage.getItem("auth-token")){
    await axios.get("https://exmbackend.onrender.com/api/expense/fetchall",{
      "headers":{
        "Content-Type":"application/json",
        "auth-token": localStorage.getItem("auth-token")
      }
    }).then((res)=>{
      setExpensesList(res.data);
    })}
  }

  useEffect(()=>{
    if(expenseslist.length===0){
      getExpenses();
    }
    // eslint-disable-next-line
  },[])

  return (
    <div>
      
      <List sx={{ width: '100%', maxWidth: "100%", bgcolor: 'background.paper' }} subheader={<ListSubheader sx={{color:'black',fontSize:"20px"}}>Expenses</ListSubheader>}>
      <Divider/>
      {expenseslist?expenseslist.map((exp)=>{
        return <AccordionItem exp={exp} key={exp._id} index={expenseslist.indexOf(exp)}/>;
      }):"Expense Not available"}
      </List>
      
    </div>
  );
};

export default AccordionList;
