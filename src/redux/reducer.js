import { combineReducers } from '@reduxjs/toolkit';

import ticketReducer from './reducers/ticketReducer';
import categoryReducer from './reducers/categoryReducer';

export default combineReducers({
  ticketReducer,
  categoryReducer
});