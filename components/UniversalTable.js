import React, { useMemo } from 'react';
import { useTable, useSortBy, useExpanded } from 'react-table';
import HighlightedCell from './HighlightedCell';
import { useSettings } from '../context/SettingsContext'; // ייבוא useSettings
import styles from '../styles/Table.module.css';

export default function UniversalTable({ data = [], columns = [], tableType, actionButtons = [], imageAccessor, expandable = false, noDataText = 'אין נתונים זמינים' }) {
  const { permissions } = useSettings(); // שימוש ב-useSettings כדי לקבל הרשאות

  const hasPermission = (requiredPermissions) => {
    return requiredPermissions.some(permission => permissions.includes(permission));
  };

  const enhancedColumns = useMemo(() => {
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
    toggleRowExpanded
  } = useTable(
    { columns: enhancedColumns, data },
    useSortBy,
    useExpanded
  );

  const renderRowSubComponent = (row) => (
    <div className={styles["expanded-content"]}>
      <div className={styles["details-content"]}>
        <p><strong>Details:</strong> {JSON.stringify(row.original)}</p>
      </div>
      <div className={styles["actions-content"]}>
        {actionButtons.map((button, index) => {
          if (button.permissions && !hasPermission(button.permissions)) {
            return null;
          }
          return (
            <button key={index} onClick={() => button.onClick(row.original)} className={styles['button']}>
              {React.createElement(button.icon, { className: styles['button-icon'] })}
              {button.label}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className={styles["table-container"]}>
      {rows.length === 0 ? (
        <div className={styles["no-data"]}>{noDataText}</div>
      ) : (
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
                {actionButtons.length > 0 && <th className={styles['action-buttons-header']}></th>}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <React.Fragment key={row.id}>
                  <tr {...row.getRowProps({
                    onClick: expandable ? () => toggleRowExpanded(row.id) : null,
                    className: row.isExpanded ? styles['expanded-row'] : ''
                  })}>
                    {row.cells.map((cell, index) => (
                      <td
                        {...cell.getCellProps()}
                        className={`
                          ${index === 0 ? styles['first-column'] : ''} 
                          ${cell.column.id === 'license_number' ? styles['cell-license-number'] : ''}
                        `}
                      >
                        {cell.column.isHighlighted ? (
                          <HighlightedCell>{cell.value}</HighlightedCell>
                        ) : (
                          cell.render('Cell')
                        )}
                      </td>
                    ))}
                    {actionButtons.length > 0 && (
                      <td className={styles['action-buttons']}>
                        {actionButtons.map((button, index) => {
                          if (button.permissions && !hasPermission(button.permissions)) {
                            return null;
                          }
                          return (
                            <button key={index} onClick={() => button.onClick(row.original)} className="Button3">
                              {React.createElement(button.icon, { className: styles['button-icon'] })}
                              {button.label}
                            </button>
                          );
                        })}
                      </td>
                    )}
                  </tr>
                  {expandable && row.isExpanded ? (
                    <tr>
                      <td colSpan={columns.length + 1} className={styles["expanded-content"]}>
                        {renderRowSubComponent(row)}
                      </td>
                    </tr>
                  ) : null}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
