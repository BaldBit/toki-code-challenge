import React, { memo } from 'react';
import PropTypes from 'prop-types';

import FlightDetailsTable from './FlightDetailsTable';

const FlightsDetailsView = memo((props) => {
  const { onEditClick, onDeleteClick } = props;

  return (
    <div>
      <FlightDetailsTable flightDetails={props.data} onDeleteClick={onDeleteClick} onEditClick={onEditClick} />
    </div>
  );
});

FlightsDetailsView.propTypes = {
  data: PropTypes.array,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};

export default FlightsDetailsView;