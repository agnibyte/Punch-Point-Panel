import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function MatchResults() {
  const [matches, setMatches] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated
    const isLoginCheck = getCookie("temp_auth");
    if (isLoginCheck !== "true") {
      router.push("/login");
    } else {
      // Fetch match results
      fetchMatchResults();
    }
  }, []);

  const fetchMatchResults = async () => {
    try {
      const response = await axios.get("/api/match-scores"); // Update with your API endpoint
      setMatches(response.data);
    } catch (error) {
      console.error("Error fetching match results:", error);
    }
  };

  return (
    <div className="container my-4">
      <h1 className="text-center">Match Results</h1>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Match ID</th>
            <th>Round Number</th>
            <th>Red Score</th>
            <th>Blue Score</th>
            <th>Round Winner</th>
            <th>Referee Scores</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {matches.length > 0 ? (
            matches.map((match) => (
              <tr key={match.id}>
                <td>{match.match_id}</td>
                <td>{match.round_number}</td>
                <td className="text-danger">{match.red_score}</td>
                <td className="text-primary">{match.blue_score}</td>
                <td>{match.round_winner || "None"}</td>
                <td>
                  {`R1: ${match.referee1_score || "N/A"}, R2: ${
                    match.referee2_score || "N/A"
                  }, R3: ${match.referee3_score || "N/A"}`}
                </td>
                <td>{match.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No match results available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// Utility function for getting cookies
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
