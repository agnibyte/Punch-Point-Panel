import React from "react";

export default function FinalResultModal({
  redScore,
  blueScore,
  onReset,
  onExit,
}) {
  const winner =
    redScore > blueScore
      ? "Player 1 (Red)"
      : blueScore > redScore
      ? "Player 2 (Blue)"
      : "It's a Tie!";

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-black">Match Results</h2>
      <div className="text-center">
        <p className="text-xl font-semibold mb-2 text-black">Final Scores</p>
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
            // onClick={onReset}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Reset Match
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