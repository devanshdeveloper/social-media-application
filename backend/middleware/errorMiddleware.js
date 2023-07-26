export function notFound(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}
export function errorHandler(err, req, res, next) {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  console.log(err);
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource Not Found";
  }
  res
    .status(statusCode)
    .json({
      message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
}
