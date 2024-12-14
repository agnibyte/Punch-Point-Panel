import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function MatchResults() {
  const router = useRouter();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const isLoginCheck = "true"; // Temporarily bypass auth
    if (isLoginCheck !== "true") {
      router.push("/login");
    } else {
      loadDummyData();
    }
  }, []);

  const loadDummyData = () => {
    const dummyData = [
      {
        id: 1,
        match_id: 4,
        round_number: 1,
        red_score: 0,
        blue_score: 0,
        round_winner: "none",
        referee1_score: 2,
        referee2_score: null,
        referee3_score: null,
        status: "active",
      },
    ];
    setMatches(dummyData);
  };

  return (
    <div>
      <h1>Match Results</h1>
      {matches.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Match ID</th>
              <th>Round Number</th>
              <th>Red Score</th>
              <th>Blue Score</th>
              <th>Round Winner</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <tr key={match.id}>
                <td>{match.match_id}</td>
                <td>{match.round_number}</td>
                <td>{match.red_score}</td>
                <td>{match.blue_score}</td>
                <td>{match.round_winner}</td>
                <td>{match.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No match results available.</p>
      )}
    </div>
  );
}
