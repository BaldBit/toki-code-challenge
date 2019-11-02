import React from 'react';
import styles from './header.module.scss';

const Header = props => {
  return (
    <div className={styles.header}>
      <a href="/" className={styles.logoLink}>
        <img src="/logo.png" alt="FlightsApp Logo" />
      </a>
    </div>
  );
};

Header.propTypes = {
  
};

export default Header;