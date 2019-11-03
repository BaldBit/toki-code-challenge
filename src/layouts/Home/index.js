import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Modal from '@material-ui/core/Modal';

import * as flightActions from '../../store/actions';
import FlightHelpers from '../../utils/flightHelpers';

import FlightsDetailsView from '../../components/FlightsDetailsView';
import Loader from '../../components/UI/Loader';
import Button from '../../components/UI/Button';

import AddFlightDetails from '../AddFlightDetails';
import styles from './home.module.scss';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      showModal: false,
      editingFlight: null,
      isEditMode: false,
    };
  }

  componentDidMount() {
    this.props.actions.getCheapFlights();
  }

  handleRetryOnClick = () => {
    this.props.actions.getCheapFlights();
  }

  handleOnDeleteClick = (flight) => {
    this.props.actions.deleteFlightDetails(flight);
  }

  handleOnEditClick = (flight) => {
    this.setState({
      showModal: true,
      editingFlight: {
        ...flight,
        arrivalTime: FlightHelpers.getTimeFromPartial(flight.arrivalTime, false),
        departureTime: FlightHelpers.getTimeFromPartial(flight.departureTime, false),
      },
      isEditMode: true,
    });
  }

  handleOnAddClick = () => {
    this.setState({
      showModal: true,
    });
  }

  handleOnModalClose = () => {
    this.setState({
      showModal: false,
      editingFlight: null,
      isEditMode: false,
    });
  }

  render() {
    const { flightsData, isLoading, error } = this.props;
    const { showModal, isEditMode, editingFlight } = this.state;

    return (
      <React.Fragment>
        {isLoading &&
          <div className={styles.loadingContainer}>
            <label>Loading Flight Data...</label>
            <Loader isVisible color="#2ecc71" />
          </div>
        }
        {error && !isLoading &&
          <div className={styles.loadingContainer}>
            <label>Data loading Error. It's not you it's us</label>
            <Button onClick={this.handleRetryOnClick}>Please Retry</Button>
          </div>
        }
        {!isLoading && !error &&
          <React.Fragment>
            <div className={styles.actionBar}>
              <Button onClick={this.handleOnAddClick}>Add New Flight</Button>
            </div>
            <FlightsDetailsView data={flightsData} onDeleteClick={this.handleOnDeleteClick} onEditClick={this.handleOnEditClick} />
          </React.Fragment>
        }
        <Modal
          aria-labelledby="flights-edit-form-modal"
          aria-describedby="flights-edit-form-modal"
          open={showModal}
          onClose={this.handleOnModalClose}
        >
          <div className={styles.modal}>
            <AddFlightDetails
              onSaveComplete={this.handleOnModalClose}
              onCancel={this.handleOnModalClose}
              isEditMode={isEditMode}
              defaultValues={editingFlight}
            />
          </div>
        </Modal>
      </React.Fragment>
    )
  }
}

Home.propTypes = {
  actions: PropTypes.object.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  flightsData: PropTypes.array,
};

Home.defaultPropTypes = {
  flightsData: [],
};

const mapStateToProps = state => ({
  error: state.flights.error,
  isLoading: state.flights.isLoading,
  flightsData: state.flights.flightsData,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(flightActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);