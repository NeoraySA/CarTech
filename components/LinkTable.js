import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy, useExpanded } from 'react-table';

function LinkTable({ apiUrl, refresh }) {
  const [linksData, setLinksData] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/links`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok) {
          setLinksData(data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        } else {
          throw new Error('Failed to fetch links');
        }
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    };

    fetchLinks();
  }, [apiUrl, refresh]);  // Add refresh as a dependency to re-fetch when a new link is added

  const columns = useMemo(() => [
    {
      Header: 'Original URL',
      accessor: 'original_url',
    },
    {
      Header: 'Short URL',
      accessor: 'short_url',
      Cell: ({ value }) => <a href={value} target="_blank" rel="noopener noreferrer">{value}</a>
    },
    {
      Header: 'Created At',
      accessor: 'created_at',
      Cell: ({ value }) => new Date(value).toLocaleString()
    },
    {
      Header: 'Creator ID',
      accessor: 'creator_id',
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    { columns, data: linksData },
    useSortBy
  );

  return (
    <div>
      <table {...getTableProps()} className="link-list">
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

export default LinkTable;
