const router=require('express').Router();
const User=require('../models/userModel');

router.post('/login',async(req,res)=>{
    const{username,password,contact}=req.body;
    // console.log(username,password);

    try{
        const user=await User.findOne({contact:contact});
        res.send(user);
        // console.log(user);
    }
    catch(err){
        console.log(err);
        return res.status(400).send({err});
    }
    
    
    // try{
    //     const user=await User.create({username,password});
    //     console.log(user);
    // }catch(err){
    //     console.log(err);
    // }
})

router.post('/register',async(req,res)=>{
    // console.log("user registered in localstorage");
    const{username,password,contact}=req.body;
    try{
        const user=await User.create({username,password,contact});
        res.send(user);
        // console.log('***************************************');
    }catch(err){
        // console.log(err);
        return res.status(400).send({err});

    }
    // let result=await User.find();
    // console.log(result);
})

module.exports=router;