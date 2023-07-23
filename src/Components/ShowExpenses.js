import { Typography } from '@mui/material'
import React from 'react'
import AccordionList from './AccordionList'

const ShowExpenses = () => {
  return (
    <>
      <Typography fontSize={30}>Manage Your Daily Expenses</Typography>
      <AccordionList/>
    </>
  )
}

export default ShowExpenses
