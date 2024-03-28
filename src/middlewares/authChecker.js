import { verifyToken } from "../services/jwtServices.js";
import ApiResponse from "../utils/ApiResponse.js";

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {Promise<void>}
 */
const authChecker = async (req, res, next) => {
  const accessToken = req.cookies?.accessToken ?? req.headers['authorization']?.split('Bearer ')[1];
  const tokenVerification = await verifyToken(accessToken);
  if (tokenVerification.error) {
    return res.status(401).send(ApiResponse.error(tokenVerification.message, 401));
  }
  next();
};
export default authChecker;
