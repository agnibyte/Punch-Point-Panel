import {
  addNeUserModel,
  getAllUsers,
  verifyUserModel,
} from "../models/userModel";

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
export function addNeUserController(request) {
  return new Promise((resolve, reject) => {
    const response = {
      status: false,
    };
    console.log("request ======a", request);
    addNeUserModel(request)
      .then((result) => {
        if (result) {
          response.status = true;
          response.message = "User added successfully";
          resolve(response);
        } else {
          response.message = "cannot add user";
          resolve(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function verifyUserController(request) {
  return new Promise((resolve, reject) => {
    const response = {
      status: false,
    };
    const user_id = request.user_id;
    const password = request.password;

    verifyUserModel(user_id, password)
      .then((result) => {
        if (result.status) {
          response.status = true;
          response.message = "User login successfully";
          resolve(response);
        } else {
          response.message = result.message;
          resolve(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
