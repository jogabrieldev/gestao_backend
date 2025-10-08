import { Router } from 'express';
import { login } from '../controller/authenticateController';

const router = Router();

router.post('/login', login);

export default router;