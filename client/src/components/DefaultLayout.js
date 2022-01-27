import React from 'react'
import { Menu, Dropdown, Button,Row,Col } from 'antd';
import {Link} from 'react-router-dom'

function DefaultLayout(props) {
    
    const user=JSON.parse(localStorage.getItem('user'));
    
    const menu = (
   
        <Menu>
            <Menu.Item>
                <a  rel="noopener noreferrer" href="/">
                    Home
                </a>
            </Menu.Item>
            <Menu.Item>
                <a  rel="noopener noreferrer" href="/userbookings">
                    Bookings
                </a>
            </Menu.Item>
            <Menu.Item>
                <a  rel="noopener noreferrer" href="/admin">
                    Admin Panel
                </a>
            </Menu.Item>
            <Menu.Item onClick={()=>{
                localStorage.removeItem('user');
                window.location.href='/login';
            }}>
                <a >
                    Logout
                </a>
            </Menu.Item>
        </Menu>
    );
    
    return (
        <div>
            <div className='header bs1'>
                <Row gutter={16} justify='center'>
                    <Col lg={20} sm={20} xs={20}>
                    <div className='d-flex justify-content-between align-items-center' >
                    {/* <img data-aos="slide-right"  className='login-img2' src='https://media.istockphoto.com/photos/silhouetted-car-on-black-picture-id511807989?b=1&k=20&m=511807989&s=170667a&w=0&h=2xpFgeWZkANQL1I1BpVNUch9alSOxhpWP9_9cDO61zM='></img> */}
                    
                    <Link to={'/'}><b><h1> TushaCars</h1></b></Link>
                    {user!=null && <Dropdown overlay={menu} placement="bottomRight" className='mr-2'>
                        <Button className= 'text-capitalize'> Hi! {user.username}</Button>
                    </Dropdown>}
                    

                </div>

                    </Col>
                </Row>
                
            </div>
            <div className='content'>
                {props.children}
            </div>
            <div className="footer text-center">
      <hr />

           <p>Desinged and Developed By</p>

           

           <p>Tushar Aggarwal</p>
          
      </div>

        </div>
    )
}

export default DefaultLayout
