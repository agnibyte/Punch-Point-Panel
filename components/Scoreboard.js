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

export default function Scoreboard() {
  const duration = 10;
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
  const [winnerOfMatch, setWinnerOfMatch] = useState("");
  const [userId, setUserId] = useState("");

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

    if (userId == "fightadmin" && team === "red")
      payload.referee5_red_score = 1;
    if (userId == "fightadmin" && team === "blue")
      payload.referee5_blue_score = 1;
    if (Object.keys(finalObj).length > 0) {
      Object.assign(payload, finalObj);
    }

    console.log("payload UPDATED_MATCH_SCORES", payload);
    const response = await postApiData("UPDATED_MATCH_SCORES", payload);
    console.log("response after upadte", response);
    if (response.status) {
      if (team === "red") {
        setRedScore((prev) => Math.max(0, prev + value));
      }
      if (team === "blue") {
        setBlueScore((prev) => Math.max(0, prev + value));
      }
    } else {
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
    console.log("Updated Round Scores:", newRoundScores);
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
    setWinnerOfMatch("");
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
      temp_winner: tempWinner,
      status: "completed",
    };
    fetchRefereeScores("", 0, tempPaylod);
  };

  useEffect(() => {
    const fetchRefereeScores = async () => {
      const payload = {
        matchId: currentMatchNo,
      };
      console.log("payload GET_MATCH_SCORES", payload);
      const response = await postApiData("GET_MATCH_SCORES", payload);
      console.log("response", response);
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
        console.log("totalRed", "totalBlue", totalRed, totalBlue);
        setRedScore(totalRed);
        setBlueScore(totalBlue);
      } else {
      }
    };

    let interval;
    if (isMatchStart) {
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
        <div className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white text-2xl font-semibold py-2 px-6 rounded-full shadow-lg hover:scale-105 transform transition duration-300 mt-0 md:mt-0 my-3">
          Match{" "}
          <span className="ml-2 text-3xl font-extrabold">{currentMatchNo}</span>
        </div>{" "}
        {/* Added pt-20 to offset the fixed header */}
        {/* Timer - Responsive and Desktop Placement */}
        <div className="w-full md:w-1/3 flex justify-center mb-4 md:absolute md:top-[60%] md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
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
            onclickShowResult={onclickShowResult}
            winnerOfMatch={winnerOfMatch}
          />
        </div>
        {/* Scores Section */}
        <div className="flex  md:flex-row items-center justify-between w-full">
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
            {winnerOfMatch == "red" && (
              <div className="text-white text-3xl">Winner</div>
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
            {winnerOfMatch == "blue" && (
              <div className="text-white text-3xl">Winner</div>
            )}
          </div>
        </div>
        {winnerOfMatch == "none" && (
          <div className="text-white text-3xl">Match is Tie</div>
        )}
      </div>

      {/* Reset Modal */}
      <CommonModal
        modalOpen={resetModal}
        setModalOpen={setResetModal}
        backDrop={false}
      >
        <ResetConfirmation
          title={"Are You Sure Want To Reset Current Match?"}
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

// this is my scoreboard
// CREATE TABLE `match_scores` (
//   `id` int NOT NULL AUTO_INCREMENT,
//   `match_id` int NOT NULL,
//   `round_number` int NOT NULL,
//   `red_score` int DEFAULT '0',
//   `blue_score` int DEFAULT '0',
//   `round_winner` enum('red','blue','none') DEFAULT 'none',
//   `start_time` datetime DEFAULT NULL,
//   `end_time` datetime DEFAULT NULL,
//   `status` enum('active','completed') DEFAULT 'active',
//   `referee1_score` varchar(20) DEFAULT NULL,
//   `referee2_score` varchar(20) DEFAULT NULL,
//   `referee3_score` varchar(20) DEFAULT NULL,
//   `referee4_score` varchar(20) DEFAULT NULL,
//   `referee5_red_score` varchar(20) DEFAULT NULL,
//   `referee5_blue_score` varchar(20) DEFAULT NULL,
//   PRIMARY KEY (`id`)
// )
// this is my table

// like previous give me query function which will give me values of referee1_score referee2_score, referee3_score, referee4_score, referee5_red_score, referee5_blue_score  that can wrap in api function  call that api for every 10 sec if match is started until timer is zero
// also in this coponent logic change for states redScore and blueScore, red and blue scores are the totals of  referee1_score referee2_score, referee3_score, referee4_score, referee5_red_score, referee5_blue_score
