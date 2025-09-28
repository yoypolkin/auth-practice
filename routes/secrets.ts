import { Router } from 'express';
import { getSecretsPage, addNewSecret } from '../controllers/secrets.js';

const router = Router();

router.get('/', getSecretsPage);

router.post('/', addNewSecret);

export default router;
