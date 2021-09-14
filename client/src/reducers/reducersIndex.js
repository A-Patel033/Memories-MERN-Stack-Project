import { combineReducers } from "redux";
import posts from './reducersPosts'
import auth from './reducersAuth';

export default combineReducers({posts, auth});