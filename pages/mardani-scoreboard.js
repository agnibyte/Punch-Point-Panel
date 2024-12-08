import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function MardaniScoreboard() {
  const [refereeScores, setRefereeScores] = useState([0, 0, 0, 0]);
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [isMatchOver, setIsMatchOver] = useState(false);
  const router = useRouter();
  const { participant } = router.query; // Get the participant name from the URL

  // Timer Logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsMatchOver(true);
    }
  }, [timer]);

  const handleScoreChange = (refereeIndex, score) => {
    setRefereeScores((prev) => {
      const updatedScores = [...prev];
      updatedScores[refereeIndex] = score;
      return updatedScores;
    });
  };

  const totalScore = refereeScores.reduce((sum, score) => sum + score, 0);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600 min-h-screen flex flex-col items-center justify-center text-white">
      {/* Header */}
      <h1 className="text-5xl font-extrabold mb-4 text-center">
        Mardani Match Scoreboard
      </h1>
      <p className="text-lg mb-8 text-center">
        Track scores and time for {participant ? participant : "the match"}.
      </p>

      {/* Timer */}
      <div className="flex items-center justify-center bg-white text-indigo-600 rounded-full px-6 py-3 shadow-lg mb-8">
        {isMatchOver ? (
          <span className="text-2xl font-bold">Match Over</span>
        ) : (
          <span className="text-2xl font-bold">
            Time Remaining: {formatTime(timer)}
          </span>
        )}
      </div>

      {/* Referee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {refereeScores.map((score, index) => (
          <div
            key={index}
            className="bg-white text-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <h2 className="text-xl font-bold mb-2">Referee {index + 1}</h2>
            {!isMatchOver ? (
              <input
                type="number"
                min="1"
                max="10"
                value={score}
                onChange={(e) =>
                  handleScoreChange(index, parseInt(e.target.value) || 0)
                }
                className="mt-4 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                placeholder="Enter Score"
              />
            ) : (
              <p className="text-lg mt-4 font-semibold">
                Final Score: <span className="text-indigo-600">{score}</span>
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Total Score */}
      <div className="mt-12 text-3xl font-bold bg-white text-indigo-600 px-6 py-4 rounded-full shadow-md">
        Total Score: {totalScore}
      </div>

      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="mt-8 px-6 py-3 bg-white text-indigo-600 rounded-lg shadow-md hover:bg-gray-200 transition-transform transform hover:scale-105"
      >
        Back to Setup
      </button>
    </div>
  );
}
