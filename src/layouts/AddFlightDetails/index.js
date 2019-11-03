import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uniqueId from 'lodash-es/uniqueId';

import { addFlightDetails, editFlightDetails } from '../../store/actions';
import FlightsHelpers from '../../utils/flightHelpers';

import EditFlightDetailsForm from '../../components/EditFlightDetailsForm';

class AddFlightDetails extends Component {
  onFormSubmit = (values) => {
    const { onSaveComplete, isEditMode, defaultValues } = this.props;

    if (isEditMode) {
      this.props.dispatchEditFlightDetails({
        id: defaultValues.id,
        type: values.type,
        arrival: values.arrival,
        departure: values.departure,
        arrivalTime: FlightsHelpers.getTimeFromPartial(values.arrivalTime),
        departureTime: FlightsHelpers.getTimeFromPartial(values.departureTime),
      });
    } else {
      this.props.dispatchAddFlightDetails({
        id: uniqueId(),
        type: values.type,
        arrival: values.arrival,
        departure: values.departure,
        arrivalTime: FlightsHelpers.getTimeFromPartial(values.arrivalTime),
        departureTime: FlightsHelpers.getTimeFromPartial(values.departureTime),
      });
    }

    /*
      Here I'm executing call back assuming there will be no errors when submitting results
      since we are not invoking any api calls. If there's an api call we can use a 
      action to wait until the data get submit and if there's an error we can stop executing the callback.
      Or we can pass the error as a argument for the callback.
    */
    if (onSaveComplete) {
      onSaveComplete();
    }
  }

  render() {
    const { isEditMode, defaultValues, onCancel } = this.props;

    return (
      <React.Fragment>
        <h2>
          {isEditMode ? 'Edit Flight' : 'Add New Flight'}
        </h2>
        <EditFlightDetailsForm
          onSubmit={this.onFormSubmit}
          onCancel={onCancel}
          initialValues={defaultValues}
        />
      </React.Fragment>
    )
  }
}

AddFlightDetails.propTypes = {
  isEditMode: PropTypes.bool,
  onSaveComplete: PropTypes.func,
  onCancel: PropTypes.func,
  defaultValues: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    arrival: PropTypes.string,
    departure: PropTypes.string,
    departureTime: PropTypes.string,
    arrivalTime: PropTypes.string,
  }),
};

AddFlightDetails.defaultProps = {
  defaultValues: { type: '', arrival: '', departure: '', departureTime: '', arrivalTime: '' },
};

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch => ({
  dispatchAddFlightDetails: bindActionCreators(addFlightDetails, dispatch),
  dispatchEditFlightDetails: bindActionCreators(editFlightDetails, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFlightDetails);