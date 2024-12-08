import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import Rounds from "./Rounds";
import moment from "moment";
import CommonModal from "./common/commonModal";
import ResetConfirmation from "./common/resetConfirmation";
import FinalResultModal from "./common/finalResultModal";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Scoreboard() {
  const duration = 5;
  const router = useRouter();

  const [redScore, setRedScore] = useState(0);
  const [blueScore, setBlueScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentMatchNo, setCurrentMatchNo] = useState("");
  const [isMatchStart, setIsMatchStart] = useState(false); // Track if the timer is running
  const [timeLeft, setTimeLeft] = useState(
    moment.duration(duration, "seconds")
  );
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const [resetModal, setResetModal] = useState(false);
  const [matchFinshModal, setMatchFinshModal] = useState(false);
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
    const localMatchNo = localStorage.getItem("currentMatch");
    if (localMatchNo) {
      setCurrentMatchNo(localMatchNo);
    } else {
      // router.push("/");
    }
  }, []);

  const handleScoreChange = (team, value) => {
    if (team === "red") {
      setRedScore((prev) => Math.max(0, prev + value));
    } else {
      setBlueScore((prev) => Math.max(0, prev + value));
    }
  };

  useEffect(() => {
    handleRoundScoreChange(currentRound);
  }, [redScore, blueScore]);

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
    console.log("Updated Round Scores:", newRoundScores);
  };

  const handleRoundChange = (round) => {
    setCurrentRound(round);
  };

  const handleTimerEnd = () => {
    setIsMatchStart(false);
    // setMatchFinshModal(true);
    setResetModal(false);
  };

  const handleResetMatch = () => {
    setRedScore(0);
    setBlueScore(0);
    setCurrentRound(1);
    setRoundScores(Array(5).fill({ red: 0, blue: 0 })); // Reset round scores
    handleReset();
  };

  const handleReset = () => {
    setTimeLeft(moment.duration(duration, "seconds")); // Reset time
    setIsRunning(false); // Stop the timer
    clearInterval(intervalId);
    setIsMatchStart(false); //
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-00 relative">
      {/* Header Section */}
      <header className="flex items-center justify-between p-4 shadow-md bg-opacity-50 bg-black fixed top-0 w-full z-10">
        <Link
          href={"/"}
          className=" text-sm md:text-2xl font-bold text-white tracking-wide uppercase"
        >
          Punch Point Panel
        </Link>
        <div className="flex-1 flex justify-center items-center">
          {" "}
          {/* Centering the match number */}
        </div>
        <button
          onClick={() => setResetModal(true)}
          className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 hover:from-red-800 hover:to-red-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
        >
          Reset Match
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-between w-full h-full px-4 pt-20">
        <div className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white text-2xl font-semibold py-2 px-6 rounded-full shadow-lg hover:scale-105 transform transition duration-300 mt-0 md:mt-3 my-3">
          Match{" "}
          <span className="ml-2 text-3xl font-extrabold">{currentMatchNo}</span>
        </div>{" "}
        {/* Added pt-20 to offset the fixed header */}
        {/* Timer - Responsive and Desktop Placement */}
        <div className="w-full md:w-1/3 flex justify-center mb-4 md:absolute md:top-[45%] md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
          <Timer
            duration={duration}
            onTimerEnd={handleTimerEnd}
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            intervalId={intervalId}
            setIntervalId={setIntervalId}
            handleReset={handleReset}
            setIsMatchStart={setIsMatchStart}
            setRoundScores={setRoundScores}
          />
        </div>
        {/* Scores Section */}
        <div className="flex  md:flex-row items-center justify-between w-full mb-20">
          {/* Red Score */}
          <div className="flex flex-col items-center w-5/12 md:w-1/3">
            <div className="text-3xl font-bold text-red-200 text-center uppercase mb-3">
              Player 1
            </div>
            <div className="bg-red-600 text-white text-[11rem] font-extrabold rounded-lg w-full py-12 text-center shadow-xl">
              {redScore}
            </div>
            {isMatchStart && (
              <button
                onClick={() => handleScoreChange("red", 1)}
                className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Add Point +1
              </button>
            )}
          </div>

          {/* Blue Score */}
          <div className="flex flex-col items-center w-5/12 md:w-1/3">
            <div className="text-3xl font-bold text-blue-200 text-center uppercase mb-3">
              Player 2
            </div>
            <div className="bg-blue-600 text-white text-[11rem] font-extrabold rounded-lg w-full py-12 text-center shadow-xl">
              {blueScore}
            </div>
            {isMatchStart && (
              <button
                onClick={() => handleScoreChange("blue", 1)}
                className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Add Point +1
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reset Modal */}
      <CommonModal
        modalOpen={resetModal}
        setModalOpen={setResetModal}
        backDrop={false}
      >
        <ResetConfirmation
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
            handleResetMatch();
          }}
          redScore={redScore}
          blueScore={blueScore}
          currentMatchNo={currentMatchNo}
        />
      </CommonModal>
    </div>
  );
}

// in this coponent logic will slightly change for states redScore and blueScore i want to take
