import { Router as expressRouter } from 'express';
import authRoutes from './auth.js';
import userRoutes from './user.js';
export const router = expressRouter();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
