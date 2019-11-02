import React from 'react';
import PropTypes from 'prop-types';

import TableCell from '../../UI/Table/TableCell';

const FlightDetailsRow = props => {
  const { type, departure, arrival, departureTime, arrivalTime, ...otherProps } = props;

  return (
    <tr {...otherProps}>
      <TableCell>{type}</TableCell>
      <TableCell>{departure}</TableCell>
      <TableCell>{arrival}</TableCell>
      <TableCell horizontalAlign="right">{departureTime}</TableCell>
      <TableCell horizontalAlign="right">{arrivalTime}</TableCell>
    </tr>
  )
};

FlightDetailsRow.defaultProps = {
  type: PropTypes.string,
  arrival: PropTypes.string,
  departure: PropTypes.string,
  arrivalTime: PropTypes.number,
  departureTime: PropTypes.string,
};

export default FlightDetailsRow;