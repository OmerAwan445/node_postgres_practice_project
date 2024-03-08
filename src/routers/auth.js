import { signup } from "../controllers/auth.js";
import { Router } from 'express';

const router = Router();

router.route('/signup').get(signup);

export default router;