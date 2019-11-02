import * as types from './actionTypes';

export function getCheapFlights() {
  return { type: types.FLIGHTS_REQUEST };
}

export function addFlightDetails(data) {
  return { type: types.ADD_FLIGHT_DETAILS, data };
}