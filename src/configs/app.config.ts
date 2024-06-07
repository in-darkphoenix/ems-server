import { AppInfo } from "../types/app_info";

const appInfo: AppInfo = {
  port: Number(process.env.APP_PORT),
};

export { appInfo };
