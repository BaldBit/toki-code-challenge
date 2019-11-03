import axios from 'axios';
import FlightHelpers from '../utils/flightHelpers';
import { CHEAP_FLIGHTS, BUSINESS_FLIGHTS } from '../utils/constants';

export default class Api {
  static async fetchCheapFlights() {
    return await axios.get('https://tokigames-challenge.herokuapp.com/api/flights/cheap').then(response => {
      if (response.status === 200) {
        return response.data;
      }

    }).catch(error => {
      throw new Error('Cheap flights fetch error');
    });
  }

  static async fetchBusinessFlights() {
    return await axios.get('https://tokigames-challenge.herokuapp.com/api/flights/business').then(response => {
      if (response.status === 200) {
        return response.data;
      }

    }).catch(error => {
      throw new Error('Businees flights fetch error');
    });
  }

  static async getAllFlights() {
    return await axios.all([Api.fetchCheapFlights(), Api.fetchBusinessFlights()])
    .then(axios.spread(function (cheap, business) {
      // format data according to our own
      const cheapFlights = cheap.data.map(data => FlightHelpers.formatFlightDetails(CHEAP_FLIGHTS, data));
      const businessFlights = business.data.map(data => FlightHelpers.formatFlightDetails(BUSINESS_FLIGHTS, data));
      return cheapFlights.concat(businessFlights);
    })).catch(error => {
      throw new Error(error);
    });
  }
}