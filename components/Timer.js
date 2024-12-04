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

  return (
    <div className="text-center">
      {!isRunning && timeLeft.asSeconds() === duration ? (
        <button
          onClick={handlePlay}
          className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Start Match
        </button>
      ) : (
        <div>
          <div className="text-8xl font-bold bg-white text-black rounded-lg px-8 py-4 mb-4">
            {formattedTime}
          </div>
          {isRunning ? (
            <button
              onClick={handlePause}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg"
            >
              Pause
            </button>
          ) : (
            <button
              onClick={handleResume}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
            >
              Resume
            </button>
          )}
          <div className="mt-4">
            <button
              onClick={handleAddTime}
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg mx-2"
            >
              +10s
            </button>
            <button
              onClick={handleSubtractTime}
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg mx-2"
            >
              -10s
            </button>
          </div>
          {/* <button
            onClick={handleReset}
            className="mt-6 bg-red-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Reset Timer
          </button> */}
        </div>
      )}
    </div>
  );
}
