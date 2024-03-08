import { Router as expressRouter } from 'express';
import { signup } from './controllers/auth.js';

export const router = expressRouter();

router.get('/signup', signup);
