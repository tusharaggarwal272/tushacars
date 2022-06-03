const mongoose=require('mongoose');
// function connectDb(){
    mongoose.connect('mongodb+srv://Tushar:Tusharagg@cluster0.iieen.mongodb.net/tushacar',{useUnifiedTopology:true,useNewUrlParser:true})
    const connection=mongoose.connection;

    connection.on('connected',()=>{
        console.log('Connection Successfull');
        
    })
    connection.on('error',()=>{
        console.log('Db not connected');
        
    })
// }

// connectDb();

module.exports=mongoose;