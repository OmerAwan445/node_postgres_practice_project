import { Router as expressRouter } from 'express';
import authRoutes from './auth.js';

export const router = expressRouter();

router.use('/auth', authRoutes);
