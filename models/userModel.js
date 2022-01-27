const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true
    },contact:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        lowercase:true
    }
},{
    timestamps:true,
})

const userModel=mongoose.model('users',userSchema);
module.exports=userModel;