import uniqueId from 'lodash-es/uniqueId';

import { CHEAP_FLIGHTS, BUSINESS_FLIGHTS } from './constants';

export default class FlightsHelpers {
  static formatTime(time, hour12 = true) {
    try {
      return  new Date(time).toLocaleTimeString(undefined, {
        timeStyle: 'medium',
        hour12: hour12,
      }).toUpperCase();
    } catch (error) {
      throw Error('Timer conversion error');
    }
  }

  static getTimeFromPartial(timeString, hours12 = true) {
    return FlightsHelpers.formatTime(FlightsHelpers.getDateFromTime(timeString), hours12);
  }

  static getDateFromTime(timeString) {
    const today = new Date();
    return new Date(`${today.toISOString().split('T')[0]} ${timeString}`)
  }

  static formatFlightDetails(type, data) {
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