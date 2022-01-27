const express = require('express');
const router = express.Router();
const Book = require('../models/bookingModel');
const Car = require('../models/carModel');
const stripe = require('stripe')('sk_test_51JpxOaSJBHgfR3nh6kGVCAwWqQlRUebkJiF8VjeXWhoFNMC1R9kfLUkTGB4IU1nREmoLXHH2fJ0f2KVmvAm0nyOR002TMM2mhB')
const { v4: uuidv4 } = require('uuid');
// uuidv4();
router.post('/bookcar', async (req, res) => {

    const { token } = req.body;

   
    try {



        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const payment = await stripe.charges.create({
            amount: req.body.totalamount * 100,
            customer: customer.id,
            currency: 'inr',
            receipt_email: token.email

        }, {
            idempotencyKey: uuidv4(),
        })

        if (payment) {
            req.body.transactionid = payment.source.id;
            await Book.create(req.body);
            const car = await Car.findOne({ _id: req.body.car });
            car.bookedtimeslots.push(req.body.bookingslots);
            await car.save();
            res.send('Car Booked successfully');
        } else {
            return res.status(400).send(error);
        }




    } catch (error) {
        return res.status(400).send(error);
    }
});

router.get('/getallbookings/:userid',async(req,res)=>{
    // const id=req.body.id;
    // console.log(id);.
    // console.log(req.body);
    // const result=await Book.find({user:id});
    

    try {
        const {userid}=req.params;
    // console.log(userid);
    const bookings=await Book.find({user:userid}).populate('car');
    console.log(bookings);

    res.send(bookings);
        
    } catch (error) {
        console.log(error.message);
        return res.status(400).send(error);
    }
})

module.exports = router;