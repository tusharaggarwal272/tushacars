import { combineReducers } from "redux";
import carsReducer from './reducers/carsReducer'
import alertsReducer from './reducers/alertsReducer'
import bookingsReducer from "./reducers/bookingsReducer";
const rootReducers=combineReducers({
    carsReducer,
    alertsReducer,
    bookingsReducer
})
export default rootReducers;