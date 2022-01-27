import React, { useState, useEffect } from 'react'
import moment from "moment";
import DefaultLayout from '../components/DefaultLayout'
import StripeCheckout from 'react-stripe-checkout';
import { useSelector, useDispatch } from 'react-redux'
import { getAllCars } from '../redux/actions/carsAction';
import Spinner from '../components/Spinner';
import { disabled } from 'express/lib/application';
import { bookCar } from '../redux/actions/BookingActions';
import { Button, Row, Col, Spin, Divider, DatePicker, Checkbox, message } from 'antd';
import Modal from 'antd/lib/modal/Modal';
const { RangePicker } = DatePicker;



function BookingCars({ match }) {
    const { cars } = useSelector(state => state.carsReducer);
    const { loading } = useSelector(state => state.alertsReducer);
    const dispatch = useDispatch();
    const [from, setfrom] = useState();
    const [to, setto] = useState();
    const [hours, sethours] = useState(0);
    const [car, setcar] = useState({});
    const [totalamount, settotalamount] = useState(0);
    const [driver, setdriver] = useState(false);
    const [showModal, setshowModal] = useState(false);
    // if(!localStorage.getItem('user')){
    //     window.location.href='/login'
    // }

    useEffect(() => {

        if (cars.length == 0) {
            dispatch(getAllCars());
            settotalamount(0);
        }
        else {
            setcar(cars.find((c) => c._id === match.params.carid));
            settotalamount(0);
        }
        // window.location.reload();

    }, [cars]);
    useEffect(() => {

        settotalamount(hours * car.rentperhour);
        if (driver) {
            settotalamount(totalamount + (30 * hours));
        }

    }, [driver, hours]);
    function selecttimeslots(values) {
        setfrom(moment(values[0]).format('MMM DD YYYY HH:mm'));
        setto(moment(values[1]).format('MMM DD YYYY HH:mm'));

        sethours(values[1].diff(values[0], 'hours'));
    }
    
    function onToken(token){
        const reqobj = {
            token,
            user: JSON.parse(localStorage.getItem('user'))._id,
            car: car._id,
            totalhours: hours,
            totalamount,
            driverrequire: driver,
            bookingslots: {
                from: from,
                to: to
            }
        }
        // console.log(reqobj);

        dispatch(bookCar(reqobj));
    }

    return (

        <DefaultLayout>
            {loading && <Spinner />}
            <Row justify='center' className='d-flex align-items-center' style={{ minHeight: '90vh' }}>
                <Col lg={10} sm={24} xs={24} className='p-3'>
                    <img src={car.image} className='carimg2 bs1 w-100' />

                </Col>
                <Col lg={10} sm={24} xs={24} className='text-right'>
                    <Divider type='horizontal' dashed>Car Info </Divider>
                    <div style={{ textAlign: 'right' }}>
                        <p><b>CarName : </b>{car.name}</p>
                        <p><b>RentPerHour : </b>{car.rentperhour}/hr</p>
                        <p><b>Fuel Type : </b>{car.fueltype}</p>
                        <p><b>Max Person : </b>{car.capacity}</p>
                    </div>
                    <Divider type='horizontal' dashed>Select Time Slots</Divider>
                    <div>
                        <RangePicker showTime={{ format: 'HH:mm' }} format={'MMM DD YYYY HH:mm'} onChange={selecttimeslots} />
                        <br />
                        <button className='btn btn-primary mt-2' onClick={() => setshowModal(true)} >See Booked Slots</button>
                        {from && to && <div>
                            <p><b>Total Hours : {hours} </b></p>
                            <Checkbox onChange={(e) => {
                                if (e.target.checked) {
                                    setdriver(true);
                                    message.success("Driver Added Successfully");
                                }
                                else {
                                    message.warning("Driver Removed");
                                    setdriver(false);
                                }
                            }}><b>Driver Required</b></Checkbox>
                            <h3><b>TotalAmount : <i className="fas fa-rupee-sign"></i>{totalamount}/-<sub><h6><b>{totalamount != 0 ? (driver == true ? ` Driver : 30*${hours}/-` : "Without driver") : ""}</b></h6></sub> </b></h3>
                            <StripeCheckout
                                shippingAddress
                                token={onToken}
                                amount={totalamount*100}
                                currency='INR'
                                stripeKey="pk_test_51JpxOaSJBHgfR3nhwr8sFnHOCAzpnjzAqCVmOu0yf9VYK7l9KCtc28TVtk7gb9WNizbqE00FdG0vZEVmXYI8g7oQ00ODaBNTxk"
                            >
                                <button className='btn btn-success' disabled={totalamount == 0}>Book Now</button>
                            </StripeCheckout>

                        </div>}
                    </div>


                </Col>
            </Row>


            <Modal closable={false} visible={showModal} footer={false} title='Booked Time Slots'>
                {car.name && (<div className='p-2'>
                    {
                        car.bookedtimeslots.map((c) => {
                            return <button className='btn btn-primary mt-2' >{c.from}-{c.to}</button>
                        })
                    }


                    <div className='text-right mt-5'>
                        <button className=' btn btn-danger mt-5' onClick={() => setshowModal(false)}>Close</button>

                    </div>

                </div>)

                }
            </Modal>



        </DefaultLayout>
    )
}

export default BookingCars
