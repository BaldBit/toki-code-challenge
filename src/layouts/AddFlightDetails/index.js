import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addFlightDetails } from '../../store/actions';

import EditFlightDetailsForm from '../../components/EditFlightDetailsForm';

class AddFlightDetails extends Component {
  onFormSubmit = (values) => {
    console.log(this.props.dispatchAddFlightDetails);
    this.props.dispatchAddFlightDetails(values);
  }

  render() {
    return (
      <EditFlightDetailsForm onSubmit={this.onFormSubmit} />
    )
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  dispatchAddFlightDetails: bindActionCreators(addFlightDetails, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFlightDetails);