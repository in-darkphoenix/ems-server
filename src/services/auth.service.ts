import { datasource as ds } from "../database/data-source";
import { User } from "../models/user.entity";

const validateUserCrendentials = async (username: string, password: string) => {
  try {
    const result = { success: false, payload: { user_id: "" }, message: "" };
    const userDetails = await ds.getRepository(User).findOneBy({ username });

    if (!userDetails) {
      result.message = "no user found with username " + username;
    } else {
      if (password !== userDetails.password) {
        result.message = "invalid credentials";
      } else {
        result.success = true;
        result.payload = userDetails;
        result.message = "user login successfull";
      }
    }

    return result;
  } catch (error) {
    console.error(error);
  }
};

export { validateUserCrendentials };
