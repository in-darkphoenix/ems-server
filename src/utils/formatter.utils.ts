import { Request, Response } from "express-serve-static-core";

const formatHTTPLoggerResponse = (
  req: Request,
  res: Response,
  responseBody: any, // object or array sent with res.send()
  requestStartTime: number
) => {
  let requestDuration: string = "NA";
  if (requestStartTime) {
    const endTime = Date.now() - requestStartTime;
    requestDuration = `${endTime}ms`;
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

export { formatHTTPLoggerResponse };
