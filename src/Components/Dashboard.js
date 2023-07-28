import React, { useContext, useEffect } from 'react'
import axios from 'axios';
import ExpenseContext from '../Context/ExpenseContext';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Divider, IconButton, Typography } from '@mui/material';
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import LibraryAddRoundedIcon from "@mui/icons-material/LibraryAddRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import {useNavigate} from 'react-router-dom';
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });
const Dashboard = () => {
  const {expenseslist,setExpensesList}=useContext(ExpenseContext);
  const navigate=useNavigate();
  useEffect(()=>{
    getExpenses();
    // eslint-disable-next-line
  },[]);

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

  const getTotalExpense=()=>{
    let sum=0;
    const data=expenseslist;
    data.forEach(element => {
      sum=sum+parseInt(element.amount);
    })
    return sum;
  }

  return (
    <div>
      <Typography fontSize={30} >Dashboard</Typography>
      <Grid container spacing={10}>
        <Grid item xs={12}>
          <ThemeProvider theme={lightTheme}>
            <Box
              sx={{
                p: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr 1fr 1fr' },
                gap: 2,
              }}
            >   
                <Item elevation={12} height="100%">
                  <IconButton sx={{height:"100%",width:"100%"}} onClick={()=>{navigate("/")}}>
                    <GridViewRoundedIcon sx={{marginRight:"5px"}}/>
                    <Typography>Dashboard</Typography>
                  </IconButton>
                </Item>
                <Item elevation={12} height="100%">
                  <IconButton sx={{height:"100%",width:"100%"}} onClick={()=>{navigate("/addexpense")}}>
                    <LibraryAddRoundedIcon sx={{marginRight:"5px"}}/>
                    <Typography>Add Expenses</Typography>
                  </IconButton>
                </Item>
                <Item elevation={12} height="100%">
                  <IconButton sx={{height:"100%",width:"100%"}} onClick={()=>{navigate("/addtransaction")}}>
                    <LibraryAddRoundedIcon sx={{marginRight:"5px"}}/>
                    <Typography>Add Transaction</Typography>
                  </IconButton>
                </Item>
                <Item elevation={12} height="100%">
                  <IconButton sx={{height:"100%",width:"100%"}}>
                    <AttachMoneyRoundedIcon sx={{marginRight:"5px"}} onClick={()=>{navigate("/showexpense")}}/>
                    <Typography>Manage Expense</Typography>
                  </IconButton>
                </Item>
            </Box>
          </ThemeProvider>
        </Grid>
    </Grid>
    <Divider/>
    <Grid item xs={12}>
          <ThemeProvider theme={lightTheme}>
            {/* <Box
              sx={{
                p: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr 1fr' },
                gap: 2,
              }}
            >   
                <Item elevation={12} height="100%">
                    <Typography sx={{marginTop:"15px",fontSize:"20px"}}>Total Expense : {result.expense}</Typography>
                </Item>
                
            </Box>
            <Box
              sx={{
                p: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr 1fr' },
                gap: 2,
              }}
            >   
                <Item elevation={12} height="100%">
                    <Typography sx={{marginTop:"15px",fontSize:"20px"}}>Total Transaction : {result.transaction}</Typography>
                </Item>
                
            </Box> */}
            <Box
              sx={{
                p: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr 1fr' },
                gap: 2,
              }}
            >   
                <Item elevation={12} height="100%">
                    <Typography sx={{marginTop:"15px",fontSize:"20px"}}>Total Amount Expense : {getTotalExpense()}</Typography>
                </Item>
                
            </Box>
          </ThemeProvider>
        </Grid>
    </div>
  )
}

export default Dashboard
