
import { race, all, call, put, takeLatest, takeEvery, delay  } from 'redux-saga/effects';
import * as types from './actions/actionTypes';

import Api from './api';
import { FLIGHT_FETCH_TIMEOUT } from '../utils/constants';


function* requestFlights() {
  try {
    const { flightsData, timeout } = yield race({
      flightsData: call(Api.getAllFlights),
      timeout: delay(FLIGHT_FETCH_TIMEOUT),
    });

    if (flightsData) {
      yield put({ type: types.FLIGHT_REQUEST_SUCCESS, flightsData });
    } 
    
    if (timeout) {
      yield put({ type: types.FLIGHT_REQUEST_FAIL, error: 'Request Timeout' });
    }
  } catch (error) {
    yield put({ type: types.FLIGHT_REQUEST_FAIL, error });
  }
}

function* addNewFlight(action) {
  try {
    yield put({ type: types.ADD_FLIGHT_DETAILS_SUCCESS, data: action.data });
  } catch (error) {

  }
}

function* editNewFlight(action) {
  try {
    yield put({ type: types.EDIT_FLIGHT_DETAILS_SUCCESS, data: action.data });
  } catch (error) {

  }
}

function* deleteNewFlight(action) {
  try {
    yield put({ type: types.DELETE_FLIGHT_DETAILS_SUCCESS, data: action.data });
  } catch (error) {

  }
} 

export default function* rootSaga() {
  yield all([
    takeLatest(types.FLIGHTS_REQUEST, requestFlights),
    takeLatest(types.ADD_FLIGHT_DETAILS, addNewFlight),
    takeEvery(types.EDIT_FLIGHT_DETAILS, editNewFlight),
    takeEvery(types.DELETE_FLIGHT_DETAILS, deleteNewFlight),
  ])
}