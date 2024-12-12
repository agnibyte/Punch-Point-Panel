import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { useRouter } from "next/router";
import { FaStopwatch, FaTrophy, FaArrowLeft, FaSun, FaMoon } from "react-icons/fa";

export default function EnhancedScoreboard() {
  const router = useRouter();
  const { participant } = router.query;

  const [refereeScores, setRefereeScores] = useState([5, 5, 5, 5]); // Default scores start at 5
  const [timer, setTimer] = useState(120);
  const [isMatchOver, setIsMatchOver] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setIsMatchOver(true);
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const handleScoreChange = (refereeIndex, score) => {
    if (score < 5 || score > 10) {
      alert("The score must be between 5 and 10.");
      return;
    }

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

  const toggleTimer = () => {
    if (timer > 0) setIsTimerRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setTimer(120);
    setIsTimerRunning(false);
    setIsMatchOver(false);
  };

  const downloadPDF = () => {
    if (!participant) return alert("Participant name is required to download the PDF.");

    const doc = new jsPDF();
    doc.setFont("Arial", "B", 16);
    doc.text("Mardani Match Scoreboard", 20, 20);
    doc.setFont("Arial", "I", 12);
    doc.text(`Participant: ${participant}`, 20, 30);
    doc.text(`Match Status: ${isMatchOver ? "Match Over" : "In Progress"}`, 20, 40);
    doc.text(`Time Remaining: ${formatTime(timer)}`, 20, 50);
    doc.text(`Total Score: ${totalScore}`, 20, 60);
    doc.text("Referee Scores:", 20, 70);
    refereeScores.forEach((score, index) => doc.text(`Referee ${index + 1}: ${score}`, 20, 80 + index * 10));
    doc.save(`${participant}_scoreboard.pdf`);
  };

  const toggleTheme = () => setIsDarkTheme((prev) => !prev);

  const themeClasses = isDarkTheme
    ? "bg-gradient-to-br from-pink-500 to-blue-700 text-white"
    : "bg-white text-black";

  const refereeColors = ["bg-orange-500", "bg-red-500", "bg-green-500", "bg-blue-500 text-white"];

  // Function to handle keyboard input for changing scores
  const handleKeyDown = (e, refereeIndex) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 5 && value <= 10) {
      handleScoreChange(refereeIndex, value);
    }
  };

  return (
    <div className={`min-h-screen ${themeClasses} flex flex-col items-center justify-center p-6`}>
      {/* Header */}
      <header className="w-full bg-opacity-80 p-4 flex items-center justify-between shadow-md">
        <h1 className="text-4xl font-bold flex items-center gap-2 text-yellow-400">
          <FaTrophy /> Mardani Sports
        </h1>
        <div className="flex gap-4">
          <button onClick={() => router.back()} className="text-lg flex items-center gap-2">
            <FaArrowLeft /> Back
          </button>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${isDarkTheme ? "bg-yellow-400 text-black" : "bg-gray-800 text-white"}`}
          >
            {isDarkTheme ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </header>

      {/* Main Scoreboard */}
      <div className="mt-8 text-center">
        {participant && (
          <h2 className={`text-2xl font-semibold p-3 rounded-md ${isDarkTheme ? "bg-yellow-400 text-black" : "bg-black text-white"}`}>
            Participant: {participant}
          </h2>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 items-center">
          {/* Timer */}
          <div className="p-8 rounded-xl shadow-xl bg-gray-900 text-green-400">
            <h3 className="text-4xl font-bold flex items-center gap-2">
              <FaStopwatch /> {isMatchOver ? "Match Over" : "Time Remaining"}
            </h3>
            <p className="text-5xl mt-4 font-mono">{formatTime(timer)}</p>
          </div>

          {/* Total Score */}
          <div className="p-8 rounded-xl shadow-xl bg-gray-900 text-yellow-400">
            <h3 className="text-4xl font-bold">Total Score</h3>
            <p className="text-6xl mt-4 font-extrabold">{totalScore}</p>
          </div>
        </div>
      </div>

      {/* Referee Scores */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {refereeScores.map((score, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-lg text-center ${refereeColors[index]} transform hover:scale-105`}
          >
            <h4 className="text-2xl font-bold">Referee {index + 1}</h4>
            <input
              type="number"
              value={score}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10) || 5; // Default to 5 if input is invalid
                handleScoreChange(index, value);
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-full mt-4 text-center text-xl bg-white text-black border border-gray-400 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500"
              min="5"
              max="10"
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-4 mt-12">
        {!isMatchOver && (
          <button
            onClick={toggleTimer}
            className={`px-6 py-3 rounded-lg font-bold transition ${
              isTimerRunning ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isTimerRunning ? "Stop Timer" : "Start Timer"}
          </button>
        )}
        <button onClick={resetTimer} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg">
          Reset Timer
        </button>
        <button onClick={downloadPDF} className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg">
          Download PDF
        </button>
      </div>
    </div>
  );
}
