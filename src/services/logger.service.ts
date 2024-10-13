import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, json, printf } = winston.format;
const timestampFormat: string = "MMM-DD-YYYY HH:mm:ss";

const apiLogger = winston.createLogger({
  format: combine(
    timestamp({ format: timestampFormat }),
    json(),
    printf(({ timestamp, level, message, ...data }) => {
      const response = {
        timestamp,
        level,
        message,
        data,
      };

      return JSON.stringify(response);
    })
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: "logs/api-logs-%DATE%.log",
      datePattern: "MMMM-DD-YYYY",
      zippedArchive: false, // zip logs true/false
      maxSize: "20m", // rotate if file size exceeds 20 MB
      maxFiles: "14d", // max files
    }),
  ],
});

const consoleLogger = winston.createLogger({
  format: combine(
    timestamp(),
    json(),
    printf(({ timestamp, level, message, ...data }) => {
      return `[${level}]: ${timestamp} "${message}" ${JSON.stringify(data)}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

export { apiLogger, consoleLogger };
