const TableModal = ({ pro, showModal, setShowModal }) => {
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setShowModal(false);
    }
  };

  if (!showModal || !pro) return null;

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

            <button className="z-10 absolute right-2 bottom-2 bg-green-500 text-white montserrat rounded-md py-2 px-3 font-semibold tracking-wide">
              Edit
            </button>

            <main className="flex flex-row w-full justify-start items-start">
              <section className="text-light p-5 h-full w-1/2">
                <h1 className="helvetica text-2xl">{pro.title}</h1>
                <span className="inline-flex my-2 items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
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
                  <p className="montserrat pl-5">{pro.member}</p>
                </div>
                <div className="absolute bottom-20 flex gap-3 items-center helvetica font-black tracking-wider">
                  <button
                    // onClick={() => window.open(pro.finalfile)}
                    className="w-56 h-32 bg-light text-dark rounded-lg"
                  >
                    Final File
                  </button>
                  <button
                    // onClick={() => window.open(pro.ba)}
                    className="w-56 h-32 bg-light text-dark rounded-lg"
                  >
                    BA
                  </button>
                </div>
              </section>
            </main>
          </section>
        </div>
      </main>
    )
  );
};

export default TableModal;