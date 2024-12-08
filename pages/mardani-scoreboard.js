import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { useRouter } from "next/router";

export default function MardaniScoreboard() {
  const router = useRouter();
  const { participant } = router.query; // Get participant name from query param

  const [refereeScores, setRefereeScores] = useState([0, 0, 0, 0]);
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [isMatchOver, setIsMatchOver] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false); // Timer running state

  // Timer Logic
  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsMatchOver(true);
    }

    // Clear interval when timer stops or reaches 0
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

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

  const toggleTimer = () => {
    if (timer > 0) {
      setIsTimerRunning((prev) => !prev);
    }
  };

  const resetTimer = () => {
    setTimer(120); // Reset to initial time (2 minutes)
    setIsTimerRunning(false);
    setIsMatchOver(false);
  };

  // Function to generate and download PDF
  const downloadPDF = () => {
    if (!participant) {
      alert("Participant name is required to download the PDF.");
      return;
    }

    const doc = new jsPDF();

    doc.setFont("Arial", "B", 16);
    doc.text("Mardani Match Scoreboard", 20, 20);

    // Ensure participant name is available in the PDF
    doc.setFont("Arial", "I", 12);
    doc.text(`Participant: ${participant}`, 20, 30);
    doc.text(`Match Status: ${isMatchOver ? "Match Over" : "In Progress"}`, 20, 40);
    doc.text(`Time Remaining: ${formatTime(timer)}`, 20, 50);
    doc.text(`Total Score: ${totalScore}`, 20, 60);

    doc.text("Referee Scores:", 20, 70);
    refereeScores.forEach((score, index) => {
      doc.text(`Referee ${index + 1}: ${score}`, 20, 80 + index * 10);
    });

    // Save PDF with the participant's name
    doc.save(`${participant}_scoreboard.pdf`);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600 min-h-screen flex flex-col items-center justify-center text-white">
      {/* Header */}
      <h1 className="text-5xl font-extrabold mb-4 text-center">
        Mardani Match Scoreboard
      </h1>

      {/* Display Participant Name */}
      {participant && (
        <div className="text-xl font-semibold mt-4">
          <span>Participant: {participant}</span>
        </div>
      )}

      {/* Score and Timer Boxes - Horizontally Aligned */}
      <div className="flex space-x-12 mt-12">
        {/* Total Score */}
        <div className="text-3xl font-bold bg-white text-indigo-600 px-6 py-4 rounded-full shadow-md">
          Total Score: {totalScore}
        </div>

        {/* Timer */}
        <div className="flex items-center justify-center bg-white text-indigo-600 rounded-full px-6 py-3 shadow-lg">
          {isMatchOver ? (
            <span className="text-2xl font-bold">Match Over</span>
          ) : (
            <div className="text-2xl font-bold">
              <span>Time Remaining: {formatTime(timer)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Timer Control Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        {!isMatchOver && (
          <button
            onClick={toggleTimer}
            className={`px-6 py-3 rounded-lg text-white shadow-md transition-transform transform hover:scale-105 ${
              isTimerRunning
                ? "bg-red-600 hover:bg-red-700"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isTimerRunning ? "Stop Timer" : "Start Timer"}
          </button>
        )}
      </div>

      {/* Referee Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
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

      {/* Timer Control Buttons */}
      <div className="mt-8 flex space-x-4">
        {!isMatchOver && (
          <button
            onClick={toggleTimer}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105"
          >
            {isTimerRunning ? "Stop Timer" : "Start Timer"}
          </button>
        )}
        <button
          onClick={resetTimer}
          className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-transform transform hover:scale-105"
        >
          Reset Timer
        </button>
      </div>

      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="mt-8 px-6 py-3 bg-white text-indigo-600 rounded-lg shadow-md hover:bg-gray-200 transition-transform transform hover:scale-105"
      >
        Back to Home
      </button>

      {/* Download PDF Button */}
      <button
        onClick={downloadPDF}
        className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:scale-105"
      >
        Download Score as PDF
      </button>
    </div>
  );
}
