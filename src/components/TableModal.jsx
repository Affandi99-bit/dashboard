import { useState } from 'react';
import CreateModal from './CreateModal';

const TableModal = ({ pro, showModal, setShowModal, updateData }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setShowModal(false);
    }
  };

  if (!showModal || !pro) return null;
  const getStatusColor = (status) => {
    switch (status) {
      case "done":
        return "#22c55e"; // Light green for "done"
      case "cancel":
        return "#ef4444"; // Light red for "cancel"
      case "ongoing":
        return "#F0E68C"; // Light yellow for "ongoing"
      default:
        return "#f9f9f9"// Default alternate row colors
    }
  }
  return (
    showModal && (
      <main
      onClick={handleBackdropClick}
      className="backdrop z-10 w-full h-full fixed top-0  bg-light bg-opacity-60"
    >
        <div className="absolute top-20 left-2">
          <section className="relative rounded-lg  bg-dark shadow-lg w-[70rem] h-[30rem]">
            <button
              onClick={() => setShowModal(false)}
              className="z-10 absolute right-2 top-2 bg-red-500 text-white montserrat rounded-md py-2 px-3 font-semibold tracking-wide"
            >
              Close
            </button>

            <button 
          onClick={() => setShowEditModal(true)} 
          className="z-10 absolute right-2 bottom-2 bg-green-500 text-white montserrat rounded-md py-2 px-3 font-semibold tracking-wide"
        >
          Edit
        </button>

            <main className="flex flex-row w-full justify-start items-start">
              <section className="text-light p-5 h-full w-1/2">
                <h1 className="helvetica text-2xl">{pro.title}</h1>
                <span style={{backgroundColor: getStatusColor(pro.status),}} className="inline-flex my-2 items-center rounded-md  px-2 py-1 text-xs font-medium text-dark ring-1 ring-inset ring-gray-500/10">
                  {pro.status}
                </span>
                <h3 className="montserrat mb-10">{pro.client}</h3>
                <p className="montserrat">Project Manager : {pro.pm} </p>
                <p className="montserrat">Note :</p>
                <p className="montserrat pl-5">{pro.note}</p>
              </section>
              <section className="text-light p-5 h-full w-1/2 flex flex-col items-start">
                <div>
                  <h1 className="helvetica text-2xl">{pro.deadline}</h1>
                  <p className="montserrat">Crew :</p>
                  {pro.crew.map((member, i) => (
        <p key={i}className="pl-10">{member}</p> 
      ))}
                </div>
                <div className="absolute bottom-20 flex gap-3 items-center helvetica font-black tracking-wider">
                  <button
                    // onClick={() => window.open(pro.finalfile)}
                    className="w-56 h-32 bg-light text-dark rounded-lg"
                  >
                    Final File
                  </button>
                  <div
                    // onClick={() => window.open(pro.ba)}
                    className="w-56 h-32  flex flex-col gap-1"
                  >
                  <div className="bg-light text-dark rounded-lg w-full h-full flex items-center">Dok 1</div>
                  <div className="bg-light text-dark rounded-lg w-full h-full flex items-center">Dok 2</div>
                  <div className="bg-light text-dark rounded-lg w-full h-full flex items-center">Dok 3</div>
                  </div>
                </div>
              </section>
            </main>
          </section>
        </div>

        {showEditModal && (
          <CreateModal
            showModal={showEditModal}
            setShowModal={setShowEditModal}
            initialData={pro}
            updateData={updateData}  // Pass updateData to CreateModal
            isEditing={true}
          />
        )}

      </main>
    )
  );
};

export default TableModal;