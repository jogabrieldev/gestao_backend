import { Router } from 'express';
import { login } from '../controller/authenticateController';
import { validate } from '../middleware/validate';
import { validationLogin } from '../validators/validationUsers';

const router = Router();

router.post('/login', validate(validationLogin), login);

export default router;
