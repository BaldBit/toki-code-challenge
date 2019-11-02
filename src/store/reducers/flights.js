import * as types from '../actions/actionTypes';

const defaultState = {
  isLoading: false,
};

export default function(state = defaultState, action = null) {
  switch (action.type) {
    case types.FLIGHTS_REQUEST:
      return { ...state, isLoading: true };
    case types.FLIGHT_REQUEST_SUCCESS:
      return {
        ...state,
        flightsData: action.flightsData,
        isLoading: false,
      };
    case types.FLIGHT_REQUEST_FAIL:
      return { ...state, isLoading: false, error: action.error };
    case types.ADD_FLIGHT_DETAILS:
      console.log(action);
      return { ...state, flightsData: [...state.flightsData, action.data] }
    default:
      return state;
  }
}