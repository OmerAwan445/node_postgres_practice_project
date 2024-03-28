import { AppError } from '../Errors/AppError.js';
import { AuthTokenModel, UserModel } from '../model/index.js';
import { comparePassword, hashPassword } from '../services/bcryptPassword.js';
import { generateRefreshAndAccessTokens } from '../services/jwtServices.js';
import ApiResponse from '../utils/ApiResponse.js';
import { catchAsyncError } from '../utils/catchAsyncError.js';

const signup = catchAsyncError(async (req, res, next) => {
  const { first_name, last_name, email, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return next(new AppError("Passwords do not match", 400, true));
  }

  const hashedPassword = await hashPassword(password);

  const user = await UserModel.createUser(
      { first_name, last_name, email, password: hashedPassword });

  const { password:_, ...userWithoutPassword } = user; // eslint-disable-line
  return res.status(201).send(ApiResponse.success(userWithoutPassword, "User created successfully", 201));
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

  const { password:_, ...userWithoutPassword } = user; // eslint-disable-line
  const { first_name, last_name, id } = user;
  const { accessToken, refreshToken } = await generateRefreshAndAccessTokens({ first_name, last_name, id, email });

  await AuthTokenModel.saveAuthTokenToDb(accessToken, "access", id);
  await AuthTokenModel.saveAuthTokenToDb(refreshToken, "refresh", id);

  res.cookie('accessToken', accessToken, { httpOnly: true });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/refresh_token',
  });
  return res.send(
      ApiResponse.success({ accessToken, refreshToken, ...userWithoutPassword }, "User logged in successfully", 200));
});


export { login, signup };

