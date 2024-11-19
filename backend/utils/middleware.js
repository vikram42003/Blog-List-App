const logger = require("./logger");

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "MongoServerError" && error.code === 11000) {
    return response.status(400).json({ error: "the username has already been taken" });
  } else if (error.name === "MissingToken") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: error.message });
  } else if (error.name === "NotAuthorized") {
    return response.status(401).json({ error: error.message });
  } else if (error.name === "MissingData") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const middleware = {
  errorHandler,
};

module.exports = middleware;
