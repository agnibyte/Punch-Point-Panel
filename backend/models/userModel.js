// import { currentTime, currentTimestamp } from "@/utils/helpers/dateHelper";

import executeQuery from "@/helpers/dbConnection";
import { REFEREE_MASTER } from "@/utils/tables";
import { hashWithSHA256 } from "@/utils/utils";

export function getAllUsers() {
  return new Promise((resolve, reject) => {
    const getSql = "SELECT matchNo FROM fight_master";
    // const hashedPassword = hashWithSHA256("fightadmin@m1");
    // console.log("hashedPassword", hashedPassword);

    executeQuery(getSql)
      .then((checkResult) => {
        console.log("checkResult", checkResult);
        // if (checkResult.length > 0) {
        // } else {
        // }
        resolve(true);
      })
      .catch((error) => {
        console.log("error in getting user", error);
        reject(error);
      });
  });
}
export function addNeUserModel(request) {
  return new Promise((resolve, reject) => {
    const hashedPassword = hashWithSHA256(request.hash_password);

    let tempObj = {
      user_id: request.user_id,
      hash_password: hashedPassword,
      role: request.role,
    };
    console.log("tempObj", tempObj);
    const insertQuery = `INSERT INTO ${REFEREE_MASTER} SET ?`;

    executeQuery(insertQuery, [tempObj])
      .then((insertResult) => {
        if (insertResult.affectedRows > 0) {
          console.log("Insert user successful", insertResult);
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
export function verifyUserModel(user_id, password) {
  return new Promise((resolve, reject) => {
    const response = {
      status: false,
    };
    const hashedPassword = hashWithSHA256(password);

    const checkUserSql = `SELECT * FROM ${REFEREE_MASTER} WHERE user_id = ?`;

    executeQuery(checkUserSql, [user_id])
      .then((checkUserResult) => {
        if (checkUserResult.length === 0) {
          response.message = "User ID not found";
          return resolve(response);
        }

        const checkPasswordSql = `SELECT * FROM ${REFEREE_MASTER} WHERE user_id = ? and hash_password = ?`;

        executeQuery(checkPasswordSql, [user_id, hashedPassword])
          .then((checkPasswordResult) => {
            if (checkPasswordResult.length > 0) {
              // Password matches
              response.status = true;
              response.user = checkPasswordResult[0].role;
              response.userId = checkPasswordResult[0].user_id ;
              resolve(response);
            } else {
              // Password doesn't match
              response.message = "Incorrect password";
              resolve(response);
            }
          })
          .catch((error) => {
            console.log("Error checking password:", error);
            reject(error);
          });
      })
      .catch((error) => {
        console.log("Error checking user ID:", error);
        reject(error);
      });
  });
}
