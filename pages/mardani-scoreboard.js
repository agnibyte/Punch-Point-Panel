import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { useRouter } from "next/router";
import { FaStopwatch, FaTrophy, FaArrowLeft } from "react-icons/fa";
// Import jsPDF autoTable plugin
import "jspdf-autotable";
import Image from "next/image";

export default function EnhancedScoreboard() {
  const router = useRouter();
  const { participant } = router.query;

  const [refereeScores, setRefereeScores] = useState([0, 0, 0, 0]);
  const [timer, setTimer] = useState(120); // Set to 120 seconds for a 2-minute match
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
    if (!participant)
      return alert("Participant name is required to download the PDF.");

    const doc = new jsPDF();

    // Certificate Title
    doc.setFont("Times", "B", 20);
    doc.text("Mardani Sports Championship", 105, 40, { align: "center" });
    doc.setFont("Times", "B", 18);
    doc.text("Score Certificate", 105, 60, { align: "center" });

    // Participant Information
    doc.setFont("Times", "B", 14);
    doc.text(`This is to certify that`, 105, 70, { align: "center" });

    doc.setFont("Times", "B", 16);
    doc.text(`${participant}`, 105, 80, { align: "center" });

    doc.setFont("Times", "B", 14);
    doc.text(`has participated in the Mardani Sports Championship`, 105, 90, {
      align: "center",
    });

    doc.setFont("Times", "B", 14);
    doc.text(`and achieved the following score`, 105, 100, { align: "center" });

    doc.setFont("Times", "B", 20);
    doc.text(`Total Score: ${totalScore}`, 105, 110, { align: "center" });

    // Date
    doc.setFont("Times", "normal", 14);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, 130, {
      align: "center",
    });

    // Referee Scores Section
    doc.setFont("Times", "B", 14);
    doc.text(`Referee Scores:`, 20, 150);

    // Add referee scores table
    const tableStartY = 155;
    doc.autoTable({
      startY: tableStartY,
      head: [["Referee", "Score"]],
      body: refereeScores.map((score, index) => [
        `Referee ${index + 1}`,
        score,
      ]),
      theme: "grid",
      styles: {
        fontSize: 16,
        cellPadding: 5,
        valign: "middle",
        halign: "center",
        font: "Times",
      },
    });

    // // Instructor's Signature (Placeholders for signature)
    // doc.setFont("Times", "normal", 12);
    // doc.text(`Signed by: [Instructor's Name]`, 20, tableStartY + 50);
    // doc.text(`Instructor's Signature`, 20, tableStartY + 60);

    // Footer
    doc.setFont("Arial", "I", 10);
    doc.text(
      `Mardani Sports Championship 2024`,
      105,
      doc.internal.pageSize.height - 10,
      { align: "center" }
    );

    // Save the PDF
    doc.save(`${participant}_certificate.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center p-8">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-gray-800 to-black bg-opacity-90 p-8 flex items-center justify-between shadow-2xl rounded-lg">
        {/* Left Logo */}
        <Image
          src="/images/image.png"
          alt="Logo"
          className="w-24 h-24 rounded-full border-4 border-yellow-400 shadow-lg"
          width={"96"}
          height={"96"}
        />

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold flex items-center gap-4">
          <FaTrophy
            className="text-yellow-400 animate-bounce"
            size={48}
          />
          Traditional Mardani Scoreboard
        </h1>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Start New Match Button */}
          <button
            onClick={() => router.push("/")} // Navigate to the home page
            className="flex items-center gap-4 px-6 py-3 text-xl md:text-2xl text-yellow-300 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 hover:text-yellow-400 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FaArrowLeft size={24} />
            Start New Match
          </button>

          {/* Right Logo */}
          <Image
            src="/images/flag.png"
            alt="Right Logo"
            className="w-24 h-24 rounded-full border-4 border-black-450 shadow-lg"
            width={"96"}
            height={"96"}
          />
        </div>
      </header>

      {/* Participant Section */}
      {participant && (
        <h2 className="mt-12 text-3xl md:text-4xl font-semibold bg-gradient-to-r from-blue-500 to-blue-400 text-black px-8 py-4 rounded-lg shadow-lg text-center">
          Participant: {participant}
        </h2>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-16 w-full max-w-screen-2xl">
        {/* Timer Section */}
        <div className="relative bg-gradient-to-tr from-black-800 to-white-900 text-white-100 p-12 rounded-2xl shadow-2xl flex flex-col items-center justify-center transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:from-gray-700 hover:to-gray-800">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <FaStopwatch
              className="mr-4"
              size={36}
            />
            {isMatchOver ? "Match Over" : "Time Remaining"}
          </h3>
          <p className="text-8xl font-mono">{formatTime(timer)}</p>
          <div
            className="absolute bottom-0 left-0 w-full rounded-2xl bg-green-500"
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
              className={`rounded-full px-8 py-4 text-2xl font-bold  transition duration-200 ${
                isTimerRunning
                  ? "bg-red-600 hover:bg-red-500"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isTimerRunning ? "Stop Timer" : "Start Timer"}
            </button>
          )}
          {isMatchOver && (
            <button
              onClick={downloadPDF}
              className="rounded-full px-8 py-4 text-2xl font-bold bg-yellow-500 hover:bg-yellow-600"
            >
              Download PDF
            </button>
          )}
        </div>

        {/* Total Score */}
        <div className="bg-gradient-to-br from-yellow-600 to-yellow-400 text-black p-12 rounded-2xl shadow-2xl flex flex-col items-center transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:from-yellow-500 hover:to-yellow-300">
          <h3 className="text-4xl font-bold mb-4">Total Score</h3>
          <p className="text-6xl md:text-8xl font-extrabold">{totalScore}</p>
        </div>
      </div>

      {/* Referee Scores */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-16 w-full max-w-screen-2xl">
        {refereeScores.map((score, index) => (
          <div
            key={index}
            className="bg-gradient-to-t from-gray-500 to-gray-800 p-8 rounded-lg shadow-1xl text-center flex flex-col justify-center items-center transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:from-gray-600 hover:to-gray-800"
          >
            <h4 className="text-4xl md:text-3xl font-bold text-yellow-400">
              पंच {index + 1}
            </h4>
            {!isMatchOver ? (
              <input
                type="number"
                max={10}
                min={0}
                value={score}
                onChange={(e) => {
                  const value = Math.min(
                    Math.max(parseInt(e.target.value) || 0, 0),
                    10
                  );
                  setRefereeScores((prev) => {
                    const updatedScores = [...prev];
                    updatedScores[index] = value;
                    return updatedScores;
                  });
                }}
                className="mt-8 w-full text-center text-4xl bg-gray-800 text-yellow-400 border border-gray-600 rounded-lg p-4"
              />
            ) : (
              <p className="mt-8 text-3xl font-bold text-green-400">
                Final Score: {score}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
