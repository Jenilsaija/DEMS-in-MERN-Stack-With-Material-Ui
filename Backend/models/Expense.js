const mongoose= require('mongoose');
const {Schema}=mongoose;

const ExpenseSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    amount:{
        type:String,
        required:true
    },
    note:{
        type:String,
        required:true
    },
    mode:{
        type:String
    },
    toaccount:{
        type:String
    },
    acholdername:{
        type:String
    },
    date:{
        type:String,
        required:true
    },
    category:{
        type:String
    },
});
const Expense= mongoose.model('Expense',ExpenseSchema);
module.exports=Expense;