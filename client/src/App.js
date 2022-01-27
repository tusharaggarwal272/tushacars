
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCars from './pages/BookingCars';
import { Redirect } from 'react-router-dom';

import 'antd/dist/antd.css';
import Userbookings from './pages/Userbookings';
import Addcar from './pages/Addcar';
import AdminHome from './pages/AdminHome'
import EditCar from './pages/EditCar';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <PrivateRoute path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <PrivateRoute path="/booking/:carid" exact component={BookingCars} />
        <PrivateRoute path="/userbookings" exact component={Userbookings} />

        <PrivateRoute path="/addcar" exact component={Addcar} />
        <PrivateRoute path="/admin" exact component={AdminHome} />
        <PrivateRoute path="/editcar/:carid" exact component={EditCar} />

      </BrowserRouter>
    </div>
  );
}

export default App;


export function PrivateRoute(props) {
  const user = localStorage.getItem('user');
  if (user) {
    return <Route{...props} />
  }
  else {
    return <Redirect to='/login' />
  }

}