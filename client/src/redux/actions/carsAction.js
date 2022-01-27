import axios from 'axios';
import swal from 'sweetalert';

export const getAllCars = () => async (dispatch) => {

    dispatch({ type: 'LOADING', payload: true });
    try {
        const results = await (axios.get('/api/cars/getallcars'));
        dispatch({ type: 'GET_ALL_CARS', payload: results.data })
        dispatch({ type: 'LOADING', payload: false });
    } catch (err) {
        console.log(err);

        dispatch({ type: 'LOADING', payload: false });
    }
}

export const addcar = (reqobj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });
    try {
        const result = await axios.post('/api/cars/addcar', reqobj);
        dispatch({ type: 'LOADING', payload: false });
        swal("Done!", "Your car has been added Successfully",'success').then(function() {
            window.location.href=('/');
        });
    }
    catch (err) {

        console.log(err);
        dispatch({ type: 'LOADING', payload: false });
        swal("Oops!", "Try Again Later",'error').then((re)=>{
            window.location.reload();
        });

    }
}
export const editcar = (reqobj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });
    try {
        console.log(reqobj);
        const result = await axios.post('/api/cars/editcar', reqobj);
        dispatch({ type: 'LOADING', payload: false });
        swal("Done!", "Your car has been Updated Successfully",'success').then(function() {
            window.location.href=('/admin');
        });
    }
    catch (err) {

        console.log(err);
        dispatch({ type: 'LOADING', payload: false });
        swal("Oops!", "Try Again Later",'error').then((re)=>{
            window.location.reload();
        });

    }
}

export const deletecar = (reqobj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });
    try {
        console.log(reqobj);
        const result = await axios.post('/api/cars/deletecar', reqobj);
        dispatch({ type: 'LOADING', payload: false });
        swal("Done!", "Your car has been Deleted Successfully",'success').then(function() {
            window.location.href=('/admin');
        });
    }
    catch (err) {

        console.log(err);
        dispatch({ type: 'LOADING', payload: false });
        swal("Oops!", "Try Again Later",'error').then((re)=>{
            window.location.reload();
        });

    }
}



