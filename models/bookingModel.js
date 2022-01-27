const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'cars'
    },
    user:{
        type:mongoose.Schema.Types.ObjectID,
        ref:'users'
    },
    bookingslots:
        {
            from:{
                type:String
            },
            to:{
                type:String
            }
        }
    ,
    totalhours:{
        type:Number,
        required:true
    },
    totalamount:{
        type:Number,
        required:true
    },
    transactionid:{
        type:String,
        required:true,
        unique:true
    },
    driverrequire:{
        type:Boolean,
        required:true
    }
},{
    timestamps:true
})

const Booking=mongoose.model('bookings',bookingSchema);

module.exports=Booking;