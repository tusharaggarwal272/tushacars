import { Col, Row, Form, Input } from 'antd'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import Spinner from '../components/Spinner'
import { getAllCars,editcar } from '../redux/actions/carsAction'
function EditCar({ match }) {

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.alertsReducer)
    const [caredit, setcaredit] = useState([]);
    const { cars } = useSelector((state) => state.carsReducer);
    const [res, setres] = useState([]);

    function onFinish(values) {

        // values.bookedtimeslots = []
        values.id=res[0]._id;
        // console.log()
        // console.log(values);
         dispatch(editcar(values))
        // console.log(values)
    }

    useEffect(() => {
        dispatch(getAllCars());
        // let res=cars.filter((c)=>c._id==match.params.carid);
        //     setcaredit(res);
        // console.log(res);
        // console.log(cars);
        // console.log(cars[0].id);
        // console.log(match.params.carid)

    }, [])

    useEffect(() => {
        // let res=cars.filter((c)=>c._id==match.params.carid);
        // setcaredit(res);
        // console.log(cars);
        setcaredit(cars);

    }, [cars])

    useEffect(() => {

        //    console.log(res);
        setres((caredit.filter((c) => c._id == match.params.carid)));

    }, [caredit])


    return (

        <DefaultLayout>
            {/* {console.log(caredit)} */}


            {loading && (<Spinner />)}

            {/* {
                  cars.length>0 && cars.filter((c)=>c._id==match.params.carid)
                  
               } */}


            {res.length>0 &&<Row justify='center mt-5'>
                {console.log((res[0].name))}
                <Col lg={12} sm={24} xs={24} className='p-2'>
                    <Form className='bs1 p-2' layout='vertical' onFinish={onFinish} initialValues={res[0]}>
                        <h3>Edit Your Car</h3>
                        <hr />
                        <Form.Item name='name'  label='Car name' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='image' label='Image url' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='rentperhour' label='Rent per hour' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='capacity' label='Capacity' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='fueltype' label='Fuel Type' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <div className='text-right'>
                            <button className='btn1'>EDIT CAR</button>
                        </div>

                    </Form>
                </Col>
            </Row>}

        </DefaultLayout>
    )
}

export default EditCar