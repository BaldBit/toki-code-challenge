import uniqBy from "lodash-es/uniqBy";
import flatMap from "lodash-es/flatMap";

import {
  TABLE_FILTER_TYPES,
  CHEAP_FLIGHTS,
  BUSINESS_FLIGHTS
} from "../../../utils/constants";

const getColumns = data => [
  {
    name: "Class",
    mapping: "type",
    filter: {
      isEnabled: true,
      type: TABLE_FILTER_TYPES.list,
      list: [CHEAP_FLIGHTS, BUSINESS_FLIGHTS]
    }
  },
  {
    name: "Departure",
    mapping: "departure",
    sort: {
      isEnabled: true
    },
    filter: {
      isEnabled: true,
      type: TABLE_FILTER_TYPES.list,
      list: flatMap(uniqBy(data, "departure"), item => item.departure).sort()
    }
  },
  {
    name: "Arrival",
    mapping: "arrival",
    sort: {
      isEnabled: true
    },
    filter: {
      isEnabled: true,
      type: TABLE_FILTER_TYPES.list,
      list: flatMap(uniqBy(data, "arrival"), item => item.arrival).sort()
    }
  },
  {
    name: "Departure Time",
    mapping: "departureTime",
    sort: {
      isEnabled: true
    }
  },
  {
    name: "Arrival Time",
    mapping: "arrivalTime",
    sort: {
      isEnabled: true
    }
  },
  {
    name: "Actions",
    width: "80"
  }
];

export default getColumns;
