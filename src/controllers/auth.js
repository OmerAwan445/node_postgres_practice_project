import { AppError } from '../Errors/AppError.js';
import { UserModel } from '../model/index.js';
import { catchAsyncError } from '../utils/catchAsyncError.js';

const signup = catchAsyncError( async (req, res, next) => {
  const { first_name, last_name, email, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return next(new AppError("Passwords do not match", 400, true) );
  }

  // encrypt the password here too using services folder.
  const user = await UserModel.createUser(
      { first_name, last_name, email, password, confirm_password });

  return res.send(user);
});

export { signup };
