
import { race, all, call, put, takeLatest, delay  } from 'redux-saga/effects';
import * as types from './actions/actionTypes';

import Api from './api';
import { FLIGHT_FETCH_TIMEOUT } from '../utils/constants';


function* requestFlights(action) {
  try {
    const { flightsData, timeout } = yield race({
      flightsData: call(Api.getAllFlights),
      timeout: delay(FLIGHT_FETCH_TIMEOUT),
    });

    if (flightsData) {
      yield put({ type: types.FLIGHT_REQUEST_SUCCESS, flightsData });
    } else {
      yield put({ type: types.FLIGHT_REQUEST_FAIL, error: 'Request Timeout' });
    }
  } catch (error) {
    yield put({ type: types.FLIGHT_REQUEST_FAIL, error });
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(types.FLIGHTS_REQUEST, requestFlights),
  ])
}