import * as types from './actionTypes';

export function getCheapFlights() {
  return { type: types.FLIGHTS_REQUEST };
}

export function addFlightDetails(data) {
  return { type: types.ADD_FLIGHT_DETAILS, data };
}

export function editFlightDetails(data) {
  return { type: types.EDIT_FLIGHT_DETAILS, data };
}

export function deleteFlightDetails(data) {
  return { type: types.DELETE_FLIGHT_DETAILS, data };
}