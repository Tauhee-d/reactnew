import React, { useState, useEffect } from "react";

const Column = () => {
    const [data, setData] = useState([]);


    [

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
            Header: "Device Id",
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
                        textDecoration: "underline",
                    }}
                    onClick={() => {
                        // ES6 Syntax use the rvalue if your data is an array.
                        const dataCopy = [...data];
                        // It should not matter what you name tableProps. It made the most sense to me.
                        dataCopy.splice(tableProps.row.index, 1);
                        setData(dataCopy);
                    }}
                >
                    Delete
                </span>
            ),
        },
    ];

}

export default Column