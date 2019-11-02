import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash-es/noop';
import values from 'lodash-es/values';
import get from 'lodash-es/get';

import { TABLE_FILTER_TYPES, SORT_DIRECTIONS } from '../../../../utils/constants';

import TableCell from '../TableCell';
import InputText from '../../InputText';
import SortButton from '../../SortButton';
import Dropdown from '../../Dropdown';

import styles from './table-header.module.scss';

const TableHeader = props => {
  const { children, width, filter, sort, onFilterChange, onSortToggle, ...otherProps } = props;

  return (
    <TableCell width={width} {...otherProps}>
      <div className={styles.tableHeaderName}>
        {children}
        {get(sort, 'isEnabled', false) &&
          <SortButton sortDirection={get(sort, 'defaultValue', SORT_DIRECTIONS.default)} onChange={onSortToggle} />
        }
      </div>
      {get(filter, 'isEnabled', false) &&
        <React.Fragment>
          {get(filter, 'type') === TABLE_FILTER_TYPES.text &&
            <div className={styles.tableHeaderFilter}>
              <InputText placeholder={`Filter by ${children}`} value={get(filter, 'defaultValue', '')} onChange={onFilterChange} />
            </div>
          }
          {get(filter, 'type') === TABLE_FILTER_TYPES.list &&
            get(filter, 'list', []).length > 0 &&
            <Dropdown className={styles.tableHeaderFilter} list={filter.list} value={get(filter, 'defaultValue', '')} placeholder={`Filter by ${children}`} onChange={onFilterChange} />
          }
        </React.Fragment>
      }
    </TableCell>
  );
};

TableHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  sort: PropTypes.shape({
    isEnabled: PropTypes.bool,
    defaultValue: PropTypes.oneOf(values(SORT_DIRECTIONS)),
  }),
  filter: PropTypes.shape({
    isEnabled: PropTypes.bool,
    type: PropTypes.oneOf(values(TABLE_FILTER_TYPES)),
    list: PropTypes.array,
    defaultValue: PropTypes.string,
  }),
  width: PropTypes.string,
  onFilterChange: PropTypes.func,
  onSortToggle: PropTypes.func,
};

TableHeader.defaultProps = {
  width: 'auto',
  onFilterChange: noop,
  onSortToggle: noop,
};

export default TableHeader;