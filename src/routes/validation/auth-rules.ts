import { Joi, celebrate } from 'celebrate';
import urlRegex from '../../utils/constants';

class ValidationRules {
  signup = celebrate({
    body: Joi.object({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(200),
      avatar: Joi.string().pattern(urlRegex),
      password: Joi.string().required(),
      email: Joi.string().required().email(),
    }),
  });

  signin = celebrate({
    body: Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  });
}

export default new ValidationRules();
