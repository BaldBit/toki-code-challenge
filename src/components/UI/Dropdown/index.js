import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './dropdown.module.scss';

const Dropdown = props => {
  const { value, className, list, placeholder, onChange, ...otherProps } = props;
  const [dropDownValue, setdropDownValue] = useState(value);

  const handleOnChange = (e) => {
    e.persist();

    setdropDownValue(e.target.value);

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <select {...otherProps} value={dropDownValue} className={cn(styles.dropdown, className)} onChange={handleOnChange}>
      {placeholder && <option value="">{placeholder}</option>}
      {list.length > 0 &&
        list.map((item) =>
          <option key={`list-item${item}`} value={item}>{item}</option>
        )
      }
    </select>
  );
};

Dropdown.propTypes = {
  className: PropTypes.string,
  list: PropTypes.array,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

Dropdown.defaultProps = {
  value: '',
  placeholder: '',
};

export default Dropdown;