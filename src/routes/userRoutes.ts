import { Router } from 'express';
import { registerUser } from '../controller/userController';
import { validate } from '../middleware/validate';
import { validationUser } from '../validators/validationUsers';
const router = Router();

router.post('/users', validate(validationUser), registerUser);

export default router;