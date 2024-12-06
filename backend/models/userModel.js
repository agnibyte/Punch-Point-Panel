// import { currentTime, currentTimestamp } from "@/utils/helpers/dateHelper";

import executeQuery from "@/helpers/dbConnection";

export function getAllUsers() {
  return new Promise((resolve, reject) => {
    const getSql = "SELECT * FROM test_one";

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
