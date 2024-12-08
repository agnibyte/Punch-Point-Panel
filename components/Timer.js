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

  // const handleAddTime = () => {
  //   setTimeLeft((prev) => moment.duration(prev.asSeconds() + 10, "seconds")); // Add 10 seconds
  // };

  // const handleSubtractTime = () => {
  //   setTimeLeft((prev) =>
  //     moment.duration(Math.max(0, prev.asSeconds() - 10), "seconds")
  //   ); // Subtract 10 seconds (ensure time doesn't go negative)
  // };

  const formattedTime = `${timeLeft.minutes()}:${timeLeft
    .seconds()
    .toString()
    .padStart(2, "0")}`;

  // Calculate progress percentage for the loading bar
  const progress = (timeLeft.asSeconds() / duration) * 100;

  return (
    <div className="text-center bg-gray-900 text-white py-5 md:py-8 px-24 rounded-lg shadow-lg">
      {/* <div className="text-4xl font-bold mb-6">Scoreboard Timer</div> */}
      <div className="text-6xl font-extrabold   rounded-lg px-12 py-7 ">
        {formattedTime}
      </div>
      <div className="w-full bg-gray-700 h-2 rounded-lg overflow-hidden mb-6">
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
              className="bg-transparent border-2 border-red-500 text-red-500 font-bold py-3 px-6 rounded-lg text-lg hover:bg-red-500 hover:text-white transition"
            >
              Pause
            </button>
          ) : (
            <div className="flex space-x-4 mt-6">
              {/* Resume Button */}
              <button
                onClick={handleResume}
                className="bg-transparent border-2 border-blue-500 text-blue-500 font-bold py-3 px-6 rounded-lg text-lg hover:bg-blue-500 hover:text-white transition"
              >
                Resume
              </button>

              {/* New Button 1 
              <button
                // onClick={handleNewAction1}
                className="bg-transparent border-2 border-green-500 text-green-500 font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-500 hover:text-white transition"
              >
                Action 1
              </button>*/}

              {/* New Button 2 */}
              <button
                // onClick={handleNewAction2}
                className="bg-transparent border-2 border-red-500 text-red-500 font-bold py-3 px-6 rounded-lg text-lg hover:bg-red-500 hover:text-white transition"
              >
                Result
              </button>
            </div>
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
