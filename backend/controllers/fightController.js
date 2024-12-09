import {
  addNewFightMatchModel,
  getAvailableMatches,
} from "../models/fightModel";

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
export function getAvailableMatchesController(request) {
  return new Promise((resolve, reject) => {
    const response = {
      status: false,
    };

    getAvailableMatches()
      .then((result) => {
        console.log("result", result);
        if (result.length > 0) {
          response.status = true;
          response.data = result;
          resolve(response);
        } else {
          response.data = [];
          response.message = "No matches were found";
          resolve(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
