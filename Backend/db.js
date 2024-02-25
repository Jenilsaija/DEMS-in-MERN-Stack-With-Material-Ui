const mongoose=require('mongoose');
const mongoURI="enter your db url";
mongoose.set('strictQuery', true);
const connectToMongo=()=>{
    mongoose.connect(mongoURI,{dbName:'DEMS'}).then(()=>{
      console.log('Mongodb connected successfully');
    }).catch((error )=>console.log(error.message))

    mongoose.connection.on('connected',()=>{
      console.log('Mongoose connected to db')
    })

    mongoose.connection.on('error',(error)=>{
      console.log(error.message)
    })

    mongoose.connection.on('disconnected',()=>{
      console.log('Mongoose connection is disconnected')
    })
}

module.exports=connectToMongo; 
