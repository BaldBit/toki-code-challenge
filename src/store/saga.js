
import { all, put, takeLatest } from 'redux-saga/effects';
import * as types from './actions/actionTypes';

import Api from './api';


function* requestFlights(action) {
  try {
    const flightsData = yield Api.getAllFlights();
    yield put({ type: types.FLIGHT_REQUEST_SUCCESS, flightsData });

  } catch (error) {
    yield put({ type: types.FLIGHT_REQUEST_FAIL, error });
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(types.FLIGHTS_REQUEST, requestFlights),
  ])
}