import React, { useMemo, useState } from 'react';
import { useTable, useSortBy, useExpanded } from 'react-table';
import './CarTable.css';

export default function CarTable({ data, filter }) {
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
    {
      Header: 'שנת ייצור',
      accessor: 'year',
    },
  ], []);

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

  // פונקציה לרנדור תוכן מתחת לשורה שהורחבה
  const renderRowSubComponent = (row) => (
    <>
      <div className="expanded-content">
        <div className="vehicle-details">
          <p>מס' רישוי: <strong>{row.values.license_number}</strong></p>
          <p>יצרן: <strong>{row.values.make}</strong></p>
          <p>דגם: <strong>{row.values.model}</strong></p>
          <p>צבע: <strong>{row.values.color}</strong></p>
          <p>שנת ייצור: <strong>{row.values.year}</strong></p>
          {/* אפשר להוסיף פרטים נוספים כאן */}
        </div>
      </div>
      <div className="vehicle-actions">
      <button type="button" className="button"><i className="icon-update">🛠</i>עדכון טיפול</button>
      <button type="button" className="button"><i className="icon-block">🚫</i>חסימת רכב</button>
      <button type="button" className="button"><i className="icon-order">📅</i>הזמנת רכב</button>
      {/* ניתן להוסיף כפתורים נוספים כאן */}
      </div>
    </>
  );
  
  
  

  return (
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
              // React.Fragment עבור רנדור של רכיבים מרובים
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
