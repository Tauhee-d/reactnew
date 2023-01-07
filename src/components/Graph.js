import React, { useState, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import { useMemo } from "react";


function Graph(props) {
//     const Data =[
//         {
//              Time:"12:00",
//              Temperature:"120F"
//     },
//         {
//              Time:"12:00",
//              Temperature:"120F"
//     },
//         {
//              Time:"12:00",
//              Temperature:"120F"
//     },
//         {
//              Time:"12:00",
//              Temperature:"120F"
//     },
//         {
//              Time:"12:00",
//              Temperature:"120F"
//     },
//         {
//              Time:"12:00",
//              Temperature:"120F"
//     },
//         {
//              Time:"12:00",
//              Temperature:"120F"
//     },
//         {
//              Time:"12:00",
//              Temperature:"120F"
//     },
//         {
//              Time:"12:00",
//              Temperature:"120F"
//     },
//         {
//              Time:"12:00",
//              Temperature:"120F"
//     },
//         {
//              Time:"12:00",
//              Temperature:"120F"
//     },
//         {
//              Time:"12:00",
//              Temperature:"120F"
//     },
//         {
//              Time:"12:00",
//              Temperature:"120F"
//     },
//         {
//              Time:"12:00",
//              Temperature:"120F"
//     },
//         {
//              Time:"12:00",
//              Temperature:"120F"
//     },
//         {
//              Time:"12:00",
//              Temperature:"120F"
//     },
//         {
//              Time:"12:00",
//              Temperature:"120F"
//     },
//         {
//              Time:"12:00",
//              Temperature:"120F"
//     },
//         {
//              Time:"12:00",
//              Temperature:"120F"
//     },
//         {
//              Time:"12:00",
//              Temperature:"120F"
//     },
//         {
//              Time:"12:00",
//              Temperature:"120F"
//     },
//         {
//              Time:"12:00",
//              Temperature:"120F"
//     },
//         {
//              Time:"12:00",
//              Temperature:"120F"
//     },
//     {
//         Time:"12:00",
//         Temperature:"120F"
// }
//     ]
const Data = props.readings
console.log("Data",)
    const [data, setData] = useState(Data);

  // useEffect(() => {
  //   (async () => {
  //     // const result = await axios("http://localhost:5000/table");
  //     // const result = await axios(BASE_URL);
  //     setData(Data);
  //   })();
  // }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Time",
        accessor: "Time",
      },
      {
        Header: "Temperature",
        accessor: "Temperature",
      },
    ],
    [data]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    pageIndex,
    pageOptions,
    previousPage,
    canPreviousPage,
    nextPage,
    canNextPage,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    usePagination
  );
  return (
    <div>
        {/* <DayData name="nm"/> */}
          <table className="table-hover" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div style={{display:'flex',justifyContent:'center',marginTop:'20px'}}>
            <span>
              Page{" "}
              <strong>
                {pageIndex+1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <button style={{width:'200px', marginLeft:'20px'}} onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>
            <button style={{width:'200px', marginLeft:'20px'}} onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>
          </div>
    </div>
  )
}

export default Graph