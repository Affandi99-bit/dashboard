import React, { useState, useEffect } from 'react';

const CreateModal = ({ showModal, setShowModal, addNewData, initialData, updateData, isEditing }) => {
  const [formData, setFormData] = useState({
    title: '',
    pm: '',
    deadline: '',
    status: '',
    crew: '',
    client: '',
    final_file: '',
    final_report_file: '',
    note: '',
  });

  useEffect(() => {
    if (initialData && isEditing) {
      setFormData({
        ...initialData,
        crew: initialData.crew.join(', '),
      });
    }
  }, [initialData, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      ...formData,
      crew: formData.crew.split(',').map(item => item.trim()),
    };
    if (isEditing) {
      updateData(newData);
    } else {
      addNewData(newData);
    }
    setShowModal(false);
    // Reset form data
    setFormData({
      title: '',
      pm: '',
      deadline: '',
      status: '',
      crew: '',
      client: '',
      final_file: '',
      final_report_file: '',
      note: '',
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setShowModal(false);
    }
  };

  return (
    showModal && (
      <div>
        <main
          className="backdrop w-full z-20 h-full fixed bg-light bg-opacity-60"
          onClick={handleBackdropClick}
        >
          <div className="absolute top-3 left-3">
            <section className="relative rounded-lg bg-dark shadow-lg h-full">
            <div className="flex justify-between items-center p-2">
      <p className="helvetia font-bold text-2xl text-white">
        {isEditing ? 'EDIT TASK' : 'CREATE NEW TASK'}
      </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="z-10 bg-red-500 text-white montserrat rounded-md p-2 w-20 font-semibold tracking-wide"
                >
                  Close
                </button>
              </div>
              <form onSubmit={handleSubmit} className="w-full h-full flex flex-col gap-1 p-2">
                <div className="w-full flex gap-1 flex-col">
                  <input
                    required
                    placeholder="Title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="rounded-md p-2 w-full montserrat"
                  />
                  <section className="flex gap-1">
                    <input
                      required
                      placeholder="Client"
                      type="text"
                      name="client"
                      value={formData.client}
                      onChange={handleChange}
                      className="rounded-md p-2 w-full montserrat"
                    />
                    <input
                      required
                      placeholder="Deadline"
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      className="rounded-md p-2 w-full montserrat"
                    />
                  </section>
                  <input
                    required
                    placeholder="Project Manager"
                    type="text"
                    name="pm"
                    value={formData.pm}
                    onChange={handleChange}
                    className="rounded-md p-2 w-full montserrat"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex gap-1">
                    <textarea
                      required
                      placeholder="Crew (comma-separated)"
                      name="crew"
                      value={formData.crew}
                      onChange={handleChange}
                      className="rounded-md p-2 flex-grow montserrat"
                    />
                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex size-20 items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-20 bg-white rounded-md cursor-pointer">
                          <div className="flex gap-3 items-center justify-center">
                            <svg className="size-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                              <path stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="montserrat text-gray-400">Form and documents</p>
                          </div>
                          <input id="dropzone-file" type="file" className="hidden" />
                        </label>
                      </div>
                      <input
                        placeholder="Final File"
                        type="text"
                        name="final_file"
                        value={formData.final_file}
                        onChange={handleChange}
                        className="rounded-md p-2 w-full montserrat h-20"
                      />
                    </div>
                    <input
                      required
                      placeholder="Status"
                      type="text"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="rounded-md p-2 montserrat"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <textarea
                    placeholder="Note"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    className="rounded-md p-2 w-full h-32 montserrat"
                  />
                </div>
                <div className="flex gap-1">
                  <button type="button" onClick={() => setShowModal(false)} className="bg-red-500 text-white montserrat rounded-md py-2 w-full font-semibold tracking-wide">
                    Cancel
                  </button>
                  <button type="submit" className="bg-green-500 text-white montserrat rounded-md py-2 w-full font-semibold tracking-wide">
                    Submit
                  </button>
                </div>
              </form>
            </section>
          </div>
        </main>
      </div>
    )
  );
};

export default CreateModal;