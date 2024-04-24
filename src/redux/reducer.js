import { combineReducers } from '@reduxjs/toolkit';

import ticketReducer from './reducers/ticketReducer';
import categoryReducer from './reducers/categoryReducer';
import authReducer from './reducers/authReducer';

export default combineReducers({
  ticketReducer,
  categoryReducer,
  authReducer,
});