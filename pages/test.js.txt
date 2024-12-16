import React, { useEffect, useState } from "react";
import CommonModal from "@/components/common/commonModal";
import { postApiData } from "@/utils/services/apiService";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  // const getCapturedImages = async () => {
  //   const payload = {
  //     mobile_number: "y89ryew",
  //   };
  //   const response = await postApiData("GET_ALL_USERS", payload);
  //   if (response.status) {
  //   } else {
  //   }
  // };

  // useEffect(() => {
  //   getCapturedImages();
  // }, []);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Open Modal
      </button>
      <CommonModal
        modalOpen={isOpen}
        setModalOpen={setIsOpen}
        modalTitle="Sample Modal"
        showBackButton={true}
        handleBackButtonClick={() => alert("Back button clicked!")}
        backDrop={false}
      >
        <div>
          <p>This is the modal content!</p>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
          >
            Close Modal
          </button>
        </div>
      </CommonModal>
    </div>
  );
}
