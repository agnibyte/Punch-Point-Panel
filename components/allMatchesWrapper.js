import React, { useEffect, useState } from "react";
import { postApiData } from "@/utils/services/apiService";

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
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Match List
        </h1>

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
                  <th className="border border-gray-400 px-8 py-4 text-left text-lg font-bold">
                    Match No
                  </th>
                  <th className="border border-gray-400 px-8 py-4 text-left text-lg font-bold">
                    Red Corner
                  </th>
                  <th className="border border-gray-400 px-8 py-4 text-left text-lg font-bold">
                    Blue Corner
                  </th>
                  <th className="border border-gray-400 px-8 py-4 text-left text-lg font-bold">
                    Category
                  </th>
                  <th className="border border-gray-400 px-8 py-4 text-left text-lg font-bold">
                    Age
                  </th>
                  <th className="border border-gray-400 px-8 py-4 text-left text-lg font-bold">
                    Weight (kg)
                  </th>
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
                    <td className="border border-gray-400 px-8 py-4 text-gray-800 font-bold text-base">
                      {match.matchNo}
                    </td>
                    <td className="border border-gray-400 px-8 py-4 text-red-600 font-semibold text-base">
                      {match.playerRed} ({match.stateRed})
                    </td>
                    <td className="border border-gray-400 px-8 py-4 text-blue-600 font-semibold text-base">
                      {match.playerBlue} ({match.stateBlue})
                    </td>
                    <td className="border border-gray-400 px-8 py-4 text-gray-800 font-semibold text-base">
                      {match.category}
                    </td>
                    <td className="border border-gray-400 px-8 py-4 text-gray-800 font-semibold text-base">
                      {match.age}
                    </td>
                    <td className="border border-gray-400 px-8 py-4 text-gray-800 font-semibold text-base">
                      {match.weight}
                    </td>
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
