import React, { useState, useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllbookings } from '../redux/actions/BookingActions'
import { Col, Row } from 'antd';
import moment from 'moment';
import Spinner from '../components/Spinner';
function Userbookings() {

    const dispatch = useDispatch();
    const { bookings } = useSelector((state) => state.bookingsReducer)
    const {loading}=useSelector((state)=>state.alertsReducer);

    useEffect(() => {
        // if(localStorage.getItem('user'));
        let user = localStorage.getItem('user');
        user = (JSON.parse(user));
        // console.log(user._id);

        const reqobj = {
            user: user._id
        }
        dispatch(getAllbookings(reqobj));
    }, [])

    return (<DefaultLayout>
        {loading&&<Spinner/>}

        <h1 className='mt-2'>MyBookings</h1>
        <Row justify='center' gutter={16}>
            <Col lg={20} sm={24}>
                {/* {
                    bookings.length > 0 && console.log(bookings)

                } */}

                {bookings.length > 0 && bookings.map((booking) => {
                    //  {console.log(booking);}
                    return <Row className='bs1 m-2 text-left'>
                        <Col lg={6} sm={24}>
                            <p><b>{booking.car.name}</b></p>
                            <p>Total Hours: {booking.totalhours}</p>
                            <p>Rent PerHour: {booking.car.rentperhour}</p>
                            <p>TotalAmunt: {booking.totalamount}</p>
                            <p>Driver Required: {booking.driverrequire?"True":"False"}</p>
                        </Col>
                        <Col lg={8} sm={24}>
                            <b>
                                <p>Transactionid: {booking.transactionid}</p>
                                <p>From :{booking.bookingslots.from}</p>
                                <p>To :{booking.bookingslots.to}</p>
                                <p>DateOfBooking :{moment(booking.createdAt).format('MMM DD yyyy H:mm')}</p>
                            </b>
                        </Col>
                        <Col lg={8} sm={24} className='text-right'>
                            <img  src={booking.car.image} style={{width:'200px',borderRadius:5}} className='p-2  '/>
                        </Col>

                    </Row>
                })
                }

            </Col>
        </Row>



    </DefaultLayout>);
}

export default Userbookings;
