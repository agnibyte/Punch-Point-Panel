import React, { useState, useEffect } from "react";
import moment from "moment";

export default function Timer({
  duration,
  onTimerEnd,
  timeLeft,
  setTimeLeft,
  isRunning,
  setIsRunning,
  intervalId,
  setIntervalId,
  handleReset = () => {},
  isMatchStart,
  setIsMatchStart,
}) {
  useEffect(() => {
    // Effect to start the timer when isRunning changes to true
    if (isRunning) {
      const id = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev.asSeconds() <= 1) {
            clearInterval(id);
            onTimerEnd();
            setIsRunning(false);
            return moment.duration(0, "seconds");
          }
          return moment.duration(prev.asSeconds() - 1, "seconds");
        });
      }, 1000);
      setIntervalId(id);
    }

    return () => clearInterval(intervalId); // Cleanup the interval
  }, [isRunning]);

  const handlePlay = () => {
    setIsRunning(true);
    setIsMatchStart(true);
  };
  const handlePause = () => {
    setIsRunning(false);
    clearInterval(intervalId);
  };
  const handleResume = () => setIsRunning(true);

  const handleAddTime = () => {
    setTimeLeft((prev) => moment.duration(prev.asSeconds() + 10, "seconds")); // Add 10 seconds
  };

  const handleSubtractTime = () => {
    setTimeLeft((prev) =>
      moment.duration(Math.max(0, prev.asSeconds() - 10), "seconds")
    ); // Subtract 10 seconds (ensure time doesn't go negative)
  };

  const formattedTime = `${timeLeft.minutes()}:${timeLeft
    .seconds()
    .toString()
    .padStart(2, "0")}`;

  // Calculate progress percentage for the loading bar
  const progress = (timeLeft.asSeconds() / duration) * 100;

  return (
    <div className="text-center bg-gray-900 text-white p-8 rounded-lg shadow-lg">
      <div className="text-4xl font-bold mb-6">Scoreboard Timer</div>
      <div className="text-9xl font-extrabold bg-black text-green-500 rounded-lg px-12 py-8 mb-6">
        {formattedTime}
      </div>
      <div className="w-full bg-gray-700 h-4 rounded-lg overflow-hidden mb-6">
        <div
          className="bg-green-500 h-full"
          style={{ width: `${progress}%`, transition: "width 0.5s ease" }}
        ></div>
      </div>
      {!isRunning && timeLeft.asSeconds() === duration ? (
        <button
          onClick={handlePlay}
          className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg"
        >
          Start Match
        </button>
      ) : (
        <div>
          {isRunning ? (
            <button
              onClick={handlePause}
              className="bg-red-500 text-white font-bold py-3 px-6 rounded-lg text-lg"
            >
              Pause
            </button>
          ) : (
            <button
              onClick={handleResume}
              className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg text-lg"
            >
              Resume
            </button>
          )}
         {/*} <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={handleAddTime}
              className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg"
            >
              +10 Sec
            </button>
            <button
              onClick={handleSubtractTime}
              className="bg-purple-500 text-white font-bold py-2 px-4 rounded-lg"
            >
              -10 Sec
            </button>
          </div>*/}
        </div>
      )}
    </div>
  );
}
