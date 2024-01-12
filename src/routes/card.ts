import { Router } from 'express';
import CardCtrl from '../controllers/card';
import rules from './validation/card-rules';

const router = Router();

router.get('/', CardCtrl.getCards);
router.post('/', rules.createCard, CardCtrl.createCard);
router.delete('/:cardId', rules.delCard, CardCtrl.deleteCard);
router.put('/:cardId/likes', rules.likeCard, CardCtrl.likeCard);
router.delete('/:cardId/likes', rules.dislikeCard, CardCtrl.dislikeCard);

export default router;
