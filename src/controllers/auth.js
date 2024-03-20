import { AppError } from '../Errors/AppError.js';
import { UserModel } from '../model/index.js';
import { comparePassword, hashPassword } from '../services/bcryptPassword.js';
import { generateRefreshAndAccessTokens } from '../services/jwtServices.js';
import { catchAsyncError } from '../utils/catchAsyncError.js';
import { getResponseObject } from '../utils/getResponseObject.js';

const signup = catchAsyncError(async (req, res, next) => {
  const { first_name, last_name, email, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return next(new AppError("Passwords do not match", 400, true));
  }

  const hashedPassword = await hashPassword(password);

  const user = await UserModel.createUser(
      { first_name, last_name, email, password: hashedPassword });
  return res.status(201).send(getResponseObject(user, 201, "User created successfully"));
});


const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) { // guard clause
    return next(new AppError("Please provide email and password", 400, true));
  }

  const user = await UserModel.getUserByEmail(email);
  if (!user) {
    return next(new AppError("Invalid email or password", 401, true));
  }
  const hashedPassword = user.password;

  // compare the found user hash password and req.body.password.
  const match = await comparePassword(password, hashedPassword);
  if (!match) {
    return next(new AppError("Invalid email or password", 401, true));
  }
  // If they do, create a JWT refresh token and access token

  const { password: _, ...userInfo } = user; // eslint-disable-line
  const { first_name, last_name, id } = user;
  const { accessToken, refreshToken } = await generateRefreshAndAccessTokens({ first_name, last_name, id, email });

  // Save the Tokens in db
  // Login user by saving that token in user http cookies and sending the tokens in the response
  return res.status(200).send(getResponseObject({ accessToken, refreshToken, ...userInfo }, 200,
      "User logged in successfully"));
});


export { login, signup };

