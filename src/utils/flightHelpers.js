import uniqueId from 'lodash-es/uniqueId';

import { CHEAP_FLIGHTS, BUSINESS_FLIGHTS } from './constants';

export default class FlightsHelpers {
  static formatTime(time) {
    try {
      return  new Date(time).toLocaleTimeString(undefined, {
        timeStyle: 'medium',
        hour12: true,
      }).toUpperCase();
    } catch (error) {
      throw Error('Timer conversion error');
    }
  }

  static formatFlightDetails(type, data) {
    console.log(data);
    if (type === CHEAP_FLIGHTS) {
      const routeInfo = data.route.split('-');

      return {
        id: uniqueId(),
        departure: routeInfo[0],
        arrival: routeInfo[1],
        departureTime: this.formatTime(data.departure),
        arrivalTime: this.formatTime(data.arrival),
        type,
      };
    } else if (type === BUSINESS_FLIGHTS) {
      const { departureTime, arrivalTime, ...otherData } = data;
      return {
        departureTime: this.formatTime(departureTime),
        arrivalTime: this.formatTime(arrivalTime),
        type,
        id: uniqueId(),
        ...otherData,
      };
    }
  }
}