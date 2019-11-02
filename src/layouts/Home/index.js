import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as flightActions from '../../store/actions';

import FlightsDetailsView from '../../components/FlightsDetailsView';
import Loader from '../../components/UI/Loader';

import styles from './home.module.scss';

class Home extends Component {

  componentDidMount() {
    this.props.actions.getCheapFlights();
  }

  render() {
    const { flightsData, isLoading } = this.props;

    return (
      <React.Fragment>
        {isLoading &&
          <div className={styles.loadingContainer}>
            <label>Loading Flight Data...</label>
            <Loader isVisible color="#2ecc71" />
          </div>
        }
        {!isLoading &&
          <FlightsDetailsView data={flightsData} />
        }
      </React.Fragment>
    )
  }
}

Home.propTypes = {
  actions: PropTypes.object.isRequired,
  error: PropTypes.object,
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