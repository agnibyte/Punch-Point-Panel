import React, { useEffect, useState } from "react";
import Link from "next/link";
import CommonModal from "./common/commonModal";
import MatchForm from "./common/matchForm";
import { postApiData } from "@/utils/services/apiService";
import { getCookie } from "@/utils/utils";
import { useRouter } from "next/router";

export default function HomeWrapper() {
  const [setUpMatchModal, setSetUpMatchModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [setUpMardaniMatchModal, setSetUpMardaniMatchModal] = useState(false);
  const [participantName, setParticipantName] = useState("");
  const router = useRouter();

  const onClickSetup = () => {
    setSetUpMatchModal(true);
  };

  const onClickSetupMardaniMatch = () => {
    setSetUpMardaniMatchModal(true);
  };

  useEffect(() => {
    const isLoginCheck = getCookie("temp_auth");
    if (isLoginCheck !== "true") {
      router.push("/login");
      setIsLogin(false);
    }
  }, []);

  const handleMardaniMatchSubmit = () => {
    if (participantName) {
      router.push(`/mardani-scoreboard?participant=${encodeURIComponent(participantName)}`);
      setSetUpMardaniMatchModal(false);
    } else {
      alert("Please enter a participant name!");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-4">
          <img src="/images/images.png" alt="Logo" className="h-8" />
          <div className="flex items-center space-x-4"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center w-full max-w-md mt-8">
        <img
          src="/images/image.png"
          alt="Karate Logo"
          className="rounded-full border w-40 h-40 mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Punch Point Panel</h1>

        <div className="space-y-4 w-full">
          {!isLogin ? (
            <button
              onClick={onClickSetup}
              className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md transition hover:bg-blue-600"
            >
              Login
            </button>
          ) : (
            <button
              onClick={onClickSetup}
              className="w-full bg-green-500 text-white py-3 rounded-lg shadow-md transition hover:bg-green-600"
            >
              Setup Match
            </button>
          )}
          <Link
            href="/scoreboard"
            className="block w-full bg-purple-500 text-white py-3 rounded-lg text-center shadow-md transition hover:bg-purple-600"
          >
            View Scoreboard
          </Link>
          <Link
            href="/results"
            className="block w-full bg-yellow-500 text-white py-3 rounded-lg text-center shadow-md transition hover:bg-yellow-600"
          >
            View Results
          </Link>
          <button
            onClick={onClickSetupMardaniMatch}
            className="w-full bg-red-500 text-white py-3 rounded-lg shadow-md transition hover:bg-red-600"
          >
            Setup Mardani Match
          </button>
        </div>
      </main>

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
            className="px-4 py-2 mb-4 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
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

      {/* Footer */}
      <footer className="w-full bg-white py-6 mt-auto">
        <div className="text-center text-sm text-gray-500">
          <p>
            All rights are reserved to{" "}
            <span className="font-semibold text-gray-700">Sports Mardani</span>{" "}
            and{" "}
            <a
              href="https://www.agni-byte.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700"
            >
              AgniByte Private Limited
            </a>{" "}
            2024.
          </p>
        </div>
      </footer>
    </div>
  );
}
