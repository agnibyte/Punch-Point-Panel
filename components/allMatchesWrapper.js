import React, { useEffect, useState } from "react";
import { postApiData } from "@/utils/services/apiService";
import Link from "next/link";
import Image from "next/image";

export default function AllMatchesWrapper() {
  const [allMatchesData, setAllMatchesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getAllMatches = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await postApiData("GET_ALL_MATCHES");
      if (response.status && response.data.length > 0) {
        setAllMatchesData(response.data);
      } else {
        setAllMatchesData([]);
        setError("No matches found");
      }
    } catch (error) {
      setError("Failed to load match data. Please try again.");
      console.error("Error occurred during form submission:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllMatches();
  }, []);

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-0">
      {/* Header Section */}
      <header className="w-full bg-white shadow-md sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo and Name */}
          <div className="flex items-center space-x-4">
            <Image
              src="/images/image.png"
              alt="Logo"
              className="h-8"
              width={"32"}
              height={"32"}
            />
            <Link
              href={"/"}
              className="text-xl font-bold text-gray-800"
            >
              Sports Mardani Club Championship
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto bg-white rounded-lg p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Match List
        </h1>

        {/* Loading / Error State */}
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="text-indigo-600 font-bold text-xl">
              Loading matches...
            </div>
          </div>
        ) : error ? (
          <div className="text-red-600 font-bold text-xl text-center">
            {error}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-700 text-gray-100">
                  {[
                    "Match No",
                    "Red Corner",
                    "Blue Corner",
                    "Category",
                    "Age",
                    "Weight (kg)",
                    "Red Score",
                    "Blue Score",
                    "Winner",
                    "Status",
                  ].map((header, index) => (
                    <th
                      key={index}
                      className="border border-gray-400 px-6 py-4 text-left text-lg font-bold"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allMatchesData.map((match, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0
                        ? "bg-gray-100 hover:bg-gray-200"
                        : "bg-white hover:bg-gray-100"
                    }
                  >
                    {[
                      {
                        value: match.matchNo,
                        className: "text-gray-800 font-serif text-lg",
                      },
                      {
                        value: `${match.playerRed} (${match.stateRed})`,
                        className: "text-red-600 font-bold text-lg",
                      },
                      {
                        value: `${match.playerBlue} (${match.stateBlue})`,
                        className: "text-blue-600 font-bold text-lg",
                      },
                      {
                        value: match.category,
                        className: "text-gray-800 font-medium text-base",
                      },
                      {
                        value: match.age,
                        className: "text-gray-800 font-medium text-base",
                      },
                      {
                        value: match.weight,
                        className: "text-gray-800 font-medium text-base",
                      },
                      {
                        value: match.red_score > 0 ? match.red_score : "-",
                        className: "text-gray-800 font-medium text-base",
                      },
                      {
                        value: match.blue_score > 0 ? match.blue_score : "-",
                        className: "text-gray-800 font-medium text-base",
                      },
                      {
                        value: match.winner || "-",
                        className: "text-gray-800 font-medium text-base",
                      },
                      {
                        value: match.status || "-",
                        className: "text-gray-800 font-medium text-base",
                      },
                    ].map((cell, i) => (
                      <td
                        key={i}
                        className={`border border-gray-400 px-6 py-4 ${cell.className}`}
                      >
                        {cell.value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
