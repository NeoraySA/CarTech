import React from 'react';
import { useTable, useSortBy, useExpanded } from 'react-table';
import styles from '../styles/Table.module.css'; // ייבוא קובץ העיצוב

export default function UniversalTable({ data = [], columns = [], tableType, actionButtons = [], imageAccessor }) {
  const enhancedColumns = React.useMemo(() => {
    if (imageAccessor) {
      return [
        { Header: 'תמונה', accessor: imageAccessor, Cell: ({ value }) => value ? <img src={value} alt="Item" className={styles.universalImage} /> : null },
        ...columns
      ];
    }
    return columns;
  }, [columns, imageAccessor]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    { columns: enhancedColumns, data },
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
              {actionButtons.length > 0 && <th className={styles['action-buttons-header']}>פעולות</th>}
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
                  {actionButtons.length > 0 && (
                    <td className={styles['action-buttons']}>
                      {actionButtons.map((button, index) => (
                        <button key={index} onClick={() => button.onClick(row.original)} className={styles['button']}>
                          {React.createElement(button.icon, { className: styles['button-icon'] })}
                          {button.label}
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
                {row.isExpanded ? (
                  <tr>
                    <td colSpan={columns.length + 1} className={styles["expanded-content"]}>
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
