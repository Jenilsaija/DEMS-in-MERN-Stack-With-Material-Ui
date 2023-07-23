import React, { useContext } from 'react';
import {
  List,
  ListSubheader,
  Divider,
} from '@mui/material';
import AccordionItem from './AccordionItem';
import ExpenseContext from '../Context/ExpenseContext';
const AccordionList = () => {
  const {expenseslist}=useContext(ExpenseContext);
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
