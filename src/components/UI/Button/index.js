import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './button.module.scss';

const Button = props => {
  const { children, icon, isIconOnly, onClick, ...otherProps } = props;

  return (
    <button {...otherProps} className={cn(styles.button, { [ styles.iconOnly]: isIconOnly })} onClick={onClick}>
      {!isIconOnly && children}
      {icon && icon}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  icon: PropTypes.node,
  isIconOnly: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  isIconOnly: false,
};

export default Button;