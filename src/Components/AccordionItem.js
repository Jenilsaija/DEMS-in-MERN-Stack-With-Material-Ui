import React, { useContext, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Avatar,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpenseForm from "./ExpenseForm";
import ExpenseContext from "../Context/ExpenseContext";
import axios from "axios";

const AccordionItem = ({ exp, index }) => {
  const [expanded, setExpanded] = useState(null);
  const [acdatachange, setAcdatachange] = useState(1);
  const {setSneckb,setOpen,expenseslist,setExpensesList}=useContext(ExpenseContext);
  const handleEdit = (item) => {
    setAcdatachange(item);
    console.log(`Edit ${item}`);
  };

  const handleDelete = (item) => {
    setAcdatachange(item);
    console.log(`Delete ${item}`);
  };

  const handleAccordionClick = (index) => {
    if (expanded === index) {
      setExpanded(null);
      setAcdatachange(1);
    } else {
      setExpanded(index);
    }
  };

  const Deleteclick=async(id)=>{
    if(localStorage.getItem("auth-token")){
    let newarr=expenseslist.filter((e)=>{if(e._id!==id){return e} return null});
    setExpensesList(newarr);
    await axios.delete("https://exmbackend.onrender.com/api/expense/delete/"+id,
    {"headers":{
      "Content-Type":"application/json",
      "auth-token": localStorage.getItem("auth-token")
    }}).then(()=>{
      setSneckb({"type":"success",message:"Expense Deleted SuccessFully"});
    setOpen(true);
    })
  }
  }

  const modecheck = () => {
    if (exp.mode === "transaction") {
      return (
        <>
          <tr>
            <td>To Account</td>
            <td>{exp.toaccount}</td>
          </tr>
          <tr>
            <td>Account Holder Name</td>
            <td>{exp.acholdername}</td>
          </tr>
        </>
      );
    }
  };

  const renderAccordionContent = (index) => {
    switch (index) {
      case 1:
        return (
          <div>
            <table border={1} style={{ width: "100%", tableLayout: "fixed" }}>
              <tbody>
                <tr>
                  <td>Note</td>
                  <td>{exp.note}</td>
                </tr>
                <tr>
                  <td>Amount</td>
                  <td>{exp.amount}</td>
                </tr>
                <tr>
                  <td>Mode</td>
                  <td>{exp.mode}</td>
                </tr>
                {modecheck()}
                <tr>
                  <td>Date</td>
                  <td>{exp.date}</td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td>{exp.category}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 2:
        return <ExpenseForm mode={exp.mode} exp={exp} status="Update"/>;
      case 3:
        return (
          <div>
            <Typography sx={{ fontSize: "30px" }}>
              Are you sure you want to delete this Expense?
            </Typography>
            <Button
              variant="outlined"
              sx={{ color: "red", borderColor: "red" }}
              startIcon={<DeleteIcon />}
              size="large"
              onClick={()=>{Deleteclick(exp._id)}}
            >
              Delete
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Accordion expanded={expanded === 1} sx={{ margin: "10px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          onClick={() => handleAccordionClick(1)}
        >
          <Avatar sx={{ bgcolor: "primary.main", marginRight: 1 }}>
            {index + 1}
          </Avatar>
          <Typography fontWeight="bold" marginTop={"8px"}>
            {exp.note}
          </Typography>
          <div style={{ marginLeft: "auto" }}>
            <Chip
              label={"Rs. " + exp.amount}
              variant="outlined"
              sx={{ marginRight: "10px" }}
            />
            <IconButton onClick={() => handleEdit(2)} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(3)} color="secondary">
              <DeleteIcon />
            </IconButton>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {renderAccordionContent(acdatachange)}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionItem;
