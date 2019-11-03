import React from 'react';
import TextField from '@material-ui/core/TextField';

import InputText from '../UI/InputText';
import Dropdown from '../UI/Dropdown';

import styles from './redux-form-field.module.scss';

export default ({ input, label, type, labelWidth = 'auto', list, placeholder = '', meta: { touched, error } }) => {
  if (type === 'select') {
    return (
      <div className={styles.fieldContainer}>
        <label className={styles.fieldLabel} style={{ width: labelWidth }}>{label}</label>
        <div className={styles.fieldInputContainer}>
          <Dropdown className={styles.inputControl} list={list} placeholder={placeholder} {...input} />
          {touched && error && <span className={styles.errorField}>{error}</span>}
        </div>
      </div>
    );
  }

  if (type === 'time') {
    return (
      <div className={styles.fieldContainer}>
        <label className={styles.fieldLabel} style={{ width: labelWidth }}>{label}</label>
        <div className={styles.fieldInputContainer}>
          <TextField type={type} className={styles.timeInput} {...input} />
          {touched && error && <span className={styles.errorField}>{error}</span>}
        </div>
      </div>
    )
  }
  
  return (
    <div className={styles.fieldContainer}>
      <label className={styles.fieldLabel} style={{ width: labelWidth }}>{label}</label>
      <div className={styles.fieldInputContainer}>
        <InputText className={styles.inputControl} {...input} type={type} placeholder={placeholder} />
        {touched && error && <span className={styles.errorField}>{error}</span>}
      </div>
    </div>
  )
};