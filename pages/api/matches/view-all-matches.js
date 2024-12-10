// pages/api/matches.js
import mysql from 'mysql2';
import { dbConfig } from '../../helpers/db'; // assuming the database configuration is in helpers/db.js

export default async function handler(req, res) {
  const connection = mysql.createConnection(dbConfig);

  connection.connect();

  try {
    connection.query('SELECT * FROM matches', (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Failed to fetch match data' });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch match data' });
  } finally {
    connection.end();
  }
}
