import Link from "next/link";
import React from "react";

export default function HomeFooter() {
  return (
    <>
      <footer className="w-full bg-white py-6 mt-auto">
        <div className="text-center text-sm text-gray-500">
          <p>
            All rights are reserved to{" "}
            <span className="font-semibold text-gray-700">
              {" "}
              Mardani Sports Federation India{" "}
            </span>{" "}
            and{" "}
            <Link
              href="https://www.agni-byte.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700"
            >
              AgniByte Private Limited
            </Link>{" "}
            2024.
          </p>
        </div>
      </footer>
    </>
  );
}
