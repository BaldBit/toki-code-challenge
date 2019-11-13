import axios from "axios";
import FlightHelpers from "../utils/flightHelpers";
import { CHEAP_FLIGHTS, BUSINESS_FLIGHTS } from "../utils/constants";

export default class Api {
  static async fetchCheapFlights() {
    try {
      const { data } = await axios.get(
        "https://tokigames-challenge.herokuapp.com/api/flights/cheap"
      );

      return data;
    } catch (error) {
      throw new Error(`Cheap flights fetch error [${error.message}]`);
    }
  }

  static async fetchBusinessFlights() {
    try {
      const { data } = await axios.get(
        "https://tokigames-challenge.herokuapp.com/api/flights/business"
      );

      return data;
    } catch (error) {
      throw new Error(`Businees flights fetch error [${error.message}]`);
    }
  }

  static async getAllFlights() {
    try {
      const [cheap, business] = await axios.all([
        Api.fetchCheapFlights(),
        Api.fetchBusinessFlights()
      ]);

      const cheapFlights = cheap.data.map(data =>
        FlightHelpers.formatFlightDetails(CHEAP_FLIGHTS, data)
      );

      const businessFlights = business.data.map(data =>
        FlightHelpers.formatFlightDetails(BUSINESS_FLIGHTS, data)
      );

      return cheapFlights.concat(businessFlights);
    } catch (error) {
      throw new Error(error);
    }
  }
}
