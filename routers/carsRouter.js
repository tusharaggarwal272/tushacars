const router = require('express').Router();
// const Car = require('../models/carModel');
const Cars = require('../models/carModel');
router.get('/getallcars', async (req, res) => {
    const data = ['tata', 'altroz', 'creta', 'hector'];
    console.log("searching...")
    try {
        let result = await Cars.find();
        res.send(result);
    }
    catch (err) {
        // res.status(400).send({err});
        console.log(err);

    }

});


router.post('/addcar', async (req, res) => {
    // console.log(req.body);
    try {
        const newcar = await Cars.create(req.body);
        res.send("Car added successfully");
    } catch (error) {
        console.log(error.message);
        return res.status(400).send(error);
    }
});


router.post('/editcar', async (req, res) => {
    try {
        const car = await Cars.findByIdAndUpdate(req.body.id, req.body);
        // console.log(car);
        // console.log(req.body);
        // console.log(req.body._id);
        res.send("Car Updated successfully");
    }
    catch (err) {
        return res.status(400).send(err);
    }
});
router.post('/deletecar', async (req, res) => {
    try {
        await Cars.findByIdAndDelete(req.body.carid);
        res.send("Car Deleted Successfully");
    } catch (err) {
        res.status(400).send(err);
    }
})
module.exports = router;