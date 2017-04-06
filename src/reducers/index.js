import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import authReducer from './auth_reducers';
import notificationReducer from './notification_reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationReducer,
  routing: routerReducer,
});

export default rootReducer;
