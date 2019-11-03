import React, { memo } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash-es/isEmpty';
import { Field, reduxForm, SubmissionError } from 'redux-form';


import ReduxFormField from '../ReduxFormField';
import Button from '../UI/Button';

import styles from './edit-flight-details.module.scss';

function submit(values, onSubmit) {
  if (isEmpty(values)) {
    throw new SubmissionError({
      departure: 'Departure can\'t be empty',
      arrival: 'Arrival can\'t be empty',
      arrivalTime: 'Arrival time can\'t be empty',
      departureTime: 'Departure time can\'t be empty',
      _error: 'Login failed!'
    });
  }

  if (isEmpty(values.type)) {
    throw new SubmissionError({
      type: 'Flight type can\'t be empty',
      _error: 'Login failed!'
    });
  }
  
  if (isEmpty(values.departure)) {
    throw new SubmissionError({
      departure: 'Departure can\'t be empty',
      _error: 'Login failed!'
    });
  }
  
  if (isEmpty(values.arrival)) {
    throw new SubmissionError({
      arrival: 'Arrival can\'t be empty',
      _error: 'Login failed!'
    });
  }

  if (isEmpty(values.departureTime)) {
    throw new SubmissionError({
      departureTime: 'Departure time can\'t be empty',
      _error: 'Login failed!'
    });
  }
  
  if (isEmpty(values.arrivalTime)) {
    throw new SubmissionError({
      arrivalTime: 'Arrival time can\'t be empty',
      _error: 'Login failed!'
    });
  }

  onSubmit(values);
}

let EditFlightDetailsForm = memo((props) => {
  const { handleSubmit, error, onSubmit, onCancel, pristine, reset, submitting } = props;
  
  return (
    <form onSubmit={handleSubmit((values) => submit(values, onSubmit))}>
      <Field label="Type" placeholder="Select Flight Type" name="type" component={ReduxFormField} type="select" list={['cheap', 'business']} labelWidth={130} />
      <Field label="Departure" name="departure" component={ReduxFormField} type="text" labelWidth={130} />
      <Field label="Arrival" name="arrival" component={ReduxFormField} type="text" labelWidth={130} />
      <Field label="Departure Time" name="departureTime" component={ReduxFormField} type="time" labelWidth={130} />
      <Field label="Arrival Time" name="arrivalTime" component={ReduxFormField} type="time" labelWidth={130} />
      <div className={styles.formFooter}>
        <Button
          isSecondary
          onClick={() => {
            reset();

            if (onCancel) {
              onCancel();
            }
          }}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={pristine || submitting}>Save</Button>
      </div>
    </form>
  );
});

EditFlightDetailsForm.propTypes = {
  
};

EditFlightDetailsForm = reduxForm({
  // a unique name for the form
  form: 'editFlightDetails',
})(EditFlightDetailsForm)

export default EditFlightDetailsForm;