import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import values from 'lodash-es/values';

import { UI_STATUSES, VERTICAL_ALIGN, HORIZONTAL_ALIGN } from '../../../../utils/constants';

import styles from './table-cell.module.scss';

const TableCell = props => {
  const { formating, children, isBold, verticalAlign, horizontalAlign, ...otherProps } = props;

  return (
    <td
      {...otherProps}
      className={
        cn(
          styles.tableCell,
          styles[formating],
          styles[verticalAlign],
          styles[horizontalAlign],
          {
            [styles.isBold]: isBold,
          }
        )
      }
    >
      {children}
    </td>
  );
};

TableCell.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  formating: PropTypes.oneOf(values(UI_STATUSES)),
  isBold: PropTypes.bool,
  verticalAlign: PropTypes.oneOf(values(VERTICAL_ALIGN)),
  horizontalAlign: PropTypes.oneOf(values(HORIZONTAL_ALIGN)),
};

TableCell.defaultProps = {
  formating: UI_STATUSES.default,
  isBold: false,
  verticalAlign: VERTICAL_ALIGN.top,
  horizontalAlign: HORIZONTAL_ALIGN.left,
};

export default TableCell;