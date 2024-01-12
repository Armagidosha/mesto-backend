import { Joi, celebrate } from 'celebrate';
import urlRegex from '../../utils/constants';

class ValidationRules {
  getCurrentUser = celebrate({
    params: Joi.object({
      id: Joi.string().required().hex().length(24),
    }),
  });

  updateProfile = celebrate({
    body: Joi.object({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(200).required(),
    }),
  });

  updateAvatar = celebrate({
    body: Joi.object({
      avatar: Joi.string().required().pattern(urlRegex),
    }),
  });
}

export default new ValidationRules();
