import axios from 'axios';
import { message } from 'antd';
export const userLogin = (reqobj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })
    try {
        const response = await (await (axios.post('/api/users/login', reqobj)));
      
        localStorage.setItem('user', JSON.stringify(response.data));
        message.success("Login Successfully");
        dispatch({ type: 'LOADING', payload: false });
        setTimeout(() => {
            window.location.href='/'
         
        }, 500);
        console.log(response);

    }
    catch (error) {
        console.log(error);
        message.error('Something Went Wrong');
        dispatch({ type: 'LOADING', payload: false });
    }
}
export const userRegister = (reqObj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })
    try {
        const response = await axios.post('/api/users/register' , reqObj)
        message.success('Registration successfull');
        dispatch({ type: 'LOADING', payload: false });
        setTimeout(() => {
            window.location.href='/login'
         
        }, 500);

        
    }
    catch (error) {
        console.log(error);
        message.error('Something Went Wrong');
        dispatch({ type: 'LOADING', payload: false });
    }
}