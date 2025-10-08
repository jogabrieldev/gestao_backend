import { Router } from 'express';
import { registerUser } from '../controller/userController';

const router = Router();



router.post('/users', registerUser);

export default router;