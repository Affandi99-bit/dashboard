import React, { Suspense, useState } from "react";
import { TableModal, Loader, CreateModal } from "../components";
import { table as initialTableData } from "../constant/constant";

const DataTable = ({ tableData, setSelectedRowData, setShowModal }) => {
  const handleRowClick = (rowData) => {
    console.log("Row clicked:", rowData); // Debugging: Check if row is clicked
    setSelectedRowData(rowData);
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "done":
        return "#C6E6B2"; // Light green for "done"
      case "cancel":
        return "#F7C6C7"; // Light red for "cancel"
      case "ongoing":
        return "#F0E68C"; // Light yellow for "ongoing"
      default:
        return "#f9f9f9"// Default alternate row colors
    }
  }

  return (
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
          <td className="px-2 w-10" >
            <p className="rounded-md" style={{backgroundColor: getStatusColor(row.status),}}>{row.status}</p>
          </td>
          <td className="px-2 flex flex-col items-center justify-end">
            {row.crew.map((member, i) => (
              <p key={i}>{member}</p> 
            ))}
          </td>
          <td className="px-2 w-20">
            {row.client}
          </td>
          <td className="px-2 w-20">
            {row.final_file}
          </td>
          <td className="px-2 w-20">
            {row.final_report_file}
          </td>
          <td className="px-2 w-56">
            {row.note}
          </td>
        </tr>
      ))}
    </tbody>
  )
}

const MainTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [tableData, setTableData] = useState(initialTableData);

  const addNewData = (newData) => {
    const newId = tableData.length > 0 ? Math.max(...tableData.map(item => item.id)) + 1 : 1;
    const dataWithId = { ...newData, id: newId };
    setTableData(prevData => [...prevData, dataWithId]);
    setShowCreateModal(false);
  };

  const updateData = (updatedData) => {
    setTableData((prevData) =>
      prevData.map((item) => (item.id === updatedData.id ? updatedData : item))
    );
    setSelectedRowData(updatedData);
    setShowModal(false); // Close the modal after updating
  };

  return (
    <>
      <table className="table-fixed w-full mt-[3rem]">
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
        <Suspense fallback={<Loader />}>
          <DataTable
            tableData={tableData}
            setSelectedRowData={setSelectedRowData}
            setShowModal={setShowModal}
          />
        </Suspense>
      </table>
      <TableModal
        pro={selectedRowData}
        showModal={showModal}
        setShowModal={setShowModal}
        updateData={updateData}  // Pass updateData to TableModal
      />
      <CreateModal
        showModal={showCreateModal}
        setShowModal={setShowCreateModal}
        addNewData={addNewData}
        isEditing={false}
      />
    </>
  );
};

export default MainTable;