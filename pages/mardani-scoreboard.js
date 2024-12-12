import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { useRouter } from "next/router";
import { FaStopwatch, FaTrophy, FaArrowLeft } from "react-icons/fa";

export default function EnhancedScoreboard() {
  const router = useRouter();
  const { participant } = router.query;

  const initialScores = [0,0,0,0];

  const [refereeScores, setRefereeScores] = useState(initialScores);
  const [timer, setTimer] = useState(120);
  const [isMatchOver, setIsMatchOver] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

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
    setRefereeScores(initialScores); // Reset referee scores
  };

  const downloadPDF = () => {
    if (!participant) return alert("Participant name is required to download the PDF.");
    if (!isMatchOver) return alert("Match must be over to download the PDF.");

    const doc = new jsPDF();
    doc.setFont("Arial", "B", 32);
    doc.text("Mardani Match Scoreboard", 20, 20);
    doc.setFont("Arial", "I", 24);
    doc.text(`Participant: ${participant}`, 20, 50);
    doc.text(`Match Status: ${isMatchOver ? "Match Over" : "In Progress"}`, 20, 80);
    doc.text(`Time Remaining: ${formatTime(timer)}`, 20, 110);
    doc.text(`Total Score: ${totalScore}`, 20, 140);
    doc.text("Referee Scores:", 20, 170);
    refereeScores.forEach((score, index) => doc.text(`Referee ${index + 1}: ${score}`, 20, 200 + index * 30));
    doc.save(`${participant}_scoreboard.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center p-8">
      {/* Navigation Bar */}
      <nav className="w-full bg-black bg-opacity-90 p-4 flex items-center justify-between shadow-lg">
        <img src="/images/image.png" alt="Logo" className="w-12 h-12 rounded-full" />
        <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
          <FaTrophy className="text-yellow-400" size={32} /> Traditional Mardani Sports Scoreboard
        </h1>
        <button onClick={() => router.back()} className="flex items-center gap-2 text-xl md:text-2xl text-white">
          <FaArrowLeft size={24} /> Back
        </button>
      </nav>

      {/* Participant Section */}
      {participant && (
        <h2 className="mt-4 text-2xl md:text-3xl font-semibold bg-blue-400 text-black px-4 py-2 rounded text-center">
          Participant: {participant}
        </h2>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8 w-full max-w-screen-2xl">
        {/* Timer Section */}
        <div className="bg-gray-900 text-green-400 p-8 rounded-2xl shadow-lg flex flex-col items-center relative">
          <h3 className="text-xl md:text-2xl font-semibold mb-2">
            <FaStopwatch className="inline mr-2" size={28} />
            {isMatchOver ? "Match Over" : "Time Remaining"}
          </h3>
          <p className="text-6xl md:text-7xl font-mono">{formatTime(timer)}</p>
          <div
            className="absolute bottom-0 left-0 w-full bg-green-500"
            style={{
              opacity: 0.2,
              height: `${(timer / 120) * 100}%`,
              transition: "height 1s linear",
            }}
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4 justify-center">
          {!isMatchOver && (
            <button
              onClick={toggleTimer}
              className={`px-6 py-2 text-xl md:text-2xl font-bold rounded-lg transition ${
                isTimerRunning ? "bg-red-600 hover:bg-red-500" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isTimerRunning ? "Stop" : "Start"}
            </button>
          )}
          <button
            onClick={resetTimer}
            className="px-6 py-2 text-xl md:text-2xl font-bold rounded-lg bg-blue-600 hover:bg-blue-700"
          >
            Reset Match
          </button>
          {isMatchOver && (
            <button
              onClick={downloadPDF}
              className="px-6 py-2 text-xl md:text-2xl font-bold rounded-lg bg-yellow-500 hover:bg-yellow-600"
            >
              Download PDF
            </button>
          )}
        </div>

        {/* Total Score */}
        <div className="bg-gray-900 text-red-500 p-8 rounded-2xl shadow-lg flex flex-col items-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-2">Total Score</h3>
          <p className="text-5xl md:text-6xl font-extrabold">{totalScore}</p>
        </div>
      </div>

      {/* Referee Scores */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-8 w-full max-w-screen-2xl">
        {refereeScores.map((score, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h4 className="text-xl md:text-2xl font-bold text-white-400">Referee {index + 1}</h4>
            {!isMatchOver ? (
              <input
                type="number"
                max={10}
                min={0}
                value={score}
                onChange={(e) => {
                  const value = Math.min(Math.max(parseInt(e.target.value) || 0, 0), 10);
                  setRefereeScores((prev) => {
                    const updatedScores = [...prev];
                    updatedScores[index] = value;
                    return updatedScores;
                  });
                }}
                className="mt-4 w-full text-center text-2xl md:text-3xl bg-black text-white border rounded-lg p-2"
              />
            ) : (
              <p className="mt-4 text-xl md:text-2xl font-bold text-green-400">Final Score: {score}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
