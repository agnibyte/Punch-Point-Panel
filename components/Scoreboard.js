import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import Rounds from "./Rounds";
import moment from "moment";
import CommonModal from "./common/commonModal";
import ResetConfirmation from "./common/resetConfirmation";

export default function Scoreboard() {
  const duration = 120;
  const [redScore, setRedScore] = useState(0);
  const [blueScore, setBlueScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [isMatchStart, setIsMatchStart] = useState(false); // Track if the timer is running
  const [timeLeft, setTimeLeft] = useState(
    moment.duration(duration, "seconds")
  );
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const [resetModal, setResetModal] = useState(false);
  const totalRounds = 5;
  const winScore = 5;
  const [roundScores, setRoundScores] = useState(
    Array.from({ length: totalRounds }, () => ({
      red: 0,
      blue: 0,
      roundWinner: 0,
    }))
  );

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

  //   const handleScoreChange = (team, value) => {
  //     setRoundScores((prevScores) => {
  //       const updatedScores = [...prevScores];
  //       const currentRoundIndex = currentRound - 1;

  //       // Update the score for the current round in roundScores
  //       if (team === "red") {
  //         updatedScores[currentRoundIndex].red = Math.max(
  //           0,
  //           updatedScores[currentRoundIndex].red + value
  //         );
  //       } else {
  //         updatedScores[currentRoundIndex].blue = Math.max(
  //           0,
  //           updatedScores[currentRoundIndex].blue + value
  //         );
  //       }

  //       return updatedScores;
  //     });
  //   };

  const handleRoundChange = (round) => {
    setCurrentRound(round);
  };

  const handleTimerEnd = () => {
    setIsMatchStart(false);
    alert("Time's up for this round!");
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
    <div className="min-h-screen bg-gradient-to-r from-red-800 to-blue-800">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold ">Punch Point Panel</div>
        <button
          onClick={() => setResetModal(true)}
          className="mt-6 bg-red-700  hover:bg-red-800 text-white font-bold py-2 px-6 rounded-lg"
        >
          Reset Match
        </button>
      </div>
      <div className="flex items-center justify-center w-full h-full flex flex-col items-center justify-center text-white px-4">
        {/* Contestant Names */}
        <div className="grid grid-cols-1 items-center justify-center w-full text-center">
          <div className="text-xl font-bold uppercase">Match</div>
          <div className="text-5xl font-bold mt-2">428</div>
        </div>

        <div className="block md:hidden flex flex-col items-center w-5/12 my-3">
          <Timer
            duration={120}
            onTimerEnd={handleTimerEnd}
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            intervalId={intervalId}
            setIntervalId={setIntervalId}
            handleReset={handleReset}
            isMatchStart={isMatchStart}
            setIsMatchStart={setIsMatchStart}
            setRoundScores={setRoundScores}
          />
        </div>

        {/* Scores and Timer */}
        <div className="flex items-center justify-between w-full">
          {/* Red Score */}
          <div className="flex flex-col items-center w-5/12 md:w-1/3">
            <div className="text-3xl font-bold text-red-200 text-center uppercase mb-3">
              player 1
            </div>
            <div
              className={`bg-red-600  text-white  text-[11rem] font-extrabold rounded-lg w-full py-12 text-center shadow-xl `}
            >
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

          {/* Timer */}
          <div className="hidden md:flex flex-col items-center w-1/3">
            <Timer
              duration={120}
              onTimerEnd={handleTimerEnd}
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
              intervalId={intervalId}
              setIntervalId={setIntervalId}
              handleReset={handleReset}
              isMatchStart={isMatchStart}
              setIsMatchStart={setIsMatchStart}
              setRoundScores={setRoundScores}
            />
          </div>

          {/* Blue Score */}
          <div className="flex flex-col items-center w-5/12 md:w-1/3">
            <div className="text-3xl font-bold text-blue-200 text-center uppercase mb-3">
              player 2
            </div>
            <div className="bg-blue-600 text-white text-[11rem] font-extrabold rounded-lg w-full py-12 text-center shadow-xl">
              {blueScore}
            </div>
            {isMatchStart && (
              <button
                onClick={() => handleScoreChange("blue", 1)}
                className="mt-4 bg-green-500  hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Add Point +1
              </button>
            )}
          </div>
        </div>
      </div>

      <CommonModal
        modalOpen={resetModal}
        setModalOpen={setResetModal}
        // modalTitle="Are You Sure  Want To Reset Current Match?"
        showBackButton={true}
        // handleBackButtonClick={() => alert("Back button clicked!")}
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
    </div>
  );
}
