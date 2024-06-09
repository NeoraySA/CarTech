import React, { useMemo, useState } from 'react';
import { useTable, useSortBy, useExpanded } from 'react-table';

export default function CustomerTable({ data }) {
  const columns = useMemo(() => [
    {
      Header: 'שם מלא',
      accessor: 'first_name',
      className: 'cell-full-name'
    },
    {
      Header: 'טלפון',
      accessor: 'cellphone',
      className: 'cell-phone'
    },
    {
      Header: 'דוא"ל',
      accessor: 'email',
      className: 'cell-email'
    },
    {
      Header: 'כתובת',
      accessor: 'street',
      className: 'cell-address'
    },
    {
      Header: 'עיר',
      accessor: 'city',
      className: 'cell-city'
    },
    {
      Header: 'מדינה',
      accessor: 'country',
      className: 'cell-country'
    },
  ], []);

  const renderRowSubComponent = (row) => (
    <>
      <div className="expanded-content">
        <div className="details-content">
          <p>שם מלא: <strong>{row.original.first_name}</strong></p>
          <p>טלפון: <strong>{row.original.phone}</strong></p>
          <p>דוא"ל: <strong>{row.original.email}</strong></p>
          <p>כתובת: <strong>{row.original.address}</strong></p>
          <p>עיר: <strong>{row.original.city}</strong></p>
          <p>מדינה: <strong>{row.original.country}</strong></p>
        </div>
      </div>
    </>
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    toggleRowExpanded,
  } = useTable(
    { columns, data },
    useSortBy,
    useExpanded,
  );

  return (
    <div className="table-container">
      <table {...getTableProps()} className="universal-table">
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
              <React.Fragment key={row.id}>
                <tr {...row.getRowProps({
                  onClick: () => toggleRowExpanded(row.id),
                  className: row.isExpanded ? 'expanded-row' : ''
                })}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
                {row.isExpanded && (
                  <tr>
                    <td colSpan={columns.length}>
                      {renderRowSubComponent(row)}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
