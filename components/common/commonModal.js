import React from "react";

export default function CommonModal({
  modalOpen,
  setModalOpen,
  modalTitle = "",
  children,
  backDrop = false,
  handleBackButtonClick,
  showBackButton,
}) {
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === "backdrop" && !backDrop) {
      toggleModal();
    }
  };

  return (
    <>
      {modalOpen && (
        <div
          id="backdrop"
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}
          onClick={handleBackdropClick}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Modal Header */}
            {modalTitle && (
              <div className="flex justify-between items-center p-4 border-b text-black border-gray-200">
                <div className="text-lg font-semibold">{modalTitle}</div>
                {showBackButton && handleBackButtonClick && (
                  <button
                    onClick={handleBackButtonClick}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    &#8592; {/* Back Arrow */}
                  </button>
                )}
                {!backDrop && (
                  <button
                    onClick={toggleModal}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    &#10005; {/* Close Icon */}
                  </button>
                )}
              </div>
            )}

            {/* Modal Body */}
            <div className="p-4">
              {React.cloneElement(children, { toggleModal })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
