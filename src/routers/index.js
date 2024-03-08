import { Router as expressRouter } from 'express';
import authRoutes from './auth.js';

export const router = expressRouter();


router.get('/', (req, res, next)=>{
  res.send('Hello World');
});

router.use('/auth', authRoutes);
