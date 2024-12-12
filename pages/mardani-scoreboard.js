import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { useRouter } from "next/router";
import { FaStopwatch, FaTrophy, FaArrowLeft } from "react-icons/fa";

export default function EnhancedScoreboard() {
  const router = useRouter();
  const { participant } = router.query;

  const [refereeScores, setRefereeScores] = useState([0, 0, 0, 0]);
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
  };

  const downloadPDF = () => {
    if (!participant) return alert("Participant name is required to download the PDF.");

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
      {/* Header */}
      <header className="w-full bg-black bg-opacity-90 p-8 flex items-center justify-between shadow-2xl">
        <img src="/images/image.png" alt="Logo" className="w-24 h-24 rounded-full" />
        <h1 className="text-4xl md:text-6xl font-bold flex items-center gap-4">
          <FaTrophy className="text-yellow-400" size={48} /> Traditional Mardani Sports Scoreboard
        </h1>
        <button onClick={() => router.back()} className="flex items-center gap-4 text-xl md:text-2xl">
          <FaArrowLeft size={24} /> Back
        </button>
      </header>

      {/* Participant Section */}
      {participant && (
        <h2 className="mt-12 text-3xl md:text-4xl font-semibold bg-blue-400 text-black px-8 py-4 rounded text-center">
          Participant: {participant}
        </h2>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-16 w-full max-w-screen-2xl">
        {/* Timer Section */}
        <div className="bg-gray-900 text-green-400 p-12 rounded-2xl shadow-2xl flex flex-col items-center relative">
          <h3 className="text-2xl font-semibold mb-4">
            <FaStopwatch className="inline mr-4" size={36} />
            {isMatchOver ? "Match Over" : "Time Remaining"}
          </h3>
          <p className="text-8xl md:text-8xl font-mono">{formatTime(timer)}</p>
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
        <div className="flex flex-col gap-8 justify-center">
          {!isMatchOver && (
            <button
              onClick={toggleTimer}
              className={`px-8 py-4 text-2xl font-bold rounded-lg transition ${
                isTimerRunning ? "bg-red-600 hover:bg-red-500" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isTimerRunning ? "Stop Timer" : "Start Timer"}
            </button>
          )}
          <button
            onClick={resetTimer}
            className="px-8 py-4 text-2xl font-bold rounded-lg bg-blue-600 hover:bg-blue-700"
          >
            Reset Timer
          </button>
          <button
            onClick={downloadPDF}
            className="px-8 py-4 text-2xl font-bold rounded-lg bg-yellow-500 hover:bg-yellow-600"
          >
            Download PDF
          </button>
        </div>

        {/* Total Score */}
        <div className="bg-gray-900 text-yellow-400 p-12 rounded-2xl shadow-2xl flex flex-col items-center">
          <h3 className="text-4xl font-bold mb-4">Total Score</h3>
          <p className="text-6xl md:text-8xl font-extrabold">{totalScore}</p>
        </div>
      </div>

      {/* Referee Scores */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-16 w-full max-w-screen-2xl">
        {refereeScores.map((score, index) => (
          <div key={index} className="bg-gray-800 p-8 rounded-lg shadow-2xl text-center">
            <h4 className="text-2xl md:text-3xl font-bold text-yellow-400">Referee {index + 1}</h4>
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
                className="mt-8 w-full text-center text-4xl bg-black text-white border rounded-lg p-4"
              />
            ) : (
              <p className="mt-8 text-3xl font-bold text-green-400">Final Score: {score}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
