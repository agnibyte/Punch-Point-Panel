import React, { useEffect, useState } from "react";
import { postApiData } from "@/utils/services/apiService";
import Link from "next/link";
import Image from "next/image";
import { jsPDF } from "jspdf";
import { AiOutlineFilePdf } from "react-icons/ai";
import { getConstant } from "@/utils/utils";

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

  const downloadMatchCertificate = (match) => {
    const doc = new jsPDF();

    // Decorative Borders (Optional - can be enhanced with images or lines)
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(1);
    doc.rect(10, 10, 190, 277, "S");
    doc.setLineWidth(0.5);
    doc.rect(15, 15, 180, 267, "S");

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(`REPORT CARD MATCH : ${match.matchNo}`, 105, 40, {
      align: "center",
    }); //`${matchNo}`

    // Add Logo Below the Title
    const logoUrl = "/images/image.png"; // Replace with the actual path to the logo image
    const logoWidth = 32; // Adjust logo width
    const logoHeight = 32; // Adjust logo height
    const logoX = 90; // Center the logo horizontally
    const logoY = 45; // Position below the title
    doc.addImage(logoUrl, "PNG", logoX, logoY, logoWidth, logoHeight);

    // Subtitle
    doc.setFont("helvetica", "italic");
    doc.setFontSize(14);
    doc.text("This is to report that", 105, 90, { align: "center" });

    // Player Names (Winner Highlighted if available)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    if (match.winner) {
      doc.text(`Winner: ${match.winner}`, 105, 110, { align: "center" });
    } else {
      doc.text(`${match.playerRed} (Red Corner)`, 105, 110, {
        align: "center",
      });
      doc.text("and", 105, 120, { align: "center" });
      doc.text(`${match.playerBlue} (Blue Corner)`, 105, 130, {
        align: "center",
      });
    }

    // Match Details Section
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Match No: ${match.matchNo}`, 105, 150, { align: "center" });
    doc.text(`Category: ${match.category}`, 105, 160, { align: "center" });
    doc.text(`Age: ${match.age}`, 105, 170, { align: "center" });
    doc.text(`Weight: ${match.weight} kg`, 105, 180, { align: "center" });

    // Scores Section
    doc.setFont("helvetica", "bold");
    doc.text("Scores", 105, 200, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.text(
      `Red Corner: ${match.red_score > 0 ? match.red_score : "-"}`,
      70,
      210
    );
    doc.text(
      `Blue Corner: ${match.blue_score > 0 ? match.blue_score : "-"}`,
      140,
      210
    );

    // Footer
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text("Issued by: Mardani Sports Federation India", 105, 260, {
      align: "center",
    });

    // Save the PDF
    doc.save(`Report_of_the_match${match.matchNo}.pdf`);
  };

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
            <Link
              href="/"
              className="text-xl font-bold text-gray-800"
            >
              {getConstant("TOURNAMENT_TITLE")}
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
              <thead className="sticky top-0 bg-indigo-950 z-10">
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
                    "Report",
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
                    {Array(11)
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
                <thead className="sticky top-0 bg-indigo-950 text-white">
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
                      "Report",
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
                        {
                          value: match.winner || "-",
                          className:
                            match.winner === match.playerRed
                              ? "text-red-600 font-bold"
                              : match.winner === match.playerBlue
                              ? "text-blue-600 font-bold"
                              : "text-gray-800",
                        },
                        {
                          value: match.status || "-",
                          className: "text-gray-800",
                        },
                        {
                          value: (
                            <button
                              onClick={() => downloadMatchCertificate(match)} // Corrected function name
                              className="text-red-600 hover:text-red-900"
                            >
                              <AiOutlineFilePdf size={24} /> PDF
                            </button>
                          ),
                          className: "text-center",
                        },
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
