import {
  addNewFightMatchModel,
  addNewTraditionalMatchModel,
  getAvailableMatches,
  getAvailableTraditionalMatches,
  getFightMasterData,
  getRedAndBluePlayers,
  getRefereeScoresModel,
  updateMatchScores,
  updateTraditionalMaster,
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
export function addNewTraditionalMatch(request) {
  return new Promise((resolve, reject) => {
    const response = {
      status: false,
    };

    addNewTraditionalMatchModel(request)
      .then((result) => {
        if (result) {
          response.status = true;
          response.matchNo = result.matchNo;
          response.name = result.name;
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
export function getAvailableTraditionalMatchesController(request) {
  return new Promise((resolve, reject) => {
    const response = {
      status: false,
    };

    getAvailableTraditionalMatches()
      .then((result) => {
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

export function getRefereeScoresController(request) {
  return new Promise((resolve, reject) => {
    const response = {
      status: false,
    };
    const matchId = request.matchId;
    getRefereeScoresModel(matchId)
      .then((result) => {
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

export function giveScoreforMatchController(request) {
  return new Promise((resolve, reject) => {
    const response = {
      status: false,
    };

    const matchId = request.matchId;
    updateMatchScores(matchId, request)
      .then((result) => {
        if (result.success) {
          response.status = true;
          resolve(response);
        } else {
          response.message = result.message || "No matches were found";
          resolve(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function giveScoreforTraditionalMatchController(request) {
  return new Promise((resolve, reject) => {
    const response = {
      status: false,
    };

    const matchId = request.matchId;
    updateTraditionalMaster(matchId, request)
      .then((result) => {
        if (result.success) {
          response.status = true;
          resolve(response);
        } else {
          response.message = result.message || "No matches were found";
          resolve(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getAllMatchesController(request) {
  return new Promise((resolve, reject) => {
    const response = {
      status: false,
    };

    getFightMasterData()
      .then((result) => {
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

export function getRedAndBluePlayersController(request) {
  return new Promise((resolve, reject) => {
    const response = {
      status: false,
    };

    getRedAndBluePlayers(request.matchId)
      .then((result) => {
        if (result.length > 0) {
          response.status = true;
          response.data = result;
          resolve(response);
        } else {
          response.data = [];
          response.message = "No matches data found";
          resolve(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
