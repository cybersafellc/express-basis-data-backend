import response from "../responses/response.js";
import Jwt from "jsonwebtoken";

const adminJwtVerify = async (req, res, next) => {
  try {
    const { token } = await req.query;
    if (token) {
      await Jwt.verify(token, process.env.ADMIN_SECRET, (err, ress) => {
        if (err) {
          return response(401, "invalid token", false, res);
        } else if (ress) {
          req.username = ress.username;
          next();
        }
      });
    } else {
      return response(401, "token required", false, res);
    }
  } catch (error) {
    console.log(error);
    return response(500, "server error", null, res);
  }
};

export default adminJwtVerify;
