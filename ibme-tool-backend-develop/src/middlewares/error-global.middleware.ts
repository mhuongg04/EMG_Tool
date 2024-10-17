import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	// Log the error, perform any cleanup if necessary
	console.error(err);

	// Respond with a generic error message
	res.status(500).json({
		error: "An unexpected error occurred. Please try again later.",
	});
};
