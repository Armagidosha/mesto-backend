import { Router } from 'express';
import UserCtrl from '../controllers/user';
import rules from './validation/auth-rules';

const router = Router();

router.post('/signup', rules.signup, UserCtrl.createUser);
router.post('/signin', rules.signin, UserCtrl.login);

export default router;
