import axios from 'axios';
// import { message } from 'antd';
import swal from 'sweetalert';

export const bookCar=(reqobj)=>async(dispatch)=>{

    dispatch({type:'LOADING',payload:true});
    try{
        await axios.post("/api/bookings/bookcar" , reqobj);

        dispatch({ type: "LOADING", payload: false });
        swal("Done!", "Your car booked successfully",'success').then(()=>{
            window.location.href='/userbookings';
        });
        // message.success("Your car booked successfully");
        // setTimeout(() => {
        //   window.location.href='/userbookings'
        // }, 500);
    
       
    }catch(err){
        console.log(err);
        
        dispatch({type:'LOADING',payload:false});
        // message.error("Someting went wrong");
        swal("Oops!", "Something went wrong!", "error");
    }
}
export const getAllbookings=(reqobj)=>async(dispatch)=>{

    dispatch({type:'LOADING',payload:true});
    try{
        // console.log("In the bookings actions");
        // console.log(reqobj.user);
        const results=await (axios.get(`/api/bookings/getallbookings/${reqobj.user}`));
        // console.log(results.data);
        dispatch({type:'GET_ALL_BOOKINGS',payload:results.data})
        dispatch({type:'LOADING',payload:false});
    }catch(err){
        console.log(err);
        
        dispatch({type:'LOADING',payload:false});
    }
}



