import { Joi, celebrate } from 'celebrate';
import urlRegex from '../../utils/constants';

class ValidationRules {
  createCard = celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().required().pattern(urlRegex),
    }),
  });

  delCard = celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24).required(),
    }),
  });

  likeCard = celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24).required(),
    }),
  });

  dislikeCard = celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24).required(),
    }),
  });
}

export default new ValidationRules();
