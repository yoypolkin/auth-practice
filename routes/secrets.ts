import { Router } from 'express';
import { secrets } from '../controllers/secrets.js';

const router = Router();

router.get('/', secrets);

export default router;
