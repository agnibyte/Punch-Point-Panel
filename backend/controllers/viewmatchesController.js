import { getAllMatchesModel } from "../models/matchModel";

export function viewAllMatchesController(request) {
  return new Promise((resolve, reject) => {
    const response = {
      status: false,
    };

    getAllMatchesModel()
      .then((result) => {
        if (result.length > 0) {
          response.status = true;
          response.matches = result;
          response.message = "Matches fetched successfully";
          resolve(response);
        } else {
          response.message = "No matches found";
          resolve(response);
        }
      })
      .catch((error) => {
        console.log("Error fetching matches:", error);
        reject(error);
      });
  });
}
