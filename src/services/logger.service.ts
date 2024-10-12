import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { Request, Response } from "express-serve-static-core";

const { combine, timestamp, json, printf } = winston.format;
const timestampFormat: string = "MMM-DD-YYYY HH:mm:ss";

const logger = winston.createLogger({
  format: combine(
    timestamp({ format: timestampFormat }),
    json(),
    printf(({ timestamp, level, message, ...data }) => {
      const response = {
        timestamp,
        level,
        message,
        data, // metadata
      };

      return JSON.stringify(response);
    })
  ),
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({
    //   filename: "logs/application-logs.log",
    // }),
    new DailyRotateFile({
      // each file name includes current date
      filename: "logs/api-logs-%DATE%.log",
      datePattern: "MMMM-DD-YYYY",
      zippedArchive: false, // zip logs true/false
      maxSize: "20m", // rotate if file size exceeds 20 MB
      maxFiles: "14d", // max files
    }),
  ],
});

const formatHTTPLoggerResponse = (
  req: Request,
  res: Response,
  responseBody: any, // object or array sent with res.send()
  requestStartTime: number
) => {
  let requestDuration: string = "NA";
  if (requestStartTime) {
    const endTime = Date.now() - requestStartTime;
    requestDuration = `${endTime}ms`; // ms to s
  }
  return {
    request: {
      headers: req.headers,
      host: req.headers.host,
      baseUrl: req.baseUrl,
      url: req.url,
      method: req.method,
      body: req.body,
      params: req?.params,
      query: req?.query,
      //   clientIp:
      //     req?.headers[HTTPHeaders.ForwardedFor] ?? req?.socket.remoteAddress,
      clientIp: req?.socket.remoteAddress,
    },
    response: {
      headers: res.getHeaders(),
      statusCode: res.statusCode,
      requestDuration,
      body: responseBody,
    },
  };
};

export { logger, formatHTTPLoggerResponse };
