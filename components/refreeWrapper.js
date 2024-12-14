import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCookie } from "@/utils/utils";
import { postApiData } from "@/utils/services/apiService";

export default function RefreeWrapper() {
  const router = useRouter();
  const [animation, setAnimation] = useState({ player: null, show: false });
  const [userRole, setUserRole] = useState();
  const [userId, setUserId] = useState();
  const [refereeRedScore, setRefereeRedScore] = useState(0);
  const [refereeBlueScore, setRefereeBlueScore] = useState(0);
  const [currentMatchNo, setCurrentMatchNo] = useState("");
  const [apiError, setApiError] = useState("");

  const [redScoreLoading, setRedScoreLoading] = useState(false);
  const [blueScoreLoading, setBlueScoreLoading] = useState(false);

  console.log("userRole", userRole);

  useEffect(() => {
    const userRole = getCookie("auth_role");
    const user = getCookie("auth_user");
    setUserRole(userRole);
    setUserId(user);
    const localMatchNo = localStorage.getItem("currentMatch");
    if (localMatchNo) {
      setCurrentMatchNo(localMatchNo);
    } else {
    }
  }, []);

  const handleGivePoint = (player) => {
    if (player == "red") {
      setRefereeRedScore((p) => p + 1);
      setRedScoreLoading(true);
    }
    if (player == "blue") {
      setRefereeBlueScore((p) => p + 1);
      setBlueScoreLoading(true);
    }
    fetchRefereeScores(player);
  };

  const fetchRefereeScores = async (player) => {
    const payload = {
      matchId: currentMatchNo,
    };
    if (userId == "fightreferee1") payload.referee1_score = 1;
    if (userId == "fightreferee2") payload.referee2_score = 1;
    if (userId == "fightreferee3") payload.referee3_score = 1;
    if (userId == "fightreferee4") payload.referee4_score = 1;
    if (userId == "fightadmin") {
      if (player == "red") payload.referee5_red_score = 1;
      if (player == "blue") payload.referee5_blue_score = 1;
    }

    console.log("payload UPDATED_MATCH_SCORES", payload);

    console.log("payload UPDATED_MATCH_SCORES", payload);
    const response = await postApiData("UPDATED_MATCH_SCORES", payload);
    console.log("response", response);
    const { data } = response;
    if (response.status) {
      setAnimation({ player, show: true });

      setTimeout(() => setAnimation({ player: null, show: false }), 1000);

      window.localStorage.setItem("lastPointPlayer", player);
      window.dispatchEvent(new Event("storage"));
      setRedScoreLoading(false);
      setBlueScoreLoading(false);
    } else {
      setApiError(response.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-700 via-gray-900 to-black relative overflow-hidden">
      <h1 className="text-5xl md:text-6xl text-white font-extrabold mb-12 tracking-wide shadow-lg">
        Referee Panel Match : {currentMatchNo}
      </h1>

      {apiError ? (
        <div className="flex justify-center items-center w-full text-red-600 text-lg font-semibold">
          {apiError}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center items-center w-full gap-10">
          {/* Player 1 Button */}
          {(userRole == "fight_admin" || userRole == "red_referee") && (
            <button
              onClick={() => handleGivePoint("red")}
              className="relative bg-gradient-to-r from-red-500 to-red-700 text-white text-2xl md:text-4xl w-full md:w-72 h-72 rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition transform duration-300 ease-out flex items-center justify-center group"
              disabled={redScoreLoading}
            >
              {redScoreLoading ? "Please wait" : "Give a Ponit"}
              {animation.show && animation.player === "red" && (
                <div className="absolute text-5xl font-extrabold text-green-500 animate-pop-out -top-14 opacity-80 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  +1
                </div>
              )}
            </button>
          )}

          {/* Player 2 Button */}
          {(userRole == "fight_admin" || userRole == "blue_referee") && (
            <button
              onClick={() => handleGivePoint("blue")}
              className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white text-2xl md:text-4xl w-full md:w-72 h-72 rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition transform duration-300 ease-out flex items-center justify-center group"
              disabled={blueScoreLoading}
            >
              {blueScoreLoading ? "Please wait" : "Give a Ponit"}
              {animation.show && animation.player === "blue" && (
                <div className="absolute text-5xl font-extrabold text-green-500 animate-pop-out -top-14 opacity-80 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  +1
                </div>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
