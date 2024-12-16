import React, { useEffect, useState } from "react";
import Link from "next/link";
import CommonModal from "./common/commonModal";
import MatchForm from "./common/matchForm";
import { postApiData } from "@/utils/services/apiService";
import { deleteCookie, getCookie } from "@/utils/utils";
import { useRouter } from "next/router";
import StartMardaniMatchModal from "./common/startMardaniMatchModal";
import ProfileButton from "./common/profileButton";
import TraditionalMardaniSetUpForm from "./common/traditionalMardaniSetUpForm";
import HomeFooter from "./common/homeFooter";
import HomeHeader from "./common/homeHeader";
import Image from "next/image";

export default function HomeWrapper() {
  const [setUpMatchModal, setSetUpMatchModal] = useState(false);
  const [sportsMardaniMatchModal, setSportsMardaniMatchModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState("");
  const [refereePath, setRefereePath] = useState("/");

  const [traditionalMatchModal, setTraditionalMatchModal] = useState(false);
  const [pendingMatches, setPendingMatches] = useState([]);
  const router = useRouter();

  const onClickSetup = () => {
    setSetUpMatchModal(true);
  };

  const onClickSportsMardaniFight = (destination) => {
    setSportsMardaniMatchModal(true);
    setRefereePath(destination);
  };

  const onClickSetupMardaniMatch = () => {
    setTraditionalMatchModal(true);
  };

  useEffect(() => {
    const isLoginCheck = getCookie("temp_auth");
    const userCheck = getCookie("auth_role");
    const user = getCookie("auth_user");
    setIsAdmin(userCheck == "fight_admin");
    setUserId(user);
    if (isLoginCheck != "true") {
      router.push("/login");
      setIsLogin(false);
    }
  }, []);

  const getAvailableMatches = async () => {
    try {
      const response = await postApiData("GET_AVAILABLE_MATCHES");
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
      <HomeHeader
        userId={userId}
        onclickLogOut={onclickLogOut}
      />

      {/* Main Content */}
      <main className="flex flex-col items-center w-full max-w-md mt-8">
        <Image
          src="/images/image.png"
          alt="Karate Logo"
          className="rounded-full border w-40 h-40 mb-4"
          width={"160"}
          height={"160"}
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Mardani Sports
        </h1>

        <nav className="flex flex-col space-y-4">
          {isAdmin && (
            <>
              <button
                onClick={onClickSetup}
                className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md transform transition-all hover:bg-gray-200 hover:scale-105 hover:shadow-xl"
              >
                Setup Match
              </button>
              <button
                onClick={() => onClickSportsMardaniFight("/scoreboard")}
                className="px-6 py-3 bg-white text-red-500 font-semibold rounded-lg shadow-md transform transition-all hover:bg-gray-200 hover:scale-105 hover:shadow-xl"
              >
                Start Sports Mardani Fight - ScoreBoard
              </button>{" "}
            </>
          )}
          <button
            onClick={() => onClickSportsMardaniFight("/referee")}
            className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-md transform transition-all hover:bg-purple-600 hover:scale-105"
          >
            Start Sports Mardani Fight - Referee
          </button>

          {isAdmin && (
            <button
              onClick={onClickSetupMardaniMatch}
              className="w-full bg-red-500 font-semibold text-white py-3 rounded-lg shadow-md transition hover:bg-red-600 hover:scale-105"
            >
              Start Traditional Mardani Match
            </button>
          )}
          <Link
            href="/matches"
            className="block w-full bg-yellow-300 font-semibold text-teal-700 py-3 rounded-lg text-center shadow-md transition hover:bg-yellow-500 hover:scale-105"
          >
            View All Matches
          </Link>
        </nav>
      </main>

      {/* Modal for Mardani Match */}
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
      <HomeFooter />

      <CommonModal
        modalOpen={sportsMardaniMatchModal}
        setModalOpen={setSportsMardaniMatchModal}
        backDrop={false}
        modalTitle={`${
          refereePath == "/referee" ? "Referee Pannel" : "Scoreboard"
        }  `}
        // modalSize="w-[95%] md:w-3/4"
      >
        <StartMardaniMatchModal
          pendingMatches={pendingMatches}
          refereePath={refereePath}
        />
      </CommonModal>
    </div>
  );
}
