const express=require('express');
const app=express();
var cors = require('cors');
const connectDb=require('./db')
const car=require('./models/carModel');
const seedcar=require('./seedcar')

// seedcar();
const carrouter=require('./routers/carsRouter');
const userrouter=require('./routers/usersRouter');
const bookrouter=require('./routers/bookingsRouter');
const path=require('path');

if(process.env.NODE_ENV==='production'){
    app.use('/',express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client/build/index.html'))
    })
}

app.use(express.json());

app.use('/api/cars',carrouter);
app.use('/api/users',userrouter);
app.use('/api/bookings',bookrouter);




const port=process.env.PORT||5001
app.listen(port,(req,res)=>{
    console.log(`The server is running at port ${port}`)
})