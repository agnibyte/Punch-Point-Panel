import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCookie } from "@/utils/utils";

export default function RefreeWrapper() {
  const router = useRouter();
  const [animation, setAnimation] = useState({ player: null, show: false });
  const [userRole, setUserRole] = useState();
  console.log("userRole", userRole);

  useEffect(() => {
    const user = getCookie("auth_role");
    setUserRole(user);
  }, []);

  const handleGivePoint = (player) => {
    setAnimation({ player, show: true });

    setTimeout(() => setAnimation({ player: null, show: false }), 1000);

    window.localStorage.setItem("lastPointPlayer", player);
    window.dispatchEvent(new Event("storage")); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-700 via-gray-900 to-black relative overflow-hidden">
      <h1 className="text-5xl md:text-6xl text-white font-extrabold mb-12 tracking-wide shadow-lg">
        Referee Panel
      </h1>

      <div className="flex flex-wrap justify-center items-center w-full gap-10">
        {/* Player 1 Button */}
        {(userRole == "fight_admin" || userRole == "red_referee") && (
          <button
            onClick={() => handleGivePoint("red")}
            className="relative bg-gradient-to-r from-red-500 to-red-700 text-white text-2xl md:text-4xl w-full md:w-72 h-72 rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition transform duration-300 ease-out flex items-center justify-center group"
          >
            Player 1
            {animation.show && animation.player === "red" && (
              <div className="absolute text-5xl font-extrabold text-green-500 animate-pop-out -top-14 opacity-80 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                +1
              </div>
            )}
          </button>
        )}

        {/* Player 2 Button */}
        {(userRole == "fight_admin" || userRole == "blue_referee") && (
          <button
            onClick={() => handleGivePoint("blue")}
            className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white text-2xl md:text-4xl w-full md:w-72 h-72 rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition transform duration-300 ease-out flex items-center justify-center group"
          >
            Player 2
            {animation.show && animation.player === "blue" && (
              <div className="absolute text-5xl font-extrabold text-green-500 animate-pop-out -top-14 opacity-80 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                +1
              </div>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
