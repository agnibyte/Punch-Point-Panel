import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Referee() {
  const router = useRouter();
  const [animation, setAnimation] = useState({ player: null, show: false });

  // Function to handle point increment
  const handleGivePoint = (player) => {
    // Trigger the animation
    setAnimation({ player, show: true });

    // Reset animation after it completes
    setTimeout(() => setAnimation({ player: null, show: false }), 1000);

    // Send the score increment action to the Scoreboard
    window.localStorage.setItem("lastPointPlayer", player);
    window.dispatchEvent(new Event("storage")); // Trigger storage event
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-700 via-gray-900 to-black relative overflow-hidden">
      <h1 className="text-4xl md:text-6xl text-white font-extrabold mb-12 tracking-wide">
        Referee Panel
      </h1>

      <div className="flex flex-wrap justify-center items-center w-full gap-8">
        {/* Player 1 Button */}
        <button
          onClick={() => handleGivePoint("red")}
          className="relative bg-red-500 text-white text-2xl md:text-4xl w-full md:w-1/3 h-48 md:h-64 rounded-full shadow-2xl hover:scale-105 hover:bg-red-600 transition transform duration-300 ease-out flex items-center justify-center"
        >
          Player 1
          {animation.show && animation.player === "red" && (
            <div className="absolute text-5xl font-extrabold text-white animate-pop-out -top-14">
              +1
            </div>
          )}
        </button>

        {/* Player 2 Button */}
        <button
          onClick={() => handleGivePoint("blue")}
          className="relative bg-blue-500 text-white text-2xl md:text-4xl w-full md:w-1/3 h-48 md:h-64 rounded-full shadow-2xl hover:scale-105 hover:bg-blue-600 transition transform duration-300 ease-out flex items-center justify-center"
        >
          Player 2
          {animation.show && animation.player === "blue" && (
            <div className="absolute text-5xl font-extrabold text-white animate-pop-out -top-14">
              +1
            </div>
          )}
        </button>
      </div>

    </div>
  );
}
