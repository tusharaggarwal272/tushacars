import React, { useState, useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCars } from '../redux/actions/carsAction'
import axios from 'axios'
import { Button, Row, Col, Spin, Divider, DatePicker, Checkbox, message } from 'antd';
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom';
import moment from 'moment'
import { Popconfirm } from 'antd';
import {deletecar} from '../redux/actions/carsAction';
// import { Button, Row, Col,  } from 'antd';
// const { RangePicker } = DatePicker;
import { EditOutlined, DeleteOutlined, StarTwoTone } from '@ant-design/icons';
// import {Link} from 'react-router-dom'
function AdminHome() {
    const { cars } = useSelector(state => state.carsReducer);
    const { loading } = useSelector(state => state.alertsReducer);
    const dispatch = useDispatch();
    const [totalcar, settotalcar] = useState([]);
    // if(!localStorage.getItem('user')){
    //     window.location.href='/login'
    // }

    useEffect(() => {

        dispatch(getAllCars())
        const user = localStorage.getItem('user');

    }, [])

    useEffect(() => {
        settotalcar(cars);
    }, [cars]);


    function setfilter(values) {
        var selectfrom = moment(values[0], 'MMM DD yyyy HH:mm');
        var selectto = moment(values[1], 'MMM DD yyyy HH:mm');
        var temp = [];
        for (let car of cars) {
            if (car.bookedtimeslots.length == 0) {
                temp.push(car);
            } else {
                for (let booking of car.bookedtimeslots) {

                    if (selectfrom.isBetween(booking.from, booking.to)
                        || selectto.isBetween(booking.from, booking.to)
                        || moment(booking.from).isBetween(selectfrom, selectto)
                        || moment(booking.to).isBetween(selectfrom, selectto)) {
                        // console.log(car,booking.from,booking.to);
                    } else {
                        // console.log(car,booking.from,booking.to);
                        temp.push(car);
                    }

                }
            }

        }
        settotalcar(temp);

    }

    return (
        <DefaultLayout>


            <div>

                {loading == true && (<Spinner />)}
            </div>
            <Row justify="center" gutter={16} className="mt-2">
                <Col lg={20} sm={24}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="mt-1 mr-2">Admin Panel</h3>
                        <button onClick={() => window.location.href = ('/addcar')} className="btn btn-primary">
                            ADD CAR
                        </button>
                    </div>
                </Col>
            </Row>


            <Row justify='center' gutter={16} className=''>
                {
                   totalcar.length>0 &&  totalcar.map(car => {
                        return <Col lg={5} sm={24} xsm={24}>
                            <div className='car p-2 bs1'>
                                <img src={car.image} className={'carimg'} />
                                <div className='car-content d-flex align-items-center justify-content-between '>
                                    <div>
                                        <p>{car.name}</p>
                                        <p>{car.rentperhour} Rent per hour/-</p>
                                    </div>
                                    <div className='mr-4'>
                                        <Link to={`/editcar/${car._id}`} > <EditOutlined className='mr-3' style={{ cursor: 'pointer' }} /></Link>
                                        <Popconfirm
                                            title="Are you sure to delete this Car?"
                                            onConfirm={()=>{dispatch(deletecar({carid:car._id}))}}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
                                        </Popconfirm>


                                    </div>
                                </div>
                            </div>
                            <h3>{car.name}</h3>
                        </Col>
                    })
                }
            </Row>



        </DefaultLayout>
    )
}

export default AdminHome
