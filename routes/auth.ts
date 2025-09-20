import { Router } from 'express';
import {
  getLoginPage,
  login,
  googleAuth,
  googleAuthCallback,
} from '../controllers/auth.js';

const router = Router();

router.get('/', getLoginPage);

router.post('/', login);

router.get('/google', googleAuth);

/**
 * Google will redirect to here in after the /auth/google.
 * This is set in OAuth app config in gcp project.
 */
router.get('/google/secrets', googleAuthCallback);

export default router;
