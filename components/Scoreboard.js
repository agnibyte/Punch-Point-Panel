import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import Rounds from "./Rounds";
import moment from "moment";
import CommonModal from "./common/commonModal";
import ResetConfirmation from "./common/resetConfirmation";
import FinalResultModal from "./common/finalResultModal";
import Link from "next/link";
import { useRouter } from "next/router";
import { postApiData } from "@/utils/services/apiService";
import { getCookie } from "@/utils/utils";
import { FaTrophy } from "react-icons/fa";
import Image from "next/image";

export default function Scoreboard() {
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState(moment.duration(90, "seconds"));
  const [isMounted, setIsMounted] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // Ensure the code runs only in the browser
    if (typeof window !== "undefined") {
      const localtime = parseInt(localStorage.getItem("matchTimer"), 10);

      // Set the duration based on localStorage value or default to 90 seconds (1.5 minutes)
      const durationTemp = localtime === 3 ? 180 : 90;
      setTimeLeft(moment.duration(durationTemp, "seconds"));
      setDuration(durationTemp);
    }

    // This ensures that we update isMounted only after the first render (client-side)
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Optionally, you can save the timeLeft to localStorage
    if (timeLeft.seconds() === 0 && timeLeft.minutes() === 0) {
      localStorage.setItem("matchTimer", timeLeft.minutes() === 3 ? 3 : 1.5);
    }
  }, [timeLeft]);

  const [redScore, setRedScore] = useState(0);
  const [blueScore, setBlueScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentMatchNo, setCurrentMatchNo] = useState("");
  const [isMatchStart, setIsMatchStart] = useState(false); // Track if the timer is running

  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const [resetModal, setResetModal] = useState(false);
  const [matchFinshModal, setMatchFinshModal] = useState(false);
  const [winnerOfMatch, setWinnerOfMatch] = useState("");
  const [userId, setUserId] = useState("");
  const [redPlayer, setRedPlayer] = useState({ name: "", state: "" });
  const [bluePlayer, setBluePlayer] = useState({ name: "", state: "" });
  const [updateScoreError, setUpdateScoreError] = useState("");
  const [redScoreLoading, setRedScoreLoading] = useState(false);
  const [redMiniusScoreLoading, setRedMiniusScoreLoading] = useState(false);
  const [blueScoreLoading, setBlueScoreLoading] = useState(false);
  const [blueMiniusScoreLoading, setBlueMiniusScoreLoading] = useState(false);

  const totalRounds = 5;
  const winScore = 5;
  const [roundScores, setRoundScores] = useState(
    Array.from({ length: totalRounds }, () => ({
      red: 0,
      blue: 0,
      roundWinner: 0,
    }))
  );

  useEffect(() => {
    const user = getCookie("auth_user");
    setUserId(user);

    const localMatchNo = localStorage.getItem("currentMatch");
    if (localMatchNo) {
      setCurrentMatchNo(localMatchNo);
    } else {
      // router.push("/");
    }

    const getDataFunction = async () => {
      const response = await postApiData("GET_CURRENT_MATCH_DATA", {
        matchId: parseInt(localMatchNo),
      });
      if (response.status && response.data.length > 0) {
        setRedPlayer({
          name: response.data[0].playerRed,
          state: response.data[0].stateRed,
        });
        setBluePlayer({
          name: response.data[0].playerBlue,
          state: response.data[0].stateBlue,
        });
      } else {
        setUpdateScoreError(response.message);
      }
    };
    getDataFunction();
  }, []);

  const handleScoreChange = (team, value) => {
    fetchRefereeScores(team, value);
    // if (team === "red") {
    //   setRedScore((prev) => Math.max(0, prev + value));
    // } else {
    //   setBlueScore((prev) => Math.max(0, prev + value));
    // }
  };

  useEffect(() => {
    handleRoundScoreChange(currentRound);
  }, [redScore, blueScore]);

  const fetchRefereeScores = async (team = "", value = 0, finalObj = {}) => {
    const payload = {
      matchId: parseInt(currentMatchNo),
    };

    if (userId == "Mardaniadmin" && team === "red") {
      value == 1 ? setRedScoreLoading(true) : setRedMiniusScoreLoading(true);
      payload.referee5_red_score = value;
    }
    if (userId == "Mardaniadmin" && team === "blue") {
      value == 1 ? setBlueScoreLoading(true) : setBlueMiniusScoreLoading(true);
      payload.referee5_blue_score = value;
    }
    if (Object.keys(finalObj).length > 0) {
      Object.assign(payload, finalObj);
    }
    if (finalObj.round_winner) {
      setWinnerOfMatch(finalObj.round_winner);
    }
    setUpdateScoreError("");

    const response = await postApiData("UPDATED_MATCH_SCORES", payload);
    if (response.status) {
      if (team === "red") {
        setRedScore((prev) => Math.max(0, prev + value));
        setRedScoreLoading(false);
        setRedMiniusScoreLoading(false);
      }
      if (team === "blue") {
        setBlueScore((prev) => Math.max(0, prev + value));
        setBlueScoreLoading(false);
        setBlueMiniusScoreLoading(false);
      }
    } else {
      setUpdateScoreError(response.message);
    }
  };

  const handleRoundScoreChange = (round) => {
    const newRoundScores = [...roundScores];

    // Update the red and blue scores for the current round
    newRoundScores[round - 1].red = redScore;
    newRoundScores[round - 1].blue = blueScore;

    // Determine the round winner
    if (redScore >= winScore) {
      newRoundScores[round - 1].roundWinner = "red";
    } else if (blueScore >= winScore) {
      newRoundScores[round - 1].roundWinner = "blue";
    } else {
      newRoundScores[round - 1].roundWinner = 0; // No winner
    }

    setRoundScores(newRoundScores);
  };

  const handleRoundChange = (round) => {
    setCurrentRound(round);
  };

  const handleTimerEnd = () => {
    // setIsMatchStart(false);
    // setMatchFinshModal(true);
    setResetModal(false);
  };

  const handleResetMatch = () => {
    router.push("/");
  };

  const handleReset = () => {
    setTimeLeft(moment.duration(duration, "seconds")); // Reset time
    setIsRunning(false); // Stop the timer
    clearInterval(intervalId);
    setIsMatchStart(false); //
    setWinnerOfMatch("");
    setRedScore(0);
    setBlueScore(0);
    setCurrentRound(1);
  };
  const onclickShowResult = () => {
    setIsMatchStart(false);
    let tempWinner = "";
    if (redScore > blueScore) {
      tempWinner = "red";
    } else if (redScore < blueScore) {
      tempWinner = "blue";
    } else {
      tempWinner = "none";
    }
    const tempPaylod = {
      red_score: redScore,
      blue_score: blueScore,
      round_winner: tempWinner,
      status: "completed",
    };
    fetchRefereeScores("", 0, tempPaylod);
  };

  const progress = (timeLeft.asSeconds() / duration) * 100;

  useEffect(() => {
    const fetchRefereeScores = async () => {
      const payload = {
        matchId: currentMatchNo,
      };
      const response = await postApiData("GET_MATCH_SCORES", payload);
      const { data } = response;
      if (response.status) {
        let totalRed = 0;
        let totalBlue = 0;

        data.forEach((score) => {
          totalRed +=
            parseInt(score.referee1_score || 0) +
            parseInt(score.referee3_score || 0) +
            parseInt(score.referee5_red_score || 0);

          totalBlue +=
            parseInt(score.referee2_score || 0) +
            parseInt(score.referee4_score || 0) +
            parseInt(score.referee5_blue_score || 0);
        });
        setRedScore(totalRed);
        setBlueScore(totalBlue);
      } else {
      }
    };

    let interval;
    if (isMatchStart && progress != "0") {
      fetchRefereeScores(); // Initial fetch
      interval = setInterval(fetchRefereeScores, 5000); // Fetch every 10 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMatchStart, currentMatchNo]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-00 relative">
      {/* Header Section */}
      <header className="flex items-center justify-between p-4 shadow-md bg-opacity-50 bg-black fixed top-0 w-full z-10">
        <Image
          src="/images/image.png"
          alt="Logo"
          className="mr-3 rounded-full border-4 border-yellow-400 shadow-lg"
          width={"50"}
          height={"50"}
        />
        <Link
          href={"/"}
          className=" text-sm md:text-2xl font-bold text-white tracking-wide uppercase"
        >
          Mardani Sports Scoreboard
        </Link>
        <div className="flex-1 flex justify-center items-center">
          {" "}
          {/* Centering the match number */}
        </div>
        <button
          onClick={() => setResetModal(true)}
          className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 hover:from-red-800 hover:to-red-600 text-white font-bold p-3 rounded-lg transition duration-300"
        >
          Start New Match
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-between w-full h-full px-4 pt-20">
        <div className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white text-3xl font-semibold py-2 px-6 rounded-full shadow-lg hover:scale-105 transform transition duration-300 mt-0 md:mt-2 my-3">
          Match :{" "}
          <span className="ml-2 text-3xl font-extrabold">{currentMatchNo}</span>
        </div>{" "}
        <div className="w-full md:w-1/3 flex justify-center items-center mb-4 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
          <Timer
            duration={duration}
            onTimerEnd={handleTimerEnd}
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            intervalId={intervalId}
            setIntervalId={setIntervalId}
            setIsMatchStart={setIsMatchStart}
            setRoundScores={setRoundScores}
            onclickShowResult={onclickShowResult}
            winnerOfMatch={winnerOfMatch}
            progress={progress}
          />
        </div>
        {/* Scores Section */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8 px-4">
          {/* Red Player Section */}
          <div className="flex flex-col items-center w-full md:w-1/3 p-6">
            <div className="text-2xl font-bold text-red-100 text-center uppercase mb-4">
              {redPlayer.name
                ? `${redPlayer.name} (${redPlayer.state})`
                : "Loading Player Info..."}
            </div>
            <div className="bg-red-600 text-white text-[10rem] font-extrabold rounded-lg w-full py-10 text-center shadow-lg">
              {redScore}
            </div>
            {isMatchStart && updateScoreError == "" && (
              <div className="mt-6 w-full flex gap-4 justify-center">
                <button
                  onClick={() => handleScoreChange("red", 1)}
                  disabled={redScoreLoading}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition ease-in-out duration-300"
                >
                  {redScoreLoading ? "Updating..." : "Add Point +1"}
                </button>

                <button
                  onClick={() => handleScoreChange("red", -1)} // Subtract 1 point
                  disabled={redMiniusScoreLoading || redScore == 0}
                  className={`font-bold py-2 px-4 rounded-lg transition ease-in-out duration-300 ${
                    redScore > 0 && !redMiniusScoreLoading
                      ? "bg-gray-500 hover:bg-gray-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {redMiniusScoreLoading ? "Updating..." : "Subtract Point -1"}
                </button>
              </div>
            )}

            {winnerOfMatch === "red" && (
              <>
                <div className="flex flex-col items-center justify-center mt-6 animate-bounce">
                  <FaTrophy
                    className="text-yellow-400 "
                    size={48}
                  />
                  <div className="text-3xl font-extrabold text-red-100 ">
                    Red Player Wins!
                  </div>
                </div>
                <div className="mt-2 text-lg text-white bg-gradient-to-r from-red-500 to-pink-500 py-2 px-6 rounded-lg shadow-lg">
                  Congratulations to the Red Player!
                </div>
              </>
            )}
          </div>

          {/* Blue Player Section */}
          <div className="flex flex-col items-center w-full md:w-1/3   p-6">
            <div className="text-2xl font-bold text-blue-100 text-center uppercase mb-4">
              {bluePlayer.name
                ? `${bluePlayer.name} (${bluePlayer.state})`
                : "Loading Player Info..."}
            </div>
            <div className="bg-blue-600 text-white text-[10rem] font-extrabold rounded-lg w-full py-10 text-center shadow-lg">
              {blueScore}
            </div>
            {isMatchStart && updateScoreError == "" && (
              <div className="mt-6 w-full flex gap-4 justify-center">
                <button
                  onClick={() => handleScoreChange("blue", 1)}
                  disabled={blueScoreLoading}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition ease-in-out duration-300"
                >
                  {blueScoreLoading ? "Updating..." : "Add Point +1"}
                </button>

                <button
                  onClick={() => handleScoreChange("blue", -1)} // Subtract 1 point
                  disabled={blueMiniusScoreLoading || blueScore == 0}
                  className={`font-bold py-2 px-4 rounded-lg transition ease-in-out duration-300 ${
                    blueScore > 0 && !blueMiniusScoreLoading
                      ? "bg-gray-500 hover:bg-gray-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {blueMiniusScoreLoading ? "Updating..." : "Subtract Point -1"}
                </button>
              </div>
            )}
            {winnerOfMatch === "blue" && (
              <>
                <div className="flex flex-col items-center justify-center mt-6 animate-bounce">
                  <FaTrophy
                    className="text-yellow-400 "
                    size={48}
                  />{" "}
                  <div className="text-3xl font-extrabold text-red-100 ">
                    Blue Player Wins!
                  </div>
                </div>
                <div className="mt-2 text-lg text-white bg-gradient-to-r from-blue-500 to-teal-500 py-2 px-6 rounded-lg shadow-lg">
                  Congratulations to the Blue Player!
                </div>
              </>
            )}
          </div>
        </div>
        {winnerOfMatch === "none" && (
          <div className="flex flex-col items-center justify-center">
            <div className="text-4xl font-extrabold text-yellow-400 ">
              Match is a Tie!
            </div>
            <div className="mt-4 text-2xl text-white bg-gradient-to-r from-yellow-400 to-orange-400 py-2 px-6 rounded-lg shadow-lg">
              Both teams played exceptionally well!
            </div>
          </div>
        )}
        {updateScoreError != "" && (
          <div className="text-white text-2xl text-center w-full mt-3">
            {updateScoreError}
          </div>
        )}
      </div>

      {/* Reset Modal */}
      <CommonModal
        modalOpen={resetModal}
        setModalOpen={setResetModal}
        backDrop={false}
      >
        <ResetConfirmation
          title={"Are You Sure Want To Start New Match?"}
          onConfirm={() => {
            handleResetMatch();
            setResetModal(false);
          }}
          onCancel={() => {
            setResetModal(false);
          }}
        />
      </CommonModal>

      <CommonModal
        modalOpen={matchFinshModal}
        setModalOpen={setMatchFinshModal}
        backDrop={false}
      >
        <FinalResultModal
          onExit={() => {
            setMatchFinshModal(false);
          }}
          redScore={redScore}
          blueScore={blueScore}
          currentMatchNo={currentMatchNo}
        />
      </CommonModal>
    </div>
  );
}
