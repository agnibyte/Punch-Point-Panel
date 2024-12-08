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
      matchNo: request.matchNo,
      matchName: request.matchName,
    };

    const insertQuery = `INSERT INTO ${FIGHT_MASTER} SET ?`;

    executeQuery(insertQuery, [tempObj])
      .then((insertResult) => {
        if (insertResult.affectedRows > 0) {
          // console.log("Insert successful", insertResult);
          resolve(true);
        } else {
          reject(new Error("Insertion failed"));
        }
      })
      .catch((error) => {
        console.log("Error inserting fight match:", error);
        reject(error);
      });
  });
}
