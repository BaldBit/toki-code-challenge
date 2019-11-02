import React from 'react';
import PropTypes from 'prop-types';

import Table from '../../UI/Table';
import FlightDetailsRow from '../FlightDetailsRow';

import getColumns from './columnDefinition';
import styles from './flight-details-table.module.scss';

const FlightDetailsTable = props => {
  const { flightDetails } = props;

  const renderFlightDetails = (flightDetails) => flightDetails.map(flight => (
    <FlightDetailsRow
      key={`flight-data-row-${flight.id}`}
      type={flight.type}
      departure={flight.departure}
      arrival={flight.arrival}
      departureTime={flight.departureTime}
      arrivalTime={flight.arrivalTime}
    />
  ));

  return (
    <React.Fragment>
      {flightDetails && flightDetails.length > 0 &&
        <div>
          <div className={styles.header}>
            <p className={styles.flightDetailsCount}>
              Total number of Flights: <span>{flightDetails.length}</span>
            </p>
          </div>
          <Table
            source={flightDetails}
            rowGenerator={(data) => renderFlightDetails(data)}
            columns={getColumns(flightDetails)}
          />
        </div>
      }
    </React.Fragment>
  );
};

FlightDetailsTable.propTypes = {
  flightDetails: PropTypes.array,
};

export default FlightDetailsTable;