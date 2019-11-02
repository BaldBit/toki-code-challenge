import React, { Component } from 'react';
import PropTypes from 'prop-types';
import values from 'lodash-es/values';

import filter from 'lodash-es/filter';
import orderBy from 'lodash-es/orderBy';
import remove from 'lodash-es/remove';
import find from 'lodash-es/find';
import map from 'lodash-es/map';
import get from 'lodash-es/get';

import { SORT_DIRECTIONS, TABLE_FILTER_TYPES } from '../../../utils/constants';

import TableHeader from './TableHeader';

import styles from './table.module.scss';

class Table extends Component {
  constructor(props) {
    super(props);

    const defaultValues = this.setFilterAndSortValues(props.columns);

    this.state = {
      data: props.source || [],
      sortedColumns: defaultValues.sortedColumns,
      filters: defaultValues.filters,
    }
  }

  handleOnFilterChange = (e, filteredColumn) => {
    const { filters, sortedColumns } = this.state;
    const { onFilterChange } = this.props;
  
    if (e.target.value === '') {
      remove(filters, (item) => item.column === filteredColumn);
    } else {
      const currentFilter = find(filters, (item) => item.column === filteredColumn);

      if (!currentFilter) {
        filters.push({
          column: filteredColumn,
          value: e.target.value,
        });
      } else {
        currentFilter.value = e.target.value;
      }
    }

    this.setState({
      filters,
    }, () => {
      if (onFilterChange) {
        onFilterChange({
          filters,
          sorts: sortedColumns,
        });
      }
    });
  }

  filterRecordsBy = (records) => {
    const { filters } = this.state;

    for(let currentFilter = 0; currentFilter < filters.length; currentFilter += 1) {
      const matchPattern = RegExp(filters[currentFilter].value, 'i');
      
      records = filter(records, (record) => record[filters[currentFilter].column].match(matchPattern));
    }

    return records;
  }

  handleOnSortToggle = (sortingColumn, direction) => {
    const { sortedColumns, filters } = this.state;
    const { onSortChange } = this.props;

    if (direction === 'default') {
      remove(sortedColumns, (item) => item.column === sortingColumn);
    } else {
      const currentSorting = find(sortedColumns, (item) => item.column === sortingColumn);

      if (!currentSorting) {
        sortedColumns.push({
          column: sortingColumn,
          value: direction,
        });
      } else {
        currentSorting.value = direction;
      }
    }

    this.setState({
      sortedColumns,
    }, () => {
      if (onSortChange) {
        onSortChange({
          sorts: sortedColumns,
          filters,
        });
      }
    });
  };

  sortRecordsBy = (records) => {
    const { sortedColumns } = this.state;

    if (sortedColumns.length === 0) {
      return records;
    }

    return orderBy(records, map(sortedColumns, 'column'), map(sortedColumns, 'value'));
  };

  generateTableHeaders = () => {
    const { columns, filters, sorts } = this.props;
    
    let columnElements, sort, filter;

    columnElements = columns.map(column => {
      sort = get(column, 'sort', {});
      filter = get(column, 'filter', {});

      const hasFilter = find(filters, (item) => item.column === column.mapping);
      const hasSort = find(sorts, (item) => item.column === column.mapping)

      if (hasFilter) {
        filter.defaultValue = hasFilter.value;
      }

      if (hasSort) {
        sort.defaultValue = hasSort.value;
      }
      
      return React.createElement(
        TableHeader,
        {
          key: column.name,
          filter: filter,
          sort: sort,
          ...(column.width && { width: column.width }),
          ...(sort.isEnabled && { onSortToggle: (e, direction) => this.handleOnSortToggle(column.mapping, direction) }),
          ...(filter.isEnabled && { onFilterChange: (e) => this.handleOnFilterChange(e, column.mapping) }),
        },
        column.name,
      );
    });

    return columnElements;
  };

  setFilterAndSortValues = (columns) => {
    const { filters: filtersFromProps, sorts } = this.props;
    const sortedColumns = [];
    const filters = [];
    let sort, filter;

    if (!filtersFromProps && !sorts) {
      columns.forEach(column => {
        sort = get(column, 'sort', {});
        filter = get(column, 'filter', {});

        if (!sorts) {
          if (sort.defaultValue) {
            sortedColumns.push({ column: column.mapping, value: sort.defaultValue });
          }
        }

        if (!filtersFromProps) {
          if (filter.defaultValue) {
            filters.push({ column: column.mapping, value: filter.defaultValue });
          }
        }
      });
    }

    return {
      sortedColumns: sorts || sortedColumns,
      filters: filtersFromProps || filters,
    };
  }

  render() {
    const { source, rowGenerator } = this.props;

    let filteredData = this.sortRecordsBy(this.filterRecordsBy(source));

    return (
      <table className={styles.table}>
        <thead>
          <tr>
            {this.generateTableHeaders()}
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 && rowGenerator(filteredData)}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      mapping: PropTypes.string,
      width: PropTypes.string,
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
    })
  ),
  rowGenerator: PropTypes.func,
  onFilterChange: PropTypes.func,
  onSortChange: PropTypes.func,
};

Table.defaultProps = {
  source: [],
  columns: [],
  rowGenerator: [],
};

export default Table;