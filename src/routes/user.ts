import { Router } from 'express';
import UserCtrl from '../controllers/user';
import rules from './validation/user-rules';

const router = Router();

router.get('/', UserCtrl.getUsers);
router.get('/me', UserCtrl.getUser);
router.get('/:id', rules.getCurrentUser, UserCtrl.getCurrentUser);
router.patch('/me', rules.updateProfile, UserCtrl.updateProfile);
router.patch('/me/avatar', rules.updateAvatar, UserCtrl.updateAvatar);

export default router;
