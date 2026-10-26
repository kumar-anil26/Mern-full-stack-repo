class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode <= 500 ? "Fail" : "Error";

    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
export default AppError;
