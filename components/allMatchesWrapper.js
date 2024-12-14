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
    <div className="min-h-screen bg-gray-100 flex flex-col">
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
            <Link href="/" className="text-xl font-bold text-gray-800">
              Sports Mardani Club Championship
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden bg-gray-100 p-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Match List
        </h1>

        {/* Loading / Error State */}
        {loading ? (
          <div className="relative border border-gray-300 h-[80vh] overflow-hidden rounded-lg bg-white">
            <table className="table-auto w-full border-collapse">
              <thead className="sticky top-0 bg-indigo-700 z-10">
                <tr className="text-white">
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
                      className="border border-indigo-200 px-4 py-2 text-left text-lg font-semibold"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(6)].map((_, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="animate-pulse bg-gray-50 hover:bg-gray-200"
                  >
                    {Array(10)
                      .fill("")
                      .map((_, colIndex) => (
                        <td
                          key={colIndex}
                          className="border border-gray-200 px-4 py-3"
                        >
                          <div className="h-5 bg-gray-300 rounded"></div>
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : error ? (
          <div className="text-red-600 font-bold text-xl text-center">
            {error}
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <div className="relative border border-gray-300 h-[80vh] overflow-auto rounded-lg bg-white shadow-lg">
              <table className="table-auto w-full border-collapse">
                <thead className="sticky top-0 bg-indigo-700 text-white">
                  <tr>
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
                        className="border border-indigo-200 px-4 py-3 text-left text-lg font-semibold"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allMatchesData.map((match, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-indigo-50 transition duration-150 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      {[
                        { value: match.matchNo, className: "text-gray-800" },
                        {
                          value: `${match.playerRed} (${match.stateRed})`,
                          className: "text-red-600 font-bold",
                        },
                        {
                          value: `${match.playerBlue} (${match.stateBlue})`,
                          className: "text-blue-600 font-bold",
                        },
                        { value: match.category, className: "text-gray-600" },
                        { value: match.age, className: "text-gray-600" },
                        { value: match.weight, className: "text-gray-600" },
                        {
                          value: match.red_score > 0 ? match.red_score : "-",
                          className: "text-gray-600",
                        },
                        {
                          value: match.blue_score > 0 ? match.blue_score : "-",
                          className: "text-gray-600",
                        },
                        { value: match.winner || "-", className: "text-gray-800" },
                        { value: match.status || "-", className: "text-gray-800" },
                      ].map((cell, i) => (
                        <td
                          key={i}
                          className={`border border-gray-200 px-4 py-3 text-sm ${cell.className}`}
                        >
                          {cell.value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
