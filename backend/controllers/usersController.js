import { getAllUsers } from "../models/userModel";

export function getCustomers(request) {
  return new Promise((resolve, reject) => {
    const response = {
      status: false,
    };

    getAllUsers()
      .then((result) => {
        if (result) {
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
