import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { useRouter } from "next/router";
import { FaStopwatch, FaTrophy, FaArrowLeft } from "react-icons/fa";
// Import jsPDF autoTable plugin
import "jspdf-autotable";
import Image from "next/image";
import { AiOutlineFilePdf } from "react-icons/ai";
import {
  convertFirstLetterCapital,
  getConstant,
  getCookie,
} from "@/utils/utils";

export default function EnhancedScoreboard() {
  const router = useRouter();
  const { participant } = router.query;
  const participantName = convertFirstLetterCapital(participant);

  const [refereeScores, setRefereeScores] = useState([null, null, null, null]);
  const [timer, setTimer] = useState(120); // Set to 120 seconds for a 2-minute match
  const [isMatchOver, setIsMatchOver] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [matchStarted, setMatchStarted] = useState(false);

  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
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

  const startMatch = () => {
    setMatchStarted(true);
    setIsTimerRunning(true); // Automatically starts the timer when the match starts
  };

  // Function to toggle the timer (pause/resume)
  const toggleTimer = () => {
    if (timer > 0) {
      setIsTimerRunning((prev) => !prev);
    }
  };

  // Function to end the match
  const endMatch = () => {
    setIsMatchOver(true);
    setIsTimerRunning(false);
    setMatchStarted(false); // Reset match state
  };

  const resetTimer = () => {
    setTimer(120);
    setIsTimerRunning(false);
    setIsMatchOver(false);
  };

  const downloadPDF = async () => {
    if (!participantName) {
      return alert("Participant name is required to download the PDF.");
    }

    const doc = new jsPDF();

    const loadImage = (url) =>
      new Promise((resolve, reject) => {
        const img = new window.Image(); // Use the native JavaScript Image object
        img.crossOrigin = "anonymous"; // Enable CORS for cross-origin images
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
        img.src = url;
      });

    try {
      const logo = await loadImage("/images/image.png"); // Replace with your logo path
      const watermark = await loadImage("/images/image.png"); // Replace with your watermark path

      // Certificate Title
      doc.setFont("Times", "B", 20);
      doc.text(" Traditional Mardani Sports Championship 2024", 105, 40, {
        align: "center",
      });

      // Add Logo in Header Center
      const pageWidth = doc.internal.pageSize.getWidth(); // Get the PDF page width
      const logoWidth = 20; // Set the width of the logo
      const logoHeight = 20; // Set the height of the logo
      const centerX = (pageWidth - logoWidth) / 2; // Calculate the x-coordinate for centering

      doc.addImage(logo, "PNG", centerX, 10, logoWidth, logoHeight); // Center the logo in the header

      // Certificate Subtitle
      doc.setFont("Times", "B", 18);
      doc.text("Score Certificate", 105, 60, { align: "center" });

      // Participant Information
      doc.setFont("Times", "B", 14);
      doc.text(`This is to certify that`, 105, 70, { align: "center" });

      doc.setFont("Times", "B", 16);
      doc.text(`${participantName}`, 105, 80, { align: "center" });

      doc.setFont("Times", "B", 14);
      doc.text(
        `has participated in the Third National Mardani Sports Championship 2024`,
        105,
        90,
        {
          align: "center",
        }
      );

      doc.setFont("Times", "B", 14);
      doc.text(`and achieved the following score`, 105, 100, {
        align: "center",
      });

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

      // Add Referee Scores Table
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
        headStyles: {
          fillColor: [255, 165, 0], // Orange header background color
          textColor: [255, 255, 255], // White text for better contrast
          fontStyle: "bold",
        },
        bodyStyles: {
          fillColor: [255, 235, 204], // Light orange background for body rows
          textColor: [0, 0, 0], // Black text
        },
        alternateRowStyles: {
          fillColor: [255, 218, 179], // Slightly darker orange for alternate rows
        },
      });

      // // // Add Watermark in the Background
      // const watermarkWidth = 150; // Adjust the size of the watermark
      // const watermarkHeight = 150;
      // doc.addImage(
      //   watermark,
      //   "PNG",
      //   30, // x-coordinate
      //   100, // y-coordinate
      //   watermarkWidth,
      //   watermarkHeight,
      //   undefined,
      //   "0",
      //   0 // Opacity (0 for fully transparent, 1 for fully opaque)
      // );

      // Footer
      doc.setFont("Arial", "I", 10);
      doc.text(
        `Issued by: Mardani Sports Federation India`,
        105,
        doc.internal.pageSize.height - 10,
        { align: "center" }
      );

      // Save the PDF
      doc.save(`${participantName}_certificate.pdf`);
    } catch (error) {
      console.error("Error loading images: ", error);
      alert("Failed to load images. Please check the image paths.");
    }
  };

  useEffect(() => {
    const isLoginCheck = getCookie("temp_auth");

    if (isLoginCheck != "true") {
      router.push("/login");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-gray-800 to-black bg-opacity-90 p-3 flex items-center justify-between shadow-2xl rounded-lg">
        {/* Left Logo */}
        <Image
          src="/images/image.png"
          alt="Logo"
          className=" mr-3 rounded-full border-4 border-yellow-400 shadow-lg"
          width={"80"}
          height={"80"}
        />
        {/* <Image
            src="/images/trophy.gif"
            alt="Trophy Animation"
            width={80} // Set the width in pixels
            height={80} // Set the height in pixels
            className="w-24 h-24"
          /> */}

        {/* Title */}
        <h1 className="text-xl md:text-3xl font-bold flex items-center gap-4">
          {/* <FaTrophy
            className="text-yellow-400 animate-bounce"
            size={36}
          /> */}
          {getConstant("TOURNAMENT_TITLE")}
        </h1>

        <div className="flex items-center gap-6">
          <Image
            src="/images/flag.png"
            alt="Right Logo"
            className="rounded-full border-4 border-black-450 shadow-lg"
            width={"85"}
            height={"85"}
          />
        </div>
      </header>

      {/* participantName Section */}
      {participantName && (
        <div className="flex items-center justify-between w-full backdrop-blur-md p-4 space-y-0">
          {/* Participant Name */}
          <div className="flex-grow text-center">
            <h2 className="text-3xl font-bold text-gray-100">
              <span>Participant:</span> {participantName}
            </h2>
          </div>

          {/* Start New Match Button */}
          <div>
            <button
              onClick={() => router.push("/")}
              className="px-8 py-3 text-lg font-semibold text-gray-900 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg shadow-lg hover:from-yellow-500 hover:to-yellow-600 hover:shadow-yellow-500/50 transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-400"
            >
              Start New Match
            </button>
          </div>
        </div>
      )}

      {/* // <h2 className="mt-12 text-3xl md:text-4xl font-semibold bg-gradient-to-r from-blue-500 to-blue-400 text-black px-8 py-4 rounded-lg shadow-lg text-center">
        //   participantName: {participantName}
        // </h2>
      )} */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-16 w-full max-w-screen-2xl px-8">
        {/* Timer Section */}
        <div className="relative bg-gradient-to-tr from-gray-800 to-gray-900 text-white rounded-2xl shadow-2xl flex flex-col items-center justify-between transform transition duration-300 ease-in-out hover:scale-105 ">
          <div className="flex flex-col items-center justify-center mb-4">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <FaStopwatch
                className="mr-4"
                size={36}
              />
              {isMatchOver ? "Match Over" : "Time Remaining"}
            </h3>

            <p
              className="text-9xl font-bold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              {formatTime(timer)}
            </p>
          </div>

          {/* Progress Bar Container at the bottom */}
          <div className="w-full h-3 bg-gray-600 rounded-full mt-4 ">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
              style={{
                width: `${(timer / 120) * 100}%`, // Dynamically adjust width based on time
                transition: "width 0.5s ease-in-out",
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-8 justify-center">
          {/* Start Match Button */}
          {!matchStarted && !isMatchOver && (
            <button
              onClick={startMatch}
              className="rounded-full px-2 py-4 text-2xl font-bold bg-blue-600 hover:bg-blue-700 transition duration-200"
            >
              Start Match
            </button>
          )}

          {/* Pause Timer Button */}
          {matchStarted && !isMatchOver && isTimerRunning && (
            <button
              onClick={toggleTimer}
              className="rounded-full px-8 py-4 text-2xl font-bold bg-red-600 hover:bg-red-500 transition duration-200"
            >
              Pause Timer
            </button>
          )}

          {/* Resume Timer Button */}
          {matchStarted && !isMatchOver && !isTimerRunning && timer != 0 && (
            <div className="flex gap-4">
              <button
                onClick={toggleTimer}
                className="rounded-full px-8 py-4 text-2xl font-bold bg-green-600 hover:bg-green-700 transition duration-200"
              >
                Resume Timer
              </button>
              <button
                onClick={endMatch}
                className="rounded-full px-8 py-4 text-2xl font-bold bg-yellow-600 hover:bg-yellow-700 transition duration-200"
              >
                End Match
              </button>
            </div>
          )}

          {/* Download PDF Button */}
          {(isMatchOver || timer == 0) && (
            <button
              onClick={downloadPDF}
              className="rounded-full px-8 py-4 text-2xl font-bold bg-red-600 hover:bg-red-700 flex justify-center items-center space-x-2 transition-transform duration-300 ease-in-out "
            >
              <AiOutlineFilePdf size={24} />
              <span>Download PDF</span>
            </button>
          )}
        </div>

        {/* Total Score */}
        <div className="bg-gradient-to-br from-yellow-600 to-yellow-400 text-black p-12 rounded-2xl shadow-2xl flex flex-col items-center transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:from-yellow-500 hover:to-yellow-300">
          <h3 className="text-4xl font-bold mb-4">Total Score</h3>
          <p className="text-6xl md:text-8xl font-extrabold">{totalScore}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-16 w-full max-w-screen-2xl px-8">
        {refereeScores.map((score, index) => (
          <div
            key={index}
            className="bg-gradient-to-t from-gray-500 to-gray-800 p-8 rounded-lg shadow-1xl text-center flex flex-col justify-center items-center transform transition duration-300 ease-in-out hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:from-gray-600 hover:to-gray-800"
          >
            <h4 className="text-4xl md:text-3xl font-bold text-yellow-400">
              पंच {index + 1}
            </h4>
            <p className="mt-4 text-lg text-yellow-400 ">
              Given Score: {score !== null ? score : "None"}
            </p>
            <div className="mt-4 w-full">
              {/* Input Box for Score */}
              <input
                type="number"
                min="5"
                max="10"
                step="1"
                value={score || ""}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setRefereeScores((prev) => {
                    const updatedScores = [...prev];
                    updatedScores[index] = isNaN(value) ? null : value; // Update or reset score
                    return updatedScores;
                  });
                }}
                className="w-full p-2 text-2xl font-bold rounded-lg bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter score"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
