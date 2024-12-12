import React, { useEffect, useState } from "react";
import Link from "next/link";
import CommonModal from "./common/commonModal";
import MatchForm from "./common/matchForm";
import { postApiData } from "@/utils/services/apiService";
import { deleteCookie, getCookie } from "@/utils/utils";
import { useRouter } from "next/router";
import StartMardaniMatchModal from "./common/startMardaniMatchModal";
import ProfileButton from "./common/profileButton";

export default function HomeWrapper() {
  const [setUpMatchModal, setSetUpMatchModal] = useState(false);
  const [sportsMardaniMatchModal, setSportsMardaniMatchModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState("");


  const [traditionalMatchModal, setTraditionalMatchModal] = useState(false);
  const [participantName, setParticipantName] = useState("");
  const [pendingMatches, setPendingMatches] = useState([]);
  const router = useRouter();

  const onClickSetup = () => {
    setSetUpMatchModal(true);
  };

  const onClickSportsMardaniFight = () => {
    setSportsMardaniMatchModal(true);
  };

  const onClickSetupMardaniMatch = () => {
    setTraditionalMatchModal(true);
  };

  useEffect(() => {
    const isLoginCheck = getCookie("temp_auth");
    const userCheck = getCookie("auth_role");
    const user = getCookie("auth_user");
    setIsAdmin(userCheck == "fight_admin");
    setUserId(user)
    if (isLoginCheck != "true") {
      router.push("/login");
      setIsLogin(false);
    }
  }, []);

  const handleMardaniMatchSubmit = () => {
    if (participantName) {
      router.push(
        `/mardani-scoreboard?participant=${encodeURIComponent(participantName)}`
      );
      setTraditionalMatchModal(false); // Close the modal
    } else {
      alert("Please enter a participant name!");
    }
  };

  const getAvailableMatches = async () => {
    try {
      const response = await postApiData("GET_AVAILABLE_MATCHES");
      console.log("response GET_AVAILABLE_MATCHES", response);
      if (response.status && response.data.length > 0) {
        setPendingMatches(response.data);
      } else {
      }
    } catch (error) {
      console.error("Error occurred during form submission:", error);
    }
  };

  useEffect(() => {
    getAvailableMatches();
  }, []);

  const onclickLogOut = () => {
    deleteCookie("temp_auth");
    router.push("/login");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo and Name */}
          <div className="flex items-center space-x-4">
            <img
              src="/images/image.png"
              alt="Logo"
              className="h-8"
            />
            <span className="text-xl font-bold text-gray-800">
              3rd National Mardani Sports Championship 2024
            </span>
          </div>

          <ProfileButton
            username={userId}
            onclickLogOut={onclickLogOut}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center w-full max-w-md mt-8">
        <img
          src="/images/image.png"
          alt="Karate Logo"
          className="rounded-full border w-40 h-40 mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Mardani Sports 
        </h1>

        <nav className="flex flex-col space-y-4">
          <button
            onClick={onClickSetup}
            className="px-6 py-3 bg-green-500 text-black-500 font-semibold rounded-lg shadow-md transform transition-all hover:bg-gray-200 hover:scale-105 hover:shadow-xl"
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
            href="/matches"
            className="block w-full bg-yellow-500 text-white py-3 rounded-lg text-center shadow-md transition hover:bg-yellow-600"
          >
            View All Matches
          </Link>
          {/* <Link
            href="/matches"
            className="block w-full bg-pink-500 text-white py-3 rounded-lg text-center shadow-md transition hover:bg-red-600"
          >
            View Matches Score List
          </Link> */}
          {/* <button
            onClick={onClickSetupMardaniMatch}
            className="w-full bg-red-500 text-white py-3 rounded-lg shadow-md transition hover:bg-red-600"
          >
            Setup Traditional Mardani Match
          </button> */}
        </nav>
      </main>

      {/* Modal for Mardani Match */}
      <CommonModal
        modalOpen={traditionalMatchModal}
        setModalOpen={setTraditionalMatchModal}
        backDrop={false}
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
        <MatchForm
          setSetUpMatchModal={setSetUpMatchModal}
          setPendingMatches={setPendingMatches}
        />
      </CommonModal>

      {/* Footer */}
      <footer className="w-full bg-white py-6 mt-auto">
        <div className="text-center text-sm text-gray-500">
          <p>
            All rights are reserved to{" "}
            <span className="font-semibold text-gray-700"> Mardani Sports Federation India </span>{" "}
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

      <CommonModal
        modalOpen={sportsMardaniMatchModal}
        setModalOpen={setSportsMardaniMatchModal}
        backDrop={false}
        modalTitle="Select Match No."
        // modalSize="w-[95%] md:w-3/4"
      >
        <StartMardaniMatchModal
          pendingMatches={pendingMatches}
          isAdmin={isAdmin}
        />
      </CommonModal>
    </div>
  );
}
