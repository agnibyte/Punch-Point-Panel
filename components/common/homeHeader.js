import Link from "next/link";
import React from "react";
import ProfileButton from "./profileButton";
import Image from "next/image";
import { getConstant } from "@/utils/utils";

export default function HomeHeader({ userId, onclickLogOut = () => {} }) {
  return (
    <>
      <header className="w-full bg-gradient-to-r from-grey-600 to-gray-900 shadow-md sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo and Name */}
          <div className="flex items-center space-x-4">
            <Image
              src="/images/image.png"
              alt="Logo"
              className="rounded-full shadow-md"
              width={50}
              height={50}
            />
            <span className="text-2xl font-bold text-white">
              {getConstant("TOURNAMENT_TITLE")}
            </span>
          </div>

          {/* Profile Button */}
          <ProfileButton
            username={userId}
            onclickLogOut={onclickLogOut}
          />
        </div>
      </header>
    </>
  );
}
