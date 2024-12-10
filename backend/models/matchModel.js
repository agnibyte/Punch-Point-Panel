// pages/api/matches.js
import mysql from 'mysql2';
import { dbConfig } from '../../helpers/db'; // assuming the database configuration is in helpers/db.js

export default async function handler(req, res) {
  const connection = mysql.createConnection(dbConfig);

  connection.connect();

  try {
    // Update the query to select all relevant columns
    connection.query(
      'SELECT id, match_id, round_number, red_score, blue_score, round_winner, start_time, end_time, status, referee1_score, referee2_score, referee3_score, referee4_score, referee5_score, referee5_red_score, referee5_blue_score FROM match_scores',
      (error, results) => {
        if (error) {
          return res.status(500).json({ message: 'Failed to fetch match data' });
        }
        res.status(200).json(results);
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch match data' });
  } finally {
    connection.end();
  }
}
