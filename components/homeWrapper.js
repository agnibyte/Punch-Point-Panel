import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import CommonModal from "./common/commonModal";
import MatchForm from "./common/matchForm";
import { postApiData } from "@/utils/services/apiService";

export default function HomeWrapper() {
  const [setUpMatchModal, setSetUpMatchModal] = useState(false);
  const onClickSetup = () => {
    setSetUpMatchModal(true);
  };

  const getCapturedImages = async () => {
    const payload = {
      mobile_number: "y89ryew",
    };
    const response = await postApiData("GET_ALL_USERS", payload);
    console.log("response", response);
    if (response.status) {
    } else {
    }
  };
  useEffect(() => {
    getCapturedImages();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-red-500 to-blue-500 text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">Punch Point Panel</h1>
        <nav className="flex space-x-4">
          <button
            onClick={onClickSetup}
            className="px-4 py-2 bg-white text-red-500 rounded-lg font-semibold hover:bg-gray-200"
          >
            Setup Match with form
          </button>
          <Link
            href="/setup"
            className="px-4 py-2 bg-white text-red-500 rounded-lg font-semibold hover:bg-gray-200"
          >
            Setup Match
          </Link>
          <Link
            href="/results"
            className="px-4 py-2 bg-white text-blue-500 rounded-lg font-semibold hover:bg-gray-200"
          >
            View Results
          </Link>
        </nav>
      </div>

      <CommonModal
        modalOpen={setUpMatchModal}
        setModalOpen={setSetUpMatchModal}
        backDrop={false}
      >
        <MatchForm />
      </CommonModal>
    </>
  );
}
