const mongoose=require('mongoose');
const Cars=require('./models/carModel');

data=[
    {
     "name":"Tata Altroz",
      "image":"https://stimg.cardekho.com/images/carexteriorimages/930x620/Tata/Altroz/7247/1578642800962/front-left-side-47.jpg",
      "capacity":5,
      "fueltype":"petrol",
       "rentperhour":500,
    "bookedtimeslots":[]
    },
    {
     "name":"Mahindra XUV 700",
      "image":"https://imgd.aeplcdn.com/0x0/n/cw/ec/42355/xuv700-exterior-right-front-three-quarter.jpeg?isig=0",
      "capacity":7,
      "fueltype":"petrol",
       "rentperhour":700,
    "bookedtimeslots":[]
    },
    {
     "name":"Tata Nexon",
      "image":"https://imgd.aeplcdn.com/664x374/n/1sd05sa_1478704.jpg?q=85",
      "capacity":5,
      "fueltype":"petrol",
       "rentperhour":600,
    "bookedtimeslots":[]
    },{
     "name":"Hyundai i20",
      "image":"https://cdni.autocarindia.com/ExtraImages/20200930123556_Hyundai-i20-N-Line-front-1.jpg",
      "capacity":5,
      "fueltype":"petrol",
       "rentperhour":550,
    "bookedtimeslots":[]
    }
    ,{
     "name":"MG Astor",
      "image":"https://imgd.aeplcdn.com/1200x900/n/cw/ec/51940/astor-exterior-right-front-three-quarter.jpeg?isig=0&q=85",
      "capacity":5,
      "fueltype":"petrol",
       "rentperhour":500,
    "bookedtimeslots":[]
    }
    ,{
     "name":"Hyundai Creta",
      "image":"https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https://cdni.autocarindia.com/ExtraImages/20210610035741_Creta.jpg&w=700&q=90&c=1",
      "capacity":5,
      "fueltype":"petrol",
       "rentperhour":500,
    "bookedtimeslots":[]
    }
    
    
    ];


    async function seedcar(){
        try {
            const res=await Cars.insertMany(data);
            console.log(res);
            // await res.save();
            
        } catch (error) {
            console.log(error.message);
        }
        
    }


    module.exports=seedcar;