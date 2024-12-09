import executeQuery from "@/helpers/dbConnection";
import { FIGHT_MASTER } from "@/utils/tables";

export function addNewFightMatchModel(request) {
  return new Promise((resolve, reject) => {
    const tempObj = {
      playerRed: request.playerRed,
      stateRed: request.stateRed,
      playerBlue: request.playerBlue,
      stateBlue: request.stateBlue,
      category: request.category,
      age: request.age,
      weight: request.weight,
      // matchName: request.matchName,
    };

    const insertQuery = `INSERT INTO ${FIGHT_MASTER} SET ?`;

    executeQuery(insertQuery, [tempObj])
      .then((insertResult) => {
        if (insertResult.affectedRows > 0) {
          const matchNo = insertResult.insertId;
          resolve({
            success: true,
            matchNo,
          });
        } else {
          reject(new Error("Insertion failed"));
        }
      })
      .catch((error) => {
        console.error("Error inserting fight match:", error);
        reject(error);
      });
  });
}

export function getAvailableMatches() {
  return new Promise((resolve, reject) => {
    const selectQuery = `SELECT matchNo AS id, CONCAT('Match ', matchNo) AS label, matchNo AS value FROM ${FIGHT_MASTER} `;

    executeQuery(selectQuery)
      .then((result) => {
        if (result && result.length > 0) {
          // Map the result to match the required format
          const pendingMatches = result.map((match) => ({
            id: match.id.toString(),
            label: match.label,
            value: match.value.toString(),
          }));
          resolve(pendingMatches);
        } else {
          resolve([]); // No pending matches found
        }
      })
      .catch((error) => {
        console.error("Error fetching available matches:", error);
        reject(error);
      });
  });
}
