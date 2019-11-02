import React, { memo } from 'react';
import PropTypes from 'prop-types';

import styles from './loader.module.scss';

const Loader = memo((props) => {
  return (
    <div className={styles.loader}>
      <div style={{ borderColor: props.color }}></div>
      <div style={{ borderColor: props.color }}></div>
    </div>
  );
});

Loader.propTypes = {
  isVisible: PropTypes.bool,
  color: PropTypes.string,
};

Loader.defaultProps = {
  isVisible: false,
  color: '#ffffff',
};

export default Loader;