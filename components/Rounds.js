import React, { useState } from "react";

export default function Rounds({
  totalRounds,
  currentRound,
  onRoundChange,
  roundScores,
}) {
  const winScore = 15;
  return (
    <div>
      {/* Round Buttons */}
      <div className="flex justify-center space-x-4 ">
        {[...Array(totalRounds)].map((_, index) => (
          <button
            key={index}
            onClick={() => onRoundChange(index + 1)}
            className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold ${
              index + 1 === currentRound
                ? "bg-yellow-500 text-black"
                : "bg-gray-600 text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Round Scores Table */}
      <div className="mt-6">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="p-2 text-lg border border-gray-300">Player</th>
              {[...Array(totalRounds)].map((_, index) => (
                <th
                  key={index}
                  className="p-2 text-lg border border-gray-300"
                >
                  Round {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Player 1 (Red) */}
            <tr className="text-center">
              <td className="p-2 font-bold text-red-600 border border-gray-300">
                Player 1 (Red)
              </td>
              {roundScores.map((round, index) => (
                <td
                  key={index}
                  className={`p-2 border border-gray-300 ${
                    round.roundWinner == "red" ? "bg-green-300" : ""
                  }`}
                >
                  {round.red}
                </td>
              ))}
            </tr>

            {/* Player 2 (Blue) */}
            <tr className="text-center">
              <td className="p-2 font-bold text-blue-600 border border-gray-300">
                Player 2 (Blue)
              </td>
              {roundScores.map((round, index) => (
                <td
                  key={index}
                  className={`p-2 border border-gray-300 ${
                    round.roundWinner == "blue" ? "bg-green-300" : ""
                  }`}
                >
                  {round.blue}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

{
  /* Rounds 
        <Rounds
          totalRounds={totalRounds}
          currentRound={currentRound}
          onRoundChange={handleRoundChange}
          roundScores={roundScores}
          //   onRoundScoreChange={handleRoundScoreChange}
        />*/
}
