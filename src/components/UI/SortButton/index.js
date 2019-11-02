import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash-es/noop';
import values from 'lodash-es/values';

import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { SORT_DIRECTIONS } from '../../../utils/constants';

import Button from '../Button';

class SortButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortedDirection: props.sortDirection,
    };
  }

  handleOnClick = (e) => {
    const { onChange } = this.props;
    let sortedDirection = this.state.sortedDirection;
  
    if (sortedDirection === SORT_DIRECTIONS.default) {
      sortedDirection = SORT_DIRECTIONS.asc;
    } else if (sortedDirection === SORT_DIRECTIONS.asc) {
      sortedDirection = SORT_DIRECTIONS.desc;
    } else {
      sortedDirection = SORT_DIRECTIONS.default;
    }

    this.setState({ sortedDirection: sortedDirection }, () => {
      if (onChange) {
        onChange(e, sortedDirection);
      }
    });
  }

  getSortedIcon = (direction) => {
    switch (direction) {
      case SORT_DIRECTIONS.asc:
        return <KeyboardArrowUpIcon />;
      case SORT_DIRECTIONS.desc:
        return <KeyboardArrowDownIcon />;
      default:
        return <UnfoldMoreIcon />;
    }
  }

  render() {
    const { sortedDirection } = this.state;

    return (
      <Button icon={this.getSortedIcon(sortedDirection)} isIconOnly onClick={this.handleOnClick} />
    );
  }
}

SortButton.propTypes = {
  sortDirection: PropTypes.oneOf(values(SORT_DIRECTIONS)),
  onChange: PropTypes.func,
};

SortButton.defaultProps = {
  sortDirection: SORT_DIRECTIONS.default,
  onChange: noop,
};

export default SortButton;