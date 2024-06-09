import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy, useExpanded } from 'react-table';
import axios from 'axios';


export default function RatesTable({ rentalId, startDate, endDate, carId, billingBasisId }) {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchRates() {
      if (!startDate || !endDate || !carId || !billingBasisId) return;
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const token = localStorage.getItem('token');

      try {
        const response = await axios.post(`${apiUrl}/api/rentals/calculate`, {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          carId,
          billingBasisId
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          setRates(response.data.rateBreakdown);
        } else {
          throw new Error('Failed to fetch rates');
        }
      } catch (error) {
        console.error('Error fetching rates:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRates();
  }, [startDate, endDate, carId, billingBasisId]);

  const columns = useMemo(() => [
    {
      Header: 'תעריף',
      accessor: 'rateName',
      Cell: ({ value, row }) => row.original.rateType === 'מיוחד' ? `תעריף מיוחד (${value})` : value,
    },
    {
      Header: 'מחיר יומי',
      accessor: 'dailyRate',
      Cell: ({ value }) => `${value} ש"ח`,
    },
    {
      Header: 'כמות',
      accessor: 'quantity',
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    { columns, data: rates },
    useSortBy,
    useExpanded,
  );

  if (loading) {
    return <div>Loading rates...</div>;
  }

  return (
    <div className="table-container">
      <h3>תעריפי השכרה</h3>
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
