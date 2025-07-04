// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
    // Send stack trace only in development for debugging
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;
