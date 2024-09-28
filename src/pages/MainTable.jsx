import React, { useEffect, useState } from "react";
import {TableModal,Loader} from "../components";
import { data } from "../constant/constant";
const MainTable = () => {
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [selectedRowData, setSelectedRowData] = useState(null);

  useEffect(() => {
    fetch("https://66f651c3436827ced9769e49.mockapi.io/datas")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTableData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleRowClick = (rowData) => {
    console.log("Row clicked:", rowData); // Debugging: Check if row is clicked
    setSelectedRowData(rowData);
    setShowModal(true);
  };

  if (!tableData.length) {
    return <Loader/>;
  }

  return (
    <>
      <table className="table-auto w-full mt-[3rem]">
        <thead className="sticky top-[3.5rem] bg-dark text-light text-md z-10 h-10 montserrat">
          <tr>
            <th>ID</th>
            <th>PROJECT TITLE</th>
            <th>PM</th>
            <th>DEADLINE</th>
            <th>STATUS</th>
            <th>CREW</th>
            <th>CLIENT/PIC</th>
            <th>FINAL FILE</th>
            <th>BA</th>
            <th>NOTE</th>
          </tr>
        </thead>
        <tbody className="text-center ">
          {tableData.map((row, index) => (
            <tr
              onClick={() => handleRowClick(row)}
              className="cursor-pointer hover:opacity-65 montserrat text-sm  h-20  "
              style={{
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#E8E8E8",
              }}
              key={row.id}
            >
              <td className="px-2 w-5 font-semibold">
                {row.id}
              </td>
              <td className="px-2 w-56">
                {row.title}
              </td>
              <td className="px-2 w-20">
                {row.pm}
              </td>
              <td className="px-2 w-20">
                {row.deadline}
              </td>
              <td className="px-2 w-10">
                {row.status}
              </td>
              <td className="px-2 w-20">
                {row.member}
              </td>
              <td className="px-2 w-20">
                {row.client}
              </td>
              <td className="px-2 w-20">
                {row.final}
              </td>
              <td className="px-2 w-20">
                {row.ba}
              </td>
              <td className="px-2 w-56">
                {row.note}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableModal
        pro={selectedRowData}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default MainTable;