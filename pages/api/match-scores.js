// /pages/api/match-scores.js
export default function handler(req, res) {
    const matchScores = [
      {
        id: 1,
        match_id: 4,
        round_number: 1,
        red_score: 0,
        blue_score: 0,
        round_winner: "none",
        referee1_score: null,
        referee2_score: null,
        referee3_score: null,
        status: "active",
      },
      // Add more mock data or fetch from a database
    ];
  
    res.status(200).json(matchScores);
  }
  