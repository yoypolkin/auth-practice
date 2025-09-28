import { Router } from 'express';
import { getSecretsPage } from '../controllers/secrets.js';

const router = Router();

router.get('/', getSecretsPage);

export default router;
