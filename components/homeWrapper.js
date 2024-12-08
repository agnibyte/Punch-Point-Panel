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

  // useEffect(() => {
  //   getCapturedImages();
  // }, []);

  return (
    <>
      <div className="bg-gradient-to-r from-red-500 to-blue-500 text-white flex flex-col items-end justify-center pr-8 relative min-h-screen overflow-y-auto">
        {/* Karate Logo on Left Side */}
        <img
          src="/images/karate.jpg" // Updated path to your .webp image
          alt="Karate Logo"
          className="absolute left-8 top-8 w-16 h-16" // Adjust the size and position as needed
        />

        <h1 className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-yellow-400 animate-textGlow">
          Punch Point Panel
        </h1>

        <nav className="flex flex-col space-y-4">
          <button
            onClick={onClickSetup}
            className="px-6 py-3 bg-white text-red-500 font-semibold rounded-lg shadow-md transform transition-all hover:bg-gray-200 hover:scale-105 hover:shadow-xl"
          >
            Setup Match with Form
          </button>
          <Link
            href="/setup"
            className="px-6 py-3 bg-white text-red-500 font-semibold rounded-lg shadow-md transform transition-all hover:bg-gray-200 hover:scale-105 hover:shadow-xl"
          >
            Setup Match
          </Link>
          <Link
            href="/results"
            className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md transform transition-all hover:bg-gray-200 hover:scale-105 hover:shadow-xl"
          >
            View Results
          </Link>
        </nav>
      </div>

      <CommonModal
        modalOpen={setUpMatchModal}
        setModalOpen={setSetUpMatchModal}
        backDrop={false}
        modalTitle="Sports Match Details Form"
        modalSize="w-full md:w-3/4"
      >
        <MatchForm />
      </CommonModal>
    </>
  );
}
