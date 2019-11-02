import React, { memo } from 'react';
import PropTypes from 'prop-types';

import FlightDetailsTable from './FlightDetailsTable';

const FlightsDetailsView = memo((props) => {
  return (
    <div>
      <FlightDetailsTable flightDetails={props.data} />
    </div>
  );
});

FlightsDetailsView.propTypes = {
  data: PropTypes.array,
};

export default FlightsDetailsView;