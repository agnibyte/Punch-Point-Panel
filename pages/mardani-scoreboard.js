import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { useRouter } from "next/router";
import { FaStopwatch, FaTrophy, FaArrowLeft } from "react-icons/fa";
import "jspdf-autotable";
import Image from "next/image";

export default function EnhancedScoreboard() {
  const router = useRouter();
  const { participant } = router.query;

  const [refereeScores, setRefereeScores] = useState([0, 0, 0, 0]);
  const [timer, setTimer] = useState(120); // 2 minutes
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
    doc.setFont("Times", "B", 20);
    doc.text("Mardani Sports Championship", 105, 40, { align: "center" });
    doc.setFont("Times", "B", 18);
    doc.text("Score Certificate", 105, 60, { align: "center" });
    doc.setFont("Times", "B", 14);
    doc.text(`This is to certify that`, 105, 70, { align: "center" });
    doc.setFont("Times", "B", 16);
    doc.text(`${participant}`, 105, 80, { align: "center" });
    doc.setFont("Times", "B", 14);
    doc.text(`has participated in the Mardani Sports Championship`, 105, 90, { align: "center" });
    doc.text(`and achieved the following score`, 105, 100, { align: "center" });
    doc.setFont("Times", "B", 20);
    doc.text(`Total Score: ${totalScore}`, 105, 110, { align: "center" });
    doc.setFont("Times", "normal", 14);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, 130, { align: "center" });

    doc.autoTable({
      startY: 155,
      head: [["Referee", "Score"]],
      body: refereeScores.map((score, index) => [`Referee ${index + 1}`, score]),
      theme: "grid",
      styles: { fontSize: 16, cellPadding: 5, valign: "middle", halign: "center", font: "Times" },
    });

    doc.setFont("Arial", "I", 10);
    doc.text(`Mardani Sports Championship 2024`, 105, doc.internal.pageSize.height - 10, {
      align: "center",
    });

    doc.save(`${participant}_certificate.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center p-4 md:p-8">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-gray-800 to-black bg-opacity-90 p-4 md:p-8 flex flex-wrap items-center justify-between shadow-2xl rounded-lg gap-4">
        <Image
          src="/images/image.png"
          alt="Logo"
          className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-yellow-400 shadow-lg"
          width={"96"}
          height={"96"}
        />
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold flex items-center gap-2 md:gap-4">
          <FaTrophy className="text-yellow-400 animate-bounce" size={36} />
          Traditional Mardani Scoreboard
        </h1>
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 md:gap-4 px-4 md:px-6 py-2 md:py-3 text-sm md:text-lg lg:text-xl text-yellow-300 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 hover:text-yellow-400 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FaArrowLeft size={24} />
            Start New Match
          </button>
          <Image
            src="/images/flag.png"
            alt="Right Logo"
            className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-black-450 shadow-lg"
            width={"96"}
            height={"96"}
          />
        </div>
      </header>

      {participant && (
        <h2 className="mt-8 md:mt-12 text-xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-blue-500 to-blue-400 text-black px-4 md:px-8 py-2 md:py-4 rounded-lg shadow-lg text-center">
          Participant: {participant}
        </h2>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-16 w-full max-w-screen-2xl">
        <div className="relative bg-gradient-to-tr from-black-800 to-white-900 text-white-100 p-6 md:p-12 rounded-2xl shadow-2xl flex flex-col items-center justify-center transform transition duration-300 ease-in-out hover:scale-105">
          <h3 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4 flex items-center">
            <FaStopwatch className="mr-2 md:mr-4" size={24} />
            {isMatchOver ? "Match Over" : "Time Remaining"}
          </h3>
          <p className="text-4xl md:text-8xl font-mono">{formatTime(timer)}</p>
        </div>

        <div className="flex flex-col gap-4 md:gap-8 justify-center">
          {!isMatchOver && (
            <button
              onClick={toggleTimer}
              className={`rounded-full px-4 md:px-8 py-2 md:py-4 text-lg md:text-2xl font-bold  transition duration-200 ${
                isTimerRunning ? "bg-red-600 hover:bg-red-500" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isTimerRunning ? "Stop Timer" : "Start Timer"}
            </button>
          )}
          {isMatchOver && (
            <button
              onClick={downloadPDF}
              className="rounded-full px-4 md:px-8 py-2 md:py-4 text-lg md:text-2xl font-bold bg-yellow-500 hover:bg-yellow-600"
            >
              Download PDF
            </button>
          )}
        </div>

        <div className="bg-gradient-to-br from-yellow-600 to-yellow-400 text-black p-6 md:p-12 rounded-2xl shadow-2xl flex flex-col items-center">
          <h3 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Total Score</h3>
          <p className="text-4xl md:text-6xl lg:text-8xl font-extrabold">{totalScore}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-8 md:mt-16 w-full max-w-screen-2xl">
        {refereeScores.map((score, index) => (
          <div
            key={index}
            className="bg-gradient-to-t from-gray-500 to-gray-800 p-4 md:p-8 rounded-lg shadow-lg text-center flex flex-col justify-center items-center transform transition duration-300 ease-in-out hover:scale-105"
          >
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
                className="mt-4 md:mt-8 w-full text-center text-xl md:text-4xl bg-gray-800 text-yellow-400 border border-gray-600 rounded-lg p-2 md:p-4"
              />
            ) : (
              <p className="mt-4 md:mt-8 text-lg md:text-3xl font-bold text-green-400">
                Final Score: {score}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
