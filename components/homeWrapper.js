import React, { useEffect, useState } from "react";
import Link from "next/link";
import CommonModal from "./common/commonModal";
import MatchForm from "./common/matchForm";
import { postApiData } from "@/utils/services/apiService";
import { deleteCookie, getCookie } from "@/utils/utils";
import { useRouter } from "next/router";
import StartMardaniMatchModal from "./common/startMardaniMatchModal";
import TraditionalMardaniSetUpForm from "./common/traditionalMardaniSetUpForm";
import HomeFooter from "./common/homeFooter";
import HomeHeader from "./common/homeHeader";
import Image from "next/image";
import TraditionalMatchForm from "./common/traditionalMatchForm";
import StartTraditionalMatchModal from "./common/startTraditionalMatchModal";

export default function HomeWrapper() {
  const [setUpMatchModal, setSetUpMatchModal] = useState(false);
  const [setUpTraditionalModal, setSetUpTraditionalModal] = useState(false);
  const [sportsMardaniMatchModal, setSportsMardaniMatchModal] = useState(false);
  const [startTraditionalMatchModal, setStartTraditionalMatchModal] =
    useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const [userId, setUserId] = useState("");
  const [refereePath, setRefereePath] = useState("/");

  const [traditionalMatchModal, setTraditionalMatchModal] = useState(false);
  const [pendingMatches, setPendingMatches] = useState([]);
  const [pendingTraditionalMatches, setPendingTraditionalMatches] = useState(
    []
  );
  const router = useRouter();
  console.log("pendingTraditionalMatches", pendingTraditionalMatches);
  const onClickSetup = () => setSetUpMatchModal(true);
  const onClickSetupTraditional = () => setSetUpTraditionalModal(true);

  const onClickSportsMardaniFight = (destination) => {
    setSportsMardaniMatchModal(true);
    setRefereePath(destination);
  };
  const onClickTraditionalMardaniFight = (destination) => {
    setStartTraditionalMatchModal(true);
    setRefereePath(destination);
  };
  const onClickSetupMardaniMatch = () => setTraditionalMatchModal(true);

  useEffect(() => {
    const isLoginCheck = getCookie("temp_auth");
    const userCheck = getCookie("auth_role");
    const user = getCookie("auth_user");
    setIsAdmin(userCheck === "fight_admin");
    setUserId(user);
    if (isLoginCheck !== "true") {
      router.push("/login");
      setIsLogin(false);
    }
  }, []);

  const getAvailableMatches = async () => {
    try {
      const response = await postApiData("GET_AVAILABLE_MATCHES");
      if (response.status && response.data.length > 0) {
        setPendingMatches(response.data);
      }
    } catch (error) {
      console.error("Error occurred during form submission:", error);
    }
  };
  
  const getAvailableTraditionalMatches = async () => {
    try {
      const response = await postApiData("GET_AVAILABLE_TRADITIONAL_MATCHES");
      if (response.status && response.data.length > 0) {
        setPendingTraditionalMatches(response.data);
      }
    } catch (error) {
      console.error("Error occurred during form submission:", error);
    }
  };

  useEffect(() => {
    getAvailableMatches();
    getAvailableTraditionalMatches();
  }, []);

  const onclickLogOut = () => {
    deleteCookie("temp_auth");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-700 to-gray-800 flex flex-col">
      {/* Header */}
      <HomeHeader
        userId={userId}
        onclickLogOut={onclickLogOut}
        className="bg-gradient-to-br from-gray-900 via-blue-700 to-gray-800 text-white shadow-lg border-b border-gray-700 flex justify-center items-center w-full max-w-5xl mx-auto px-6 py-4 rounded-t-lg"
      />

      {/* Main Content */}
      <main className="flex flex-col items-center w-full max-w-5xl mx-auto px-6 py-12 text-white">
        {/* Logo and Title Section */}
        <div className="text-center mb-10">
          <Image
            src="/images/image.png"
            alt="Karate Logo"
            className="rounded-full border-4 border-blue-500 shadow-xl transform hover:scale-110 transition-transform"
            width={140}
            height={140}
            style={{ display: "block", margin: "auto" }}
          />
          <h1 className="text-5xl font-extrabold text-blue-300 mt-6 drop-shadow-md animate-pulse">
            Mardani Sports
          </h1>
        </div>

        {/* Navigation Buttons */}
        <nav className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {isAdmin && (
            <>
              <button
                onClick={onClickSetup}
                className="px-6 py-4 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg shadow-lg transform transition-transform hover:scale-105"
              >
                Setup Match
              </button>
              <button
                onClick={() => onClickSportsMardaniFight("/scoreboard")}
                className="px-6 py-4 bg-white text-red-600 font-semibold rounded-lg shadow-lg transform transition-transform hover:bg-gray-100 hover:scale-105"
              >
                Start Sports Mardani Fight - Scoreboard
              </button>
              <button
                onClick={onClickSetupTraditional}
                className="px-6 py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-lg shadow-lg transform transition-transform hover:scale-105"
              >
                Setup Traditional Match
              </button>
            </>
          )}
          <button
            onClick={() => onClickSportsMardaniFight("/referee")}
            className="px-6 py-4 bg-gradient-to-r from-purple-400 to-purple-600 text-white font-semibold rounded-lg shadow-lg transform transition-transform hover:scale-105"
          >
            Start Sports Mardani Fight - Referee
          </button>
          {isAdmin && (
            <button
              // onClick={onClickSetupMardaniMatch}
              onClick={() =>
                onClickTraditionalMardaniFight("/mardani-scoreboard")
              }
              className="px-6 py-4 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg shadow-lg transform transition-transform hover:scale-105"
            >
              Start Traditional Mardani Match
            </button>
          )}
          <Link
            href="/matches"
            className="block px-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 font-semibold text-center rounded-lg shadow-lg transform transition-transform hover:scale-105"
          >
            View All Matches
          </Link>
        </nav>
      </main>

      {/* Footer */}
      <HomeFooter className="bg-gradient-to-br from-gray-900 via-blue-700 to-gray-800 text-gray-300 shadow-lg mt-auto py-4 rounded-b-lg" />

      {/* Modals */}
      <CommonModal
        modalOpen={traditionalMatchModal}
        setModalOpen={setTraditionalMatchModal}
        backDrop={false}
        modalTitle="Setup Traditional Mardani Match"
        modalSize="w-[95%] md:w-[40%]"
      >
        <TraditionalMardaniSetUpForm
          setTraditionalMatchModal={setTraditionalMatchModal}
        />
      </CommonModal>

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

      <CommonModal
        modalOpen={setUpTraditionalModal}
        setModalOpen={setSetUpTraditionalModal}
        backDrop={false}
        modalTitle="Sports Match Details Form"
        modalSize="w-[95%] md:w-3/4"
      >
        <TraditionalMatchForm
          setPendingTraditionalMatches={setPendingTraditionalMatches}
        />
      </CommonModal>

      <CommonModal
        modalOpen={sportsMardaniMatchModal}
        setModalOpen={setSportsMardaniMatchModal}
        backDrop={false}
        modalTitle={`${
          refereePath === "/referee" ? "Referee Panel" : "Scoreboard"
        }`}
      >
        <StartMardaniMatchModal
          pendingMatches={pendingMatches}
          refereePath={refereePath}
        />
      </CommonModal>
      <CommonModal
        modalOpen={startTraditionalMatchModal}
        setModalOpen={setStartTraditionalMatchModal}
        backDrop={false}
        modalTitle={`${
          refereePath === "/referee" ? "Referee Panel" : "Scoreboard"
        }`}
      >
        <StartTraditionalMatchModal
          pendingMatches={pendingTraditionalMatches}
          refereePath={refereePath}
        />
      </CommonModal>
    </div>
  );
}
