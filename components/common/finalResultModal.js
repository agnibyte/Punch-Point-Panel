import React from "react";

export default function FinalResultModal({
  redScore,
  blueScore,
  onReset,
  onExit,
  currentMatchNo,
}) {
  const winner =
    redScore > blueScore
      ? "Player 1 (Red)"
      : blueScore > redScore
      ? "Player 2 (Blue)"
      : "It's a Tie!";

  const handleDownload = () => {
    const resultData = `
      Match Results:
      - Player 1 (Red): ${redScore}
      - Player 2 (Blue): ${blueScore}
      - Winner: ${winner}
    `;
    const blob = new Blob([resultData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "match_results.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white p-10 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-black">
        Match Results
      </h2>
      <div className="text-center">
        <p className="text-xl font-semibold mb-2 text-black">Final Scores</p>
        <p className="text-xl font-semibold mb-2 text-black">
          Match {currentMatchNo || "-"}
        </p>
        <div className="flex justify-center space-x-8 mb-4">
          <div className="text-red-600">
            <p className="text-lg font-bold">Player 1 (Red)</p>
            <p className="text-3xl font-extrabold">{redScore}</p>
          </div>
          <div className="text-blue-600">
            <p className="text-lg font-bold">Player 2 (Blue)</p>
            <p className="text-3xl font-extrabold">{blueScore}</p>
          </div>
        </div>
        <p className="text-xl font-bold text-green-700 mb-6">{winner}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleDownload}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Download Result
          </button>
          <button
            onClick={onExit}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
