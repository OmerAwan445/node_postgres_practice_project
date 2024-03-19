import { AppError } from '../Errors/AppError.js';
import { UserModel } from '../model/index.js';
import { hashPassword } from '../services/bcryptPassword.js';
import { catchAsyncError } from '../utils/catchAsyncError.js';

const signup = catchAsyncError(async (req, res, next) => {
  const { first_name, last_name, email, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return next(new AppError("Passwords do not match", 400, true));
  }

  const hashedPassword = await hashPassword(password);

  const user = await UserModel.createUser(
      { first_name, last_name, email, password: hashedPassword });
  return res.status(201).send(user);
});

export { signup };
