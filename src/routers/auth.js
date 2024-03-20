import { login, signup } from "../controllers/auth.js";
import { Router as expressRouter } from 'express';

const router = expressRouter();

router.route('/signup').post(signup);
router.route('/login').post(login);

export default router;
