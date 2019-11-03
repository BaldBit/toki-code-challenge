import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uniqueId from 'lodash-es/uniqueId';

import { addFlightDetails } from '../../store/actions';
import FlightsHelpers from '../../utils/flightHelpers';

import EditFlightDetailsForm from '../../components/EditFlightDetailsForm';

class AddFlightDetails extends Component {
  onFormSubmit = (values) => {
    const { onAddComplete } = this.props;

    this.props.dispatchAddFlightDetails({
      id: uniqueId(''),
      type: values.type,
      arrival: values.arrival,
      departure: values.departure,
      arrivalTime: FlightsHelpers.getTimeFromPartial(values.arrivalTime),
      departureTime: FlightsHelpers.getTimeFromPartial(values.departureTime),
    });

    /*
      Here I'm executing call back assuming there will be no errors when submitting results
      since we are not invoking any api calls. If there's an api call we can use a 
      action to wait until the data get submit and if there's an error we can stop executing the callback.
      Or we can pass the error as a argument for the callback.
    */
    if (onAddComplete) {
      onAddComplete();
    }
  }

  render() {
    const { onAddCancel } = this.props;

    return (
      <React.Fragment>
        <h2>Add New Flight</h2>
        <EditFlightDetailsForm
          onSubmit={this.onFormSubmit}
          onCancel={onAddCancel}
          initialValues={{ type: '', arrival: '', departure: '', departureTime: '', arrivalTime: '' }}
        />
      </React.Fragment>
    )
  }
}

AddFlightDetails.propTypes = {
  onAddComplete: PropTypes.func,
  onAddCancel: PropTypes.func,
};

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch => ({
  dispatchAddFlightDetails: bindActionCreators(addFlightDetails, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFlightDetails);