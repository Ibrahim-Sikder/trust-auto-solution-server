exports.globalErrorHandle = (err, _req, res, next) => {
  const message = err.message || "Something went wrong!";

  return res.status(500).json({
    success: false,
    message,
    error: err,
  });
};
