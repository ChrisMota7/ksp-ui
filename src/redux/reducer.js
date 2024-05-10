import { combineReducers } from '@reduxjs/toolkit';

import ticketReducer from './reducers/ticketReducer';
import categoryReducer from './reducers/categoryReducer';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import visualsReducer from './reducers/visualsReducer';

export default combineReducers({
  ticketReducer,
  categoryReducer,
  authReducer,
  userReducer,
  visualsReducer,
});