import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import flights from './flights';

export default combineReducers({
  flights,
  form: formReducer,
});