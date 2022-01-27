const mongoose=require('mongoose');
const carSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
    ,
    image:{
        type:String,
        required:true,
    },
    capacity:{
        type:Number,
        required:true
    },
    fueltype:{
        type:String,
        required:true
    },
    rentperhour:{
        type:Number,
        required:true
    },
    bookedtimeslots:[
        {
            from:{type:String,required:true},
            to:{type:String,required:true}
        }
    ]
},{timeStamps:true})

const Car=mongoose.model('cars',carSchema);

module.exports=Car;