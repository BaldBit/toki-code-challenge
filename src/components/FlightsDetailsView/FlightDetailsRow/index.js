import React from 'react';
import PropTypes from 'prop-types';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

import TableCell from '../../UI/Table/TableCell';
import Button from '../../UI/Button';

import styles from './flight-details-row.module.scss';

const FlightDetailsRow = props => {
  const { type, departure, arrival, departureTime, arrivalTime, id, onEditClick, onDeleteClick, ...otherProps } = props;

  return (
    <tr {...otherProps}>
      <TableCell>{type}</TableCell>
      <TableCell>{departure}</TableCell>
      <TableCell>{arrival}</TableCell>
      <TableCell horizontalAlign="right">{departureTime}</TableCell>
      <TableCell horizontalAlign="right">{arrivalTime}</TableCell>
      <TableCell horizontalAlign="right">
        <div className={styles.actionsBar}>
          <Button title="Delete item" className={styles.deleteButton} icon={<Delete />} isIconOnly onClick={() => onDeleteClick(id)} />
          <Button title="Edit item" className={styles.editButton} icon={<Edit />} isIconOnly onClick={() => onEditClick({ id, type, departure, arrival, departureTime, arrivalTime })} />
        </div>
      </TableCell>
    </tr>
  )
};

FlightDetailsRow.propTypes = {
  type: PropTypes.string,
  arrival: PropTypes.string,
  departure: PropTypes.string,
  arrivalTime: PropTypes.string,
  departureTime: PropTypes.string,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};

export default FlightDetailsRow;