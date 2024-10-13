import { Request, Response, NextFunction } from "express-serve-static-core";
import { apiLogger } from "../services/logger.service";
import { formatHTTPLoggerResponse } from "../utils/formatter.utils";

const responseInterceptor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Save the original response method
  const originalSend = res.send;

  let responseSent = false;
  const requestStartTime = Date.now();

  // Override the response method
  res.send = function (body: any): Response {
    if (!responseSent) {
      if (res.statusCode < 400) {
        apiLogger.info(
          body.message,
          formatHTTPLoggerResponse(req, res, body, requestStartTime)
        );
      } else {
        apiLogger.error(
          body.message,
          formatHTTPLoggerResponse(req, res, body, requestStartTime)
        );
      }

      responseSent = true;
    }

    // Call the original response method
    return originalSend.call(this, body);
  };

  // Continue processing the request
  next();
};

export default responseInterceptor;
