import { Router as expressRouter } from 'express';
import authChecker from '../middlewares/authChecker.js';

const router = expressRouter();

router.route('/get-all').get(authChecker, (req, res) => {
  const accessToken = req.cookies?.accessToken ?? req.headers['authorization']?.split('Bearer ')[1];
  res.send(accessToken);
});

export default router;
