import { combineReducers } from 'redux';
import userReducer from './UserReducer';


const rootReducer = combineReducers({
  // auth: authReducer,
  // profile: profileReducer,
  users: userReducer,
});

export default rootReducer;