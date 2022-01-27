import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Row, Col, Form, Input } from 'antd';
import Password from 'antd/lib/input/Password';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { userRegister } from '../redux/actions/userActions';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
    duration:1500
});

function Register() {
    const dispatch=useDispatch();

    function onfinish(values) {
        dispatch(userRegister(values));
        console.log(values);
    }
    return (
        <DefaultLayout>
            <div className='login'>
                <Row gutter={16} className='d-flex align-items-center'>
                    <Col lg={16} className='imgandhead' style={{ position: 'relative' }}>

                        <img data-aos="slide-right" className='login-img' src='https://media.istockphoto.com/photos/silhouetted-car-on-black-picture-id511807989?b=1&k=20&m=511807989&s=170667a&w=0&h=2xpFgeWZkANQL1I1BpVNUch9alSOxhpWP9_9cDO61zM='></img>
                        <h1 className='login-logo' >TushaCars</h1>
                    </Col>

                    <Col lg={8} className='text-left login-form p-5 m-auto '>
                        <Form layout='vertical' className='login-layout' onFinish={onfinish}>
                            <h1>Register</h1>
                            <hr></hr>

                            <Form.Item name={'username'} label={'username'} rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={'contact'} label={'Phone No : '} rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item name={'password'} label={'password'} rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={'cpassword'} label={'Confirm password'} rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <button className='btn1 mt-2'>
                                Register
                            </button>
                            <hr />

                            <Link to={'/login'}>Already an user? Please Login</Link>


                        </Form>


                    </Col>

                </Row>

            </div>

        </DefaultLayout>
    )
}

export default Register
