import executeQuery from "@/helpers/dbConnection";
import { FIGHT_MASTER, MATCH_SCORES } from "@/utils/tables";

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

export function getRefereeScoresModel(matchId) {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT referee1_score, referee2_score, referee3_score, referee4_score, referee5_red_score, referee5_blue_score FROM ${MATCH_SCORES} WHERE match_id = ? ; `;
    // AND status = 'active'
    console.log("matchId in model===", matchId);

    executeQuery(query, [matchId])
      .then((result) => {
        console.log("result in getRefereeScoresModel", result);
        if (result) {
          resolve(result);
        } else {
          resolve([]); // No pending matches found
        }
      })
      .catch((error) => {
        console.error("Error fetching referee scores:", error);
        reject(error);
      });
  });
}

export async function getRefereeScores(matchId) {
  try {
    const result = await executeQuery(query, [matchId]);
    return result;
  } catch (error) {
    throw new Error("Unable to fetch referee scores.");
  }
}
export function updateMatchScores(matchId, payload) {
  return new Promise((resolve, reject) => {
    // Start building the update query dynamically
    let updateQuery = "UPDATE match_scores SET ";

    console.log("matchId, payload", matchId, payload);

    const updateValues = [];

    // Add columns to be updated based on the payload
    if (payload.red_score !== undefined) {
      updateQuery += "red_score = ?, ";
      updateValues.push(payload.red_score);
    }
    if (payload.blue_score !== undefined) {
      updateQuery += "blue_score = ?, ";
      updateValues.push(payload.blue_score);
    }
    if (payload.round_winner !== undefined) {
      updateQuery += "round_winner = ?, ";
      updateValues.push(payload.round_winner);
    }
    if (payload.referee1_score !== undefined) {
      updateQuery += "referee1_score = referee1_score + ?, ";
      updateValues.push(payload.referee1_score);
    }
    if (payload.referee2_score !== undefined) {
      updateQuery += "referee2_score = referee2_score + ?, ";
      updateValues.push(payload.referee2_score);
    }
    if (payload.referee3_score !== undefined) {
      updateQuery += "referee3_score = referee3_score + ?, ";
      updateValues.push(payload.referee3_score);
    }
    if (payload.referee4_score !== undefined) {
      updateQuery += "referee4_score = referee4_score + ?, ";
      updateValues.push(payload.referee4_score);
    }
    if (payload.referee5_red_score !== undefined) {
      updateQuery += "referee5_red_score = referee5_red_score + ?, ";
      updateValues.push(payload.referee5_red_score);
    }
    if (payload.referee5_blue_score !== undefined) {
      updateQuery += "referee5_blue_score = referee5_blue_score + ?, ";
      updateValues.push(payload.referee5_blue_score);
    }
    if (payload.status !== undefined) {
      updateQuery += "status = ?, ";
      updateValues.push(payload.status);
    }

    // Remove the trailing comma and space
    updateQuery = updateQuery.slice(0, -2);

    // Add the WHERE condition
    updateQuery += " WHERE match_id = ? ";
    updateValues.push(matchId);

    // Execute the query
    executeQuery(updateQuery, updateValues)
      .then((result) => {
        console.log("result from scores", result);
        if (result.affectedRows > 0) {
          resolve({ success: true, message: "Scores updated successfully" });
        } else {
          resolve({ success: false, message: "No match found to update" });
        }
      })
      .catch((error) => {
        console.error("Error updating match scores:", error);
        reject(error);
      });
  });
}

export function getFightMasterData() {
  return new Promise((resolve, reject) => {
    const selectQuery = "SELECT * FROM fight_master";

    executeQuery(selectQuery)
      .then((result) => {
        if (result && result.length > 0) {
          resolve(result); // Resolve with the fetched data
        } else {
          resolve([]); // No data found, return an empty array
        }
      })
      .catch((error) => {
        console.error("Error fetching fight master data:", error);
        reject(error); // Reject with the error
      });
  });
}
