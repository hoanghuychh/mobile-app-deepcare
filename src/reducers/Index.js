import { combineReducers } from "redux";
import {loginReducer} from "./LoginReducer";


const allReducers = combineReducers({
    loginReducer,

});
export default allReducers;
