import React, { useEffect, useState } from "react";
import Link from "next/link";
import CommonModal from "./common/commonModal";
import MatchForm from "./common/matchForm";
import { postApiData } from "@/utils/services/apiService";
import { getCookie } from "@/utils/utils";
import { useRouter } from "next/router";
import StartMardaniMatchModal from "./common/startMardaniMatchModal";

export default function HomeWrapper() {
  const [setUpMatchModal, setSetUpMatchModal] = useState(false);
  const [sportsMardaniMatchModal, setSportsMardaniMatchModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [traditionalMatchModal, setTraditionalMatchModal] = useState(false);
  const [participantName, setParticipantName] = useState("");
  const router = useRouter();

  const onClickSetup = () => {
    setSetUpMatchModal(true);
  };

  const onClickSportsMardaniFight = () => {
    setSportsMardaniMatchModal(true);
  };

  const onClickSetupMardaniMatch = () => {
    setMardaniMatchModal(true);
  };

  useEffect(() => {
    const isLoginCheck = getCookie("temp_auth");

    if (isLoginCheck != "true") {
      router.push("/login");
      setIsLogin(false);
    }
  }, []);

  const handleMardaniMatchSubmit = () => {
    if (participantName) {
      // Redirect to the Mardani match scoreboard with the participant name as query param
      router.push(
        `/mardani-scoreboard?participant=${encodeURIComponent(participantName)}`
      );
      setMardaniMatchModal(false); // Close the modal
    } else {
      alert("Please enter a participant name!");
    }
  };

  const pendingMatches = [
    { id: "1", label: "Match 1", value: "1" },
    { id: "2", label: "Match 2", value: "2" },
    { id: "3", label: "Match 3", value: "3" },
    { id: "4", label: "Match 4", value: "4" },
    { id: "5", label: "Match 5", value: "5" },
    { id: "6", label: "Match 6", value: "6" },
    { id: "7", label: "Match 7", value: "7" },
    { id: "8", label: "Match 8", value: "8" },
    { id: "9", label: "Match 9", value: "9" },
    { id: "10", label: "Match 10", value: "10" },
    { id: "11", label: "Match 11", value: "11" },
    { id: "12", label: "Match 12", value: "12" },
    { id: "13", label: "Match 13", value: "13" },
    { id: "14", label: "Match 14", value: "14" },
    { id: "15", label: "Match 15", value: "15" },
    { id: "16", label: "Match 16", value: "16" },
    { id: "17", label: "Match 17", value: "17" },
    { id: "18", label: "Match 18", value: "18" },
    { id: "19", label: "Match 19", value: "19" },
    { id: "20", label: "Match 20", value: "20" },
  ];

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
            Setup Match
          </button>
          <button
            onClick={onClickSportsMardaniFight}
            className="px-6 py-3 bg-white text-red-500 font-semibold rounded-lg shadow-md transform transition-all hover:bg-gray-200 hover:scale-105 hover:shadow-xl"
          >
            Start Sports Mardani Fight
          </button>
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
            Setup Traditional Mardani Match
          </button>
        </nav>
      </div>

      {/* Modal for Mardani Match */}
      <CommonModal
        modalOpen={traditionalMatchModal}
        setModalOpen={setTraditionalMatchModal}
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

      <CommonModal
        modalOpen={sportsMardaniMatchModal}
        setModalOpen={setSportsMardaniMatchModal}
        backDrop={false}
        modalTitle="Select Match No."
        // modalSize="w-[95%] md:w-3/4"
      >
        <StartMardaniMatchModal pendingMatches={pendingMatches} />
      </CommonModal>
    </>
  );
}
