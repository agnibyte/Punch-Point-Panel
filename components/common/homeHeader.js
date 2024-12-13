import Link from "next/link";
import React from "react";
import ProfileButton from "./profileButton";

export default function HomeHeader({ userId, onclickLogOut = () => {} }) {
  return (
    <>
      <header className="w-full bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo and Name */}
          <div className="flex items-center space-x-4">
            <img
              src="/images/image.png"
              alt="Logo"
              className="h-8"
            />
            <span className="text-xl font-bold text-gray-800">
              3rd National Mardani Sports Championship 2024
            </span>
          </div>

          <ProfileButton
            username={userId}
            onclickLogOut={onclickLogOut}
          />
        </div>
      </header>
    </>
  );
}
