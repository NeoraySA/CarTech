import React from 'react';
import { useTable, useSortBy, useExpanded } from 'react-table';
import styles from '../styles/Table.module.css'; // ייבוא קובץ העיצוב

export default function UniversalTableRental({ data = [], columns = [], tableType }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    { columns, data },
    useSortBy,
    useExpanded
  );

  return (
    <div className={styles["table-container"]}>
      <table {...getTableProps()} className={styles["universal-table"]}>
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
                <tr {...row.getRowProps()} className={row.isExpanded ? styles['expanded-row'] : ''}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} className={cell.column.id === 'license_number' ? styles['cell-license-number'] : ''}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
                {row.isExpanded ? (
                  <tr>
                    <td colSpan={columns.length} className={styles["expanded-content"]}>
                      <div className={styles["details-content"]}>
                        {/* Here you can render expanded content for the row */}
                        <p><strong>Details:</strong> {JSON.stringify(row.original)}</p>
                      </div>
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
