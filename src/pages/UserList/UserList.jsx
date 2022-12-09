import './userList.css'
import React, { useState, useEffect } from "react";
import { useTable, usePagination } from 'react-table'
import { useMemo } from 'react'
import axios from 'axios'
// const BASE_URL = process.env.REACT_APP_BASE_URL;


export default function UserList() {
  const [data, setData] = useState([])

  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:5000/table");
      // const result = await axios(BASE_URL);
      setData(result.data);
    })();
  }, []);

  const columns = useMemo(
    () => [

      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Device Name",
        accessor: "deviceName",
      },
      {
        Header: "Device ID",
        accessor: "deviceId",
      },


      {
        Header: "Delete",
        id: "delete",
        accessor: (str) => "delete",

        Cell: (tableProps) => (
          <span
            style={{
              cursor: "pointer",
              color: "blue",
              textDecoration: "underline"
            }}
            onClick={() => {
              const dataCopy = [...data];
              dataCopy.splice(tableProps.row.index, 1);
              setData(dataCopy);
            }}
          >
            Delete
          </span>
        )
      }
    ],
    [data]
  );

  const {
    getTableProps, getTableBodyProps, headerGroups, page, pageIndex, pageOptions, previousPage,
    canPreviousPage, nextPage, canNextPage, prepareRow
  } = useTable({
    columns,
    data
  },
    usePagination
  );
  return (
    <>
      <div className="UserList">
        <h3>Table</h3>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="pagination">

          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
        </div>
      </div>
    </>
  )
}
