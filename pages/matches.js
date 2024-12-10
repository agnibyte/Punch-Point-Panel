import { useEffect, useState } from "react";

export default function MatchesPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMatches() {
      try {
        const response = await fetch("/api/matches");
        if (!response.ok) {
          throw new Error("Failed to fetch match data");
        }
        const data = await response.json();
        setMatches(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchMatches();
  }, []);

  if (loading) {
    return <div>Loading matches...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="matches-container">
      <h1 className="page-title">Match Scores</h1>
      {matches.length === 0 ? (
        <p>No matches found.</p>
      ) : (
        <table className="matches-table">
          <thead>
            <tr>
              <th>Match ID</th>
              <th>Round</th>
              <th>Red Score</th>
              <th>Blue Score</th>
              <th>Round Winner</th>
              <th>Status</th>
              <th>Referee Scores</th>
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
                <td>
                  Ref1: {match.referee1_score}, Ref2: {match.referee2_score},
                  Ref3: {match.referee3_score}, Ref4: {match.referee4_score}, Ref5: {match.referee5_score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
