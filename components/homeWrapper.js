import React, { useState } from "react";
import Link from "next/link";
import CommonModal from "./common/commonModal";
import MatchForm from "./common/matchForm";
import { useRouter } from "next/router";

export default function HomeWrapper() {
  const [setUpMatchModal, setSetUpMatchModal] = useState(false);
  const [setUpMardaniMatchModal, setSetUpMardaniMatchModal] = useState(false);
  const [participantName, setParticipantName] = useState("");
  const router = useRouter();

  const onClickSetup = () => {
    setSetUpMatchModal(true);
  };

  const onClickSetupMardaniMatch = () => {
    setSetUpMardaniMatchModal(true);
  };

  const handleMardaniMatchSubmit = () => {
    if (participantName) {
      // Redirect to the Mardani match scoreboard with the participant name as query param
      router.push(`/mardani-scoreboard?participant=${encodeURIComponent(participantName)}`);
      setSetUpMardaniMatchModal(false); // Close the modal
    } else {
      alert("Please enter a participant name!");
    }
  };

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
            href="/scoreboard"
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

          {/* New Button for Mardani Match */}
          <button
            onClick={onClickSetupMardaniMatch}
            className="px-6 py-3 bg-white text-green-500 font-semibold rounded-lg shadow-md transform transition-all hover:bg-gray-200 hover:scale-105 hover:shadow-xl"
          >
            Setup Mardani Match
          </button>
        </nav>
      </div>

      {/* Modal for Mardani Match */}
      <CommonModal
        modalOpen={setUpMardaniMatchModal}
        setModalOpen={setSetUpMardaniMatchModal}
        backDrop={true}
        modalTitle="Enter Participant Name"
        modalSize="w-[95%] md:w-3/4"
      >
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            placeholder="Enter Participant Name"
            className="px-4 py-2 mb-4 border rounded-lg w-full"
          />
          <button
            onClick={handleMardaniMatchSubmit}
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md transform transition-all hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </CommonModal>

      {/* Modal for Setup Match */}
      <CommonModal
        modalOpen={setUpMatchModal}
        setModalOpen={setSetUpMatchModal}
        backDrop={false}
        modalTitle="Sports Match Details Form"
        modalSize="w-[95%] md:w-3/4"
      >
        <MatchForm setSetUpMatchModal={setSetUpMatchModal} />
      </CommonModal>
    </>
  );
}
