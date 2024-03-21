import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, useSortBy, useRowSelect } from 'react-table';
import './CarsList.css';

function CarList() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await axios.get('http://localhost:3001/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    }

    fetchCars();
  }, []);

  const columns = useMemo(() => [
    {
      Header: 'מס\' רישוי',
      accessor: 'license_number',
    },
    {
      Header: 'יצרן',
      accessor: 'make',
    },
    {
      Header: 'דגם',
      accessor: 'model',
    },
    {
      Header: 'צבע',
      accessor: 'color',
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable({ columns, data: cars }, useSortBy, useRowSelect, 
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // This column is added for selection checkboxes
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <input type="checkbox" {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  return (
    <div className="car-list-container">
      <div className="div-table">
        <table {...getTableProps()} className="car-list">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre>
    </div>
  );
}

export default CarList;
