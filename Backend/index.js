const connectToMongo=require('./db');
const express = require('express');
let cors=require('cors');
connectToMongo(); 
const app = express()
const port = 5000 

app.use(cors());
app.use(express.json());

app.use('/api/auth',require ('./routes/auth'))
app.use('/api/expense',require ('./routes/expense'))

app.listen(port, () => {
  console.log(`DEMS app listening on port ${port}`)
})
