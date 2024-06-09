import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy, useExpanded } from 'react-table';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function CategoryTable() {
  const [data, setData] = useState([]);
  const router = useRouter();

  // Fetch categories data
  useEffect(() => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const token = localStorage.getItem('token'); // Get token from localStorage

    console.log('Fetching data from:', `${apiBaseUrl}/api/carCategories`);
    axios.get(`${apiBaseUrl}/api/carCategories`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Data fetched:', response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching category data:', error);
      });
  }, []);

  const columns = useMemo(() => [
    {
      Header: 'שם קטגוריה',
      accessor: 'category_name',
    },
    {
      Header: 'מגבלת ק"מ ליחידה',
      accessor: 'km_limit_per_unit',
    },
    {
      Header: 'מחיר ליום',
      accessor: 'price_per_day',
    },
    {
      Header: 'מחיר לשבתות וחגים',
      accessor: 'saturday_holiday_price',
    },
    {
      Header: 'מחיר לק"מ נוסף',
      accessor: 'extra_km_price',
    },
  ], []);

  const renderRowSubComponent = (row) => (
    <div className="expanded-content">
      <div className="details-content">
        <p>שם קטגוריה: <strong>{row.original.category_name}</strong></p>
        <p>מגבלת ק"מ ליחידה: <strong>{row.original.km_limit_per_unit}</strong></p>
        <p>מחיר ליום: <strong>{row.original.price_per_day}</strong></p>
        <p>מחיר לשבתות וחגים: <strong>{row.original.saturday_holiday_price}</strong></p>
        <p>מחיר לק"מ נוסף: <strong>{row.original.extra_km_price}</strong></p>
      </div>
      <div className="actions-content">
        <button type="button" className="button" onClick={() => router.push(`/CarCategory/${row.original.id}`)}>
          <i className="icon-update">🛠</i>עדכון קטגוריה
        </button>
        {/* ניתן להוסיף כפתורים נוספים כאן */}
      </div>
    </div>
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

  console.log('Columns:', columns);
  console.log('Data:', data);

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
            console.log('Row:', row);
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
