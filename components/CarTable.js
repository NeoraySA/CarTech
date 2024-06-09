import React, { useMemo, useState } from 'react';
import { useTable, useSortBy, useExpanded } from 'react-table';
import { formatLicenseNumber } from '../src/utils';

export default function UniversalTable({ data, filter }) {
  const columns = useMemo(() => [
    {
      Header: 'מס\' רישוי',
      accessor: 'license_number',
      Cell: ({ value }) => <div className="cell-license-number">{formatLicenseNumber(value)}</div>,
    },
    {
      Header: 'יצרן ודגם',
      id: 'makeAndModel',
      Cell: ({ row }) => `${row.original.make} ${row.original.model}`,
    },
    {
      Header: 'צבע',
      accessor: 'color',
    },
    {
      Header: 'שנת ייצור',
      accessor: 'year',
    },
    {
      Header: 'סניף',
      accessor: 'branch_id',
    },
    {
      Header: 'סטטוס',
      accessor: 'status_id',
    },
  ], []);

  const renderRowSubComponent = (row) => (
    <>
      <div className="expanded-content">
        <div className="details-content">
          <p>מס' רישוי: <strong>{formatLicenseNumber(row.original.license_number)}</strong></p>
          <p>יצרן: <strong>{row.original.make}</strong></p>
          <p>דגם: <strong>{row.original.model}</strong></p>
          <p>צבע: <strong>{row.original.color}</strong></p>
          <p>שנת ייצור: <strong>{row.original.year}</strong></p>
          <p>תיבת הילוכים: <strong>{row.original.transmission_type}</strong></p>
          <p>ק"מ לטיפול הבא: <strong>{row.original.km_to_next_service}</strong></p>
          <p>תאריך טסט: <strong>{row.original.test_date}</strong></p>
          <p>קוד: <strong>{row.original.transmission_type}</strong></p>
          {/* הוספת פרטים נוספים כרצונך */}
        </div>
      </div>
      <div className="actions-content">
        <button type="button" className="button"><i className="icon-update">🛠</i>עדכון טיפול</button>
        <button type="button" className="button"><i className="icon-block">🚫</i>חסימת רכב</button>
        <button type="button" className="button"><i className="icon-order">📅</i>הזמנת רכב</button>
        {/* ניתן להוסיף כפתורים נוספים כאן */}
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
