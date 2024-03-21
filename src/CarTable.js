import React, { useMemo, useEffect, forwardRef } from 'react';
import { useTable, useSortBy, useRowSelect, useGlobalFilter } from 'react-table';

import './CarTable.css';

// קומפוננטת Checkbox מותאמת שתומכת בסטטוס indeterminate
const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

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
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state: { selectedRowIds },
  } = useTable(
    { columns, data },
    useGlobalFilter, 
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // הוספת עמודה לתיבות סימון בתחילת כל שורה
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  useEffect(() => {
    setGlobalFilter(filter || undefined);
  }, [filter, setGlobalFilter]);

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
  );
}
