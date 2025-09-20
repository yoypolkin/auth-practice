import { Router } from 'express';
import { getRegistrationPage, register } from '../controllers/register.js';

const router = Router();

router.get('/', getRegistrationPage);

router.post('/', register);

export default router;
