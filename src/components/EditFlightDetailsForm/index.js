import React, { memo } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash-es/isEmpty';
import { Field, reduxForm, SubmissionError } from 'redux-form'

import InputText from '../UI/InputText';

function submit(values, onSubmit) {
  if (isEmpty(values)) {
    throw new SubmissionError({
      departure: 'Departure can\'t be empty',
      arrival: 'Arrival can\'t be empty',
      arrivalTime: 'Arrival time can\'t be empty',
      departureTime: 'Departure time can\'t be empty',
      _error: 'Login failed!'
    });
  } else if (values.departure === '') {
    throw new SubmissionError({
      departure: 'Departure can\'t be empty',
      _error: 'Login failed!'
    });
  } else if (values.arrival === '') {
    throw new SubmissionError({
      arrival: 'Arrival can\'t be empty',
      _error: 'Login failed!'
    });
  } else if (values.arrivalTime === '') {
    throw new SubmissionError({
      arrivalTime: 'Arrival time can\'t be empty',
      _error: 'Login failed!'
    });
  } else if (values.departureTime === '') {
    throw new SubmissionError({
      departureTime: 'Departure time can\'t be empty',
      _error: 'Login failed!'
    });
  }

  onSubmit(values);
}

let EditFlightDetailsForm = memo((props) => {
  const { handleSubmit, error, onSubmit } = props;

  return (
    <form onSubmit={handleSubmit((values) => submit(values, onSubmit))}>
      <div>
        <label htmlFor="type">Flight Class</label>
        <Field name="type" component="select" value="Cheap">
          <option value="cheap">Cheap</option>
          <option value="business">Business</option>
        </Field>
      </div>
      <div>
        <label htmlFor="departure">Departure</label>
        <Field name="departure" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="arrival">Arrival</label>
        <Field name="arrival" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="departureTime">Departure Time</label>
        <Field name="departureTime" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="arrivalTime">Arrival Time</label>
        <Field name="arrivalTime" component="input" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
});

EditFlightDetailsForm.propTypes = {
  
};

EditFlightDetailsForm = reduxForm({
  // a unique name for the form
  form: 'contact',
})(EditFlightDetailsForm)

export default EditFlightDetailsForm;