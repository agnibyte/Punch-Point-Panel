import { addNewFightMatchModel } from "../models/fightModel";

export function addNewFightMatch(request) {
  return new Promise((resolve, reject) => {
    const response = {
      status: false,
    };

    addNewFightMatchModel(request)
      .then((result) => {
        if (result) {
          response.status = true;
          response.matchNo = result.matchNo;
          response.message = "Match added successfully";
          resolve(response);
        } else {
          response.message =
            "Your account is inactive. Please contact customer service.";
          resolve(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
