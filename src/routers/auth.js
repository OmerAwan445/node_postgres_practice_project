import { signup } from "../controllers/auth.js";
import { Router as expressRouter } from 'express';

const router = expressRouter();

router.route('/signup').post(signup);

export default router;
